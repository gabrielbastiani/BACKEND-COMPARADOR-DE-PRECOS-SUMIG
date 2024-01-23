import prismaClient from "../../../prisma";

interface UserRequest {
    passwordRecoveryUser_id: string;
}

class DeletePasswordRecoveryService {
    async execute({ passwordRecoveryUser_id }: UserRequest) {
        const deleteID = await prismaClient.passwordRecoveryUser.delete({
            where: {
                id: passwordRecoveryUser_id
            },
        });

        return deleteID;
    }
}

export { DeletePasswordRecoveryService };