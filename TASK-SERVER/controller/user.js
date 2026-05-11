import { user } from "../models/user.js";

//  GET USER BY ID

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await user.findById(id);

    res.status(200).json(user);
  } catch (error) {
    error;
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET ALL USERS

export const getUsers = async (req, res) => {
  try {
    const user = await user.find();
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};
