var express= require('express');
var app= express();
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campground= [
    {name:"Himalaya", image:"https://cdn.pixabay.com/photo/2015/11/07/11/26/campfire-1031141__480.jpg"},
    {name:"Dawki", image:"https://images.unsplash.com/photo-1526011881888-8dba3f788ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {name:"Cherapunjii", image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__480.jpg"},
    {name:"Himalaya", image:"https://cdn.pixabay.com/photo/2015/11/07/11/26/campfire-1031141__480.jpg"},
    {name:"Dawki", image:"https://images.unsplash.com/photo-1526011881888-8dba3f788ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {name:"Cherapunjii", image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__480.jpg"},
     {name:"Himalaya", image:"https://cdn.pixabay.com/photo/2015/11/07/11/26/campfire-1031141__480.jpg"},
    {name:"Dawki", image:"https://images.unsplash.com/photo-1526011881888-8dba3f788ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
    {name:"Cherapunjii", image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__480.jpg"}
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