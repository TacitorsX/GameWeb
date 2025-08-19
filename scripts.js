const numberIndicator = document.querySelector('.numbers')
const button = document.getElementById("button");
var chutando = false
var consegueChutar = true
button.onclick = () => {
    if (consegueChutar){
        chutando = true
        consegueChutar = false
        setTimeout(pararChutar,1000)
    }
}

function pararChutar(){
    chutando = false
    consegueChutar = true
}

function recurcao  (num,des,vel) {
    numberIndicator.textContent = String(num).padStart(2,0)
    if (num >= 10){
        return setTimeout(recurcao, vel,num-1,true,vel)
    }
    if (chutando){
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