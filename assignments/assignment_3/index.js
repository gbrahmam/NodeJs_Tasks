const express = require('express');
const app = express();
const faker = require("faker");
const bodyparser = require("body-parser");

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyparser());       // 


var users = [];
for (let i=0;i<3;i++){
  users.push({
    name: faker.name.findName(),
    email: faker.internet.email()
  })
}


//home page route
app.get('/', (req, res) => {

    // console.log(req.query);
  res.render('index.ejs', {users});
})
// console.log({users})


//form page route
app.get("/form", (req,res) => {
    res.render("form.ejs");
})


//using post method updating our array
app.post("/user/add", (req,res) => {
    // console.log(req.body);

    if (req.body.Name && req.body.Email){

        users.push({
            name: req.body.Name,
            email: req.body.Email
          });
    }

// redirecting back to homepage
    res.redirect("/");
})

//server port
app.listen(3000, () => {
    console.log("app listening on port 3000")
  })