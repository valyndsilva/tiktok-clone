import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoVerified } from "react-icons/go";
const ProfileInfo = ({ user }: any) => {
  return (
    <div className="flex my-5">
      {user.image && (
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
      )}
    </div>
  );
};

export default ProfileInfo;
