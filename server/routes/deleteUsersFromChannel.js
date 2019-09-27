const fs = require("fs");

// Delete user from channel by channelname and username
module.exports = function (app, path) {
    app.post("/deleteUsersFromChannel", function (req, res) {

        let user = req.body.username;
        let channel = req.body.channelname;

        let allData = [];
        let channels = [];

        console.log(user);
        console.log("Made it to deleteUsersFromChannel");

        if (!req.body) {
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf-8", function (err, data) {
            if (err) {
                throw err;
            }
            allData = JSON.parse(data);
            for (let i = 0; i < allData.channels.length; i++) {
                if (allData.channels[i].channelname == channel) {
                    for(let j = 0; j < allData.channels[i].users.length; j++){
                        if(allData.channels[i].users[j] == user){
                            allData.channels[i].users.splice(j, 1);
                        }
                    }
                }
            }

            channels = allData.channels;
            console.log(allData);

            let allDataJson = JSON.stringify(allData);
            fs.writeFile("./data.json", allDataJson, "utf-8", function (err) {
                if (err) {
                    throw err;
                }
            });
            console.log(channels);
            res.send(channels);
        });
});
}