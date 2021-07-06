import { pi as pi_digits } from '../pi_digits.js'; 

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    
    let pi_cursor_left = 0, pi_cursor_right = 0; 
    const set_pi_cursors = side => {
        let feedback = document.querySelector(`#feedback-${side}`); 
        if(!feedback) {
            feedback = document.createElement('div'); 
            feedback.classList.add('feedback'); 
            feedback.id = `feedback-${side}`; 
            document.querySelector(`#numpad-${side} .numpad-button[value=a]`).appendChild(feedback); 
        }
        feedback.innerText = side === 'left' ? pi_cursor_left : pi_cursor_right; 
    }; 
    set_pi_cursors('left'); 
    set_pi_cursors('right'); 
     
    const handle_numpad_touchstart = (touchstart, side) => {
        if(touchstart.target.classList.contains('numpad-num')) {
            if(touchstart.target.getAttribute('value') === (side === 'left' ? pi_digits[pi_cursor_left] : pi_digits[pi_cursor_right])) {
                side === 'left' ? ++pi_cursor_left : ++pi_cursor_right; 
                set_pi_cursors(side); 
            }
        }
    }; 
    
    document.querySelector('#numpad-left').addEventListener('touchstart', touchstart => handle_numpad_touchstart(touchstart, 'left')); 
    document.querySelector('#numpad-right').addEventListener('touchstart', touchstart => handle_numpad_touchstart(touchstart, 'right')); 
}); 