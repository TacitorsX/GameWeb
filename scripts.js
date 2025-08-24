const numberIndicator = document.querySelector('.numbers')
const pontuacao = document.querySelector('.pont')
const bar = document.getElementById("bar")
const button1 = document.getElementById("button1");

const velocidadeInicial = 80;
const intervaloChute = 6;//determina a partir de qual número o usuário pode chutar
const velocidadeMinima = 20;

const estadoVelocidade = {velocidadeAtual : velocidadeInicial}
//estados de lado e a função que a bola usa pra se mover se dir for true a bola tá na esquerda
const estadosBola = [
    {dir:true,fun:"recurcao"},
    {dir:false,fun:"recurcao"},
    {dir:true,fun:"trocar"},
    {dir:false,fun:"trocar"}
];

const esquerda = {chutando: false}; /*controla se o jogador está chutando pra esquerda ou não*/
const estado1 = {consegueChutar: true};/*Controla se o jogador conseguiu chutar*/
const direita = {chutando: false}

//pega um estado da bola aleatorio
const random = () => Math.floor(Math.random() * estadosBola.length);
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
   return dir ? esquerda.chutando : direita.chutando;
}
//função pré-definida para utilizar no setTimeout(), essa função reseta o estado de chute, permitindo que o jogador chute novamente
function pararChutar(){
    esquerda.chutando = false;
    direita.chutando = false;
    estado1.consegueChutar = true;
}

//Marcador estilo barra, atualiza sua posição
function moverBarra(num,dir){
    if (dir){
        bar.style.transform = `translate(-40.5px, ${-14*num*0.8}px)`
    }else{
    bar.style.transform = `translate(40.5px,${-14*num*0.8}px)`
    }
}

// a variavel recurssao usa o (num) que define a altura da bola, (des) que define se o num esta subindo ou descendo, (vel) o tempo de um passo,(pont) que é a pontução atual
function recurcao  (num,des,_vel,pont,dir) {
    numberIndicator.textContent = String(num).padStart(2,0)
    pontuacao.textContent = String(pont).padStart(2,0)
    moverBarra(num,dir)
    // quando a bola chega a 10 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    
    if (num >= 50){
        return setTimeout(()=>recurcao(num-1,true,estadoVelocidade.velocidadeAtual,pont,dir),estadoVelocidade.velocidadeAtual)
    }
    // se o jogador estiver chutando ele checa se o num é dois ou menor, se for bota des pra falso, joga o num pra cima e adiciona pontuação 
    if (checarChute(dir) && des && num <= intervaloChute && num >= 0){
        pararChutar();
        estadoVelocidade.velocidadeAtual = Math.max(velocidadeMinima, estadoVelocidade.velocidadeAtual - 5);
        return trocarEstado(num+1, estadoVelocidade.velocidadeAtual, pont + 20 - num);
    }

    if (num < 0) return;

    if (des){
        return setTimeout(()=> recurcao(num-1,true,estadoVelocidade.velocidadeAtual,pont,dir),estadoVelocidade.velocidadeAtual);   
    }
    else{
        return setTimeout(()=> recurcao(num+1,false,estadoVelocidade.velocidadeAtual,pont,dir),estadoVelocidade.velocidadeAtual);
    }   
}

//mesma coisa que chutar só que a bola troca de direção a cada multipo de 10
function trocar(num,des,_vel,pont,dir) {
    numberIndicator.textContent = String(num).padStart(2,0);
    pontuacao.textContent = String(pont).padStart(2,0);

    const trocarDireção = (num%10 == 0) ? !dir : dir;
    moverBarra(num,dir);

    // quando a bola chega a 10 a des é colocada pra true e o numero é diminuido, pra fazer a bola começar a descer
    if (num >= 50){
        return setTimeout(()=>trocar(num-1,true,_vel,pont,trocarDireção),_vel)
    }
    // se o jogador estiver chutando ele checa se o num está dentro do intervalo
    // se positivo, joga o num pra cima, e se o jogador chutar registra o chute e adiciona pontuação, depois troca de estado.
    if (checarChute(dir) && des && num <= intervaloChute && num>= 0){
            pararChutar()
            estadoVelocidade.velocidadeAtual = Math.max(velocidadeMinima, estadoVelocidade.velocidadeAtual - 5);
            return trocarEstado(num+1,estadoVelocidade.velocidadeAtual-2,pont+20-num);
    }
    if (num < 0) return;
    
    if (des){
        return setTimeout(()=> trocar(num-1,true,_vel,pont,trocarDireção), _vel);
    }
    else{
        return setTimeout(()=>trocar(num+1,false,_vel,pont,trocarDireção), _vel);
    }
}   

//troca a função que a bola usa pra se mover depois de um chute
function trocarEstado(num,_vel,pont){
    const novoEstado = estadosBola[random()]
    if (novoEstado.fun === "recurcao"){
        recurcao(num,false, _vel,pont,novoEstado.dir)
    } else {
        trocar(num,false, _vel,pont,novoEstado.dir)
    }
}
//inicio do jogo
recurcao(1,false,velocidadeInicial,0,true)