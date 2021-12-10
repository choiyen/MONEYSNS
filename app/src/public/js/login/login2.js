// 아이디, 비밀번호 입력 후 버튼 활성화 js

var c;

function check(id, password) 
{
     if(id != "" && password != "")
     {
        const target = document.getElementById('TestBtn');
        target.disabled = false; 
     }
     else
     {
        const target = document.getElementById('TestBtn');
        target.disabled = true;
     }
}

function checkfind1(email, mobile) 
{
     if(email != "" && mobile != "")
     {
         const target = document.getElementById('TestBtn');
        target.disabled = false;
     }
     else
     {
       const target = document.getElementById('TestBtn');
        target.disabled = true;
     }
}


function checkfind2(id, suba,subb) 
{
     if(id != '' && suba != '' && subb != '')
     {
        const target = document.getElementById('TestBtn');
        target.disabled = false;
     }
     else
     {
         const target = document.getElementById('TestBtn');
        target.disabled = true; 
     }
}
