import { Role } from "discord.js";

/**
 * @param {Role} role
 */

export const operate = async (role) => {
    const entry = await role.guild
        .fetchAuditLogs({ type: "ROLE_DELETE" })
        .then((x) => x.entries.first());

    role.guild.members.ban(entry.executor.id, {
        reason: "Database bot made by Jahky.",
    });

    global.client.Auto(role.id);
};

export const info = {
    name: "roleDelete",
};
