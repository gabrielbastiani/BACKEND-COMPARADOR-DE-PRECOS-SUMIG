import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
    name: string;
}

class UpdateNameUserService {
    async execute({ user_id, name }: UserRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const user_name = await prismaClient.user.update({
            where: {
                id: user_id,
            },
            data: {
                name: name,
                slug: removerAcentos(name)
            }
        });

        return user_name;

    }
}

export { UpdateNameUserService }