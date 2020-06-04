class SoundAnalyzer {

    constructor() {
        this.fft = new p5.FFT();
        this.fft.waveform(1024);
        this.fft.smooth(0.85);

        this.spectrum = [];
        this.bar = [];
        this.count = [];
        this.sum = 0;
        this.max = 0;
    }

    update() {
        let spectrum = this.spectrum = this.fft.analyze();

        let bar = this.bar = [];
        let count = this.count = [];

        this.sum = 0;
        this.max = 0;

        for (let i = 110; i < 681; i++) {
            let p = Math.round(24 + 12 * Math.log2(i / 440));
            while (p >= bar.length) {
                bar.push(0);
                count.push(0);
            }
            bar[p] += spectrum[i];
            count[p]++;

            this.max = Math.max(this.max, bar[p]);
            this.sum += spectrum[i];
        }
    }
}

export {SoundAnalyzer};