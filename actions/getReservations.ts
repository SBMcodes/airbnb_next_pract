"use server";

import { db } from "@/lib/db";

interface Iparams {
  type: "byListing" | "byUser" | "byAuthor";
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async ({
  type,
  listingId,
  authorId,
  userId,
}: Iparams) => {
  try {
    let query = {};

    if (type == "byListing") {
      if (!listingId) {
        return null;
      }
      query = {
        listingId,
      };
    } else if (type == "byUser") {
      if (!userId) {
        return null;
      }
      query = {
        userId,
      };
    } else if (type == "byAuthor") {
      if (!authorId) {
        return null;
      }
      query = {
        listing: {
          userId: authorId,
        },
      };
    }

    const res = await db.reservation.findMany({
      where: {
        ...query,
      },
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res;
  } catch (error) {
    throw new Error("Error Loading Reservations!");
  }
};

export default getReservations;
