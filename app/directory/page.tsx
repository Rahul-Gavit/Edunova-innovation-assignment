"use client";
import { generateFakeUsers } from "@/utils/GenerateFakerUsers";
import React, { useMemo, useState } from "react";
import Table from "../components/Table";
import { MdDelete, MdEdit } from "react-icons/md";
import PopupModal from "../components/PopUpModal";
import DeletePopUpModal from "../components/DeletePopUpModal";

interface Role {
  value: string;
  label: string;
}

interface Status {
  value: string;
  label: string;
}

interface Team {
  value: string;
  label: string;
}

interface UserData {
  id: string | number;
  name: string;
  mail: string;
  userImg: string;
  role: Role[];
  status: Status[];
  teams: Team[];
}

const Directory = () => {
  const data = useMemo(() => generateFakeUsers(50), []);
  const [selectedRowData, setSelectedRowData] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const colors = [
    {
      light: "#e3f2fd",
      dark: "#2196f3",
    },
    {
      light: "#f3e5f5",
      dark: "#9c27b0",
    },
    {
      light: "#ede7f6",
      dark: "#673ab7",
    },
  ];

  const columns = [
    {
      header: "Name",
      accessorFn: (row: any) => row.name,
      cell: (props: any) => {
        const name = props.getValue();
        const image = props.row.original.userImg; // Assuming the image field is `avatar`
        const username = props.row.original.username; // Access the username

        return (
          <div className="flex items-center">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-8 h-8 rounded-full border mr-2"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center mr-2">
                <span className="text-xs font-bold">
                  {name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
              </div>
            )}
            <div>
              <p className="text-sm font-bold">{name}</p>
              <p className="text-xs text-gray-500">@{username}</p>{" "}
              {/* Display the username */}
            </div>
          </div>
        );
      },
      enableSorting: true,
    },

    {
      header: "Status",
      accessorFn: (row: any) => row.status,
      cell: (props: any) => {
        const status = props.getValue();

        return (
          <div>
            {status === "active" ? (
              <div className="border flex items-center gap-x-2  py-1 justify-center rounded-lg text-xs font-bold">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Active
              </div>
            ) : (
              <div className="border flex items-center gap-x-2 px-1  py-1 justify-center rounded-lg text-xs font-bold">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Inactive
              </div>
            )}
          </div>
        );
      },
      enableSorting: true,
    },

    {
      accessorKey: "role",
      header: "Role",
      cell: (props: any) => <p className="text-sm">{props.getValue()}</p>,
      enableSorting: false,
    },
    {
      accessorKey: "mail",
      header: "Email",
      cell: (props: any) => <p className="text-sm">{props.getValue()}</p>,
      enableSorting: false,
    },
    {
      accessorKey: "teams",
      header: "Teams",
      cell: (props: any) => {
        const teams = props.getValue();
        const maxVisibleTeams = 3;

        return (
          <div>
            {teams
              .slice(0, maxVisibleTeams)
              .map((team: string, index: number) => {
                const color = colors[index % colors.length]; // Cycle through colors
                return (
                  <span
                    key={index}
                    className="p-1 border mr-1 px-2 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: color.light,
                      color: color.dark,
                    }}
                  >
                    {team}
                  </span>
                );
              })}
            {teams.length > maxVisibleTeams && (
              <span className="p-1 border mr-1 rounded-full px-2 text-xs font-medium bg-gray-50 text-gray-700">
                +{teams.length - maxVisibleTeams}
              </span>
            )}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      header: "Actions",
      cell: (props: any) => {
        return (
          <div className="flex gap-x-4">
            <MdDelete
              className="h-4 w-4 text-red-500"
              onClick={(e) => handleDelete(props.row.original, e)}
            />
            <MdEdit
              className="h-4 w-4 text-violet-500"
              onClick={(e) => handleEdit(props.row.original, e)}
            />
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  function handleEdit(rowData: any, e: any) {
    setOpen(true);
    e.stopPropagation();
    console.log("Edit clicked", rowData);
    setSelectedRowData(rowData);
    // Add your edit logic here
  }

  function handleDelete(rowData: any, e: any) {
    setDeleteOpen(true);
    e.stopPropagation();
    console.log("Delete clicked", rowData);
    setSelectedRowData(rowData);
    // Add your delete logic here
  }

  return (
    <div className="border shadow-sm h-full w-full m-4 rounded-lg">
      <Table data={data} columns={columns} />
      <PopupModal
        open={open}
        setOpen={setOpen}
        selectedRowData={selectedRowData}
      />
      <DeletePopUpModal
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedRowData={selectedRowData}
      />
    </div>
  );
};

export default Directory;
