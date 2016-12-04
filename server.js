var express = require("express"),
    http = require("http"),
    app = express(),
    toDos = [
     {  
      "description" : "Get groceries",
       "tags" : [ "shopping", "chores" ]
     },
     {
       "description" : "Make up some new Todos",
       "tags" : [ "writing", "work" ]
     },
     {
       "description" : "Prep for Monday's class",
       "tags" : [ "work", "teaching" ]
     },
     {
       "description" : "Answer emails",
       "tags" : [ "work" ]
     },
     {
       "description" : "Take Gracie to the park",
       "tags" : [ "chores", "pets" ]
     },
     {
       "description" : "Finish writing this book",
       "tags" : ["writing", "work" ]
     }
   ]

app.use(express.static(__dirname + "/client"));

app.use(express.urlencoded());

http.createServer(app).listen(3000);

app.get("/todos.json", function(req, res) {
   res.json(toDos);
});

app.post("/todos", function (req, res) {
   var newToDo = req.body;
   console.log(newToDo);
   toDos.push(newToDo);

   res.json({"message":"You posted to the server!"});
});


