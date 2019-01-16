var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();

mongoose.connect("mongodb://root:Samsung33@ds157544.mlab.com:57544/mongoose",  { useNewUrlParser: true} , function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Connect Database")
    }
});

var UserSchema = new mongoose.Schema({
    name: String,
    age : Number
});

UserSchema.methods.addLastName = function(lastName){
    this.name = this.name + " " + lastName;
    return this.name;
};

// Membuat Model
var User = mongoose.model("User", UserSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Halaman index root
// app.get("/", function(req, res, next) {
//     res.json("Selamat datang di Halaman Beranda")
// });



// Menampilkan Database Spesifik
// app.get("/", function(req, res, next){
//     User.find({name: "Budi"}, function(err, foundUser){
//         if (foundUser){
//             res.json(foundUser);
//         } else {
//             res.json("User tidak ada")
//         }
//     });
// });

// Menampilkan Database Keseluruhan
// app.get("/", function(req, res, next){
//     User.find({}, function(err, foundUser){
//         if (foundUser){
//             res.json(foundUser);
//         } else {
//             res.json("User tidak ada")
//         }
//     });
// });

// Menampilkan Database Dynamic
// app.get("/:name", function(req, res, next){
//     User.find({ name: req.params.name }, function(err, foundUser){
//         if (foundUser){
//             res.json(foundUser);
//         } else {
//             res.json("User tidak ada")
//         }
//     });
// });

// Menampikan database Dynamic dengan Pesan Eror
// app.get("/:name", function(req, res, next){
//     User.findOne({ name: req.params.name }, function(err, foundUser){
//         if (foundUser){
//             res.json(foundUser);
//         } else {
//             res.json("User tidak ada")
//         }
//     });
// });

// Menampilkan database dengan Id
// app.get("/:id", function(req, res, next){
//     User.findOne({ _id: req.params.id}, function(err, foundUser){
//         if (foundUser){
//             res.json(foundUser);
//         } else {
//             res.json("User tidak ada")
//         }
//     });
// });

app.get("/:id", function(req, res, next){
    User.findById({ _id: req.params.id}, function(err, foundUser){
       foundUser.addLastName("Saputra");
       foundUser.save(function(err){
           res.json(foundUser)
       });
    });
});

// Membuat New User 
// app.get("/create-user", function(req, res, next){
//     var user = new User();
//     user.name = "Brandon";
//     user.age = 17 ; 
//     user.save(function(err){
//         if (err) next(err)
//         res.json(user);
//     });
// });

app.post("/create-user", function(req, res, next){
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save(function(err){
        if (err) console.log(err);
        res.json(user);
    });
});

app.post("/create-user", function(req, res, next){
    var user = new User();
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