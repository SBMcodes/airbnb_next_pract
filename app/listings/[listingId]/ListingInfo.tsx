import Avatar from "@/app/components/Avatar";
import { categoryType } from "@/app/components/navbar/Categories";
import useCountries from "@/app/hooks/useCountries";
import { Listing, User } from "@prisma/client";
import React from "react";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  listing: Listing & { user: User };
  category: categoryType;
}

const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });

const ListingInfo = ({ listing, category }: ListingInfoProps) => {
  const {
    user,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
  } = listing;

  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8 ">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-4">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>
            {guestCount} {guestCount > 1 ? "Guests" : "Guest"}
          </div>
          <div>
            {roomCount} {roomCount > 1 ? "Rooms" : "Room"}
          </div>
          <div>
            {bathroomCount} {bathroomCount > 1 ? "Bathrooms" : "Bathroom"}
          </div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory category={category} />}
      <hr />
      <div className="text-lg font-bold text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
