exports.info = "Makes the bot say anything you would like (Automatically censors profanity)."
var profanities = require('profanities');
const fs = require('fs');
const serverData = JSON.parse(fs.readFileSync('Storage/serverData.json', 'utf8'));

function filter(message, serverData) {
    var msg = message.toString();
    var lower = msg.toLowerCase();
    var str = lower.split(" ");

    for (i = 0; i < str.length; i++) {
        for (x = 0; x < profanities.length; x++) {
            if (str[i] == profanities[x].toLowerCase()) {
                
                
            }
        }
    }
    return false;
}

exports.run = async(message, args, client, ops, serverData) => {
    if (args[0]) {
        let str = ""
        for (i = 0; i < args.length; i++) {
            str = str + args[i] + " ";
        }
        message.channel.send(str)
        .then(msg => {
            if (filter(msg)) {
                msg.delete();

            }
        });
        message.delete();
    }
    else {
        message.channel.send("❌ You must give me something to say!")
    }
}