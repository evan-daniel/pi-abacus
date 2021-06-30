import { pi as pi_digits } from '../pi_digits.js'; 

let audio_context; 
const notes = []; 
function note(pitch, velocity) {

    this.constructor = (pitch, velocity) => {
        this.pitch = pitch; 
        this.velocity = velocity; 

        this.gain = audio_context.createGain(); 

        this.panner = audio_context.createStereoPanner(); 
        this.panner.pan.setValueAtTime(1, audio_context.currentTime);
        this.panner.connect(audio_context.destination); 
        
        this.gain.connect(this.panner); 
        this.gain.gain.setValueAtTime(0.75, audio_context.currentTime); 
        
        this.oscillator = audio_context.createOscillator(); 
        this.oscillator.type = "square"; 
        // this.oscillator.frequency.value = 440 / 32 * (2 ** ((this.pitch - 9) / 12));
        this.oscillator.frequency.value = this.pitch * 16 + 256; 
        this.oscillator.connect(this.gain); 
        this.oscillator.start(0); 

        console.log('NOTE STARTED'); 
    }

    this.turn_off = () => {
        this.velocity = 0; 
        this.gain.gain.setTargetAtTime(this.velocity, audio_context.currentTime + 0.05, 0.05); 
        this.oscillator.stop(audio_context.currentTime + 0.1); 
        notes.splice(notes.findIndex(_note => _note === this), 1); 

        console.log('NOTE STOPPED'); 
    }

    this.constructor(pitch, velocity); 
}

window.addEventListener('DOMContentLoaded', async DOMContentLoaded => {

    for(let i = 0; i < 12; i++) {
        const pianoKey = document.createElement('div'); 
        pianoKey.className = 'key'; 
        pianoKey.classList.add([1, 3, 5, 8, 10].indexOf(i) === -1 ? 'white' : 'black'); 
        pianoKey.setAttribute('value', [0, 1, 2, 3, 4, 5, 7, 8, 9, 10].indexOf(i).toString()); 
        document.querySelector('.piano-container').prepend(pianoKey); 
    }

    const gesture = () => new Promise((resolve, reject) => document.addEventListener('click', () => resolve())); 
    await gesture(); 
    audio_context = new AudioContext(); 
    console.log('MIDI STARTED'); 
    let pi_cursor = 0; 
    document.querySelector('.piano-container').addEventListener('touchstart', touchstart => {
        if(touchstart.target.classList.contains('key')) {
            touchstart.target.style.backgroundColor = touchstart.target.getAttribute('value') === pi_digits[pi_cursor] && ++pi_cursor ? '#00F' : '#F00'; 
            notes.push(new note(+touchstart.target.getAttribute('value'), 127)); 

            document.querySelector('.pi-cursor').innerText = pi_cursor; 
        }
    }); 

    document.querySelector('.piano-container').addEventListener('touchend', touchend => {
        if(touchend.target.classList.contains('key')) {
            touchend.target.style.backgroundColor = touchend.target.classList.contains('white') ? '#FFF' : '#000'; 
            const _note = notes.find(_note => _note.pitch === +touchend.target.getAttribute('value')); 
            if(_note) {
                _note.turn_off(); 
            }
        }
    }); 
}); 