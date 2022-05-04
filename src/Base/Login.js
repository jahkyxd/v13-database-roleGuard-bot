const config = require("../../config");
const mongoose = require("mongoose");

class Login {
    static async On() {
        global.client
            .login(config.token)
            .then((x) =>
                console.log(
                    `${global.client.user.username} olarak discord API bağlantısı kuruldu.`
                )
            )
            .catch((err) =>
                console.log("Discord API Botun tokenini doğrulayamadı.")
            );

        await import("./axularius.js");
    }
}

export default Login;
