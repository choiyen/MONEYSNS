"use strict";

// 저장된 src를 통해 영상 재생
window.onload = function(){
    if(req_id !== null) { // 다시 켜지면 이 소스가 무효화 된다
        document.getElementById("login__wrap").style.display = 'none';
        document.getElementById("logout__wrap").style.display = 'flex';
    }
    else {
        document.getElementById("login__wrap").style.display = 'flex';
        document.getElementById("logout__wrap").style.display = 'none';
    }

    $("#play_video").width('1200px');
    $("#play_video").height('700px');
}