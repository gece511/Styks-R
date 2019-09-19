//consts (for glitch)
// GEREKLİ YERLER
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
// GEREKLİ YERLER
// -------------------------------------------------------------
/**
	Örnek komuta göz atmayı unutmayın orada
	bir kaç şey yazıyor. komutlar/ornek.js
*/

const Discord = require('discord.js')
const client = new Discord.Client()

/**
	Aşağıya bilgilerinizi yazın.
	Üst kısımda modül ve gerekli yerler bulunuyor dokunmamanız önemle rica olunur.
*/
var oyun = [
        "⭐ 5R ⭐ Yakında ⭐ 5R ⭐",
        "⭐ 5R ⭐ İmparatorluğu",
        "5R ⭐ Shame Rebels",
        "5R ⭐ Shame Rebels",
        "5R ⭐ Shury Rebels",
        "5R ⭐ Shury Rebels",
        "5R ⭐ Naspir Rebels",
        "5R ⭐ Naspir Rebels",
        "5R ⭐ PleagueB Rebels",
        "5R ⭐ PleagueB Rebels",
        "5R ⭐ Gece 💞 Rüya ",
        "5R ⭐ Gece 💞 Rüya ",
        "5R ⭐ Gece 💞 Rüya "
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setGame(oyun[random], "https://www.twitch.tv/xshurytv");
        }, 2 * 2500);

client.ayarlar = {

	prefix: "s!", // Ön-ek
	token: "nabacan",
	klasor: "komutlar", // Komutların bulunduğu klasörün ismi
	renk: "#FF0000", // Embed rengi (HTML kodu veya RANDOM yazılabilir.)
	destek: "https://discord.gg/UYmPKYa", // Discord destek sunucunuz
	surum: "0.0.1", // Botunuzun sürümü
	site: "Site: Henüz Yok", // Botunuzun web sitesi
	yardimcilar: ["431772260508893194"], // İstenirse daha fazla eklenebilir. Eğer yoksa [] içi temizlenebilir.
	sunucuekleme: "{sunucu} adlı sunucuya eklendim! Bu sunucuda toplam {uye} üye, {bot} bulunuyor! Şuan da toplam {sunucular} tane sunucuya hizmet veriyorum!", // Bot bir sunucuya katılınca konsolda yazacak yazı
	sunucuatma: "{sunucu} adlı sunucudan atıldım! Bu sunucuda toplam {uye} üye, {bot} bulunuyordu! Şuan da toplam {sunucular} tane sunucuya hizmet veriyorum!", // Bot bir sunucudan atılınca konsolda yazacak yazı
	oyun: "{kullanıcı} ⚠️ Kullanıcıyı", // Oynuyor yeri, Burayı dilediğiniz şekilde değiştirebilirsiniz.
	durum: "online" // Botun durumu sadece rahatsizetmeyin veya cevrimici veya bosta yazabilirsiniz eğer bunlar dışında bir şey yazarsanız veya boş bırakırsanız direk çevrimiçi gözükecektir.

}


/**
	Yukarıya bilgilerinizi yazın.
	Alt kısımda bot için gerekli komutlar bulunmaktadır. Eğer bozduğunuz şekilde hiçbir zaman yardım vermeyeceğim
*/

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

const fs = require('fs')
const chalk = require('chalk')

fs.readdir(`./${client.ayarlar.klasor}/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")

	if(jsfiles.length <= 0) {
		console.log(`${chalk.redBright("Üzgünüm ama hiçbir komut bulunamadı!")}`)
	} else {
		if (err) {
			console.error(`${chalk.redBright("Hata çıktı;")}\n${err}\n\n${chalk.greenBright("Hatayı düzeltmen için bir kaç tavsiye vereceğim. İlk öncelikle ayarları doğru girdiğinden ve boş bırakmadığından emin ol. Daha sonra kendin eklediğin komutlara iyice bak ve örnek komutla karşılaştır. Hatan varsa düzelt. Eğer kodda hata olduğunu düşünüyorsan bildirmekten çekinme!")}`)
		}
		console.log(`${chalk.yellow(jsfiles.length)} komut yüklenecek.`)

		jsfiles.forEach(f => {
			let props = require(`./${client.ayarlar.klasor}/${f}`)
			client.commands.set(props.help.komut, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.komut)
			})
			console.log(`Yüklenen komut: ${props.help.komut}`)
		})
	}
})
var prefix = 's!'
client.on("ready", () => {
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "dinliyor"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "cevrimici", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(/{prefix}/g, client.ayarlar.prefix).replace(/{kullanıcı}/g, client.users.size).replace(/{sunucu}/g, client.guilds.size).replace(/{site}/g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
	console.log(`Başarıyla komutlar yüklendi. Bot giriş yaptı!`)
})

client.on("guildCreate", guild => {
	console.log(client.ayarlar.sunucuekleme.replace(/{sunucu}/g, chalk.yellow(guild.name)).replace(/{bot}/g, chalk.blue(guild.members.filter(m => m.user.bot).size)).replace(/{uye}/g, chalk.green(guild.members.filter(m => !m.user.bot).size)).replace(/{sunucular}/g, chalk.redBright(client.guilds.size)))
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "PLAYING"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "cevrimici", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(/{prefix}/g, client.ayarlar.prefix).replace(/{kullanıcı}/g, client.users.size).replace(/{sunucu}/g, client.guilds.size).replace(/{site}/g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
})

client.on("guildDelete", guild => {
	console.log(client.ayarlar.sunucuatma.replace(/{sunucu}/g, chalk.yellow(guild.name)).replace(/{bot}/g, chalk.blue(guild.members.filter(m => m.user.bot).size)).replace(/{uye}/g, chalk.green(guild.members.filter(m => !m.user.bot).size)).replace(/{sunucular}/g, chalk.redBright(client.guilds.size)))
	var odurumlar = ["oynuyor", "dinliyor", "izliyor"]
	var odurum = "PLAYING"

	if(odurumlar.includes(client.ayarlar.oyundurum)) {
		var odurum = client.ayarlar.oyundurum.replace("oynuyor", "PLAYING").replace("dinliyor", "LISTENING").replace("izliyor", "WATCHING")
	}

	var durumlar = ["rahatsizetmeyin", "cevrimici", "bosta"]
	var durum = "dnd"

	if(durumlar.includes(client.ayarlar.durum)) {
		var durum = client.ayarlar.oyundurum.replace("rahatsizetmeyin", "dnd").replace("cevrimici", "online").replace("bosta", "idle")
	}

	client.user.setPresence({
		game: {
			name: client.ayarlar.oyun.replace(/{prefix}/g, client.ayarlar.prefix).replace(/{kullanıcı}/g, client.users.size).replace(/{sunucu}/g, client.guilds.size).replace(/{site}/g, client.ayarlar.site),
			type: odurum
		},
		status: durum
	})
})

client.on("message", async message => {
	if (message.author.bot) return
	if (!message.content.startsWith(client.ayarlar.prefix)) return
	var command = message.content.split(' ')[0].slice(client.ayarlar.prefix.length)
	var args = message.content.split(' ').slice(1)
	var cmd = ''

	if (client.commands.has(command)) {
		var cmd = client.commands.get(command)
	} else if (client.aliases.has(command)) {
		var cmd = client.commands.get(client.aliases.get(command))
	}
		if(message.channel.type === "dm") {
			if (cmd.conf.guildOnly === true) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komut özel mesajlarda devredışı bırakılmış!`)
					.setColor(client.ayarlar.renk)
					.setTimestamp()
				message.channel.send({embed})
				return
			}
		}
		cmd.run(client, message, args)
	})

client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :outbox_tray: Kullanıcı Ayrıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz! :x: **${member.user.tag}**`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :inbox_tray: Kullanıcı Katıldı! **${sayac[member.guild.id].sayi}** Kişi Olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** Kişi Kaldı **${member.guild.memberCount}** Kişiyiz! ${process.env.basarili} Hoşgeldin! **${member.user.tag}**` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));
  let otorole =  JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));
      let arole = otorole[member.guild.id].sayi
        let role = otorole[member.guild.id]
  let giriscikis = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));  
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :inbox_tray:  <@${member.user.id}>'a Başarıyla Rol Verildi`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

client.on("guildMemberAdd", async (member) => {
      let autorole =  JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/otorol.json", "utf8"));
      let role = autorole[member.guild.id].sayi

      member.addRole(role)




});



client.login(process.env.BOT_TOKEN);
