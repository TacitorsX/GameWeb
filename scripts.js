const numberIndicator = document.querySelector('.numbers')
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

function recurcao  (num,des,vel) {
    numberIndicator.textContent = String(num).padStart(2,0)
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