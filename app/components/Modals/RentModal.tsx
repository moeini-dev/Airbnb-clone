'use client';

import useRentModal from "@/app/Hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Categories";
import CategoryInput from "../CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../CountrySelect";
import Map from "../Map";
import dynamic from "next/dynamic";
import Counter from "../Counter";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

function RentModal() {

  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: '',
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  
  // It needs dynamic import so that the server rendering phase get passed
  // otherwise, Next.js would throw an error stating that there is no Window object
  // see https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c
  const Map = useMemo(() => dynamic(() => import('../Map'), 
    {
      ssr: false,
      loading: () => (<div className='sm:h-[50vh] h-[35vh]'></div>)
    }), [location]);


  const setCustomeValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  }

  const onBack = () => {
    setStep((step) => step - 1);
  }

  const onNext = () => {
    setStep((step) => step + 1);
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
      ">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomeValue('category', category)}}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
  if(step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Where is your place located"
          subtitle="Help guests find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => {
            setCustomeValue('location', value);
          }}
        />
        <Map 
          center={location?.latlng}
        />
      </div>
    )
  }
  
  if(step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter 
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomeValue('guestCount', value)}
        />
        <Counter 
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomeValue('roomCount', value)}
        />
        <Counter 
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomeValue('bathroomCount', value)}
        />
      </div>
    );
  }

  return(
    <Modal 
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
}

export default RentModal;