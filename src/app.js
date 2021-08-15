const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");
const Register = require("./models/registers");
const Newteam = require("./models/newteams");
const { json } = require("express");
const { serialize } = require("v8");

const port = process.env.PORT || 4004;

const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/", (req, res) => {
  res.send("Hello! from Rohit Razdan");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/guidelines", (req, res) => {
  res.render("guidelines");
});

app.post("/login", async (req, res) => {
  try {
const salt = await bcrypt.genSalt()
const hashedPassword = await bcrypt.hash(req.body.password,salt);
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if(password === cpassword){

      const registerStudent = new Register({
        name: req.body.name,
        instituteid: req.body.instituteid,
        email: req.body.email,
        password: hashedPassword,
        confirmpassword: hashedPassword
      })

const registered =  await registerStudent.save();
res.status(201).render("login",{
  status: "Registration Successful ! Login To Continue",
});

    }else{
      res.send("passwords are not matching");
    }

  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

//login setup
app.post("/dashboard",async(req,res)=>{
  try {
    const instituteid = req.body.instituteid;
    const password = req.body.password;

    const userid = await Register.findOne({instituteid:instituteid});
    const isMatch = await bcrypt.compare(password,userid.password);
    var Username = userid.name;
    var Userid  = userid.instituteid;
    var Usermail = userid.email;
    
    if(isMatch){
      res.status(400).render('dashboard',{
        Username: Username,
        Userid: Userid,
        Usermail :Usermail

      });
    }else{
      res.send("Invalid login Credentials!");
    }
    
  } catch (error) {
    res.status(400).send('invalid institute id');
    
  }
})

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});


app.get("/contactus",(req,res)=>{
  res.render("contactus");
})

app.listen(port, () => {
  console.log(`server is running at port number ${port}`);
});
