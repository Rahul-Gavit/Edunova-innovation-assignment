"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { BiPlus } from "react-icons/bi";
import "react-modern-drawer/dist/index.css";
import SlidingPanelBar from "./SlidingPanelBar";

const Table = ({ data, columns }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <div className="flex justify-between border-b py-4 px-4 ">
        <div className="flex gap-x-2 items-center">
          <span className="text-lg font-bold">Team Members</span>
          <span className="bg-violet-50 border px-2 py-1 text-xs font-medium text-violet-600 rounded-full border-violet-300">
            {data.length}
            <span className="pl-1">Users</span>
          </span>
        </div>

        <div className="flex gap-x-2 items-center">
          <div className="flex items-center border border-b-2 border-b-black px-2">
            <input
              type="text"
              value={filtering}
              placeholder="Search"
              onChange={(e) => setFiltering(e.target.value)}
              className="outline-none px-2 py-1 placeholder:text-sm"
            />
            <FaMagnifyingGlass className="h-4 w-4 text-gray-500" />
          </div>
          <CiFilter className="h-5 w-5 text-gray-700" />
          <button className="flex items-center gap-x-1 text-xs font-semibold text-white bg-primary-light p-2 rounded-sm">
            <BiPlus className="h-4 w-4" />
            ADD MEMBER
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead className="border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left py-4 px-4"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <span className="flex items-center text-sm font-medium gap-x-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: <FaArrowUp className="h-4 w-4 text-gray-500" />,
                        desc: <FaArrowDown className="h-4 w-4 text-gray-500" />,
                      }[header.column.getIsSorted() ?? null]
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => {
                if (!row.original.preventSlide) {
                  console.log(row.original);
                  setSelectedRowData(row.original);
                  toggleDrawer();
                }
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`py-2 px-4 border-b ${
                    row.id % 2 == 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between p-4">
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="border py-1.5 px-4 rounded-md flex items-center gap-x-2"
        >
          <FaArrowLeft className="h-4 w-4 text-gray-500" />
          Previous
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="border py-1.5 px-4 rounded-md flex items-center gap-x-2"
        >
          Next
          <FaArrowRight className="h-4  w-4 text-gray-500" />
        </button>
      </div>
      <SlidingPanelBar
        selectedRowData={selectedRowData}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
};

export default Table;
