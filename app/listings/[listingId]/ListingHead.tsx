import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import { Listing, User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface ListingHeadProps {
  listing: Listing;
  currentUser?: User | null;
}

const ListingHead = ({ listing, currentUser }: ListingHeadProps) => {
  const { title, imageSrc, id, locationValue } = listing;
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.label} , ${location?.region}`}
      />
      <div className="w-[80%] h-[480px] overflow-hidden rounded-xl relative mx-auto">
        <Image
          src={imageSrc}
          alt={`${title}`}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} size={42} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
