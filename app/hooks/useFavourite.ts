import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";

interface IUserFavourite {
  listingId: string;
  currentUser?: User | null;
}

const useFavourite = ({ listingId, currentUser }: IUserFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const favList = currentUser?.favoriteIds || [];
    return favList.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

      try {
        let favRequest;
        if (hasFavourited) {
          favRequest = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          favRequest = () => axios.post(`/api/favourites/${listingId}`);
        }
        await favRequest();
        router.refresh();
      } catch (error) {
        console.log("Favourite Error: ", error);
      }
    },
    [currentUser, hasFavourited, listingId, loginModal, router]
  );

  return { hasFavourited, toggleFavourite };
};

export default useFavourite;
