import { pi as pi_digits } from '../pi_digits.js'; 

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    const context = document.querySelector('canvas').getContext('2d'); 
    context.canvas.width = context.canvas.clientWidth; 
    context.canvas.height = context.canvas.clientHeight; 
    
    let pi_cursor = 0; 
    const setFeedback = () => {
        document.querySelector('.pi-feedback').innerText = pi_cursor; 
    }; 
    setFeedback(); 
    
    let touch_x = 0, touch_y = 0; 

    const handleLocationChange = (x, y) => {
        touch_x = x; 
        touch_y = y; 
    }; 
    
    context.canvas.addEventListener('touchstart', touchstart => handleLocationChange(touchstart.touches[0].clientX, touchstart.touches[0].clientY)); 
    context.canvas.addEventListener('touchmove', touchmove => {
        touchmove.preventDefault(); 
        handleLocationChange(touchmove.touches[0].clientX, touchmove.touches[0].clientY); 
    }); 

    context.canvas.addEventListener('touchend', touchend => {
        let angle = -Math.atan2(touch_y - context.canvas.height / 2, touch_x - context.canvas.width / 2) / Math.PI / 2; 
        if(angle < 0) {
            angle += 1; 
        }
        if(pi_digits[pi_cursor] === Math.floor(angle * 10).toString()) {
            ++pi_cursor; 
            setFeedback(); 
        } 
        
        touch_x = context.canvas.width / 2; 
        touch_y = context.canvas.height / 2; 
    }); 

    const animate = timestamp => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); 

        context.beginPath(); 
        context.moveTo(context.canvas.width / 2, context.canvas.height / 2); 
        context.lineTo(touch_x, touch_y); 
        context.stroke(); 

        window.requestAnimationFrame(animate); 
    }; 
    window.requestAnimationFrame(animate); 
}); 