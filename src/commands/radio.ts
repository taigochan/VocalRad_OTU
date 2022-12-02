import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, StreamType } from "@discordjs/voice";
import { Message } from "../../types/discord.js";

module.exports = {
  name: "radio",
  description:
    "Let's you play radio stations.\nSee the `stations` command for avalible stations.",

  async execute(message: Message, args: string[]) {
    let argsString = args.join(" ").toLowerCase();
    const radstats = require("../../src/radiostations.json");
    
    let stationnames = radstats.names;
    let stationurls = radstats.urls;
    let stationtitles = radstats.titles;

    let selstation;

    if (!message.member!.voice.channel) {
      //when you arent in a vc the code will return
      message.channel.send("You must be in a voice channel.");
      return;
    }

    console.log("attempted");

    if (stationtitles.find((stationtitle: string) => stationtitle.toLowerCase() == argsString)) {
      selstation = stationtitles.find((stationtitle: string) => stationtitle.toLowerCase() == argsString);
    } else if (stationnames.find((stationtitle: string) => stationtitle.toLowerCase() == argsString)) {
      selstation = stationnames.find((stationtitle: string) => stationtitle.toLowerCase() == argsString);
    }
    
    if (!selstation) {
      return message.channel.send('Channel not available.');
    } else {

      let radioindex = stationtitles.indexOf(selstation) != -1 ? stationtitles.indexOf(selstation) : stationnames.indexOf(selstation) != -1 ? stationnames.indexOf(selstation) : -1; //gets the arrayindex of the channel that the users mentions
      let choiceUrl = stationurls[radioindex]; //gets the exact url you need

      if (radioindex == -1) return message.channel.send('error desu');

      const connection = joinVoiceChannel({
        channelId: message.member!.voice.channel.id,
        guildId: message.member!.voice.channel.guild.id,
        adapterCreator: message.member!.voice.channel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });

      const audio = createAudioResource(choiceUrl, { inputType: StreamType.Opus });

      player.play(audio); // plays the radiostation

      connection.subscribe(player);

      player.on(AudioPlayerStatus.Playing, () => {
        message.channel.send(
          `You are now listening to ${stationtitles[radioindex]}`
        ); //sends this message when the bot starts playing music
        player.on("error", console.error);
      });

      player.on("error", () => {
        console.error;
        message.channel.send(
          "There was an error trying to play: " + argsString
        );
      }); //some error shit
    }
  },
};
