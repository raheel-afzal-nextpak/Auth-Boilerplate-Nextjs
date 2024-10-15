import { User, UserDto } from "@/interface";

export const userToDto = (user: User): UserDto => ({
  ...user,
});
