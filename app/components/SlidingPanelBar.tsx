import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const SlidingPanelBar = ({ selectedRowData, isOpen, toggleDrawer }) => {
  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        overlayColor={"#fffff"}
        overlayOpacity={0}
        size={700}
        direction="right"
        className="w-[500px] bg-transparent"
      >
        <div className="">
          <div className="">
            <div key={selectedRowData.id} className="">
              <div className="flex items-center h-32 bg-[#2A5B7E] px-4 gap-x-4">
                <img
                  src={selectedRowData.userImg}
                  alt="User"
                  className="h-20 w-20 rounded-full"
                />

                <div className="space-x-2">
                  <p className="font-medium text-white py-2">
                    {selectedRowData.name}
                  </p>
                  <div className="flex gap-x-2">
                    <div className="flex flex-col text-xs font-medium text-white">
                      <span className="font-normal">
                        @{selectedRowData.username}
                      </span>
                      <span>User ID</span>
                    </div>
                    <div className="text-white">|</div>
                    <div className="flex flex-col text-xs font-medium text-white">
                      <span className="font-normal">
                        {selectedRowData.role}
                      </span>
                      <span>Role</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50/30 shadow-md m-2 p-2  border border-gray-100">
                <p className="bg-gray-100 p-3 text-base font-medium">
                  Personal Information
                </p>

                <div className="grid grid-cols-2 grid-rows-1 gap-4 p-3 border-b">
                  <div className="text-sm font-medium">Date of Birth</div>
                  <div className="text-sm font-light">
                    {selectedRowData.dob}
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 gap-4 p-3 border-b">
                  <div className="text-sm font-medium">Gender</div>
                  <div className="text-sm font-light">
                    {selectedRowData.gender}
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 gap-4 p-3 border-b">
                  <div className="text-sm font-medium">Nationality</div>
                  <div className="text-sm font-light">
                    {selectedRowData.nationality}
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 gap-4 p-3 border-b">
                  <div className="text-sm font-medium">Contact No.</div>
                  <div className="text-sm font-light">
                    {selectedRowData.phone}
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 gap-4 p-3 border-b">
                  <div className="text-sm font-medium">Email Address</div>
                  <div className="text-sm font-light">
                    {selectedRowData.mail}
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 gap-4 p-3 border-b">
                  <div className="text-sm font-medium">Work Email Address</div>
                  <div className="text-sm font-light">
                    {selectedRowData.mail}
                  </div>
                </div>

                <p className="bg-gray-100 p-3 my-3 text-base font-medium">
                  Research & Publication
                </p>
                <div className="space-y-2 px-4">
                  <p className="text-xs font-medium">
                    AI and User Experience: The Future Of Design
                  </p>
                  <p className="text-xs">
                    Published in the Journal of Modern Design 2020
                  </p>
                  <p className="text-xs">
                    AI, IOT based real time condition monitoring of Electrical
                    Machines using Python <br />
                    language Abstract: Maintaining induction motors in good
                    working order before they <br /> fail benefits small{" "}
                    <span className="text-xs font-medium text-orange-500">
                      See More...
                    </span>
                  </p>
                  <div className="flex gap-x-2 items-center">
                    <FaArrowUp className="w-5 h-5 rotate-45 text-orange-500" />
                    <span className="text-orange-500 font-bold">
                      SEE PUBLICATION
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SlidingPanelBar;
