var express= require('express');
var app= express();
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campground= [
    {name:"Himalaya", image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1918&q=80"},
    {name:"Dawki", image:"https://images.unsplash.com/photo-1526011881888-8dba3f788ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {name:"Cherapunjii", image:"https://images.unsplash.com/photo-1533632359083-0185df1be85d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"}
]

app.get("/", function(req, res){
   res.render("landing");
})

app.get("/campgrounds", function(req, res){
   
    res.render("campground", {campgrounds: campground});
})

app.post("/campgrounds", function(req, res){

    // res.send("you hit post route");
    //get data from form and add to database array
    var name= req.body.name;
    var image= req.body.image;
    var newCampground= {name: name, image:image};
    campground.push(newCampground);

    //redirect to campground get page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
    res.render('new.ejs');
})

const port = 3000;
app.set("port", process.env.port || port);  // set express to use this port
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port: ${port}`);
  });