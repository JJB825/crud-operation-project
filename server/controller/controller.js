const usermodel = require('../model/model');
const usercollection = require('../model/loginSchema');
const bcrypt = require('bcrypt');

// add new user details during signup
exports.signup = async (req, res) => {
  // validate request
  if (!req.body) {
    // return a error message if the user sends empty content in finding user
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }

  // retrieve data from form
  const new_user = usercollection({
    name: req.body.name,
    password: req.body.password,
  });

  // check if user already exists
  const existingUser = await usercollection.findOne({ name: new_user.name });

  if (existingUser) {
    res
      .status(401)
      .send({ message: 'User already exists. Please try using other name' });
  } else {
    // hashing password using bcrypt for preventing hacking
    const saltrounds = 10; // Number of salt rounds for bcrypt
    // convert the password into hash form and save in hashpassword
    const hashpassword = await bcrypt.hash(new_user.password, saltrounds);
    new_user.password = hashpassword;

    // save user in the database
    new_user
      .save(new_user)
      .then((data) => {
        res.redirect('/'); // check this
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while signup',
        });
      });
  }
};

exports.login = async (req, res) => {
  // validate request
  if (!req.body) {
    // return an error message if the user sends empty content in finding user
    res.status(400).send({ message: 'Enter your credentials!' });
    return;
  }

  try {
    // check whether user is registered or not
    const check = await usercollection.findOne({ name: req.body.name });
    if (!check) {
      res
        .status(403)
        .send({ message: `You haven't registered. Register first` });
      return; // Add this return statement
    }

    // compare the hashed password from the database with the plain text
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render('index');
    } else {
      res.status(401).send({ message: `Incorrect Password` });
    }
  } catch {
    res.status(500).send({ message: `Enter valid credentials` });
  }
};

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
