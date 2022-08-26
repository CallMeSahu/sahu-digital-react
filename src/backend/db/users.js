import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import bcyrpt from "bcryptjs";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Siddhartha",
    lastName: "Sahu",
    email: "siddhartha.sahu999@gmail.com",
    password: "siddhartha",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Test",
    lastName: "Admin",
    email: "test@gmail.com",
    password: "admin",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Vidhu",
    lastName: "Gupta",
    email: "vidhugupta2001@gmail.com",
    password: "vidhu",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
