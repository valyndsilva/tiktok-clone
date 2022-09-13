import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SiTiktok } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { IUser } from "../typings";
import useAuthStore from "../store/authStore";
import SearchInput from "./SearchInput";

function Header() {
  // const user= false;
  const [user, setUser] = useState<IUser | null>();
  const { userProfile, addUser, removeUser } = useAuthStore();
  // console.log(userProfile);
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="w-full max-w-7xl flex justify-between items-center border-b-[1px] border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="flex  items-center justify-center">
          <SiTiktok className="text-black w-7 h-7" />
          <span className="text-black text-2xl md:text-3xl font-bold">
            TikTok
          </span>
        </div>
      </Link>
      <SearchInput />
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-[1px] px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="user"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              className=" border-[1px] p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                googleLogout();
                removeUser(); // remove from local storage
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            // onSuccess={(response) =>  console.log(response)}
            // onSuccess={(response) => createOrGetUser(response)}
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Login Failed")}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
