const { User } = require("../models");

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find()
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

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

      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

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

      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

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

      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
