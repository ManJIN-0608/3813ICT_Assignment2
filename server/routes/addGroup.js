const fs = require("fs");

// Create a new group by groupname
module.exports = function(app, path){
    app.post("/addGroup", function(req, res){
        let newGroup = {
            "groupname" : req.body.groupname,
            "users" : []
        }
        

        let groupExists = false;
        let allData = [];
        let groups = [];
        console.log("Made it to addGroup");

        if(!req.body){
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf-8", function(err, data){
            if(err) {
                throw err;
            }
            allData = JSON.parse(data);
            for(let i = 0; i < allData.groups.length; i++){
                if(allData.groups[i].groupname == newGroup.groupname){
                    groupExists = true;
                }
            }
            if(!groupExists){
                allData.groups.push(newGroup);
                groups = allData.groups;
                console.log(allData);

                let allDataJson = JSON.stringify(allData);
                
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    if(err){
                        throw err;
                    }
                });
                console.log(groups);
                res.send(groups);
            }else{
                res.send("Group exists");
            }
        });
    });
}