import prismaClient from "../../../prisma";

class FindRecoveryIDUserService {
    async execute() {
        const userRecovery = await prismaClient.passwordRecoveryUser.findFirst({
            select: {
                id: true,
                email: true
            }
        });

        return userRecovery;
    }
}

export { FindRecoveryIDUserService }