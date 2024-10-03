import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Iparams {
  listingId?: string;
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
    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id!");
    }

    const listing = await db.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(listing);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Delisting Property Failed!" },
      { status: 500 }
    );
  }
}
