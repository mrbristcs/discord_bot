const settings = require('../settings.json');
const Discord = require('discord.js');
module.exports = message => {

  let logChannel = message.guild.channels.find('name', 'logchannel');
  
  if (message.author.bot) return;
  if (message.channel.id == 361888311196909578);
  let client = message.client;
  //TODO: Fix This

    //logChannel.send(`(${message.createdTimestamp}) (TTS:${message.tts}) ${message.author.tag}@${message.channel.name}: ${message.content}`)

    const embed = new Discord.RichEmbed()
    .setTitle('')
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0xFFC200)
    .setTimestamp()
    .addField('Channel:', `${message.channel.name}`)
    .addField('TTS:', `${message.tts}`)
    .addField('Message:', `${message.content}`)
    message.client.channels.get(logChannel.id).sendEmbed(embed);
  
  if (!message.content.startsWith(settings.prefix)) return;
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
