"use client";

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationData = useMemo(() => {
    if (!reservation) {
      return null;
    }
    return `${format(reservation.startDate, "PP")}-${format(
      reservation.endDate,
      "PP"
    )}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => {
        router.push(`/listings/${data.id}`);
      }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton currentUser={currentUser} listingId={data.id} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.label} , {location?.region}
        </div>
        <div className="font-light text-neutral-500">
          {reservationData || data.category}
        </div>
        <div className="font-semibold">
          ${price}
          {!reservation && <span className="font-light"> / Night</span>}
        </div>

        {onAction && actionLabel && (
          <Button
            label={actionLabel}
            onClick={handleCancel}
            disabled={disabled}
            small
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
