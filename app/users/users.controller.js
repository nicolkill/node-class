function get(req, res) {
  User.find({}, function (err, users) {
    if (err) {
      console.log(err);
      res.send('Hubo un error');
    } else {
      res.send(users);
    }
  });
}

module.exports = {
  get,
};
