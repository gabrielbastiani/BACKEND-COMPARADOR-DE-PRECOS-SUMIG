import prismaClient from '../../../prisma'; 
import { hash } from 'bcryptjs'

interface UserRecovery {
  passwordRecoveryUser_id: string;
  password: string;
}

class RecoveryPasswordService {
  async execute({ passwordRecoveryUser_id, password }: UserRecovery) {
    const recovery = await prismaClient.passwordRecoveryUser.findUnique({
      where: {
        id: passwordRecoveryUser_id
      },
    });

    if (!recovery) {
      throw {
        error: { message: "Conta não encontrada." },
        code: 400,
      };
    }

    const hashedPassword = await hash(password, 8);

    await prismaClient.user.update({
      where: {
        email: recovery.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prismaClient.passwordRecoveryUser.delete({
      where: {
        id: recovery.id,
      },
    });

    return {
      message: "Senha atualizada com sucesso",
    };
  }
}

export { RecoveryPasswordService };