var express = require("express"),
    http = require("http"),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    ToDo = require("./models/todo.js"),
    services,
    mongoUrl;
    
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());

if (process.env.VCAP_SERVICES) {
   mongoUrl = "mongodb://CloudFoundry_jkums0ap_gmp0331h_l6q1rnju:7Uqo06lqf6jzjUjCpCHAbXJNbof1IOzr@ds051833.mlab.com:51833/CloudFoundry_jkums0ap_gmp0331h" 

} else {
   mongoUrl = "mongodb://localhost/amazeriffic";
}

mongoose.connect(mongoUrl);


http.createServer(app).listen(port);

app.get("/todos.json", function(req, res) {
   ToDo.find({}, function (err, toDos) {
      res.json(toDos);
      });
   });

app.post("/todos", function (req, res) {
   console.log(req.body);
   var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});

   newToDo.save(function (err, result) {
      console.log(result);
      if (err !== null) {
         console.log(err);
         res.json(err);
      } else {
         res.json(result);
     }
   });
});
 

