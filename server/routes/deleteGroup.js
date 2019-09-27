const fs = require("fs");

// Delete group by groupname
module.exports = function(app, path){
    app.post("/deleteGroup", function(req, res){
        let groupname = req.body.groupname;
        let allData = [];
        let groups = [];
        console.log("Made it to deleteGroup");
        console.log(groupname);

        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }

            allData = JSON.parse(data);
            groups = allData.groups;
            allData.groups = groups;
                // Removes active user from user array
            for(let i = 0; i < groups.length; i++){
                if(groups[i].groupname == groupname){
                    console.log(groups[i]);
                    groups.splice([i], 1);
                }
            }

            let allDataJson = JSON.stringify(allData);
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    if(err){
                        throw err;
                    }
                });
                // console.log(allData);
                // console.log(allData.groups);
                // console.log(allDataJson);
                console.log(groups);
                res.send(groups);
        });
    });
}