import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import React from "react";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized Page"
          subtitle="Please login to your account!"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    type: "byUser",
    userId: currentUser.id,
  });

  if (reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips Found!"
          subtitle="Looks like you haven't booked any trips yet!"
        />
      </ClientOnly>
    );
  }

  if (!reservations) {
    return (
      <ClientOnly>
        <EmptyState title="Oops something went wrong!" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default TripsPage;
