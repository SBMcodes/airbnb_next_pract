"use client";

import Container from "@/app/components/Container";
import { categoryList, categoryType } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useMemo } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface ListingClientProps {
  listing: Listing & { user: User };
  currentUser: User | null;
  reservations?: Reservation[];
}

const ListingClient = ({ listing, currentUser }: ListingClientProps) => {
  const category = useMemo(() => {
    return categoryList.find((c) => c.label == listing.category);
  }, [listing.category, categoryList]);

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
