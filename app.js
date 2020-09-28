var express= require('express');
var app= express();
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//MONGO setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})  

var Campground= require("./models/campground");
// var User= require("./models/user");
// var Comment= require("./models/comments");
// Campground.create({
//     name: "Tso Moriri Lake, Ladakh",
//     image: "https://cdn.pixabay.com/photo/2017/06/17/03/17/gongga-snow-mountain-2411069__480.jpg",
//     description: "Tsomoriri Lake is the highest lake in the world and located in Ladakh. Camping here is the experience of a lifetime"
// }, function(err, newlyCreated){
//     if(err){
//         console.log(err);
//     }else{
//          //redirect to campground get page
//         console.log("adaded")
//     }
// })

app.get("/", function(req, res){
   res.render("landing");
})

//INDEX ROUTE- Show all campgrunds
app.get("/campgrounds", function(req, res){
   //Get all dbs from database
   Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: allCampgrounds});
        }
   })
    
})

//CREATE ROUTE - add new campground to db
app.post("/campgrounds", function(req, res){

    // res.send("you hit post route");
    //get data from form and add to database array
    var name= req.body.name;
    var image= req.body.image;
    var desc= req.body.description;
    var newCampground= {name: name, image:image, description: desc};
    //save image to a database

    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
             //redirect to campground get page
            res.redirect("/campgrounds");
        }
    })

   
})

//NEW ROUTE- show form to create
app.get("/campgrounds/new", function(req, res){
    res.render('new.ejs');
})

//SHOW ROUTE- show data for campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    })
    
})

const port = 3000;
app.set("port", process.env.port || port);  // set express to use this port
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port: ${port}`);
  });