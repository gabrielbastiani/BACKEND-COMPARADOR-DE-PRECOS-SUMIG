import prismaClient from "../../../prisma";
import nodemailer from "nodemailer";
require('dotenv/config');
import ejs from 'ejs';
import path from "path";

interface RecoveryRequest {
    email: string;
}

class RequestPasswordRecoveryService {
    async execute({ email }: RecoveryRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw {
                error: { field: "email", message: "Conta não encontrada." },
                code: 400,
            };
        }

        const recovery = await prismaClient.passwordRecoveryUser.create({
            data: {
                email,
            },
        });

        const transporter = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: 465,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        });

        const requiredPath = path.join(__dirname, `../../user/templateEmail/recuperar_senha_do_usuario.ejs`);

        const data = await ejs.renderFile(requiredPath, {
            name: user.name,
            id: recovery.id
        });

        await transporter.sendMail({
            from: `SUMIG Soluções Para Solda e Corte LTDA - <sumig@sumig.com>`,
            to: user?.email,
            subject: `Recuperação de senha`,
            html: data
        });

        return {
            message: "Verifique seu E-mail",
        };
    }
}

export { RequestPasswordRecoveryService };