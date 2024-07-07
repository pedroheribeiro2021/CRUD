import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";

export const deleteUserService = async (id: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: any = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  await userRepository.remove(user);
};
