'use client';

import { ignoreListAnonymousStackFramesIfSandwiched } from "next/dist/next-devtools/server/shared";
import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

function Counter({
  title,
  subtitle,
  value,
  onChange
}: CounterProps) {

  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if(value === 1) {
      return
    }
    onChange(value - 1);
  }, [value, onChange])

  return(
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">
          {title}
        </div>
        <div className="font-light text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
          <div onClick={onReduce} className="
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-full
            border
            border-neutral-400
            text-neutral-600
            hover:opancity-80
            transition
            cursor-pointer
          ">
            <AiOutlineMinus />
          </div>
          <div className="font-light text-xl text-neutral-600">
            {value}
          </div>
          <div onClick={onAdd} className="
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-full
            border
            border-neutral-400
            text-neutral-600
            hover:opancity-80
            transition
            cursor-pointer
          ">
            <AiOutlinePlus />
          </div>
        </div>
    </div>
    );
}

export default Counter;