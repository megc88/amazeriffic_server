var ToDo = require("../models/todo.js"),
    ToDosController = {};

ToDosController.index = function (req, res) {
   ToDo.find({}, function (err, toDos) {
      res.json(toDos);
   });
};

ToDosController.show = function(req, res) {
   var id = req.params.id;

   ToDo.find({"_id":id}, function (err, todo) {
      if (err!== null) {
         res.json(500, err);
      } else {
         if (todo.length > 0) {
            res.json(200, todo[0]);
         } else {
            res.send(404);
         }
      }
   });
};

    

ToDosController.create = function (req, res) {
   var newToDo = new ToDo({"description":req.body.description, 
                           "tags":req.body.tags});
   newToDo.save(function (err, result) {
      console.log(result);
      if (err !== null) {
        console.log(err);
	res.json(500, err);
      } else {
        res.json(200, result);
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
