import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

function Search() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="relative hidden md:block">
      <form
        onSubmit={handleSearch}
        className="absolute md:static top-10 -left-20 bg-white flex items-center justify-center"
      >
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-primary p-3 text-sm font-medium border-[1px] border-gray-100 focus:outline-none focus:border-[1px] focus:border-gray-400 w-[300px] md:w-[350px] rounded-full  md:top-0 placeholder:font-light placeholder:text-sm"
          placeholder="Search accounts and videos"
        />
        <button
          onClick={handleSearch}
          className="absolute md:right-3 right-4 border-l-2 border-gray-300 pl-3 text-2xl text-gray-400"
        >
          <BiSearch />
        </button>
      </form>
    </div>
  );
}
export default Search;
