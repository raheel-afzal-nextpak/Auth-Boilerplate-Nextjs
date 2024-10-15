import { FSCollection, User, UserDto } from "@/interface";
import {
  DocumentFetchOptions,
  fetchCollectionDoc,
} from "@/repository/firestore/queries/fetchCollectionDoc";
import {
  FetchOptions,
  fetchCollectionDocs,
} from "@/repository/firestore/queries/fetchCollectionDocs";
import { userFromDto } from "../transformer/userFromDto";

export const fetchUser = (userId: string, options?: DocumentFetchOptions) => {
  const result = fetchCollectionDoc<UserDto, User>(
    FSCollection.USERS,
    userFromDto,
    userId,
    options
  );
  return result;
};

export const fetchUsers = (options?: FetchOptions) =>
  fetchCollectionDocs<UserDto, User>(FSCollection.USERS, userFromDto, options);
