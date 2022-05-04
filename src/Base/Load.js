const { readdir, readdirSync } = require("fs");

class Load {
    static async LoadCommands(Patch) {
        readdirSync(Patch, { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
            const prop = require(`../commands/${files}`);
            if (!prop.info || !prop.operate) return
            global.client.commands.set(prop.info.name, prop);
            console.log(`[JAHKY - COMMAND] ${prop.info.name} loaded!`);
            if (!prop.info.aliases || prop.info.aliases.length < 1) return
            prop.info.aliases.forEach((otherUses) => { global.client.aliases.set(otherUses, prop.info.name); });
        });
    };

    static async LoadEvents(Path) {
        readdir(Path, (err, files) => {
            if (err) console.log(err);
            files.forEach(file => {
                const prop = require(`../events/${file}`);
                if (!prop.info) return;
                global.client.on(prop.info.name, prop.operate)
                console.log(`[JAHKY - EVENT] ${prop.info.name} loaded!`);
            });
        });
    };

    static async fetchEvents(event) {
        const prop = require("../events/" + event)
        if (!prop.info) return
        global.client.on(prop.info.name, prop.operate);
        console.log(`[JAHKY - PRIVATE - EVENT] ${prop.info.name} loaded!`);
    }
};

export default Load