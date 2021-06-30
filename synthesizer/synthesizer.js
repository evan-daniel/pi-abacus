let audio_context; 
const notes = []; 

class note {
    constructor(pitch, velocity) {
        this.pitch = pitch; 
        this.velocity = velocity; 

        this.gain = audio_context.createGain(); 

        this.panner = audio_context.createStereoPanner(); 
        this.panner.pan.setValueAtTime(1, audio_context.currentTime);
        this.panner.connect(audio_context.destination); 
        
        this.gain.connect(this.panner); 
        // this.gain.gain.setTargetAtTime(this.velocity / 128, audio_context.currentTime + 0.05, 0.05); 
        this.gain.gain.setValueAtTime(this.velocity / 128 / 8, audio_context.currentTime); 
        
        this.oscillator = audio_context.createOscillator(); 
        this.oscillator.type = "square"; 
        // this.oscillator.type = 'saw'; 
        this.oscillator.frequency.value = 440 / 32 * (2 ** ((this.pitch - 9) / 12));
        this.oscillator.connect(this.gain); 
        this.oscillator.start(0); 
    }

    turn_off() {
        this.velocity = 0; 
        this.gain.gain.setTargetAtTime(this.velocity, audio_context.currentTime + 0.05, 0.05); 
        this.oscillator.stop(audio_context.currentTime + 0.1); 
        notes.splice(notes.findIndex(_note => _note === this), 1); 

        // setTimeout(() => {
            // this.oscillator.stop(audio_context.currentTime); 
            // dom_feedback(); 
        // }, 0.1);
    }
}