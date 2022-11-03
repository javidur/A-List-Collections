const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require("ejs")
const router = express.Router()

const mongoose = require('mongoose')

const passport = require('passport')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const passportLocalMongoose = require('passport-local-mongoose');

const LocalStrategy = require('passport-local').Strategy;

const Schema = mongoose.Schema

//importing db models 
const Card = require('../models/Card');

const app = express()

app.use(express.json());

app.use(express.static("public"))
app.use('/public', express.static(__dirname + '../public/style.css'))
console.log(__dirname)
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}))



const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.use(passport.initialize())
app.use(passport.session())

//db connection  
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true})

//USER TABLE
const userSchema = new Schema ({
    username: {
        type: String, 
        unique: true,
        min: 4,
        max: 20,
    },
    password: {
        type: String, 
        min: 6, 
        max: 30,
        require: true, 
    }, 
    cards: [{
        type: Schema.Types.ObjectId,
        ref: "Card"
    }]

})


userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema)

passport.use(User.createStrategy())

passport.serializeUser(function(user, done){
    done(null, user.id)
})
passport.deserializeUser(function(userId, done){
    User.findById(userId, function(err, user){
        done(err, user)
    })
})


                               /* GET ROUTES */


app.get('/',(req,res) => {
 //res.sendFile('./index.html')
    res.render("index.html")
});                               
app.get("/search",(req, res) => {
    res.render("search.html")
} )                               



 app.get('/login',(req,res) => {
    res.render("login")
   
 }); 

 app.get('/register',(req,res) => {
    res.render('signup.html')
});

app.get("/logout", function(req,res, next) {
    req.logout(function(err){
        if(err){
            return next(errr)
        }else {
            res.redirect('/')
        }
    });
});



app.get("/profile/:userId", (req,res) => {
    if(req.isAuthenticated()){
        //find user by and access the card object reference 
        User.findById(req.user.id, function(err, userFounder){
            if(err){
                console.log(err)
            }else {
                if(userFounder){
                    //console.log(userFounder.cards)
                    userFounder.cards.forEach((cardId) => {
                        Card.findById(cardId, function(err, cardFound){
                            if(err){
                                console.log(err)
                            }else {
                                if(cardFound){
                                    //access to all of this user's card properties
                                    console.log(cardFound.number)
                                    
                                }
                            }
                        })
                    })
                    
                }
            }
        })
        
      
        
    }else {
        res.redirect("/login")
    }
})




/* POST ROUTES */

app.post('/login', 
passport.authenticate('local', {failureRedirect: '/login', 
successRedirect: '/profile'}))


app.post('/register',(req,res) => {
    User.register({username: req.body.username, }, req.body.password, function(err, user){
        console.log(User)
        if(err){
            console.log(err)
        }else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("profile")
            })
        }
    })
});


//when user clicks the save button on a card 

app.post("/save", (req, res) => {
    
    if(req.isAuthenticated()){
        const user = req.user
        console.log(user)
        console.log(req.body)
  
            const newCard = new Card({
            player_id: req.body.player_id,
            full_name: req.body.playerFullName,
            number: req.body.number,
            position: req.body.position,
            currentTeam: req.body.currentTeam,
            playerHeadshot: req.body.playerHeadshot,
            height: req.body.height,
            weight: req.body.weight,
            birthDate: req.body.birthDate,
            college: req.body.college,
            draftInfo: req.body.draftInfo,
            status: req.body.status,


        })
        newCard.save((err) => {
   })
   User.findById(req.user.id, function(err, userFounder){
    if(err){
        console.log(err)
    }else {
        if(user){
            userFounder.cards.push(newCard)
            userFounder.save(function(){
                res.redirect('profile')
            })
        }
    }
})

}  
})




const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log("running on " + PORT)
})

