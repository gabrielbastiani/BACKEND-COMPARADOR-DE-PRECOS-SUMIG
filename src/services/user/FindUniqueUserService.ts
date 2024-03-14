import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
}

class FindUniqueUserService {
    async execute({ user_id }: UserRequest) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            }
        });

        return user;
    }
}

export { FindUniqueUserService }