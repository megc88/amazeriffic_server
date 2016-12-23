var ToDo = require("../models/todo.js").ToDo,
    User = require("../models/user.js").User,
    ToDosController = {},
    mongoose = require("mongoose");
    
ToDosController.index = function (req, res) {
   var username = req.params.username || null,
      respondWithToDos;

   respondWithToDos = function(query) {
      ToDo.find(query, function (err, toDos) {
         if (err !== null) {
	    console.log("number 1");
	    res.json(500, err);
	 } else {
	    res.json(200,toDos);
	 }
      });
   };

      if (username !== null) {  
         User.find({"username": username}, function (err, result) { 
         console.log(username);
         if (err !== null) {
	    res.json(500, err);
	    console.log("number 2");
	 } else if (result.length === 0) {
	    console.log("a");
	    res.send(404);
	 } else {
	    respondWithToDos({ "owner" : result[0] });
	 }
      });

   } else {
      respondWithToDos({});
      console.log("yup index");
   }
};




ToDosController.show = function(req, res) {
  var id = req.params.id;

   ToDo.find({"_id":id}, function (err, todo) {
      if (err!== null) {
         console.log("number 3");
         res.json(500, err);
      } else {
         if (todo.length > 0) {
            res.json(200, todo[0]);
         } else {
	    console.log("b");
            res.send(404);
        }
      }
   });
};

    

ToDosController.create = function (req, res) {
   console.log("create");
   var username = req.params.username || null,
       newToDo = new ToDo({"description":req.body.description, 
                           "tags":req.body.tags});
   User.find({"username": username}, function (err, result) {
      if (err) {
         res.send(500);
	 console.log("number 4");
      } else { 
         if (result.length === 0) {
            newToDo.owner = null;
         } else {
            newToDo.owner = result[0]._id;
         }
         newToDo.save(function (err, result) {
            console.log(result);
            if (err !== null) {
              console.log(err);
	      res.json(500, err);
            } else {
              res.json(200, result);
            }   
        });
     }
   });
};

ToDosController.update = function (req, res) {
   console.log("update action called");
   res.send(200);
};

ToDosController.destroy = function (req, res) {
   console.log("delete action called");
   res.send(200);
};

module.exports = ToDosController;
