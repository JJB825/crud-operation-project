const usermodel = require('../model/model');

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    // return a error message if the user sends empty content in finding user
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }

  // create new instance of your user model
  const user = usermodel({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      res.redirect('/add-user');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating new user',
      });
    });
};

// retrieve and return all users/single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    usermodel
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `User not found with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating new user',
        });
      });
  } else {
    usermodel
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occured while fetching user information',
        });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Data to update cannot be empty' });
  }

  // this is url parameter
  const id = req.params.id;
  usermodel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true }) // Add { new: true } to return the updated document
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update user with id ${id}. Maybe id is wrong`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred in updating user information',
      });
    });
};

// delete a user with specified user id
exports.delete = (req, res) => {
  const id = req.params.id;

  usermodel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete data of id ${id}. Maybe id is wrong.`,
        });
      } else {
        res.send({ message: 'User was deleted successfully!' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while deleting user information.',
      });
    });
};
