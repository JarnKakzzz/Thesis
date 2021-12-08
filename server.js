
let express = require("express")
let server = express()
var exphbs  = require('express-handlebars');

var sqlite3 = require('sqlite3')
let sqlite = require('sqlite')

var db = sqlite.open({filename:".Tonuay", driver:sqlite3.Database})


server.use(express.static('img'))

server.engine('handlebars', exphbs());
server.set('view engine', 'handlebars');
server.get("/" , async function (request,response){
    response.render("home") 
    
    
    
})


server.get("/Details/:CAP" , async function (request,response){
    let CAP = request.params.CAP
    let TREE = await db
    let Tonuay = await TREE.all("SELECT * FROM Tonuay WHERE CAP = '" + CAP +"'")
    response.render("details" , {trees:Tonuay}) 
})

server.get("/Tree/:NAME" , async function (request,response){
    let NAME = request.params.NAME
    let TREE = await db
    let Tonuay = await TREE.get("SELECT * FROM Tonuay WHERE NAME =  '"  + NAME +"'") 
    response.render("trees" , {trees:Tonuay})

})
server.listen(3000 ,function (){
    console.log("server OK")
})
