import { NextResponse } from "next/server";
import {prisma} from '@/app/libs/prismadb';
import getCurrentUser from "@/app/libs/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  
  if(!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    title,
    description,
    price
  } = body;

  // This part almost never takes any action
  // but it's a good example of how to traverse through objects
  Object.keys(body).forEach((key: any) => {
    if(!body[key]) {
      NextResponse.error();
    }
  });
  
  const listing = await prisma.listing.create({
    data: {
      userId: currentUser.id,
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price)
    }
  });

  return NextResponse.json(listing);

}