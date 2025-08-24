const numberIndicator = document.querySelector('.numbers')
const pontuacao = document.querySelector('.pont')
const bar = document.getElementById("bar")
const button1 = document.getElementById("button1");

const velocidadeInicial = 80;
const intervaloChute = 6;//determina a partir de qual número o usuário pode chutar
const velocidadeMinima = 20;

const dificuldades = {
    dif1:{
        estados:[
            {dirFinal:true,fun:"recurcao"},
            {dirFinal:false,fun:"recurcao"}
        ],
        vel:60,
        proxNivel:5
    },
    dif2:{
        estados:[
            {dirFinal:true,fun:"recurcao"},
            {dirFinal:false,fun:"recurcao"},
            {dirFinal:true,fun:"trocar"},
            {dirFinal:false,fun:"trocar"},
        ],
        vel:40,
        proxNivel:15
    },
    dif3:{
        estados:[
            {dirFinal:true,fun:"recurcao"},
            {dirFinal:false,fun:"recurcao"},
            {dirFinal:true,fun:"trocar"},
            {dirFinal:false,fun:"trocar"},
        ],
        vel:30,
        proxNivel:25
    },
    dif4:{
        estados:[
            {dirFinal:true,fun:"recurcao"},
            {dirFinal:false,fun:"recurcao"},
            {dirFinal:true,fun:"trocar"},
            {dirFinal:false,fun:"trocar"},
            {dirFinal:true,fun:"foguete"},
            {dirFinal:false,fun:"foguete"}
        ],
        vel:20,
        proxNivel:3000000000000000000000
    }
}

//estados de lado e a função que a bola usa pra se mover se dir for true a bola tá na esquerda
const estadosBola = [
    {dirFinal:true,fun:"recurcao"},
    {dirFinal:false,fun:"recurcao"},
    {dirFinal:true,fun:"trocar"},
    {dirFinal:false,fun:"trocar"},
    {dirFinal:true,fun:"foguete"},
    {dirFinal:false,fun:"foguete"}
];

const esquerda = {chutando: false}; /*controla se o jogador está chutando pra esquerda ou não*/
const estado1 = {consegueChutar: true};/*Controla se o jogador conseguiu chutar*/
const direita = {chutando: false}

//pega um estado da bola aleatorio
const random = (dif) => Math.floor(Math.random() * dif.estados.length);
//random() é utilizado em trocarEstado() para variar o comportamento do jogo
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
        setTimeout(pararChutar,1000)/*define quando parar o chute*/
    }
}

//checa se a direção do chute e da bola são o mesmos
function checarChute(dir){
   return dir == "esquerda" ? esquerda.chutando : direita.chutando;
}
//função pré-definida para utilizar no setTimeout(), essa função reseta o estado de chute, permitindo que o jogador chute novamente
function pararChutar(){
    esquerda.chutando = false;
    direita.chutando = false;
    estado1.consegueChutar = true;
}

//Marcador estilo barra, atualiza sua posição
function moverBarra(num,dir){
    if (dir != "esquerda" && dir != "direita"){
        bar.style.transform = `translate(0px, ${-14*num*0.8}px)`
    }
    if (dir == "esquerda"){
        bar.style.transform = `translate(-40.5px, ${-14*num*0.8}px)`
    }
    if (dir == "direita"){
        bar.style.transform = `translate(40.5px,${-14*num*0.8}px)`
    }
    
}

function dificuldadeAtual(pont){
    return pont<=5?dificuldades.dif1:pont<=15?dificuldades.dif2:pont<=25?dificuldades.dif3:dificuldades.dif4
}

function checaDireção (num,dir,dirFinal){
    return dir == dirFinal? dir :num == 49? moveDireção(dir): dir
}

function moveDireção(dir){
    return dir == "esquerda"? "meioE" : dir == "meioE"? "direita" :dir == "direita"? "meioD" : dir == "meioD"? "esquerda" :"esquerda"
}
// a variavel recurssao usa o (num) que define a altura da bola, (des) que define se o num esta subindo ou descendo, (vel) o tempo de um passo,(pont) que é a pontução atual
function recurcao  (num,des,vel,pont,dir,dirFinal) {
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)
    moverBarra(num,dir)
    // quando a bola chega a 10 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    
    if (num >= 50){
        return setTimeout(()=>recurcao(num-1,true,vel,pont,dir,dirFinal),vel)
    }
    // se o jogador estiver chutando ele checa se o num é dois ou menor, se for bota des pra falso, joga o num pra cima e adiciona pontuação 
    if (checarChute(dir) && des && num <= intervaloChute && num >= 0){
        pararChutar();
        const novaVel = Math.max(velocidadeMinima, vel - 5);
        return trocarEstado(num+1, novaVel, pont + intervaloChute - num,dir,dirFinal);
    }

    if (num < 0) return;

    if (des){
        return setTimeout(()=> recurcao(num-1,true,vel,pont,checaDireção(num,dir,dirFinal),dirFinal),vel);   
    }
    else{
        return setTimeout(()=> recurcao(num+1,false,vel,pont,checaDireção(num,dir,dirFinal),dirFinal),velocidadeMinima);
    }   
}

//mesma coisa que chutar só que a bola troca de direção a cada multipo de 10
function trocar(num,des,vel,pont,dir,dirFinal) {
    numberIndicator.textContent = String(num).padStart(2,0);
    pontuacao.textContent = String(pont).padStart(2,0);

    const trocarDireção = (num%10 == 0) ? moveDireção(dir) : dir;
    moverBarra(num,dir);

    // quando a bola chega a 10 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    if (num >= 50){
        return setTimeout(()=>trocar(num-1,true,vel,pont,moveDireção(dirFinal),dirFinal),vel)
    }
    // se o jogador estiver chutando ele checa se o num está dentro do intervalo
    // se positivo, joga o num pra cima, e se o jogador chutar registra o chute e adiciona pontuação, depois troca de estado.
    if (checarChute(dir) && des && num <= intervaloChute && num>= 0){
            pararChutar()
            const novaVel = Math.max(velocidadeMinima, vel - 5);
            return trocarEstado(num+1,novaVel,pont+intervaloChute-num,dir);
    }
    if (num < 0) return;
    
    if (des){
        return setTimeout(()=> trocar(num-1,true,vel,pont,trocarDireção,dirFinal), vel);
    }
    else{
        return setTimeout(()=>trocar(num+1,false,vel,pont,trocarDireção,dirFinal), velocidadeMinima);
    }
}   

function foguete(num,des,vel,pont,dir,dirFinal){
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)
    const altura = !des? num : num>10?50:num*(50/10)
    moverBarra(altura,dir)
    // quando a bola chega a 10 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    
    if (num >= 50){
        return setTimeout(()=>foguete(num-1,true,vel,pont,dir,dirFinal),vel)
    }
    // se o jogador estiver chutando ele checa se o num é dois ou menor, se for bota des pra falso, joga o num pra cima e adiciona pontuação 
    if (checarChute(dir) && des && num <= intervaloChute && num >= 0){
        pararChutar();
        const novaVel = Math.max(velocidadeMinima, vel - 5);
        return trocarEstado(num+1, novaVel, pont + intervaloChute - num,dir,dirFinal);
    }

    if (num < 0) return;

    if (des){
        return setTimeout(()=> foguete(num-1,true,vel,pont,checaDireção(num,dir,dirFinal),dirFinal),velocidadeMinima+30);   
    }
    else{
        return setTimeout(()=> foguete(num+1,false,vel,pont,checaDireção(num,dir,dirFinal),dirFinal),velocidadeMinima);
    }
}

//troca a função que a bola usa pra se mover depois de um chute
function trocarEstado(num,_vel,pont,dir){
    const dificuldade = dificuldadeAtual(pont)
    const novoEstado = dificuldade.estados[random(dificuldade)]
    if (novoEstado.fun === "recurcao"){
        recurcao(num,false, dificuldade.vel,pont,dir,novoEstado.dir)
    } 
    if (novoEstado.fun === "trocar"){
        trocar(num,false, dificuldade.vel,pont,dir,novoEstado.dir)
    }
    if (novoEstado.fun === "foguete"){
        foguete(num,false, dificuldade.vel,pont,dir,novoEstado.dir)
    }
}


//inicio do jogo
trocarEstado(1,velocidadeInicial,0,"esquerda")