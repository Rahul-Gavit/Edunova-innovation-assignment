"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiMiniSquares2X2 } from "react-icons/hi2";

const sidebarOptions = [
  {
    path: "/",
    name: "Overview",
    icon: HiMiniSquares2X2,
  },
  {
    path: "/directory",
    name: "People Directory",
    icon: HiMiniSquares2X2,
  },
];

const SideBar = () => {
  const pathName = usePathname();

  return (
    <div className=" p-4 space-y-4">
      {sidebarOptions.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className={`flex gap-x-2 items-center ${
            pathName == item.path ? " text-primary-light" : ""
          }`}
        >
          <item.icon
            className={`text-white  p-1 h-6 w-6 rounded-md ${
              pathName == item.path ? " bg-primary-light" : "bg-black"
            }`}
          />
          <span className="font-bold">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
