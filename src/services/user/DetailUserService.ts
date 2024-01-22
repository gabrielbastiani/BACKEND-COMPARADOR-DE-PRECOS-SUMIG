import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
}

class DetailUserService {
    async execute({ user_id }: UserRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        return user;
    }
}

export { DetailUserService }