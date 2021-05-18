window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    
    // INIT
    const h = window.innerHeight * 0.01; 
    document.documentElement.style.setProperty('--vh', `${h}px`); 
    const beads = document.querySelectorAll('.beads > div'); 
    const bead_tops = []; 
    let count = 500; 

    // EACH BEAD HAS ITS OWN EVENT LISTENERS
    let add = +pi.charAt(count); 
    beads.forEach((bead, bead_index) => {
        let mousedown = false; 
        let drag_start = 0; 
        bead_tops[bead_index] = bead.getBoundingClientRect().top; 
        let bead_start = bead_tops[bead_index]; 
        const bead_height = bead.getBoundingClientRect().height; 
        let touch_identifier = -1; 
    
        bead.addEventListener('mousedown', mousedown => {
            mousedown = true; 
            drag_start = mousedown.y; 
            bead_start = bead_tops[bead_index]; 
        }); 
        bead.addEventListener('touchstart', touchstart => {
            touchstart.preventDefault(); 
            mousedown = true; 
            touch_identifier = touchstart.which; 
            drag_start = touchstart.targetTouches[0].clientY; 
            bead_start = bead_tops[bead_index]; 
        }); 

        // SUBMIT WHEN FINGER LIFTED
        const lift = () => {
            let number = 0; 
            for(let i = 0; i < 10; i++) {
                if(bead_tops[i] < i * bead_height + 0.5 * bead_height) {
                    ++number; 
                }
            }

            if(number === add) {
                add = (add + +pi.charAt(++count)) % 10; 
            }
            document.querySelector('.count').innerHTML = count; 
            document.querySelector('.entered').innerText = number; 
        }; 
        bead.addEventListener('mouseup', () => {
            mousedown = false; 
            lift(); 
        }); 
        bead.addEventListener('touchend', touchend => {
            if(touchend.touches.length === 0) {
                mousedown = false; 
                lift(); 
            }
        }); 

        const move = y => {

            // ONLY RUN WHILE TOUCHING
            if(!mousedown) {
                return; 
            }
            
            // RECORD MOVEMENT
            const delta = y - drag_start; 
            bead_tops[bead_index] = bead_start - drag_start + y; 
            
            // MOVE ALL BEADS TO BE IN-BOUNDS
            // INCLUDES JUST-MOVED BEAD
            for(let i = 0; i < beads.length; i++) {
                if(bead_tops[i] < i * bead_height) {
                    bead_tops[i] = i * bead_height; 
                } 
                if(i * bead_height + bead_height < bead_tops[i]) {
                    bead_tops[i] = i * bead_height + bead_height; 
                }
            }

            // PROPAGATE MOVEMENT NORTH
            if(delta < 0) {
                for(let i = bead_index - 1; -1 < i; i--) {
                    if(bead_tops[i + 1] - bead_height < bead_tops[i]) {
                        bead_tops[i] = bead_tops[i + 1] - bead_height; 
                    } else {
                        break; 
                    }
                }
            }

            // PROPAGATE MOVEMENT SOUTH
            if(0 < delta) {
                for(let i = bead_index + 1; i < beads.length; i++) {
                    if(bead_tops[i] < bead_tops[i - 1] + bead_height) {
                        bead_tops[i] = bead_tops[i - 1] + bead_height; 
                    } else {
                        break; 
                    }
                }
            }

            // APPLY STYLE
            for(let i = 0; i < beads.length; i++) {
                beads[i].style.top = `${bead_tops[i]}px`; 
            }
        }; 
        bead.addEventListener('mousemove', beadMousemove => move(beadMousemove.y)); 
        bead.addEventListener('touchmove', beadTouchmove => {
            beadTouchmove.preventDefault(); 
            move(beadTouchmove.targetTouches[0].clientY); 
        }); 
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
