import mongoose from "mongoose";
import dotenv from "dotenv";

import userModel from "./models/userModel.js";
import reviewModel from "./models/reviewModel.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const PRODUCT_ID = "6a47fb5d322ae345ce87a05e";

const firstNames = [
  "John",
  "Ali",
  "Ahmed",
  "James",
  "Emma",
  "Sophia",
  "Noah",
  "Liam",
  "William",
  "Olivia",
  "Ava",
  "Lucas",
  "Mason",
  "Isabella",
  "Ethan",
  "Harper",
  "Daniel",
  "Henry",
  "Charlotte",
  "Amelia",
];

const lastNames = [
  "Smith",
  "Khan",
  "Johnson",
  "Brown",
  "Williams",
  "Davis",
  "Wilson",
  "Taylor",
  "Anderson",
  "Thomas",
];

const comments = [
  "Amazing quality. Highly recommended!",
  "Very comfortable and fits perfectly.",
  "Love the material.",
  "Worth every penny.",
  "Looks exactly like the pictures.",
  "Excellent stitching.",
  "Premium quality product.",
  "Fast delivery and great packaging.",
  "Would definitely buy again.",
  "One of my favorite purchases.",
  "Really soft fabric.",
  "Perfect for everyday use.",
  "Exceeded my expectations.",
  "Very stylish.",
  "Great value for money.",
  "The color is beautiful.",
  "Highly satisfied.",
  "Five stars from me.",
  "Exactly what I wanted.",
  "Fantastic experience."
];

// =====================

const users = [];

for (let i = 1; i <= 50; i++) {
  const first =
    firstNames[Math.floor(Math.random() * firstNames.length)];

  const last =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  users.push({
    name: `${first} ${last}`,
    email: `dummy${i}@mail.com`,
    password: "123456789", // Doesn't matter for testing
    cartData: {},
  });
}

console.log("Creating users...");

const insertedUsers = await userModel.insertMany(users);

console.log(`${insertedUsers.length} users created.`);

const reviews = insertedUsers.map((user, index) => ({
  product: PRODUCT_ID,
  user: user._id,

  rating:
    Math.random() < 0.05
      ? 2
      : Math.random() < 0.15
      ? 3
      : Math.random() < 0.45
      ? 4
      : 5,

  comment:
    comments[Math.floor(Math.random() * comments.length)],
}));

console.log("Creating reviews...");

await reviewModel.insertMany(reviews);

console.log("Done!");

console.log("Created:");
console.log("50 Users");
console.log("50 Reviews");

process.exit();