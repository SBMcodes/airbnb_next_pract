"use client";
import React, { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import useRentModal from "@/app/hooks/useRentModal";
import useNavMenu from "@/app/hooks/useNavMenu";

interface UserMenuProps {
  currentUser: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const navMenu = useNavMenu();
  const rentModal = useRentModal();

  // const [isOpen, setIsOpen] = useState(navMenu.isOpen);

  // const { data, status, update } = useSession();

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const toggleOpen = () => {
    navMenu.onToggle(!navMenu.isOpen);
  };
  return (
    <div className="relative select-none">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {`${!currentUser ? "Airbnb your home" : currentUser?.name}`}
        </div>
        <div
          className="p-4 md:px-4 md:py-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {navMenu.isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[180px] bg-white overflow-hidden top-12 right-0 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {!currentUser ? (
                <>
                  <MenuItem
                    onClick={() => {
                      loginModal.onOpen();
                    }}
                    label={"Login"}
                  />
                  <MenuItem
                    onClick={() => {
                      registerModal.onOpen();
                    }}
                    label={"Sign up"}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      router.push("/trips");
                    }}
                    label={`My Trips`}
                  />
                  <MenuItem
                    onClick={() => {
                      router.push("/favourites");
                    }}
                    label={`My Favourites`}
                  />
                  <MenuItem
                    onClick={() => {
                      router.push("/reservations");
                    }}
                    label={`My Reservations`}
                  />
                  <MenuItem
                    onClick={() => {
                      router.push("/properties");
                    }}
                    label={`My Properties`}
                  />
                  <MenuItem
                    onClick={rentModal.onOpen}
                    label={`AirBnb Your Home`}
                  />
                  <hr />
                  <MenuItem
                    onClick={() => {
                      logout();
                    }}
                    label={`Log Out`}
                  />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
