import { Client } from "discord.js";

const client = new Client({
  intents: ["Guilds"],
});

export default client;
