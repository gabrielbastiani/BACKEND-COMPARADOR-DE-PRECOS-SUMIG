import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

interface UserRequest {
    name: string;
    slug: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });

        if (userAlreadyExists) {
            throw new Error("user already exists");
        }

        const passwordHash = await hash(password, 8);

        const users = await prismaClient.user.create({
            data: {
                name: name,
                slug: removerAcentos(name),
                email: email,
                password: passwordHash
            }
        });

        const findUser = await prismaClient.user.findFirst({
            orderBy: {
              created_at: 'desc'
            }
          });

          const transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
              user: process.env.USER_SMTP,
              pass: process.env.PASS_SMTP
            }
          });
      
          const requiredPath = path.join(__dirname, `../user/templateEmail/criacao_de_cliente.ejs`);
      
          const data = await ejs.renderFile(requiredPath, { name: findUser?.name });
      
          await transporter.sendMail({
            from: `SUMIG Soluções Para Solda e Corte LTDA - <sumig@sumig.com>`,
            to: findUser?.email,
            subject: `Novo usuario cadastrado`,
            html: data
          });

        return users;
    }
}

export { CreateUserService }