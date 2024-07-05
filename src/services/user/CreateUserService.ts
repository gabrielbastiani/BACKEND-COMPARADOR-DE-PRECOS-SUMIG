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

        const categs = await prismaClient.category.findFirst({
            where: {
                slug: "maquinas-de-solda"
            }
        });

        if (!categs) {
            await prismaClient.category.create({
                data: {
                    name: "Máquinas de solda",
                    slug: removerAcentos("Máquinas de solda"),
                    nivel: Number(0),
                    parentId: null,
                    order: Number(0),
                    type_category: "principal"
                }
            });

            await prismaClient.category.create({
                data: {
                    name: "Máquinas de corte plasma manual",
                    slug: removerAcentos("Máquinas de corte plasma manual"),
                    nivel: Number(0),
                    parentId: null,
                    order: Number(1),
                    type_category: "principal"
                }
            });

            const categsCreate = await prismaClient.category.findMany();

            await prismaClient.category.create({
                data: {
                    name: "Processo MMA (eletrodo revestido)",
                    slug: removerAcentos("Processo MMA (eletrodo revestido)"),
                    nivel: Number(1),
                    parentId: categsCreate[0].id,
                    order: Number(0),
                    type_category: "process"
                }
            });

            await prismaClient.category.create({
                data: {
                    name: "Processo MIG e MAG",
                    slug: removerAcentos("Processo MIG e MAG"),
                    nivel: Number(1),
                    parentId: categsCreate[0].id,
                    order: Number(1),
                    type_category: "process"
                }
            });

            await prismaClient.category.create({
                data: {
                    name: "Processo TIG",
                    slug: removerAcentos("Processo TIG"),
                    nivel: Number(1),
                    parentId: categsCreate[0].id,
                    order: Number(2),
                    type_category: "process"
                }
            });

            await prismaClient.category.create({
                data: {
                    name: "Equipamentos multiprocessos",
                    slug: removerAcentos("Equipamentos multiprocessos"),
                    nivel: Number(1),
                    parentId: categsCreate[0].id,
                    order: Number(2),
                    type_category: "process"
                }
            });
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