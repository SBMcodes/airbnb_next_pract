"use client";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { Listing, User } from "@prisma/client";

interface FavouritesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const FavouritesClient = ({ listings, currentUser }: FavouritesClientProps) => {
  return (
    <Container>
      <Heading title="Favourites" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((l) => {
          return <ListingCard key={l.id} data={l} currentUser={currentUser} />;
        })}
      </div>
    </Container>
  );
};

export default FavouritesClient;
