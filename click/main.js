import { pi as pi_digits } from '../pi_digits.js'; 

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    for(let i = 0; i < 10; ++i) {
        const click = document.createElement('div'); 
        click.classList.add('click'); 
        click.setAttribute('value', i.toString()); 
        document.querySelector('.click-container').prepend(click); 
    }

    let pi_cursor = 0; 
    const update_feedback = () => document.querySelector('.pi-feedback').innerText = pi_cursor; 
    update_feedback(); 
    let pi_running_total = +pi_digits[pi_cursor]; 
    document.querySelector('.click-container').addEventListener('touchstart', touchstart => {
        if(touchstart.target.classList.contains('click')) {
            console.log('RUNNING TOTAL', pi_running_total); 
            if(touchstart.target.getAttribute('value') === (pi_running_total % 10).toString()) {
                pi_running_total += +pi_digits[++pi_cursor]; 
                update_feedback(); 
                var entry_correct = true; 
            }
            touchstart.target.style.backgroundColor = entry_correct ? '#00F' : '#F00'; 
        }
    }); 
    document.querySelector('.click-container').addEventListener('touchend', touchend => {
        if(touchend.target.classList.contains('click')) {
            touchend.target.style.backgroundColor = ''; 
        }
    }); 
}); 