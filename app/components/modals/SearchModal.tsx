"use client";

import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum SearchStep {
  LOCATION,
  DATE,
  INFO,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(SearchStep.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    key: "selection",
    startDate: new Date(),
    endDate: new Date(),
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location?.value]
  );

  const onNext = useCallback(() => {
    if (step + 1 < Object.keys(SearchStep).length) {
      setStep((s) => s + 1);
    }
  }, [step]);

  const onBack = useCallback(() => {
    if (step - 1 >= 0) {
      setStep((s) => s - 1);
    }
  }, [step]);

  const onSubmit = useCallback(async () => {
    if (step != SearchStep.INFO) {
      onNext();
      return;
    }

    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    searchModal.onClose();
    router.push(url);
    setStep(SearchStep.LOCATION);
  }, [
    router,
    step,
    SearchStep,
    searchModal,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step !== SearchStep.INFO) {
      return "Next";
    }
    return "Search";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step !== SearchStep.LOCATION) {
      return "Back";
    }
    return undefined;
  }, [step]);

  let body = <div></div>;

  if (step == SearchStep.LOCATION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you want to go?"
          subTitle="Find the perfect location!"
        />
        <CountrySelect
          value={location}
          onChange={(val) => {
            setLocation(val as CountrySelectValue);
          }}
        />
        <hr />
        <Map center={location?.latlng} />
      </div>
    );
  } else if (step == SearchStep.DATE) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading title="When do u plan to go to?" />
        <Calendar
          onChange={(value) => {
            setDateRange(value.selection);
          }}
          disabledDates={[]}
          value={dateRange}
        />
      </div>
    );
  } else if (step == SearchStep.INFO) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading title="More info..." subTitle="Find your perfect place!" />
        <Counter
          onChange={(val) => {
            setGuestCount(val);
          }}
          title="Guests"
          subtitle="Total number of guests"
          value={guestCount}
        />

        <Counter
          onChange={(val) => {
            setRoomCount(val);
          }}
          title="Rooms"
          subtitle="Total number of rooms"
          value={roomCount}
        />

        <Counter
          onChange={(val) => {
            setBathroomCount(val);
          }}
          title="Bathrooms"
          subtitle="Total number of bathrooms"
          value={bathroomCount}
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={onBack}
      isOpen={searchModal.isOpen}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      title="Filters"
      body={body}
    />
  );
};

export default SearchModal;
