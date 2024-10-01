"use client";

import Container from "@/app/components/Container";
import { categoryList, categoryType } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

const initialDateRange = {
  key: "selection",
  startDate: new Date(),
  endDate: new Date(),
};

interface ListingClientProps {
  listing: Listing & { user: User };
  currentUser: User | null;
  reservations?: Reservation[];
}

const ListingClient = ({
  listing,
  currentUser,
  reservations = [],
}: ListingClientProps) => {
  const category = useMemo(() => {
    return categoryList.find((c) => c.label == listing.category);
  }, [listing.category, categoryList]);

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dDates: Date[] = [];
    reservations.forEach((r) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      });
      dDates = [...dDates, ...range];
    });
    return dDates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  // Set Total Price for reservation
  useEffect(() => {
    let dayCount = 0;
    if (dateRange.startDate && dateRange.endDate) {
      dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );
    }
    if (dayCount && listing.price) {
      setTotalPrice(dayCount * listing.price);
    } else {
      setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Your reservation is been added!");
        setDateRange(initialDateRange);
        // Redirect to /trips
        router.refresh();
      })
      .catch((error) => {
        toast.error("Could not create reservation!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead listing={listing} currentUser={currentUser} />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              listing={listing}
              category={category as categoryType}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
