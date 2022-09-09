import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiHome } from "react-icons/hi";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import Discover from "./Discover";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";
import useAuthStore from "../store/authStore";
import { GoogleLogin } from "react-google-login";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const userProfile = false;
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
        {!userProfile && (
          <div className="hidden xl:inline-flex xl:flex-col pb-10 border-b-[1px] border-b-gray-200">
            <p className="text-sm font-light text-gray-400 my-5">
              Log in to follow creators, like videos, and view comments.
            </p>
            {/* <button className="border border-tiktok  py-3 w-full rounded-lg text-tiktok hover:bg-[#FEF4F6]">
              Log in
            </button> */}
            {/* https://github.com/anthonyjgrove/react-google-login */}
            <GoogleLogin
              clientId=""
              render={(renderProps) => (
                <button
                  className="border border-tiktok py-3 w-full rounded-lg text-tiktok hover:bg-[#FEF4F6]"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Log in
                </button>
              )}
              onSuccess={() => {}}
              onFailure={() => {}}
              cookiePolicy="single_host_origin"
            />
          </div>
        )}
        <Discover />
        <SuggestedAccounts fetchAllUsers={fetchAllUsers} allUsers={allUsers} />
        <Footer />
      </div>
    </div>
  );
}

export default Sidebar;
