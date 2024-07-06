// Use connection from the configuration folder to connect to the database
const connection = require("../config/connection");
// Require the necessary models
const { User, Thought } = require("../models");
// Require the functions from the data to seed the database
const {
  getRandomName,
  getRandomThoughts,
  getRandomReactions,
} = require("./data");
// Connect to the database
connection.on("error", (err) => err);
// Once the connection is open, seed the database and log that the connection is connected to the server
connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  await User.deleteMany({});
  await Thought.deleteMany({});
  // Create an array to hold the users
  const users = [];
  // Loop to create 20 random users
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = `${username.split(" ").join(".")}@example.com`;
    // Add the user to the users array
    users.push({
      username,
      email,
    });
  }
  // Insert users into the database
  const createdUsers = await User.insertMany(users);
  // Create an array to hold the thoughts
  const thoughts = [];
  // Loop to create random thoughts and reactions
  for (let i = 0; i < 20; i++) {
    const thought = getRandomThoughts(1)[0];
    const reactions = getRandomReactions(5); // Each thought has 5 reactions
    // Add the reactions to the thought
    thought.reactions = reactions;
    // Add the thought to the thoughts array
    thoughts.push(thought);
  }
  // Insert thoughts into the database
  const createdThoughts = await Thought.insertMany(thoughts);
  // Update users with their thoughts
  for (let user of createdUsers) {
    const userThoughts = createdThoughts.filter(
      (thought) => thought.username === user.username
    );
    user.thoughts = userThoughts.map((thought) => thought._id);
    await user.save();
  }
  // Log the users
  console.table(users);
  // Log the information about the seeding process and exit the process
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
