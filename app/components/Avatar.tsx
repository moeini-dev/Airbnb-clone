'use client';

import Image from "next/image";

interface AvatarProps {
  src?: string | null;
}

function Avatar({
  src
} : AvatarProps) {
  return (
    <Image 
      className="rounded-full"
      alt="Avatar"
      height={30}
      width={30}
      src={src || "/images/placeholder.png"}
    />
  );
}

export default Avatar;