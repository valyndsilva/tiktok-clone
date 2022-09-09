import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { GoVerified } from "react-icons/go";

import { IUser } from "../typings";

interface Users {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}

function SuggestedAccounts({ fetchAllUsers, allUsers }: Users) {
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const users = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);

  return (
    <div className="xl:border-b-[1px] border-gray-200 pb-4">
      <p className="text-xs text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested accounts
      </p>
      <div>
        {users?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image
                  width={34}
                  height={34}
                  className="rounded-full"
                  src={user.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </div>

              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                  {user.userName.replace(/\s+/g, "")}{" "}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SuggestedAccounts;
