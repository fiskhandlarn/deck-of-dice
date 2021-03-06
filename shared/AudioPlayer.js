// https://antenna.io/blog/2019/05/preload-and-replay-sounds-in-expo/
import { Audio } from 'expo-av';

const soundObjects = {};

export default class AudioPlayer {
  static load(library) {
    const promisedSoundObjects = [];

    for (const name in library) {
      const sound = library[name];

      soundObjects[name] = new Audio.Sound();

      promisedSoundObjects.push(soundObjects[name].loadAsync(sound));
    }

    return promisedSoundObjects;
  }

  static async playSound(name) {
    try {
      if (soundObjects[name]) {
        await soundObjects[name].replayAsync();
      }
    } catch (error) {
      console.warn(error);
    }
  }
}
