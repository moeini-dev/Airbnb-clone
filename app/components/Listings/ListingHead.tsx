'use client';

import { User } from "@/app/generated/prisma/client";
import useCountries from "@/app/Hooks/useCountries";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

function ListingHead({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}: ListingHeadProps) {

  const {getByValue} = useCountries();

  const location = getByValue(locationValue);


  return (
    <>
      <Heading 
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
        relative
        w-full
        h-[60vh]
        overflow-hidden
        rounded-xl
      ">
        <Image 
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
}

export default ListingHead;