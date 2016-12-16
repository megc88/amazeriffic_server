var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express(),
    port = process.env.PORT || 3000,
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

var ToDoSchema = mongoose.Schema({
   description: String,
   tags: [String]

});

var ToDo = mongoose.model("ToDo", ToDoSchema);

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
      if (err !== null) {
         console.log(err);
         res.send("ERROR");
      } else {
         ToDo.find({}, function (err, result) {
            if (err !== null) {
               res.send("ERROR");   
            }
         res.json(result);
         });
     }
   });
});
 

