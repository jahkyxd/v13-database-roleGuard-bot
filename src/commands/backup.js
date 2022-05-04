import {
    GuildMember,
    Message,
    MessageEmbed,
    TextChannel,
    Guild,
    Permissions,
} from "discord.js";
import Jahky from "../Base/Jahky.Client.js";

/**
 *
 * @param {Jahky} client
 * @param {Message} message
 * @param {Array<String>} args
 * @param {MessageEmbed} embed
 * @param {TextChannel} channel
 * @param {GuildMember} author
 * @param {Guild} guild
 */

export const operate = async (
    client,
    message,
    args,
    embed,
    channel,
    author,
    guild,
    prefix
) => {
    client.backup();

    message.reply({
        embeds: [
            embed.setDescription("Sunucu backupı başarılı bir şekilde alındı!"),
        ],
    });
};

export const info = {
    name: "backup",
    aliases: ["backup-al", "yedekle", "yedek-al", "roller", "rolleri-yedekle"],
    GuildOwner: true,
};
