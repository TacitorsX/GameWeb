const numberIndicator = document.querySelector('.numbers')
const pontuacao = document.querySelector('.pont')
const ball = document.getElementById("ball")
const button1 = document.getElementById("button1");

const playerIdleLeft = document.getElementById("playerIdleLeft");
const playerKickLeft = document.getElementById("playerKickLeft");
const playerIdleRight = document.getElementById("playerIdleRight");
const playerKickRight = document.getElementById("playerKickRight");

const velocidadeInicial = 80;
const intervaloChute = 6;//determina a partir de qual número o usuário pode chutar
const velocidadeMinima = 20;

const audio = document.getElementById("audio")
const audio1 = document.getElementById("audio1")


// as dificuldades, elas tem as maneiras que a bola pode se mover, a velocidade, o nivel machimo e minimo
const dificuldades = [
    {
        estados:[
            {dirFinal:true,fun:"recurcao"},
            {dirFinal:false,fun:"recurcao"}
        ],
        vel:40,
        minNivel:0,
        proxNivel:10
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"sacana"},
            {dirFinal:"direita",fun:"sacana"}
        ],
        vel:35,
        minNivel:10,
        proxNivel:20
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"trocar"},
            {dirFinal:"direita",fun:"trocar"}
        ],
        vel:35,
        minNivel:20,
        proxNivel:30
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"trocar"},
            {dirFinal:"direita",fun:"trocar"},
            {dirFinal:"esquerda",fun:"sacana"},
            {dirFinal:"direita",fun:"sacana"}
        ],
        vel:30,
        minNivel:30,
        proxNivel:40
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"foguete"},
            {dirFinal:"direita",fun:"foguete"}
        ],
        vel:25,
        minNivel:40,
        proxNivel:50
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"foguete"},
            {dirFinal:"direita",fun:"foguete"},
            {dirFinal:"esquerda",fun:"trocar"},
            {dirFinal:"direita",fun:"trocar"},
            {dirFinal:"esquerda",fun:"sacana"},
            {dirFinal:"direita",fun:"sacana"}
        ],
        vel:25,
        minNivel:50,
        proxNivel:60
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"foguete"},
            {dirFinal:"direita",fun:"foguete"},
            {dirFinal:"esquerda",fun:"trocar"},
            {dirFinal:"direita",fun:"trocar"},
            {dirFinal:"esquerda",fun:"sacana"},
            {dirFinal:"direita",fun:"sacana"},
            {dirFinal:"esquerda",fun:"sacanaStart"},
            {dirFinal:"direita",fun:"sacanaStart"}
        ],
        vel:20,
        minNivel:60,
        proxNivel:70
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"foguete"},
            {dirFinal:"direita",fun:"foguete"},
            {dirFinal:"esquerda",fun:"trocar"},
            {dirFinal:"direita",fun:"trocar"},
            {dirFinal:"esquerda",fun:"sacana"},
            {dirFinal:"direita",fun:"sacana"},
            {dirFinal:"esquerda",fun:"sacanaStart"},
            {dirFinal:"direita",fun:"sacanaStart"}
        ],
        vel:15,
        minNivel:70,
        proxNivel:80
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"foguete"},
            {dirFinal:"direita",fun:"foguete"},
            {dirFinal:"esquerda",fun:"foguete2"},
            {dirFinal:"direita",fun:"foguete2"}
        ],
        vel:20,
        minNivel:80,
        proxNivel:90
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"foguete"},
            {dirFinal:"direita",fun:"foguete"},
            {dirFinal:"esquerda",fun:"foguete2"},
            {dirFinal:"direita",fun:"foguete2"},
            {dirFinal:"esquerda",fun:"trocar"},
            {dirFinal:"direita",fun:"trocar"},
            {dirFinal:"esquerda",fun:"sacana"},
            {dirFinal:"direita",fun:"sacana"},
            {dirFinal:"esquerda",fun:"sacanaStart"},
            {dirFinal:"direita",fun:"sacanaStart"}
        ],
        vel:15,
        minNivel:90,
        proxNivel:100
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"foguete"},
            {dirFinal:"direita",fun:"foguete"},
            {dirFinal:"esquerda",fun:"foguete2"},
            {dirFinal:"direita",fun:"foguete2"},
            {dirFinal:"esquerda",fun:"trocar"},
            {dirFinal:"direita",fun:"trocar"},
            {dirFinal:"esquerda",fun:"sacana"},
            {dirFinal:"direita",fun:"sacana"},
            {dirFinal:"esquerda",fun:"sacanaStart"},
            {dirFinal:"direita",fun:"sacanaStart"}
        ],
        vel:10,
        minNivel:100,
        proxNivel:9999999999999999999999999999999999999999999
    },
    {
        estados:[
            {dirFinal:"esquerda",fun:"recurcao"},
            {dirFinal:"direita",fun:"recurcao"},
            {dirFinal:"esquerda",fun:"foguete"},
            {dirFinal:"direita",fun:"foguete"},
            {dirFinal:"esquerda",fun:"foguete2"},
            {dirFinal:"direita",fun:"foguete2"},
            {dirFinal:"esquerda",fun:"trocar"},
            {dirFinal:"direita",fun:"trocar"},
            {dirFinal:"esquerda",fun:"sacana"},
            {dirFinal:"direita",fun:"sacana"},
            {dirFinal:"esquerda",fun:"sacanaStart"},
            {dirFinal:"direita",fun:"sacanaStart"}
        ],
        vel:5,
        minNivel:100,
        proxNivel:9999999999999999999999999999999999999999999
    }
]



const esquerda = {chutando: false} /*controla se o jogador está chutando pra esquerda ou não*/
const estado1 = {consegueChutar: true}/*Controla se o jogador conseguiu chutar*/
const direita = {chutando: false}

const keyboardClick = document.addEventListener('keydown',function(event){
    if(event.keyCode==37){
        if (estado1.consegueChutar){
        esquerda.chutando = true;/*O jogador começou a chutar*/
        estado1.consegueChutar = false;/*Jogador não chuta imediatamente após o chute anterior*/
        playerKickLeft.style.transform=`translate(50px, 0px)`
        playerKickRight.style.transform=`translate(99999999px, 99999999px)`
        playerIdleLeft.style.opacity=0
        playerIdleRight.style.opacity=0
        setTimeout(pararChutar,1000)/*define quando parar o chute*/
        setTimeout(animarChute,5000)
    }
} 
    if(event.keyCode==39){
        if (estado1.consegueChutar){
        direita.chutando = true;/*O jogador começou a chutar*/
        estado1.consegueChutar = false;/*Jogador não chuta imediatamente após o chute anterior*/
        playerKickLeft.style.transform=`translate(99999999px, 99999999px)`
        playerKickRight.style.transform=`translate(50px, 0px)`
        playerIdleLeft.style.opacity=0
        playerIdleRight.style.opacity=0
        setTimeout(pararChutar,10000)/*define quando parar o chute*/
        setTimeout(animarChute,5000)
    }
}
    if(event.keyCode==13){
        audio.play()
        audio1.play()
    }
})

//pega um estado da bola aleatorio
const random = (dif) => Math.floor(Math.random() * dif.estados.length);

//random() é utilizado em trocarEstado() para variar o comportamento do jogo
button1.onclick = () => {
    if (estado1.consegueChutar){
        esquerda.chutando = true;/*O jogador começou a chutar*/
        estado1.consegueChutar = false;/*Jogador não chuta imediatamente após o chute anterior*/
        playerKickLeft.style.transform=`translate(50px, 0px)`
        playerKickRight.style.transform=`translate(99999999px, 99999999px)`
        playerIdleLeft.style.opacity=0
        playerIdleRight.style.opacity=0
        setTimeout(pararChutar,1000)/*define quando parar o chute*/
        setTimeout(animarChute,5000)
    }
}
button2.onclick = () => {
    if (estado1.consegueChutar){
        direita.chutando = true;/*O jogador começou a chutar*/
        estado1.consegueChutar = false;/*Jogador não chuta imediatamente após o chute anterior*/
        playerKickLeft.style.transform=`translate(99999999px, 99999999px)`
        playerKickRight.style.transform=`translate(50px, 0px)`
        playerIdleLeft.style.opacity=0
        playerIdleRight.style.opacity=0
        setTimeout(pararChutar,10000)/*define quando parar o chute*/
        setTimeout(animarChute,5000)
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

function animarChute(){
    //coloca os sprites de chute pra fora da tela e ativa os sprites normais
    playerKickLeft.style.transform=`translate(99999999px, 99999999px)`
    playerKickRight.style.transform=`translate(99999999px, 99999999px)`
    playerIdleLeft.style.opacity=1
    playerIdleRight.style.opacity=1
}

//move a bola dependendo da direção e numero atual
function moverBola(num,dir){
    if (dir == "esquerda"){
        ball.style.transform = `translate(-60.5px, ${-15*num*0.6 + 50}px)`
        playerIdleLeft.style.transform= `translate(50px, 0px)`
        playerIdleRight.style.transform=`translate(99999999px, 99999999px)`
        
    } else if (dir == "direita"){
        ball.style.transform = `translate(80.5px,${-15*num*0.6 + 50}px)`
        playerIdleLeft.style.transform=`translate(99999999px, 99999999px)`
        playerIdleRight.style.transform=`translate(50px, 0px)`;

    }else{
        ball.style.transform = `translate(20px,${-15*num*0.6 + 50}px)`
    }
    
}

// filtra a dificuldade pela pontuação atual entre o nivel minimo e maximo de cada dificuldade
function dificuldadeAtual(pont){
    //o retorno do filter é uma lista de uma coisa só ent a gente pega o primeiro iten com o [0]
    return dificuldades.filter(x=>x.minNivel <= pont && pont < x.proxNivel)[0]
}

// checa se a direção da bola é a posição final, se não for usa moveDireção
function checaDireção (num,dir,dirFinal){
    return dir == dirFinal? dir :num == 49? moveDireção(dir): dir
}

// seforesquerda passa pra meioE se for meioE passapra direita e assim vai
function moveDireção(dir){
    return dir == "esquerda"? "meioE" : dir == "meioE"? "direita" :dir == "direita"? "meioD" : dir == "meioD"? "esquerda" :"esquerda"
}
// a variavel recurssao usa o (num) que define a altura da bola, (des) que define se o num esta subindo ou descendo, (vel) o tempo de um passo,(pont) que é a pontução atual
function recurcao  (num,des,vel,pont,dir,dirFinal) {
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)
    moverBola(num,dir)
    // quando a bola chega a 50 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    
    if (num >= 50){
        return setTimeout(()=>recurcao(num-1,true,vel,pont,dir,dirFinal),vel)
    }
    // se a bola tiver descendo, o chute acertou e a bola tá no intervalo de chute, volta pra função principal e adiciona pontuação
    if (checarChute(dir) && des && num <= intervaloChute && num >= 0){
        const novaVel = Math.max(velocidadeMinima, vel - 5);
        return trocarEstado(num+1, novaVel, pont + intervaloChute - num,dir,dirFinal);
    }

    if (num < 0) {return};

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

    moverBola(num,dir);

    //se a posição da bola for um multiplo a direção é alterada
    const trocarDireção = (num%10 == 0) ? moveDireção(dir) : dir;

    // quando a bola chega a 50 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    if (num >= 50){
        return setTimeout(()=>trocar(num-1,true,vel,pont,moveDireção(moveDireção(dirFinal)),dirFinal),vel)
    }
    // se o jogador estiver chutando ele checa se o num está dentro do intervalo
    // se positivo, joga o num pra cima, e se o jogador chutar registra o chute e adiciona pontuação, depois troca de estado.
    if (checarChute(dir) && des && num <= intervaloChute && num>= 0){
            const novaVel = Math.max(velocidadeMinima, vel - 5);
            return trocarEstado(num+1,novaVel,pont+intervaloChute-num,dir);
    }
    if (num < 0) {return};
    
    if (des){
        return setTimeout(()=> trocar(num-1,true,vel,pont,trocarDireção,dirFinal), vel);
    }
    else{
        return setTimeout(()=>trocar(num+1,false,vel,pont,trocarDireção,dirFinal), velocidadeMinima);
    }
}   

// mesmo esquema que recucao mais a bola espera antes de cair
function foguete(num,des,vel,pont,dir,dirFinal){
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)

    // se o num da bola for maior que 10 ela fica parada em cima, quando chega a 10 ela cai rapidamente
    const altura = !des? num : num>10?50:num*(50/10)
    moverBola(altura,dir)
    // quando a bola chega a 50 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    
    if (num >= 50){
        return setTimeout(()=>foguete(num-1,true,vel,pont,dir,dirFinal),vel)
    }
    // se a bola tiver descendo, o chute acertou e a bola tá no intervalo de chute, volta pra função principal e adiciona pontuação
    if (checarChute(dir) && des && num <= intervaloChute && num >= 0){
        const novaVel = Math.max(velocidadeMinima, vel - 5);
        return trocarEstado(num+1, novaVel, pont + intervaloChute - num,dir,dirFinal);
    }

    if (num < 0) {return};

    if (des){
        return setTimeout(()=> foguete(num-1,true,vel,pont,checaDireção(num,dir,dirFinal),dirFinal),velocidadeMinima+10);   
    }
    else{
        return setTimeout(()=> foguete(num+1,false,vel,pont,checaDireção(num,dir,dirFinal),dirFinal),velocidadeMinima);
    }
}

function foguete2(num,des,vel,pont,dir,dirFinal){
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)

    // se a bola for maior que 10 ela fica parada em cima, quando chega a 10 ela cai rapidamente
    const altura = !des? num : num>30?50 :num <= 20 && num>15?25 :num > 20?num*(50/30):num*(20/15)
    moverBola(altura,dir)
    // quando a bola chega a 50 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    
    if (des && (num == 20 || num == 15)){
        return setTimeout(()=> foguete2(num-1,true,vel,pont,moveDireção(dir),dirFinal),velocidadeMinima+30); 
    }

    if (num >= 50){
        return setTimeout(()=>foguete2(num-1,true,vel,pont,dir,dirFinal),vel)
    }
    // se a bola tiver descendo, o chute acertou e a bola tá no intervalo de chute, volta pra função principal e adiciona pontuação
    if (checarChute(dir) && des && num <= intervaloChute && num >= 0){
        const novaVel = Math.max(velocidadeMinima, vel - 5);
        return trocarEstado(num+1, novaVel, pont + intervaloChute - num,dir,dirFinal);
    }

    if (num < 0) {return};

    if (des){
        return setTimeout(()=> foguete2(num-1,true,vel,pont,checaDireção(num,dir,dirFinal),dirFinal),velocidadeMinima+10);   
    }
    else{
        return setTimeout(()=> foguete2(num+1,false,vel,pont,checaDireção(num,dir,dirFinal),dirFinal),velocidadeMinima);
    }
}


function sacanaStart (num,des,vel,pont,dir,dirFinal,volta) {
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)
    moverBola(num,dir)
    // quando a bola chega a 50 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    
    if (num >= 50){
        return setTimeout(()=>sacanaStart(num-1,true,vel,pont,dir,dirFinal,volta),vel)
    }
    if (num == 40 && des && volta){
        return setTimeout(()=>trocarEstado(num+1,vel,pont,dir),vel)
    }

    // se a bola tiver descendo, o chute acertou e a bola tá no intervalo de chute, volta pra função principal e adiciona pontuação
    if (checarChute(dir) && des && num <= intervaloChute && num >= 0){
        const novaVel = Math.max(velocidadeMinima, vel - 5);
        return trocarEstado(num+1, novaVel, pont + intervaloChute - num,dir,dirFinal);
    }

    if (num < 0) {return};

    if (des){
        return setTimeout(()=> sacanaStart(num-1,true,vel,pont,checaDireção(num,dir,dirFinal),dirFinal,volta),vel);   
    }
    else{
        return setTimeout(()=> sacanaStart(num+1,false,vel,pont,checaDireção(num,dir,dirFinal),dirFinal,volta),velocidadeMinima);
    }   
}

// a bola vai e volta
function sacana  (num,des,vel,pont,dir,dirFinal,volta) {
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)
    moverBola(num,dir)
    // quando a bola chega a 50 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    
    if (num >= 50){
        return setTimeout(()=>sacana(num-1,true,vel,pont,dir,dirFinal,volta),vel)
    }
    if (num == 40 && des && volta){
        return setTimeout(()=>sacana(num+1,false,vel,pont,dir,!dirFinal,!volta),vel)
    }

    // se a bola tiver descendo, o chute acertou e a bola tá no intervalo de chute, volta pra função principal e adiciona pontuação
    if (checarChute(dir) && des && num <= intervaloChute && num >= 0){
        const novaVel = Math.max(velocidadeMinima, vel - 5);
        return trocarEstado(num+1, novaVel, pont + intervaloChute - num,dir,dirFinal);
    }

    if (num < 0) {return};

    if (des){
        return setTimeout(()=> sacana(num-1,true,vel,pont,checaDireção(num,dir,dirFinal),dirFinal,volta),vel);   
    }
    else{
        return setTimeout(()=> sacana(num+1,false,vel,pont,checaDireção(num,dir,dirFinal),dirFinal,volta),velocidadeMinima);
    }   
}

//troca a função que a bola usa pra se mover depois de um chute
function trocarEstado(num,vel,pont,dir){
    pararChutar()
    const dificuldade = dificuldadeAtual(pont)
    const novoEstado = dificuldade.estados[random(dificuldade)]
    if (novoEstado.fun == "recurcao"){
        recurcao(num,false, dificuldade.vel,pont,dir,novoEstado.dirFinal)
    } 
    if (novoEstado.fun == "trocar"){
        trocar(num,false, dificuldade.vel,pont,dir,novoEstado.dirFinal)
    }
    if (novoEstado.fun == "foguete"){
        foguete(num,false, dificuldade.vel,pont,dir,novoEstado.dirFinal)
    }
    if (novoEstado.fun == "sacana"){
        sacana(num,false, dificuldade.vel,pont,dir,novoEstado.dirFinal,true)
    }
    if (novoEstado.fun == "sacanaStart"){
        sacanaStart(num,false, dificuldade.vel,pont,dir,novoEstado.dirFinal,true)
    }
    if (novoEstado.fun == "foguete2"){
        foguete2(num,false, dificuldade.vel,pont,dir,novoEstado.dirFinal)
    }
}

//inicio do jogo
animarChute()
trocarEstado(0,0,0,"esquerda")