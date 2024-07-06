// Import the mongoose module and the Schema object from mongoose with Types to define the Reaction schema
const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
// Defines the Reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toISOString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Export the Reaction schema
module.exports = reactionSchema;
