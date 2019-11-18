var index = require('../index.js');
exports.category = "currency";
exports.info = "Gives the a user a specified amount of diamonds!"
exports.run = async (message, args, client, ops) => {
    if (!args[0]) return message.channel.send("❌ You must specifiy someone to pay!");
    var member;
    for (i = 0; i < message.guild.memberCount; i++) {
        if (((args[0].toLowerCase() == message.guild.members.array()[i].displayName.toLowerCase() 
        || args[0].toLowerCase() == message.guild.members.array()[i].user.username.toLowerCase())
         || args[0].toLowerCase() == message.guild.members.array()[i].user.tag.toLowerCase())) {    
                member = message.guild.members.array()[i].user;    
        }
        else if (message.mentions.members.first()) {
                if (message.mentions.members.first().user == message.guild.members.array()[i].user) {
                        member = message.guild.members.array()[i].user; 
                }
        }
    }
    if (!member) return message.channel.send("❌ This user doesn't exist!");
    if (member == message.author) return message.channel.send("❌ You can't pay yourself!");
    if (!args[1]) return message.channel.send("❌ You must specify an amount!");
    if (isNaN(args[1])) return message.channel.send("❌ The amount must be an integer!");
    if (args[1] < 1) return message.channel.send("❌ The amount must be greater than 0!");
    var pay = Math.floor(args[1]);
    index.dbSelect(index.pool, 'userdata', 'id', 'diamonds', message.author.id, function(user) {
        if (user.diamonds - pay < 0) return message.channel.send("❌ You can't afford this payment!");
        
        index.dbSelect(index.pool, 'userdata', 'id', 'diamonds', member.id, function(reciever) {
            message.channel.send("Payment successful! Now you have 💎x" + (user.diamonds - pay) + " and " + member.username + " has 💎x" + (reciever.diamonds + pay));
            index.dbUpdate(index.pool, 'userdata', 'id', 'diamonds', message.author.id, user.diamonds - pay);
            index.dbUpdate(index.pool, 'userdata', 'id', 'diamonds', member.id, reciever.diamonds + pay);

        });
    });
}