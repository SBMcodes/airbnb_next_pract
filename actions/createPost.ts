"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

const createPost = async (data: any) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "User is not logged in!" };
  }
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = data;

  Object.keys(data).forEach((key: any) => {
    if (!data[key]) {
      return { error: "All fields are required!" };
    }
  });

  const listing = await db.listing.create({
    data: {
      userId: currentUser.id,
      title,
      description,
      imageSrc,
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      price: parseInt(price, 10),
    },
  });

  return {
    success: "Listing Created Successfully!",
  };
};

export default createPost;
