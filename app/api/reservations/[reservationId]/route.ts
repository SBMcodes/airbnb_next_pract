import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid Id!");
    }

    const reservation = await db.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });
    return NextResponse.json(reservation);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Cancelling Reservation Failed!" },
      { status: 500 }
    );
  }
}
