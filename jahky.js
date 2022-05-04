import Login  from "./src/Base/Login.js";
import Loaders  from "./src/Base/Load.js";
import Jahky  from "./src/Base/Jahky.Client.js";
global.client = new Jahky()

// system requred \\

Login.On();
Loaders.LoadCommands("./src/commands");
Loaders.LoadEvents("./src/events");