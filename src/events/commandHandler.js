const { Message, MessageEmbed, MessageSelectMenu } = require("discord.js");
const config = require("../../config.json");

/**
 * @param {Message} message
 */

export const operate = async (message) => {
    const client = message.client;
    const prefix = config.prefix.find((x) =>
        message.content.toLowerCase().startsWith(x)
    );
    if (!prefix || !message.guild || message.author.bot) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.get(client.aliases.get(commandName));
    const owner = client.users.cache.get("618444525727383592");
    const author = message.author;
    const channel = message.channel;
    const guild = message.guild;
    const embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor({
            name: message.member.displayName,
            iconURL: message.member.displayAvatarURL({
                dynamic: true,
                size: 2048,
            }),
        })
        .setFooter({
            text: "Developed By Jahky.",
            iconURL: owner.avatarURL({ dynamic: true, size: 2048 }),
        });
    if (command) {
        if (command.info.owner && !config.owners.includes(author.id))
            return;
        if (
            command.info.GuildOwner &&
            !config.owners.includes(author.id) &&
            guild.ownerId !== author.id
        )
            return;
        command.operate(
            client,
            message,
            args,
            embed,
            author,
            channel,
            guild,
            prefix
        );
    }
};

export const info = {
    name: "messageCreate",
};
