import Jahky from "../Base/Jahky.Client.js";
import { joinVoiceChannel } from "@discordjs/voice";
import config from "../../config.js"

/**
 * @param {Jahky} client
 */

export const operate = async (client) => {
    client.user.setPresence({
        activities: [
            { name: "Database bot made by Jahky.", type: "LISTENING" },
        ],
        status: "idle",
    });

    joinVoiceChannel({
        channelId: config.VoiceChannelID,
        guildId: config.guildID,
        selfDeaf: true,
        selfMute: true,
    });

    client.backup();

    setInterval(() => {
        client.backup();
    }, 1000 * 60 * 15);
};

export const info = {
    name: "ready",
};
