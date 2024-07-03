const { Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find()
        .select("-__v")
        .sort({ createdAt: -1 });
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Get a single thought by its _id
  async getThoughtById({ params }, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: params.id }).select(
        "-__v"
      );
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Create a new thought
  async createThought({ body }, res) {
    try {
      const thoughtData = await Thought.create(body);
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  // Update a thought by its _id
  async updateThought({ params, body }, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
