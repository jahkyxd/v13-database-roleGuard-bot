import config from "../../config.js";
import Jahky from "./Jahky.Client.js";

const Tokens = config.Axularius;
const Bots = (global.bots = []);
let number = 0;

for (const token of Tokens) {
    if (token) {
        const client = new Jahky();

        client.on("ready", async () => {
            client.user.setPresence({
                activities: [{ name: "Made By Jahky.", type: "LISTENING" }],
                status: "idle",
            });

            client.pussy = false;
            client.ceki = 0;

            Bots.push(client);
            number++;
        });

        client
            .login(token)
            .then(() =>
                client.logger.log(
                    `${client.user.tag} Olarak #${number} Destekçi botu aktifleştirildi!`
                )
            );
    }
}
