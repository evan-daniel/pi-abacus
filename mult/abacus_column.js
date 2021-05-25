
// ABACUS COLUMN
export class abacus_column {
    constructor(abacus_base, parent_element) {
        this.abacus_base = abacus_base; 
        this.parent_element = parent_element; 
        this.bead_height = window.innerHeight / abacus_base; 
        
        // USED FOR MOVEMENT
        this.moving_bead_index = 0; 
        this.drag_start = 0; 
        this.bead_drag_start = 0; 
        
        // CREATE BEADS
        this.beads = []; 
        this.bead_tops = []; 
        for(let i = 0; i < abacus_base - 1; ++i) {
            const bead = document.createElement('div'); 
            bead.classList.add('bead'); 
            bead.setAttribute('index', `${i}`); 
            bead.style.height = `${this.bead_height}px`; 
            parent_element.appendChild(bead); 
            this.beads.push(bead); 
            this.bead_tops[i] = i * this.bead_height + this.bead_height; 
            bead.style.top = `${this.bead_tops[i]}px`; 
        }
    }

    // TRIGGERED BY COLUMN TOUCH-START
    start_move = (moving_bead_index, drag_start) => {
        this.moving_bead_index = moving_bead_index; 
        this.drag_start = drag_start; 
        this.bead_drag_start = this.bead_tops[moving_bead_index]; 
    }; 
    
    // AFTER TOUCH-START AND BEFORE TOUCH-END
    move = drag_y => {
        const delta = drag_y - this.drag_start; 
        this.bead_tops[this.moving_bead_index] = this.bead_drag_start + delta; 
        
        // MOVE ALL BEADS TO BE IN-BOUNDS
        // INCLUDES JUST-MOVED BEAD
        for(let i = 0; i < this.beads.length; ++i) {
            if(this.bead_tops[i] < i * this.bead_height) {
                this.bead_tops[i] = i * this.bead_height; 
            } 
            if(i * this.bead_height + this.bead_height < this.bead_tops[i]) {
                this.bead_tops[i] = i * this.bead_height + this.bead_height; 
            }
        }
        
        // PROPAGATE MOVEMENT NORTH
        if(delta < 0) {
            for(let i = this.moving_bead_index - 1; -1 < i; --i) {
                if(this.bead_tops[i + 1] - this.bead_height < this.bead_tops[i]) {
                    this.bead_tops[i] = this.bead_tops[i + 1] - this.bead_height; 
                } else {
                    break; 
                }
            }
        }

        // PROPAGATE MOVEMENT SOUTH
        if(0 < delta) {
            for(let i = this.moving_bead_index + 1; i < this.beads.length; ++i) {
                if(this.bead_tops[i] < this.bead_tops[i - 1] + this.bead_height) {
                    this.bead_tops[i] = this.bead_tops[i - 1] + this.bead_height; 
                } else {
                    break; 
                }
            }
        }

        // APPLY STYLE
        for(let i = 0; i < this.beads.length; ++i) {
            this.beads[i].style.top = `${this.bead_tops[i]}px`; 
        }
    }; 

    // REPORT INPUT
    report_input = () => {
        let input = 0; 
        this.bead_tops.forEach((bead_top, i) => {
            if(bead_top < i * this.bead_height + 0.5 * this.bead_height) {
                ++input; 
            }
        }); 
        return input; 
    }; 
}; 