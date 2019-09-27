const fs = require("fs");

// Check user whether in the data.json file and return userVaild
module.exports = function(app, path){
    app.post("/checkUser", function(req, res){
        let username = req.body.username;
        let password = req.body.password;
        let users = [];
        let userValid = false;
        console.log("Made it to checkUser");

        if(!req.body){
            return res.sendstatus(400);
        }

        // Read file
        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }

            let allData = JSON.parse(data);
            users = allData.users;
            
            for(let i = 0; i < users.length; i++){
                if(username == users[i].username && password == users[i].password){
                    userValid = true
                }
            }
            //console.log(userValid);
            //console.log(users);
            //console.log(allData);
            //console.log(username);
            //console.log(data);
            res.send(userValid);
        });
    });
}