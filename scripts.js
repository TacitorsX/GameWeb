const numberIndicator = document.querySelector('.numbers')
const bar = document.getElementById("bar")
const button = document.getElementById("button");
const estado = {chutando: false}; /*controla se o jogador está chutando ou não*/
const estado1 = {consegueChutar: true};/*Controla se o jogador conseguiu chutar*/
button.onclick = () => {
    if (estado1.consegueChutar){
        estado.chutando = true;/*O jogador começou a chutar*/
        estado1.consegueChutar = false;/*Jogador não chuta imediatamente após o chute anterior*/
        setTimeout(pararChutar,1000)/*define quando parar o chute*/
    }
}

function pararChutar(){/*função pré-definida para utilizar no setTimeout*/
    estado.chutando = false;
    estado1.consegueChutar = true;
}

//Marcador estilo barra
function moverBarra(num){
    switch(num){
        case 0:
            bar.style.transform = 'translate(-169.4px,-14px)'
            break
        case 1:
            bar.style.transform = 'translate(-134.5px,-14px)'
            break
        case 2:
            bar.style.transform = 'translate(-98px,-14px)'
            break
        case 3:
            bar.style.transform = 'translate(-63px,-14px)'
            break
        case 4:
            bar.style.transform = 'translate(-27.6px,-14px)'
            break
        case 5:
            bar.style.transform = 'translate(7.5px,-14px)'
            break
        case 6:
            bar.style.transform = 'translate(40.5px,-14px)'
            break
        case 7:
            bar.style.transform = 'translate(75px,-14px)'
            break
        case 8:
            bar.style.transform = 'translate(108px,-14px)'
            break
        case 9:
            bar.style.transform = 'translate(141.7px,-14px)'
            break
        case 10:
            bar.style.transform = 'translate(174.8px,-14px)'
            break
    }
}

function recurcao  (num,des,vel) {
    numberIndicator.textContent = String(num).padStart(2,0)
    moverBarra(num)
    if (num >= 10){
        return setTimeout(recurcao, vel,num-1,true,vel)
    }
    if (estado.chutando){
        if (num <=2 && num >=0){
            if (vel - 20 >= 0){
                return recurcao(num+1,false,vel-20)
            }
            else{
                return recurcao(num+1,false,10)
            }
        }
    }
    if (num < 0){
        return
    }
    
    if (des){
        return setTimeout(recurcao, vel,num-1,true,vel)
    }
    else{
        return setTimeout(recurcao, vel,num+1,false,vel)
    }   
}

recurcao(5,false,500)