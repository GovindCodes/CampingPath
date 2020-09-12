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
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));



//Schema setup
const Schema = mongoose.Schema
const campgroundSchema = new Schema({
name : String,
image: String
});

const Campground = mongoose.model('Campground',campgroundSchema);

app.get("/", function(req, res){
   res.render("landing");
})

app.get("/campgrounds", function(req, res){
   //Get all dbs from database
   Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campground", {campgrounds: allCampgrounds});
        }
   })
    
})

app.post("/campgrounds", function(req, res){

    // res.send("you hit post route");
    //get data from form and add to database array
    var name= req.body.name;
    var image= req.body.image;
    var newCampground= {name: name, image:image};
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

app.get("/campgrounds/new", function(req, res){
    res.render('new.ejs');
})

const port = 3000;
app.set("port", process.env.port || port);  // set express to use this port
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port: ${port}`);
  });