'use client';

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean
}

function EmptyState({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset
}: EmptyStateProps) {

  const router = useRouter();

  return(
    <div className="
      flex
      flex-col
      gap-2
      justify-center
      items-center  
      h-[60vh]
    ">
      <Heading 
        title={title}
        subtitle={subtitle}
        center
      />
      <div className="w-48 mt-4">
        {showReset && (<Button 
          label="Remove filters"
          onClick={() => router.push('/')}
          outline
        />)}
      </div>
    </div>
  );
}

export default EmptyState;