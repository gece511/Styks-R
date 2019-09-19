 exports.run = (client, msg, args) => {
   let member = msg.mentions.members.first()
   if(!member)return msg.channel.send({embed: {
 color: Math.floor(Math.random() * (0xFFFFFF + 1)),
 description: ('Kimin Avatarını Göstereyim ?')
}});
   const Discord = require('discord.js')
        const kullanicibilgimk = new Discord.RichEmbed()
        .setTitle(member.user.tag+" Profil Fotoğrafı!")
        .setImage(member.user.avatarURL)
        .setFooter("5R ⛧ Gece #1404 Tarafından Yaratıldım!", "https://cdn.discordapp.com/avatars/588082947094216711/411f034dd717cb250924422c90c87203.png?size=2048")
        return msg.channel.send(kullanicibilgimk);
    }
	
	
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "kullanıcı"
 };
 
 exports.help = {
 komut: 'avatar',
 description: 'Avatarınızı veya etiketlediğiniz kişinin avatarını atar.',
 usage: 'avatar & avatar [@Kişi]'
 }