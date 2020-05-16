var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sqlFormatter = require("sql-formatter");

app.use("/public",express.static(__dirname + "/public"));

app.get("/", function(req , res){
    res.render("index.ejs");
})


app.post("/", urlencodedParser, function(req, res){
    var input = req.body.postText;
    var output = sqlFormatter.format(input);
    var enter = findEnter(output);
    output= addBreak(output,enter);
    res.render("SQL.ejs", {formatted: output, input: input});
})

app.listen(3000,function(){
    console.log("Server running on port 3000!");
})

function findEnter(output){
    var enter = [0];
    for(var i=0; i<output.length; i++){
        if(output[i]=="\n"){
            enter.push(i);
        }
    }
    return enter;
}
function addBreak(source,array){
    var temp = "";
    var i=1;
    var k=0;
    for(i=1; i<array.length; i++){
        if(i!=1){
            k=1;
            }
        temp = temp.concat(source.substr(array[i-1]+k,array[i]-array[i-1]-k) + "<br />");
    }
    temp = temp.concat(source.substr(array[i-1]+1));
    return temp;
}