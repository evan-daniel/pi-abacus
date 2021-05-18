import { pi } from '../pi_digits.js'; 
import { abacus_column } from './abacus_column.js'; 

// DRIVES ABACUS AND π
window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    
    // INIT
    let cursor = 0; 
    document.querySelector('#cursor').innerText = cursor; 
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`); 

    // ABACUS COLUMNS
    const columns = []; 
    document.querySelectorAll('#abacus .column').forEach((column, i) => {
        columns.push(new abacus_column(10, column)); 

        // START OF INTERACTION
        column.addEventListener('touchstart', touchstart => {
            touchstart.preventDefault(); 
            const touched = touchstart.targetTouches[0].target; 
            if(touched.classList.contains(`bead`)) {
                columns[i].start_move(+touched.getAttribute('index'), touchstart.targetTouches[0].clientY); 
            }
        }); 

        // MOVEMENT
        column.addEventListener('touchmove', touchmove => {
            touchmove.preventDefault(); 
            if(touchmove.targetTouches[0].target.classList.contains('bead')) {
                columns[i].move(touchmove.targetTouches[0].clientY); 
            }
        }); 
    }); 

    // LIFT TO SUBMIT INPUT
    let running_total = +pi.charAt(cursor); 
    const lift = () => {
        let input = 0; 
        columns.forEach((column, i) => {
            input += column.report_input() * Math.pow(10, columns.length - 1 - i); 
        }); 
        if(input === running_total) {
            running_total += +pi.charAt(++cursor); 
        }
        document.querySelector('#cursor').innerText = cursor; 
        // document.querySelector('#entered').innerText = input; 
    }; 
    document.addEventListener('mouseup', lift); 
    document.addEventListener('touchend', touchend => {
        if(touchend.touches.length === 0) {
            lift(); 
            console.log('LIFT'); 
        }
    }); 
}); 