"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categoryList } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

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

  const onBack = () => {
    setStep((s) => s - 1);
  };

  const onNext = () => {
    setStep((s) => s + 1);
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

  const body = (
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
                onClick={() => {}}
                selected={false}
                label={category.label}
                Icon={category.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Modal
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      secondaryAction={secondaryAction}
      body={body}
    />
  );
};

export default RentModal;
