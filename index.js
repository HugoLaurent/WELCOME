require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Partials,
  ChannelType,
} = require("discord.js");

// Création du client Discord avec les intents appropriés
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember],
});

// Lorsque le bot est prêt
client.once("ready", () => {
  console.log(`Connecté en tant que ${client.user.tag}!`);
});

// Commande pour configurer les salons
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!setup_channels") {
    try {
      // Créer une catégorie
      const category = await message.guild.channels.create({
        name: "Titres RNCP",
        type: ChannelType.GuildCategory,
      });

      // Créer les salons textuels
      const channels = [
        "info-titres-rncp",
        "preparation-examen",
        "temoignages",
        "faq-rncp",
        "annonces",
        "discussions-rncp",
        "ateliers-preparation",
      ];

      for (const channelName of channels) {
        await message.guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: channelName === "discussion-générale" ? null : category.id,
        });
      }

      await message.channel.send("Les salons ont été configurés avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création des salons :", error);
      await message.channel.send(
        "Une erreur est survenue lors de la configuration des salons."
      );
    }
  }

  if (message.content === "!test") {
    await message.channel.send("Le bot est opérationnel !");
  }
});

client.login(process.env.DISCORD_TOKEN);
