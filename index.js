const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [

    {
        id: uuidv4(),
        username: "rawRuchi",
        content: "I am learning backend, what about you?"
    },

    {
        id: uuidv4(),
        username: "vianSharma",
        content: "Hardwork, consistency, discipline is important to achieve success."
    },

    {
        id: uuidv4(),
        username: "rahulMishra",
        content: "I got my first internship!Hurray!"
    }

];
// ROOT ROUTE
app.get("/", (req, res) => {
    res.send("server working well");

});
// ----------------------------->
// TO VIEW ALL THE POSTS
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });

});
// ------------------------------->
// TO CREATE A NEW POST
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");

});
// ------------------------------->
// TO ADD THE NEW POST
app.post("/posts", (req, res) => {

    let { username, content } = req.body;
    // creating id for new posts
    let id = uuidv4();
    posts.push({ id,username, content });
    res.redirect("/posts");

});
// ---------------------------------->
// SHOW ROUTE->INDIVIDUAL POST
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    // to find the post
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs",{ post });
    
});
// --------------------------------->
// UPDATE ROUTE -> PATCH REQUEST
app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    // to find the post
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");

    // console.log(post);
    // res.send("patch request working");
    
});

// -------------------------------->
// EDIT ROUTE
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    
    // to find the post
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{ post });

});
// -------------------------------->
// Destroy route
app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    // filter method
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts",);

});

app.listen(port, () => {
    console.log("listening to port 8080");
});
