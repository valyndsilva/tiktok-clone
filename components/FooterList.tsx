import React from "react";

function FooterList({ items, mt }: { items: string[]; mt: Boolean }) {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
      {items.map((item: string) => (
        <p
          key={item}
          className="text-gray-400 text-xs  hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export default FooterList;
