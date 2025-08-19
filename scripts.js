const numberIndicator = document.querySelector('.numbers')

function recurcao  (num,des,vel) {
    numberIndicator.textContent = String(num).padStart(2,0)
    if (num >= 10){
        return setTimeout(recurcao, vel,num-1,true,vel)
    }
    if (num <= 0){
        if (vel - 10 >0){
            return setTimeout(recurcao, vel,num+1,false,vel-10)
        }
        else{
            return setTimeout(recurcao, vel,num+1,false,10)
        }
    }
    if (des){
        return setTimeout(recurcao, vel,num-1,true,vel)
    }
    else{
        return setTimeout(recurcao, vel,num+1,false,vel)
    }   
}

recurcao(5,false,500)