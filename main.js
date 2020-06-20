window.addEventListener('DOMContentLoaded', () => {
    const beads = document.querySelectorAll('.beads > div'); 
    const bead_tops = []; 

    beads.forEach((bead, beadIndex) => {
        let mousedown = false; 
        let drag_start = 0; 
        bead_tops[beadIndex] = bead.getBoundingClientRect().top; 
        let bead_start = bead_tops[beadIndex]; 
        const bead_height = bead.getBoundingClientRect().height; 
        let touch_identifier = -1; 
    
        bead.addEventListener('mousedown', beadMousedown => {
            mousedown = true; 
            drag_start = beadMousedown.y; 
            bead_start = bead_tops[beadIndex]; 
        }); 
        bead.addEventListener('touchstart', beadTouchstart => {
            mousedown = true; 
            touch_identifier = beadTouchstart.which; 
            drag_start = beadTouchstart.targetTouches[0].clientY; 
            bead_start = bead_tops[beadIndex]; 
            console.log(beadTouchstart); 
            document.querySelector('.count').innerHTML = beadTouchstart.detail; 
        }); 
        document.addEventListener('mouseup', () => mousedown = false); 
        document.addEventListener('touch', () => mousedown = false); 

        const move = y => {
            if(!mousedown) return; 
            
            const delta = y - drag_start; 
            bead_tops[beadIndex] = bead_start - drag_start + y; 
    
            for(let i = 0; i < beads.length; i++) {
                const index = delta < 0 ? beads.length - 1 - i : i; 
                
                if(index && delta < 0) bead_tops[index - 1] = Math.min(bead_tops[index - 1], bead_tops[index] - bead_height); 
                else if(index < 4) bead_tops[index + 1] = Math.max(bead_tops[index] + bead_height, bead_tops[index + 1]); 
    
                if(index === 0) bead_tops[index] = Math.max(0, Math.min(bead_height, bead_tops[index])); 
                else bead_tops[index] = Math.max(window.innerHeight * 0.02 + bead_height * (index + 1), Math.min(window.innerHeight * 0.02 + bead_height * (index + 2), bead_tops[index])); 
                
                beads[index].style.top = bead_tops[index] + 'px'; 
            }
        }; 
        bead.addEventListener('mousemove', beadMousemove => move(beadMousemove.y)); 
        bead.addEventListener('touchmove', beadTouchmove => {
            beadTouchmove.preventDefault(); 
            move(beadTouchmove.targetTouches[0].clientY); 
        }); 
    }); 
}); 