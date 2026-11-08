import 'server-only';

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { prisma } from "../libs/prismadb";
import { User } from "../generated/prisma/client";

export default async function getCurrentUser(): Promise<User | null> {

    const session = await getServerSession(authOptions); 

    if(!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    if(!currentUser) {
      return null;
    }

    return currentUser;
}