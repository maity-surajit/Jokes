const User = require("../models/user.js");

async function handleGetAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.status(200).json(allDBUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ Message: "User not found" });
  return res.status(200).json(user);
}

async function handleUpdateUserById(req, res) {
  const updateUser = await User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    jobTitle: req.body.job_title,
  });

  return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
  await User.findOneAndDelete(req.params.id);
  return res.json({ status: "success" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ Message: "All fields are required..." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("Result", result);

  return res.status(201).json({ msg: "Success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
