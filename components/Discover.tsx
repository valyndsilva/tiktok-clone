import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { topics } from "../utils/constants";

function Discover() {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    "xl:border-[1px] hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";
  const topicStyle =
    "xl:border-[1px] hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <div className="xl:border-b-[1px] xl:border-gray-200 pb-6">
      <p className="text-xs text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              {item.icon}
              <span
                className={`font-medium text-sm hidden xl:block capitalize`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Discover;
