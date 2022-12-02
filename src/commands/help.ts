import { Message, MessagePayload } from "../../types/discord.js";

module.exports = {
  name: "help",
  description: "I don't know why i bother adding this but it shows this menu",

  execute(message: Message, args: string[]) {
    let prefix = process.env.prefix as string;

    message.channel.send({
      embeds: [{
        color: "ffffff",
        author: {
          //icon_url: client.user.displayAvatarURL(),
          name: message.client.user!.username + "'s Help guide",
        },
        title: "Commands of " + message.client.user!.username,
        fields: [
          {
            name: prefix + "radio",
            value:
              "Play a radio station [Must be in VC & Must have valid station]",
          },
          {
            name: prefix + "play",
            value: "Play a youtube video's audio by using the name of a video",
          },
          {
            name: prefix + "playurl",
            value: "Play a youtube video's audio using a link instead",
          },
          {
            name: prefix + "fileurl",
            value: "Play a file by using an url",
          },
          {
            name: prefix + "stations",
            value:
              "shows all of the stations that " + message.client.user!.username + " has",
          },
          {
            name: prefix + "help",
            value:
              "idk why I bother adding this but this is to open up the help page",
          },
          {
            name: prefix + "stop",
            value: "stops the radio and disconnects",
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user!.displayAvatarURL(),
          text: "Logo by FireyJS\nCreated by Maru and Taigo",
        },
      }]
    } as unknown as MessagePayload);
  },
};
