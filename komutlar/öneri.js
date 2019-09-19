const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = function(client, message, args) {

	var öneri = args.slice(0).join(' ');
	var guildID = "623780255244746762"; // Discord İd
	var channelID = "623827484353495040"; // Kanal İd
	
	if (!öneri){
		return message.reply("Bir mesaj belirtin! Doğru kullanım: **?öneri <mesaj>**");
	} else {
		
		var embed = new Discord.RichEmbed()
			.setTimestamp()
			.addField("Eylem:", "Öneri")
			.addField("Kullanıcı:", message.author.tag)
			.addField("ID", message.author.id)
			.addField("Öneri", öneri)
		
		client.guilds.get(guildID).channels.get(channelID).send(embed);
		message.channel.send("Öneriniz alınmıştır! Teşekkür ederiz.");
	};

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['öneri'],
  permLevel: 2048,
};

exports.help = {
  komut: 'öneri',
  description: 'Sunucu Hakkında Önerinizi Geceye Ulaştırır',
  usage: 'öneri <mesaj>' 
};