var express = require("express"),
    http = require("http"),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    ToDosController = require("./controllers/todos_controller.js"),
    services,
    mongoUrl;
    
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());

if (process.env.VCAP_SERVICES) {
   mongoUrl = "mongodb://CloudFoundry_jkums0ap_gmp0331h_l6q1rnju:7Uqo06lqf6jzjUjCpCHAbXJNbof1IOzr@ds051833.mlab.com:51833/CloudFoundry_jkums0ap_gmp0331h"; 

} else {
   mongoUrl = "mongodb://localhost/amazeriffic";
}

mongoose.connect(mongoUrl);


http.createServer(app).listen(port);

app.get("/todos/:id", ToDosController.show);

app.get("/todos.json", ToDosController.index);

app.post("/todos", ToDosController.create); 

