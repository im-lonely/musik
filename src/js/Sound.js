export default class Sound {
  constructor(src, maxStreams = 1, vol = 1.0) {
    this.streamNum = 0;
    this.streams = [];
    this.maxStreams = maxStreams;
    this.vol = vol;
    for (let i = 0; i < this.maxStreams; i++) {
      this.streams.push(new Audio(src));
      this.streams[i].volume = vol;
    }
  }
  play() {
    this.streamNum = (this.streamNum + 1) % this.maxStreams;
    this.streams[this.streamNum].play();
  }
  stop() {
    this.streams[this.streamNum].pause();
    this.streams[this.streamNum].currentTime = 0;
  }
  changeVolume(vol) {
    this.vol = vol;
    for (const stream of this.streams) stream.volume = vol;
  }
}

export const audio = {
  "hi-hat-closed": new Sound("./music/hi-hat-closed.mp3", 100, 1.0),
  "hi-hat-open": new Sound("./music/hi-hat-open.mp3", 100, 1.0),
};
