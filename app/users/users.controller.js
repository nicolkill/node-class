const mongoose = require('mongoose');

const User = mongoose.model('User');

const get = async (req, res) => {
  const users = await User.find({});

  res.send({
    users,
  });
};

const getOne = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  res.send({
    user,
  });
};

const post = async (req, res) => {
  const data = req.body;

  const user = await User.create(data);

  res.send({
    user,
  });
};

const put = async (req, res) => {
  const data = req.body;

  const id = req.params.id;
  const user = await User.findById(id);

  user.name = data.name;
  user.surname = data.surname;

  res.send({
    user,
  });
};

const del = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  await user.delete();

  res.status(204);
  res.end()
};

module.exports = {
  get,
  getOne,
  post,
  put,
  delete: del,
};
