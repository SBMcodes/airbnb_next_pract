import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import PropertyClient from "./PropertyClient";
import getListings from "@/actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized Access!" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properites found!"
          subtitle="Looks like you have no properties listed!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertyClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
