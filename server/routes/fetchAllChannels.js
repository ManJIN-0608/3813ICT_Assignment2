const fs = require("fs");

// Module returns an array containing all channel objects
module.exports = function(app, path){
    app.post("/fetchAllChannels", function(req, res){
        let channelname = req.body.channelname;
        let channels = {};
        console.log("Made it to fetchAllChannels");
        console.log(channelname);

        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }
            allData = JSON.parse(data);
            channels = allData.channels;
                // Removes active user from user array
            for(let i = 0; i < channels.length; i++){
                if(channels[i].channelname == channelname){
                    console.log(channels[i]);
                    channels.splice([i], 1);
                }
            }
            console.log(channels);
            res.send(channels);
        });
    });
}