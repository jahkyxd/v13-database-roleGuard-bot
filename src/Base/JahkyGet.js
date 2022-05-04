import config from "../../config.js";

client = global.client;

class Get {
    static async GetUser(userID) {
        if (!userID | isNaN(userID)) return console.log("userID isNaN!");
        const user = client.users.cache.get(userID);
        return user;
    }

    static async GetRole(roleID) {
        if (!roleID | isNaN(roleID)) return console.log("roleID isNaN!");
        const role = client.roles.cache.get(roleID);
        return role;
    }

    static async processBot(bot, pussy, job, equal = false) {
        bot.pussy = pussy;
        if (equal) bot.ceki = job;
        else bot.ceki += job;
        let index = global.Bots.findIndex((e) => e.user.id == bot.user.id);
        global.Bots[index] = bot;
    }

    static async giveBot(length) {
        if (length > global.Bots.length) length = global.Bots.length;
        let availableBots = global.Bots.filter((e) => !e.pussy);
        if (availableBots.length <= 0)
            availableBots = global.Bots.sort((x, y) => x.ceki - y.ceki).slice(
                0,
                length
            );
        return availableBots;
    }

    static async Fetch_role(roleID) {
        if (!roleID | isNaN(roleID)) return console.log("roleID isNaN!");
        const memberArray = client.db.get(`roleMembers_${config.guildID}_${roleID}`);
        if (memberArray) return true
        else return false
    }
}
export default Get;
