import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Apple",
  },
  {
    _id: uuid(),
    categoryName: "Samsung",
  },
  {
    _id: uuid(),
    categoryName: "One Plus",
  },
  {
    _id: uuid(),
    categoryName: "Realme",
  }
];
