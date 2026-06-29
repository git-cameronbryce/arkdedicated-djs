import type { ChatInputCommand, CommandData } from "commandkit";
import { ApplicationCommandOptionType } from "discord.js";
import type { Server } from "./types";
import { builder } from "../services/embeds";

const tagOption = {
  type: ApplicationCommandOptionType.String,
  description: "The name of the server.",
  required: true,
  min_length: 3,
  name: "tag",
} as const;

export const command: CommandData = {
  name: "search",
  description: "Search a server name, return the population",
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "ase",
      description: "The game to query.",
      options: [tagOption],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: "asa",
      description: "The game to query.",
      options: [tagOption],
    },
  ],
};

export const chatInput: ChatInputCommand = async (ctx) => {
  const input = ctx.interaction.options.getString("tag", true);
  await ctx.interaction.deferReply();

  const params = new URLSearchParams();
  params.append("name", input);

  const game =
    ctx.interaction.options.getSubcommand() === "asa" ? "ascended" : "evolved";

  const url = `https://arkdedicated.up.railway.app/api/${game}?${params}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.KEY}` },
    });

    const data: Server[] = await response.json();
    const embed = await builder(data);

    await ctx.interaction.followUp({ embeds: [embed] });
  } catch (error) {
    await ctx.interaction.followUp({
      content: "Server unreachable, try again later.",
    });
  }
};
