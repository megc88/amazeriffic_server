var User = require("../models/user.js");
    mongoose = require("mongoose");

User.find({}, function (err, result) {
   if (err !== null) {
      console.log("something wrong");
      console.log(err);
   } else if (result.length ===0) {
      console.log("Creating Example User..");
      var exampleUser = new User({"username":"semmy"});
      exampleUser.save(function (err, result) {
        if (err) {
           console.log(err);
        } else {
           console.log("Saved Exmaple User");
        }
      });
   }
});


var UsersController = {};

UsersController.index = function (req, res) {
   console.log("index action called");
   res.send(200);
};

UsersController.show = function (req, res) {
   console.log("show action called");
   User.find({"username":req.params.username}, function (err, result) {
      if (err) {
	 console.log(err);
         res.send(500);
      } else if (result.length !== 0) {
         res.sendfile("./client/index.html");
      } else {
         res.send(404);
      }
   });
};

UsersController.create = function (req, res) {
   console.log("create funciton called");
   res.send(200);
};

UsersController.update = function (req, res) {
   console.log("update function called");
   res.send(200);
};

UsersController.destroy = function (req, res) {
   console.log("destroy function called");
   res.send(200);
};

module.exports = UsersController;
