import getCurrentUser from "@/app/libs/getCurrentUser";
import UserMenu from "./UserMenu";
import { connection } from "next/server";
import { cookies } from "next/headers";

export default async function UserMenuHelper() {

  await connection();
  const currentUser = await getCurrentUser();

  return <UserMenu currentUser={currentUser} />
}