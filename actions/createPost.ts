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

  let error = null;

  Object.keys(data).forEach((key: any) => {
    if (!data[key] || data[key] == null) {
      error = { error: "All fields are required!" };
    }
  });

  if (error) {
    return error;
  }

  await db.listing.create({
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
