const numberIndicator = document.querySelector('.numbers')
const pontuacao = document.querySelector('.pont')
const bar = document.getElementById("bar")
const button1 = document.getElementById("button1");

//estados de lado e a função que a bola usa pra se mover se dir for true a bola tána esquerda
const estadosBola = [{dir:true,fun:"recurcao"},{dir:false,fun:"recurcao"},{dir:true,fun:"trocar"},{dir:false,fun:"trocar"}]

const esquerda = {chutando: false}; /*controla se o jogador está chutando pra esquerda ou não*/
const estado1 = {consegueChutar: true};/*Controla se o jogador conseguiu chutar*/
const direita = {chutando: false}

//pega um estado da bola aleatorio
const random = () => Math.floor(Math.random() * estadosBola.length);

button1.onclick = () => {
    if (estado1.consegueChutar){
        esquerda.chutando = true;/*O jogador começou a chutar*/
        estado1.consegueChutar = false;/*Jogador não chuta imediatamente após o chute anterior*/
        setTimeout(pararChutar,1000)/*define quando parar o chute*/
    }
}
button2.onclick = () => {
    if (estado1.consegueChutar){
        direita.chutando = true;/*O jogador começou a chutar*/
        estado1.consegueChutar = false;/*Jogador não chuta imediatamente após o chute anterior*/
        setTimeout(pararChutar,50)/*define quando parar o chute*/
    }
}

//checa se a direção do chute e da bola são o mesmos
function checarChute(dir){
    if (dir){
        if (esquerda.chutando == true){
            return true
        }
    }
    else{
        if (direita.chutando == true){
            return true
        }
    }
    return false
}

function pararChutar(){/*função pré-definida para utilizar no setTimeout*/
    esquerda.chutando = false;
    direita.chutando = false;

    estado1.consegueChutar = true;
}

//Marcador estilo barra
function moverBarra(num,dir){
    if (dir == true){
        bar.style.transform = 'translate(-40.5px,'+String(-14*num*0.8)+'px)'
        return
    }
    bar.style.transform = 'translate(40.5px,'+String(-14*num*0.8)+'px)'
    
}

// a variavel recurssao usa o (num) que define a altura da bola, (des) que define se o num esta subindo ou descendo, (vel) o tempo de um passo,(pont) que é a pontução atual
function recurcao  (num,des,vel,pont,dir) {
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)
    moverBarra(num,dir)
    // quando a bola chega a 10 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    if (num >= 50){
        return setTimeout(recurcao, vel,num-1,true,vel,pont,dir)
    }
    // se o jogador estiver chutando ele checa se o num é dois ou menor, se for bota des pra falso, joga o num pra cima e adiciona pontuação 
    if (checarChute(dir)){
        if (num <=13){
            if (vel - 10 >= 0){
                pararChutar()
                return trocarEstado(num+1,vel-10,pont+20-num)
            }
            else{
                pararChutar()
                return trocarEstado(num+1,1,pont+20-num)
            }
        }
    }
    if (num < 0){
        return
    }
    
    if (des){
        return setTimeout(recurcao, vel,num-1,true,vel,pont,dir)
    }
    else{
        return setTimeout(recurcao, vel,num+1,false,vel,pont,dir)
    }   
}

//mesma coisa que chutar só que a bola troca de direção a cada multipo de 10
function trocar  (num,des,vel,pont,dir) {
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)
    const trocarDireção = (num) => {if(num%10 == 0){return !dir}else return dir}
    moverBarra(num,dir)
    // quando a bola chega a 10 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    if (num >= 50){
        return setTimeout(trocar, vel,num-1,true,vel,pont,trocarDireção(num))
    }
    // se o jogador estiver chutando ele checa se o num é dois ou menor, se for bota des pra falso, joga o num pra cima e adiciona pontuação 
    if (checarChute(dir)){
        if (num <=13){
            if (vel - 5 >= 0){
                pararChutar()
                return trocarEstado(num+1,vel-2,pont+20-num)
            }
            else{
                pararChutar()
                return trocarEstado(num+1,5,pont+20-num)
            }
        }
    }
    if (num < 0){
        return
    }
    
    if (des){
        return setTimeout(trocar, vel,num-1,true,vel,pont,trocarDireção(num))
    }
    else{
        return setTimeout(trocar, vel,num+1,false,vel,pont,trocarDireção(num))
    }   
}

//troca a função que a bola usa pra se mover depois de um chute
function trocarEstado(num,vel,pont){
    const novoEstado = random()
    if (novoEstado.fun="recurcao"){
        recurcao(num,false,vel,pont,estadosBola[random()].dir)
    }
    if(novoEstado.fun="trocar"){
        trocar(num,false,vel,pont,estadosBola[random()].dir)
    }
}

recurcao(1,false,35,0,true)