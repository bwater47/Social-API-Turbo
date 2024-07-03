const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomName,
  getRandomThoughts,
  getRandomReactions,
} = require("./data");

connection.on("error", (err) => err);

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

    thought.reactions = reactions;
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

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
