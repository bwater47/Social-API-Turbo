// Require the User model
const { User, Thought } = require("../models");
// Exports all the functions as methods to be used in the users routes
module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find()
        .select("-__v")
        .populate("thoughts")
        .populate("friends");
      // Send the user data and catch any errors
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Get a single user by its _id and populated thought and friend data
  async getUserById({ params }, res) {
    try {
      const userData = await User.findOne({ _id: params.id })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");
      // If no user is found, send 404
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      // Send the user data and catch any errors
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser({ body }, res) {
    try {
      const userData = await User.create(body);
      // Send the user data and catch any errors
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  // Update a user by its _id
  async updateUser({ params, body }, res) {
    try {
      const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });
      // If no user is found, send 404
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      // Send the user data and catch any errors
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  // Delete user by its _id
  async deleteUser({ params }, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: params.id });
      // If no user is found, send 404
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      // Remove user's associated thoughts
      await Thought.deleteMany({ username: userData.username });
      // Remove the user from any friends arrays
      await User.updateMany(
        { friends: params.id },
        { $pull: { friends: params.id } }
      );
      // Send the user data and catch any errors
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Add a new friend to a user's friend list
  async addFriend({ params }, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true }
      );
      // If no user is found, send 404
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      // Send the user data and catch any errors
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Remove a friend from a user's friend list
  async deleteFriend({ params }, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      // If no user is found, send 404
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      // Send the user data and catch any errors
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
