require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(channel => channel.name === "welcome");
  if (channel === undefined) return;

  const isBot = member.user.bot;
  if(isBot) return;

  const noobRole = member.guild.roles.find(role => role.name === "Pre member");

  member.addRole(noobRole).then(member => {
    channel.send(`${member}\nようこそ!\n#terms を読んで、同意できる場合は「同意します」とこのチャンネルで送信してください。\n\nWelcome! Please check thourgh rules in #terms, and type "I agree" to agree & get permissions to have fun in this server.`);
  });
});

client.on('message', message => {
  if((message.content.trim() === ("同意します" || "同意します。") || message.content.match(/I agree/i)) && message.channel.name === 'welcome'){
    const memberRole = message.guild.roles.find(role => role.name === "Member"),
          gamerRole = message.guild.roles.find(role => role.name === "Gamer"),
          noobRole = message.guild.roles.find(role => role.name === "Pre member");

    message.member.addRole(memberRole).then(member => {
      member.removeRole(noobRole);
      member.addRole(gamerRole);
    });
  }else if(message.channel.name === 'welcome'){
    message.delete();
  };
});

client.on('error', console.error);

client.login(process.env.BOT_TOKEN);
