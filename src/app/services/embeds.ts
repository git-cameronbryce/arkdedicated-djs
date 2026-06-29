import { EmbedBuilder } from "discord.js";
import { Server } from "../commands/types";

export async function builder(data: Server[]): Promise<EmbedBuilder> {
  const players = data.reduce((sum, s) => sum + s.players, 0);
  const slots = data.reduce((sum, s) => sum + s.maxPlayers, 0);

  const embed = new EmbedBuilder()
    .setDescription(`**Server Population**\n${players} of ${slots} players\n${data.length} matches`)
    .setFooter({ text: "Contact support if issues persist." })
    .setThumbnail("https://i.imgur.com/o9mwOzp.png")
    .setColor(0x3498db);

  return embed;
}
