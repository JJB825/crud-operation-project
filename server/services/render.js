// importing axios for requests
const axios = require('axios');

exports.loginRoute = (req, res) => {
  res.render('login');
};

exports.signUpRoute = (req, res) => {
  res.render('signup');
};

exports.homeRoute = (req, res) => {
  // make a get request to /api/users
  axios
    .get('http://localhost:3000/api/users')
    .then(function (response) {
      res.render('index', { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render('add-user');
};

exports.update_user = (req, res) => {
  // to get the initial data in the form of update user to make changes in it
  // here we are passing params of id because we want to get information about specific user
  axios
    .get('http://localhost:3000/api/users', { params: { id: req.query.id } })
    .then(function (response) {
      res.render('update-user', { user: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
