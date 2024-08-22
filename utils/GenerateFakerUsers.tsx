import { faker } from "@faker-js/faker";

// Define an array of 7 default teams
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

// Counter to track the current role index
let roleCounter = 0;

const generateFakeUser = () => {
  // Assign a role from the defaultRoles array using the counter
  const role = defaultRoles[roleCounter];

  // Increment the role counter
  roleCounter = (roleCounter + 1) % defaultRoles.length;

  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    status: faker.helpers.arrayElement(statuses), // Randomly assigns either 'active' or 'inactive'
    role: role, // Assign the default role
    mail: faker.internet.email(),
    teams: faker.helpers.arrayElements(
      defaultTeams,
      faker.datatype.number({ min: 1, max: defaultTeams.length })
    ), // Randomly assigns multiple teams
    gender: faker.name.sex(),
    dob: faker.date
      .birthdate({ min: 18, max: 65, mode: "age" })
      .toISOString()
      .split("T")[0],
    nationality: faker.address.country(),
    phone: faker.phone.number(),
    userImg: faker.image.avatar(),
  };
};

export const generateFakeUsers = (length: number) => {
  const users = Array.from({ length }, () => generateFakeUser());
  return users;
};
