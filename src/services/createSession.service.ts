import { Repository } from "typeorm";
import { compare } from "bcrypt";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { IUserLogin } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";

export const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<object> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    // Lançar um erro apropriado
    throw new Error("Usuário e/ou senha inválidos");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    // Lançar um erro apropriado
    throw new Error("Usuário e/ou senha inválidos");
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    String(process.env.SECRET_KEY),
    {
      subject: String(user.id),
      expiresIn: "30m",
    }
  );

  return {
    id: user.id,
    data_criacao: user.created_at,
    token,
  };
};
