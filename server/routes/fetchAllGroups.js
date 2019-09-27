const fs = require("fs");

// Module returns an array containing all group objects
module.exports = function(app, path){
    app.post("/fetchAllGroups", function(req, res){
        let groupname = req.body.groupname;
        let groups = {};
        console.log("Made it to fetchAllGroups");
        console.log(groupname);

        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }
            allData = JSON.parse(data);
            groups = allData.groups;
                // Removes active user from user array
            for(let i = 0; i < groups.length; i++){
                if(groups[i].groupname == groupname){
                    console.log(groups[i]);
                    groups.splice([i], 1);
                }
            }
            console.log(groups);
            res.send(groups);
        });
    });
}