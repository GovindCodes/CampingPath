var express= require('express');
var app= express();
var bodyParser= require('body-parser');
const mongoose = require('mongoose');
var seedDB= require("./seed");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//MONGO setup
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})  
seedDB();

var Campground= require("./models/campground");
// var User= require("./models/user");
var Comment= require("./models/comment");

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render('campgrounds/new.ejs');
})

//SHOW ROUTE- show data for campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
    
})

///////////////////////////////////////////////////////////
/*******************Comments routes***********************/

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find the campground
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
    
})

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("campgrounds");
        }else{
             //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                     //connect comment to id
                     campground.comments.push(comment);
                     campground.save();
                     res.redirect("/campgrounds/"+req.params.id);
                }
            })
        }
    })
})

const port = 3000;
app.set("port", process.env.port || port);  // set express to use this port
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port: ${port}`);
  });