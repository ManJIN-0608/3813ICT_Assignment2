const fs = require("fs");

// Delete user from group by groupname and username
module.exports = function (app, path) {
    app.post("/deleteUsersFromGroup", function (req, res) {

        let user = req.body.username;
        let group = req.body.groupname;

        let allData = [];
        let groups = [];

        console.log(user);
        console.log("Made it to deleteUsersFromGroup");

        if (!req.body) {
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf-8", function (err, data) {
            if (err) {
                throw err;
            }

            allData = JSON.parse(data);
            for (let i = 0; i < allData.groups.length; i++) {
                if (allData.groups[i].groupname == group) {
                    for(let j = 0; j < allData.groups[i].users.length; j++){
                        if(allData.groups[i].users[j] == user){
                            allData.groups[i].users.splice(j, 1);
                        }
                    }
                }
            }

            groups = allData.groups;
            console.log(allData);
            let allDataJson = JSON.stringify(allData);

            // Write file
            fs.writeFile("./data.json", allDataJson, "utf-8", function (err) {
                if (err) {
                    throw err;
                }
            });
            console.log(groups);
            res.send(groups);
        });
});
}