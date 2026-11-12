'use client';

import { useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string';
import { useCallback } from "react";

interface CategoryBoxProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean,
  description?: string,
}

function CategoryBox({
  icon,
  label,
  selected,
  description,
}: CategoryBoxProps) {
  
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
  
    if(params) {
      currentQuery = qs.parse(params.toString());
    }

    // Type 'any' should be explicitly assinged to updateQuery
    // so that you can delete a key/value pair of it later
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    // If the user clicks the same CategoryBox again
    // it would cancel the search and remove the search param out of the URL
    if(params?.get('category') == label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, {skipNull: true})
    
    router.push(url);

  }, [label, params, router])

  
  return(
    <div onClick={handleClick} className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}>
      {icon}
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  );
}

export default CategoryBox;