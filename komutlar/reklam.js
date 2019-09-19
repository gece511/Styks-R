const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu Komutu Kullanamazsın!`);

    const members = message.guild.members.filter(member => member.user.presence.game && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|Partner|Dm|partner|dm|Alım|facebook|instagram)/g.test(member.user.presence.game.name));
    const memberss = message.guild.members.filter(member => member.user.username && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|Partner|Dm|partner|dm|Alım|facebook|instagram)/g.test(member.user.username));
    const embed = new Discord.RichEmbed()
    .addField(' :warning: İsim Taraması ! ', memberss.map(member => `${member} = ${member.user.username} = ${member.user.id}`).join("\n") || "İsimlerde Reklam Bulunamadı. :white_check_mark:")         
     .addField(' :warning: Oynuyor Taraması ! ', members.map(member => `${member} = ${member.user.presence.game.name} = ${member.user.id}`).join("\n") || "Oynuyorda Reklam Bulunamadı.  :white_check_mark:")
    .setColor("RANDOM")
    message.channel.send({embed})

}

exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['search'],
        permLevel: 8,
        kategori: "moderasyon"
}
 
exports.help = {
        komut: 'search',
        description: 'Kullanıcıların Oynuyor mesajındaki ve Kullanıcı adlarındaki reklamları tarar.',
        usage: 'search'
}