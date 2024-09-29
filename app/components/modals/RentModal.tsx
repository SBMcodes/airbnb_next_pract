"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categoryList } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const categoryValue = watch("category");
  const locationValue = watch("location");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [locationValue]
  );

  const setCustomValue = (id: string, value: any) => {
    console.log(value);
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const totalSteps = Object.keys(STEPS).length / 2;
  const onBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const onNext = () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    }
  };

  const secondaryAction = useMemo(() => {
    return step === STEPS.CATEGORY ? undefined : onBack;
  }, [step]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let body = <div></div>;

  if (step == STEPS.CATEGORY) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describe your place?"
          subTitle="Pick a Category!"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto px-4">
          {categoryList.map((category, idx) => {
            return (
              <div
                key={category.label}
                className={`col-span-1 ${
                  idx == categoryList.length - 1 &&
                  (categoryList.length % 2 == 0
                    ? "col-span-1"
                    : "col-span-1 md:col-span-2")
                } text-center`}
              >
                <CategoryInput
                  onClick={(value: string) => {
                    setCustomValue("category", value);
                  }}
                  selected={categoryValue === category.label}
                  label={category.label}
                  Icon={category.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (step == STEPS.LOCATION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect
          onChange={(value) => {
            setCustomValue("location", value);
          }}
        />
        <Map center={locationValue?.latlng} />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      secondaryAction={secondaryAction}
      body={body}
    />
  );
};

export default RentModal;
