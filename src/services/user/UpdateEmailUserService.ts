import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
    email: string;
}

class UpdateEmailUserService {
    async execute({ user_id, email }: UserRequest) {
        const user_email = await prismaClient.user.update({
            where: {
                id: user_id,
            },
            data: {
                email: email
            }
        });

        return user_email;

    }
}

export { UpdateEmailUserService }