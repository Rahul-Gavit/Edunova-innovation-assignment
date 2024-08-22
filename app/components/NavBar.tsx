import React from "react";
import Image from "next/image";
import { HiOutlineBell } from "react-icons/hi";

const NavBar = () => {
  return (
    <div className="flex bg-gray-50 items-center p-4 justify-between border-b">
      <div className="">
        <span className="font-bold text-2xl text-primary-light">PEOPLE.CO</span>
      </div>
      <div className="flex items-center text-gray-700 gap-x-2">
        <HiOutlineBell className="h-4 w-4" />
        <Image
          src="/next.svg"
          width={40}
          height={40}
          alt="Picture of the author"
          className="bg-red-300 h-8 w-8 p-1.5 rounded-full"
        />
        <span className="text-xs font-medium">John Doe</span>
      </div>
    </div>
  );
};

export default NavBar;
