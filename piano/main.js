import { pi as pi_digits } from '../pi_digits.js'; 

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    let pi_cursor = 0; 

    for(let i = 0; i < 12; i++) {
        const pianoKey = document.createElement('div'); 
        pianoKey.className = 'key'; 
        pianoKey.classList.add([1, 3, 5, 8, 10].indexOf(i) === -1 ? 'white' : 'black'); 
        pianoKey.setAttribute('value', [0, 1, 2, 3, 4, 5, 7, 8, 9, 10].indexOf(i).toString()); 
        document.querySelector('.piano-container').prepend(pianoKey); 
    }

    document.querySelector('.piano-container').addEventListener('touchstart', touchstart => {
        if(touchstart.target.classList.contains('key')) {

            // MY IPHONE USES TOO OLD AN IOS VERSION TO SUPPORT ANIMATION API

            // CURRENT JS VERSION
            // touchstart.target.animate([{
            //     backgroundColor: touchstart.target.getAttribute('value') === pi_digits[pi_cursor] && ++pi_cursor ? '#00F' : '#F00', 
            // }, {
            //     backgroundColor: touchstart.target.classList.contains('white') ? '#FFF' : '#000', 
            // }], {
            //     duration: 500, 
            // }); 

            // LEGACY SUPPORT VERSION
            touchstart.target.style.backgroundColor = touchstart.target.getAttribute('value') === pi_digits[pi_cursor] && ++pi_cursor ? '#00F' : '#F00'; 

            document.querySelector('.pi-cursor').innerText = pi_cursor; 
        }
    }); 

    document.querySelector('.piano-container').addEventListener('touchend', touchend => {
        console.log('TOUCHEND', touchend); 
        if(touchend.target.classList.contains('key')) {
            touchend.target.style.backgroundColor = touchend.target.classList.contains('white') ? '#FFF' : '#000'; 
        }
    }); 
}); 