'use client';

import Image from "next/image";

function Avatar() {
  return (
    <Image 
      className="rounded-full"
      alt="Avatar"
      height={30}
      width={30}
      src="/images/placeholder.png"
    />
  );
}

export default Avatar;