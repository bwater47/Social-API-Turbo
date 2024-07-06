// Import the mongoose module and the Schema object from mongoose and the reaction schema from Reaction.js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const reactionSchema = require("./Reaction");
// Defines the thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        // Format the timestamp using your preferred method
        return timestamp.toLocaleString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
  }
);
// Define a virtual property 'reactionCount' that retrieves the length of the 'reactions' array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// Create the Thought model using the thoughtSchema
const Thought = mongoose.model("Thought", thoughtSchema);
// Export the Thought model
module.exports = Thought;
