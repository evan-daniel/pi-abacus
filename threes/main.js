
// ABACUS COLUMN
// MY ANTIQUATED VERSION OF SAFARI REQUIRES OLD-STYLE CLASS DECLARATIONS
const abacus_column = function(abacus_base, parent_element) {
    this.constructor = (abacus_base, parent_element) => {
        this.abacus_base = abacus_base; 
        this.parent_element = parent_element; 
        this.bead_height = window.innerHeight / (abacus_base + 1); 
        
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

            // PUSH BEADS
            this.beads.push(bead); 
            this.bead_tops[i] = i * this.bead_height; 
            bead.style.top = `${this.bead_tops[i]}px`; 
        }
    }; 

    // TRIGGERED BY COLUMN TOUCH-START
    this.start_move = (moving_bead_index, drag_start) => {
        this.moving_bead_index = moving_bead_index; 
        this.drag_start = drag_start; 
        this.bead_drag_start = this.bead_tops[moving_bead_index]; 
    }; 
    
    // AFTER TOUCH-START AND BEFORE TOUCH-END
    this.move = drag_y => {
        const delta = drag_y - this.drag_start; 
        this.bead_tops[this.moving_bead_index] = this.bead_drag_start + delta; 
        
        // PROPAGATE NORTH
        const propagate_north = () => {
            this.bead_tops[this.bead_tops.length - 1] = Math.min(window.innerHeight - this.bead_height, this.bead_tops[this.bead_tops.length - 1]); 
            for(let i = this.beads.length; 0 < i; --i) {
                if(this.bead_tops[i] - this.bead_height < this.bead_tops[i - 1]) {
                    this.bead_tops[i - 1] = this.bead_tops[i] - this.bead_height; 
                } 
            }
        }; 

        // PROPAGATE SOUTH
        const propagate_south = () => {
            this.bead_tops[0] = Math.max(0, this.bead_tops[0]); 
            for(let i = 0; i < this.beads.length - 1; ++i) {
                if(this.bead_tops[i + 1] < this.bead_tops[i] + this.bead_height) {
                    this.bead_tops[i + 1] = this.bead_tops[i] + this.bead_height; 
                }
            }
        }; 

        // APPLY 
        if (delta < 0) {
            propagate_north(); 
            propagate_south(); 
        } else if (0 < delta) {
            propagate_south(); 
            propagate_north(); 
        }
        for(let i = 0; i < this.beads.length; ++i) {
            this.beads[i].style.top = `${this.bead_tops[i]}px`; 
        }
    }; 

    // REPORT INPUT
    this.report_input = () => {
        const input = [0, 0, 0, 0, 0]; 
        this.bead_tops.forEach(bead_top => {
            input[Math.round(bead_top / this.bead_height)] = 1; 
        }); 
        let value = 0; 
        switch(JSON.stringify(input)) {
            case '[1,1,1,0,0]': 
                break; 
            case '[1,1,0,1,0]': 
                value = 1; 
                break; 
            case '[1,0,1,1,0]': 
                value = 2; 
                break; 
            case '[0,1,1,1,0]': 
                value = 3; 
                break; 
            case '[0,1,1,0,1]': 
                value = 4; 
                break; 
            case '[0,1,0,1,1]': 
                value = 5; 
                break; 
            case '[0,0,1,1,1]': 
                value = 6; 
                break; 
            case '[1,0,0,1,1]': 
                value = 7; 
                break; 
            case '[1,0,1,0,1]': 
                value = 8; 
                break; 
            case '[1,1,0,0,1]': 
                value = 9; 
                break; 

        }
        return value; 
    }; 

    // CALL
    this.constructor(abacus_base, parent_element); 
}; 

// DRIVES ABACUS AND PI
window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    
    // INIT
    let cursor = 0; 
    document.querySelector('#cursor').innerText = cursor; 

    // ABACUS COLUMNS
    const columns = []; 
    document.querySelectorAll('#abacus .column').forEach((column, i) => {
        columns.push(new abacus_column(4, column)); 

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

const pi = '141592653589793238462643383279502884197169399375105820974944592307816406286'
    + '208998628034825342117067982148086513282306647093844609550582231725359408128481'
    + '117450284102701938521105559644622948954930381964428810975665933446128475648233' 
    + '786783165271201909145648566923460348610454326648213393607260249141273724587006'
    + '606315588174881520920962829254091715364367892590360011330530548820466521384146' 
    + '951941511609433057270365759591953092186117381932611793105118548074462379962749'
    + '567351885752724891227938183011949129833673362440656643086021394946395224737190' 
    + '702179860943702770539217176293176752384674818467669405132000568127145263560827' 
    + '785771342757789609173637178721468440901224953430146549585371050792279689258923' 
    + '542019956112129021960864034418159813629774771309960518707211349999998372978049' 
    + '951059731732816096318595024459455346908302642522308253344685035261931188171010' 
    + '003137838752886587533208381420617177669147303598253490428755468731159562863882' 
    + '353787593751957781857780532171226806613001927876611195909216420198938095257201' 
    + '065485863278865936153381827968230301952035301852968995773622599413891249721775' 
    + '283479131515574857242454150695950829533116861727855889075098381754637464939319' 
    + '255060400927701671139009848824012858361603563707660104710181942955596198946767' 
    + '837449448255379774726847104047534646208046684259069491293313677028989152104752' 
    + '162056966024058038150193511253382430035587640247496473263914199272604269922796' 
    + '782354781636009341721641219924586315030286182974555706749838505494588586926995' 
    + '690927210797509302955321165344987202755960236480665499119881834797753566369807' 
    + '426542527862551818417574672890977772793800081647060016145249192173217214772350' 
    + '141441973568548161361157352552133475741849468438523323907394143334547762416862' 
    + '518983569485562099219222184272550254256887671790494601653466804988627232791786' 
    + '085784383827967976681454100953883786360950680064225125205117392984896084128488' 
    + '626945604241965285022210661186306744278622039194945047123713786960956364371917' 
    + '287467764657573962413890865832645995813390478027590099465764078951269468398352' 
    + '595709825822620522489407726719478268482601476990902640136394437455305068203496' 
    + '252451749399651431429809190659250937221696461515709858387410597885959772975498' 
    + '930161753928468138268683868942774155991855925245953959431049972524680845987273' 
    + '644695848653836736222626099124608051243884390451244136549762780797715691435997' 
    + '700129616089441694868555848406353422072225828488648158456028506016842739452267'
    + '467678895252138522549954666727823986456596116354886230577456498035593634568174' 
    + '324112515076069479451096596094025228879710893145669136867228748940560101503308' 
    + '617928680920874760917824938589009714909675985261365549781893129784821682998948' 
    + '722658804857564014270477555132379641451523746234364542858444795265867821051141' 
    + '354735739523113427166102135969536231442952484937187110145765403590279934403742' 
    + '007310578539062198387447808478489683321445713868751943506430218453191048481005'; 