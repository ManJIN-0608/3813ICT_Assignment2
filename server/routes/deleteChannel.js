const fs = require("fs");

// Delete channel by channelname
module.exports = function(app, path){
    app.post("/deleteChannel", function(req, res){
        let channelname = req.body.channelname;
        let allData = [];
        let channels = [];
        console.log("Made it to deleteChannel");
        console.log(channelname);

        fs.readFile("./data.json", "utf8", function(err, data){
            if(err){
                throw err;
            }
            allData = JSON.parse(data);
            channels = allData.channels;
            allData.channels = channels;
                // Removes active user from user array
            for(let i = 0; i < channels.length; i++){
                if(channels[i].channelname == channelname){
                    console.log(channels[i]);
                    channels.splice([i], 1);
                }
            }
            allDataJson = JSON.stringify(allData);
                fs.writeFile("./data.json", allDataJson, "utf-8", function(err){
                    if(err){
                        throw err;
                    }
                });
                // console.log(allData);
                // console.log(allData.channels);
                // console.log(allDataJson);
                console.log(channels);
                res.send(channels);
        });
    });
}