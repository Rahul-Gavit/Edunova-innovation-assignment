import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import Modal from "@mui/material/Modal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 580,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

const defaultTeams = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Design",
  "Product",
  "Support",
];

const defaultRoles = [
  "Human Resource Executive",
  "Product Engineer",
  "Sales Manager",
  "UI Designer",
  "Product Manager",
  "Support Executive",
  "Marketing Specialist",
];

const statuses = ["active", "inactive"];

interface PopupModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRowData: {
    name: string;
    mail: string;
    userImg: string;
    role: { value: string; label: string }[];
    status: { value: string; label: string }[];
    teams: { value: string; label: string }[];
  };
}

interface IFormInput {
  name: string;
  mail: string;
  userImg: string;
  status: { value: string; label: string }[];
  roles: { value: string; label: string }[];
  teams: { value: string; label: string }[];
}

const PopupModal: React.FC<PopupModalProps> = ({
  open,
  setOpen,
  selectedRowData,
}) => {
  const handleClose = () => setOpen(false);

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue, // Use this to manually set values
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      mail: "",
      userImg: "",
      roles: [],
      status: [],
      teams: [],
    },
  });

  useEffect(() => {
    // Update form values when selectedRowData changes
    setValue("name", selectedRowData.name);
    setValue("mail", selectedRowData.mail);
    setValue("userImg", selectedRowData.userImg);
    setValue("roles", selectedRowData.role);
    setValue("status", selectedRowData.status);
    setValue("teams", selectedRowData.teams);
  }, [selectedRowData, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight={600}
        >
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center">
            <input
              id="userImg"
              type="image"
              width="100"
              height="100"
              alt="Login"
              src={selectedRowData.userImg}
              className="border rounded-full border-gray-300 outline-none"
              {...register("userImg", { required: true })}
            />
            <div className="flex gap-x-2 my-4">
              <button
                type="button"
                className="border flex items-center gap-x-2 px-4 rounded-sm bg-gray-50 py-1 font-medium border-gray-300"
              >
                <FaArrowRotateLeft className="h-4 w-4 text-gray-500" />
                Change Photo
              </button>
              <button
                type="button"
                className="border flex items-center gap-x-2 px-4 rounded-sm bg-gray-50 py-1 font-medium border-gray-300"
              >
                <RiDeleteBinLine className="h-4 w-4 text-gray-500" />
                Remove Photo
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-x-8">
            <div className="flex flex-col w-full space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                className="border rounded-sm border-gray-300 p-1.5 border-b-black outline-none"
                {...register("name", { required: true, maxLength: 20 })}
              />
              {errors.name?.type === "required" && (
                <p role="alert">First name is required</p>
              )}
            </div>

            <div className="flex flex-col w-full space-y-1.5">
              <label
                htmlFor="mail"
                className="text-xs font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                {...register("mail", { required: "Email Address is required" })}
                className="border rounded-sm border-gray-300 p-1.5 border-b-black outline-none"
                aria-invalid={errors.mail ? "true" : "false"}
              />
              {errors.mail && <p role="alert">{errors.mail.message}</p>}
            </div>
          </div>
          <div className="flex justify-between gap-x-8 my-6">
            <div className="w-full space-y-1.5">
              <label
                htmlFor="roles"
                className="text-xs font-semibold text-gray-800"
              >
                Role
              </label>
              <Controller
                name="roles"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={defaultRoles.map((role) => ({
                      value: role,
                      label: role,
                    }))}
                  />
                )}
              />
            </div>
            <div className="w-full space-y-1.5">
              <label
                htmlFor="status"
                className="text-xs font-semibold text-gray-800"
              >
                Status
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={statuses.map((status) => ({
                      value: status,
                      label: status.charAt(0).toUpperCase() + status.slice(1),
                    }))}
                  />
                )}
              />
            </div>
          </div>

          <div className="w-full my-6 space-y-1.5">
            <label
              htmlFor="teams"
              className="text-xs font-semibold text-gray-800"
            >
              Teams
            </label>
            <Controller
              name="teams"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={defaultTeams.map((team) => ({
                    value: team,
                    label: team,
                  }))}
                />
              )}
            />
          </div>

          <div className="flex justify-end gap-x-2 mt-8">
            <button
              type="button"
              onClick={handleClose}
              className="border px-4 rounded-sm bg-gray-50 py-1 font-medium border-gray-300"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="border px-4 rounded-sm text-gray-300 bg-gray-50 py-1 font-medium border-gray-300"
            >
              SAVE
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default PopupModal;
