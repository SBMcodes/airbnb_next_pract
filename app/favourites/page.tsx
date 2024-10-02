import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getFavouriteListings from "@/actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized Access!" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  const listings = await getFavouriteListings();
  console.log(listings);

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found!"
          subtitle="Looks like you have no favourite listings!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavouritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavouritesPage;
