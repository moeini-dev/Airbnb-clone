'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { STEPS } from "./RentModal";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  steps?: number;
  currentStep?: number;
}

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  steps,
  currentStep
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if(disabled) return;
    setShowModal(false);
    // To delay the execution of onClose function for 300 ms
    // Without it, the closing animation would be interrupted
    setTimeout(() =>{
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if(disabled) {return};
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if(disabled || !secondaryAction) {return};
    secondaryAction();
  }, [disabled, secondaryAction]);


  if(!isOpen){return null};
  return (
    <>
      <div className="
        flex
        justify-center
        items-center
        fixed
        inset-0
        z-50
        outline-0
        focus:outline-0
        bg-neutral-700/70
      ">
        <div 
        className="
          relative
          w-full
          h-full
          md:w-4/6
          lg:w-3/6
          md:h-auto
          lg:h-auto
          my-6
          mx-auto
        ">
          {/* {CONTENT} */}
          <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'transate-y-0': 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="
              relative
              flex
              flex-col
              w-full
              h-full
              md:h-auto
              lg:h-auto
              border-0
              rounded-lg
              shadow-lg
              outline-0
              focus:outline-0
              bg-white
            ">
              {/* HEADER */}
              <div className="
                relative
                flex
                items-center
                justify-center   
                p-6
                border-b-neutral-500
              ">
                <button onClick={handleClose} className="
                  absolute
                  left-9
                  p-1
                  border-0
                  hover:opacity-70
                  transition
                ">
                  <IoMdClose size={18}/>
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              {steps && <div className="relative flex gap-2 justify-between px-6 pb-2">
                {[...Array(steps)].map((_ , index) => (
                  <div 
                    key={index} 
                    className={`
                      flex 
                      ${index === currentStep ? "flex-[1.5]" : "flex-1"}
                      ${index === currentStep ? "bg-rose-400" : "bg-rose-100"} 
                      h-1 
                      rounded-full 
                      transition-width 
                      duration-300
                    `}></div>
                ))}
              </div>}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="
                  flex
                  items-center
                  gap-4
                  w-full
                  ">
                  {secondaryAction && secondaryActionLabel &&(<Button 
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />)}
                  <Button 
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                    />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;