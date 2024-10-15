import { FSCollection, User, UserDto } from "@/interface";
import { updateCollectionDoc } from "@/repository/firestore/queries/updateCollectionDoc";
import { userToDto } from "../transformer/userToDto";

export const updateUser = (data: User) =>
  updateCollectionDoc<User, UserDto>(data, FSCollection.USERS, userToDto);
