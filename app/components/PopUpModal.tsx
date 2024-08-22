import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import Modal from "@mui/material/Modal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

const style = {
  position: "absolute",
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

// Define possible statuses
const statuses = ["active", "inactive"];

interface IFormInput {
  name: string;
  lastName: string;
  age: number;
  mail: string;
  userImg: string;
  status: { value: string; label: string }[];
  roles: { value: string; label: string }[];
  teams: { value: string; label: string }[];
}

const PopupModal = ({ open, setOpen, selectedRowData }) => {
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    name: selectedRowData.name || "",
    email: selectedRowData.mail || "",
    userImg: selectedRowData.userImg || "",
    role: selectedRowData.role || [],
    status: selectedRowData.status || [],
    teams: selectedRowData.teams || [],
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  useEffect(() => {
    setFormData({
      name: selectedRowData.name || "",
      email: selectedRowData.mail || "",
      userImg: selectedRowData.userImg || "",
      role: selectedRowData.role || [],
      status: selectedRowData.status || [],
      teams: selectedRowData.teams || [],
    });
  }, [selectedRowData]);

  const inputChangeHandle = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
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
            <div className=" flex flex-col justify-center items-center">
              <input
                id="userImg"
                type="image"
                width="100"
                height="100"
                alt="Login"
                src={formData.userImg}
                className="border rounded-full border-gray-300 outline-none"
                {...register("userImg", { required: true, maxLength: 20 })}
              />
              <div className="flex gap-x-2 my-4">
                <button className="border flex items-center gap-x-2 px-4 rounded-sm bg-gray-50 py-1 font-medium border-gray-300">
                  <FaArrowRotateLeft className="h-4 w-4 text-gray-500" />
                  Change Photo
                </button>
                <button className="border flex items-center gap-x-2 px-4 rounded-sm bg-gray-50 py-1 font-medium border-gray-300">
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
                  name="name"
                  value={formData.name}
                  onChange={inputChangeHandle}
                  {...register("name", { required: true, maxLength: 20 })}
                />
                {errors.name?.type === "required" && (
                  <p role="alert">First name is required</p>
                )}
              </div>

              <div className="flex flex-col w-full space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-gray-800"
                >
                  Email
                </label>

                <input
                  name="email"
                  value={formData.email}
                  onChange={inputChangeHandle}
                  className="border rounded-sm border-gray-300 p-1.5 border-b-black outline-none"
                  {...register("mail", {
                    required: "Email Address is required",
                  })}
                  aria-invalid={errors.mail ? "true" : "false"}
                />
                {errors.mail && <p role="alert">{errors.mail.message}</p>}
              </div>
            </div>
            <div className="flex justify-between gap-x-8 my-6">
              <div className="w-full space-y-1.5">
                <label
                  htmlFor="role"
                  className="text-xs font-semibold text-gray-800"
                >
                  Role
                </label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={formData.role} // Set the default value for role
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
                      defaultValue={formData.status} // Set the default value for status
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
                    defaultValue={formData.teams} // Set the default value for teams
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
                onClick={() => setOpen(false)}
                className="border px-4 rounded-sm bg-gray-50 py-1 font-medium border-gray-300"
              >
                CANCEL
              </button>
              <button className="border px-4 rounded-sm text-gray-300 bg-gray-50 py-1 font-medium border-gray-300">
                SAVE
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PopupModal;
