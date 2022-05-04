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
    const roleID = args[0];
    if (!roleID || isNaN(roleID))
        return message.reply({
            embeds: [embed.setDescription("Lütfen bir rol idsi belirtin!")],
        });

    client.Auto(roleID);
};

export const info = {
    name: "backup-kur",
    aliases: ["yedek-kur", "rol-kur", "veri-kur", "rol-oluştur"],
    GuildOwner: true,
};
