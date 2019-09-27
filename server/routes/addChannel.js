const fs = require("fs");

// Create a new channel by channelname and groupname
module.exports = function(app, path){
    app.post("/addChannel", function(req, res){
        let newChannel = {
            "channelname": req.body.channelname,
            "groupname" : req.body.groupname,
            "users" : []
        }
        

        console.log(newChannel.channelname);
        console.log(newChannel.groupname);

        let channelExists = false;
        let allData = [];
        let channels = [];
        console.log("Made it to addChannel");

        if(!req.body){
            return res.sendstatus(400);
        }

        fs.readFile("./data.json", "utf-8", function(err, data){
            if(err) {
                throw err;
            }
            allData = JSON.parse(data);
            for(let i = 0; i < allData.channels.length; i++){
                if(allData.channels[i].channelname == newChannel.channelname){
                    channelExists = true;
                }
            }
            if(!channelExists){
                allData.channels.push(newChannel);
                channels = allData.channels;
                console.log(allData);

                let allDataJson = JSON.stringify(allData);
                
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    if(err){
                        throw err;
                    }
                });
                console.log(channels);
                res.send(channels);
            }else{
                res.send("Channel exists");
            }
        });
    });
}