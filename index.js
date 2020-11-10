const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});

client.on('message', (msg) =>{
    if(msg.content.toLowerCase().includes('meme')) {
        msg.channel.send('REVIEW');
    }
    if(msg.content.toLowerCase().includes('rent')) {
        msg.channel.send('oof');
    }
});
