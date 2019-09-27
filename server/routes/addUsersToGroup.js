const fs = require("fs");

// Add user to group by username and groupname
module.exports = function (app, path) {
    app.post("/addUsersToGroup", function (req, res) {

        let user = req.body.username;
        let group = req.body.groupname;

        let allData = [];
        let groups = [];

        console.log(user);
        console.log("Made it to addUsersToGroup");

        if (!req.body) {
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf-8", function (err, data) {
            if (err) {
                throw err;
            }
            allData = JSON.parse(data);
            for (let i = 0; i < allData.groups.length; i++) {
                if (allData.groups[i].groupname == group && allData.groups[i].users.indexOf(user) == -1) {
                    allData.groups[i].users.push(user);
                }
            }

            groups = allData.groups;
            console.log(allData);
            
            let allDataJson = JSON.stringify(allData);
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