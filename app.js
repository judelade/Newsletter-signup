
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public")); //imp:ref to nts


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                   FNAME: firstName,
                   LNAME: lastName,
                }
            
            }
        ]
    };

    var jsonData = JSON.stringify(data); 



    var options = {
        url : "https://us10.api.mailchimp.com/3.0/lists/c75ab7915e",
        method : "POST",
        //for basic authorization for any API
        headers: {
            "Authorization": "judelade23 72d06912c1a5003a95bfe16bfccda454-us10"
        }, 
        //data were actually posting i.e jsondata
        body: jsonData

    };

    request(options, function(error,response,body){
        //If theres an error loading up the page
        if(error){
            res.sendFile(__dirname+"/failure.html");
            // console.log(error);
        }
        else{
            if(response.statusCode == 200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
                // console.log(response.statusCode);
            }
        }


    });

});

//in a case with a button on the failure page that redirects back to the homepage
// app.post("/failure", function(req,res){
//     res.redirect("/");
// });

// "process.env.PORT" port defined by heroku

app.listen(process.env.PORT || 3000,function(){

    console.log("Server is running on port 3000...");
});

//API key
// 72d06912c1a5003a95bfe16bfccda454-us10

//Audience id
//c75ab7915e