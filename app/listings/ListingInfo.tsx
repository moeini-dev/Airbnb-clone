'use client';

import Avatar from "@/app/components/Avatar";
import { User } from "@/app/generated/prisma/client";
import useCountries from "@/app/Hooks/useCountries";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  user: User
  category: {
    icon: IconType,
    label: string;
    description: string
  } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string
}

const Map = dynamic(() => import('../components/Map'), {ssr: false});

function ListingInfo({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue
}: ListingInfoProps) {

  const {getByValue} = useCountries();
  
  const coordinates = getByValue(locationValue)?.latlng;

  return(
    <div className="flex flex-col col-span-4 gap-4">
      <div className="flex flex-col gap-2">
        <div className="
          flex
          flex-row
          items-center
          gap-2
          text-xl
        ">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image}/>
        </div>
        <div className="
          flex
          flex-row
          items-center
          gap-4
          font-light
          text-neutral-500
        ">
          <div className="">{guestCount} guests</div>
          <div className="">{roomCount} rooms</div>
          <div className="">{bathroomCount} bathrooms</div>
        </div>
      </div>
      {category && (
        <ListingCategory 
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr className="border-transparent"/>
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr className="border-transparent"/>
      <Map center={coordinates} />
    </div>
  );
}

export default ListingInfo;