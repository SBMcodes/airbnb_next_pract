import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized Access!" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    type: "byAuthor",
    authorId: currentUser.id,
  });

  if (!reservations || reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No reservastions yet!" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationPage;
