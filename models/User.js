// Require the mongoose module and the Schema object from mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose;
// Defines the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
// Define a virtual property 'friendCount' that retrieves the length of the 'friends' array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// Create the User model
const User = mongoose.model("User", userSchema);
// Export the User model
module.exports = User;
