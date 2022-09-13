import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

import { BsPeople } from "react-icons/bs";
import Discover from "./Discover";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";
import useAuthStore from "../store/authStore";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import Image from "next/image";
import { IUser } from "../typings";
import ProfileInfo from "./ProfileInfo";

function Sidebar() {
  // const user= false;
  const [user, setUser] = useState<IUser | null>();
  const { userProfile, addUser, removeUser } = useAuthStore();
  console.log(userProfile);
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-tiktok rounded";

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";

  return (
    <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
      <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
        <div className="border-b-[1px] border-b-gray-200  xl:pb-4">
          <Link href="/">
            <div className={pathname === "/" ? activeLink : normalLink}>
              <HiHome className="w-6 h-6" />

              <span className="capitalize text-lg hidden xl:block">
                For You
              </span>
            </div>
          </Link>
          <Link href="/">
            <div className={pathname !== "/" ? activeLink : normalLink}>
              <BsPeople className="w-6 h-6" />
              <span className="capitalize text-lg hidden xl:block">
                Following
              </span>
            </div>
          </Link>
          <Link href="/">
            <div className={pathname !== "/" ? activeLink : normalLink}>
              <MdOutlineVideoCameraBack className="w-6 h-6" />
              <span className="capitalize text-lg hidden xl:block">Live</span>
            </div>
          </Link>
        </div>
        <Discover />
        <SuggestedAccounts fetchAllUsers={fetchAllUsers} allUsers={allUsers} />
        <Footer />
      </div>
    </div>
  );
}

export default Sidebar;
