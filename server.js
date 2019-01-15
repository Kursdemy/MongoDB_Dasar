var express = require("express");
var mongoose = require("mongoose");

var app = express();

mongoose.connect("mongodb://root:Samsung33@ds157544.mlab.com:57544/mongoose",  { useNewUrlParser: true} , function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Connect Database")
    }
});



app.get("/", function(req, res, next) {
    res.json("Selamat datang di Halaman Beranda")
});

var UserSchema = new mongoose.Schema({
    name: String,
    age : Number
});

var User = mongoose.model("User", UserSchema);

// Membuat New User 

app.get("/create-user", function(req, res, next){
    var user = new User();
    user.name = "Brandon";
    user.age = 17 ; 
    user.save(function(err){
        if (err) next(err)
        res.json(user);
    });
});

// app.get("/:name", function(req, res, next) {
//     res.json(req.params.name)
// });


// Connection Server
app.listen(3000, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Server sukses di port 3000")
    }
});