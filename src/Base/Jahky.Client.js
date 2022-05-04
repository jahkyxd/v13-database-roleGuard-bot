import { Client, Intents, Collection, Role } from "discord.js";
import db from "./Database/index.js";
import config from "../../config.js";
import logger from "./logger.js";
import Get from "./JahkyGet.js";

class Jahky extends Client {
    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_WEBHOOKS,
            ],
        });
        this.commands = new Collection();
        this.aliases = new Collection();
        global.system = this;
        this.db = global.db = db;
        this.logger = logger;
        this.availableBots = new Collection();
    }

    async wait(ms) {
        await new Promise((resolve) => setTimeout(resolve, ms));
    }

    async backup() {
        this.guilds.cache
            .get(config.guildID)
            .roles.cache.forEach(async (role) => {
                this.db.set(`roles_${role.guild.id}_${role.id}`, {
                    name: role.name,
                    color: role.hexColor,
                    emojis: role.unicodeEmoji,
                    position: role.rawPosition,
                    mentionable: role.mentionable,
                    permissions: role.permissions,
                    hoist: role.hoist,
                });

                this.db.set(
                    `roleMembers_${role.guild.id}_${role.id}`,
                    role.members.map((x) => x)
                );

                const rolsize = role.guild.roles.cache.filter(
                    (rls) => rls.name !== "@everyone"
                ).size;

                this.logger.log(
                    `${rolsize} rolün yedeği başarılı bir şekilde alındı!`
                );
            });
    }

    /**
     *
     * @param {Array} memberArray
     * @param {Role} role
     */

    async memberAdd_Role(memberArray, role) {
        let availableBots = global.Bots.filter((e) => !e.pussy);
        if (availableBots.length <= 0)
            availableBots = global.Bots.sort((x, y) => y.ceki - x.ceki).slice(
                0,
                Math.round(length / global.Bots.length)
            );
        let perAnyBotMembers = Math.floor(length / availableBots.length);
        if (perAnyBotMembers < 1) perAnyBotMembers = 1;
        for (let index = 0; index < availableBots.length; index++) {
            const bot = availableBots[index];
            if (newRole.deleted) {
                console.log(
                    `Olayından sonra ${bot.user.username} - rol tekrar silindi, döngü kırılıyor.`
                );
                break;
            }
            Get.processBot(bot, true, perAnyBotMembers);
            let ids = memberArray.slice(
                index * perAnyBotMembers,
                (index + 1) * perAnyBotMembers
            );
            if (ids.length <= 0) {
                Get.processBot(bot, false, -perAnyBotMembers);
                break;
            }
            let guild = bot.guilds.cache.first();
            ids.every(async (id, index) => {
                bot.wait(index * 3000);
                const member = bot.users.cache.get(id);
                const rol = bot.roles.cache.get(role);
                if (!member || !rol)
                    return client.logger.error(`${id} kullanıcısı bulunamadı!`);
                id.roles
                    .add(role)
                    .then(
                        (x) =>
                            `${member.user.username} - ${member.user.id} kullanıcısına ${rol.name} - ${rol.id} rolü verildi (${bot.user.username} - ${bot.user.id})`
                    )
                    .catch(
                        (err) =>
                            `${member.user.username} - ${member.user.id} kullanıcısına ${rol.name} - ${rol.id} rolü verilemedi (${bot.user.username} - ${bot.user.id})`
                    );
            });
            Get.processBot(bot, false, -perAnyBotMembers);
        }
    }

    async Auto(roleID = Number) {
        const control = await Get.Fetch_role(roleID);

        if (control) {
            const roleData = this.db.set(`roles_${config.guildID}_${roleID}`);

            const newRole = await this.guilds.cache
                .get(config.guildID)
                .roles.create({
                    name: roleData.name,
                    color: roleData.color,
                    unicodeEmoji: roleData.emojis,
                    position: roleData.position,
                    mentionable: roleData.mentionable,
                    permissions: roleData.permissions,
                    hoist: roleData.hoist,
                    reason: "Database bot made by Jahky. ",
                });

            const members = this.db.get(
                `roleMembers_${config.guildID}_${roleID}`
            );

            if (!members)
                return this.logger.log(
                    `${
                        this.guilds.cache
                            .get(config.guildID)
                            .roles.cache.get(roleID).name
                    } rolüne ait kullanıcı verisi bulunamadı!`
                );

            this.memberAdd_Role(members, newRole);
        } else
            this.logger.log(
                `${
                    this.guilds.cache
                        .get(config.guildID)
                        .roles.cache.get(roleID).name
                } rolünün verisi olmadığı için dağıtma işlemi iptal edildi!`
            );
    }
}

export default Jahky;
