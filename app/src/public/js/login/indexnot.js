$(document).ready(function () 
{
    var sessioncon = sessionStorage.getItem("memberid");
    var url = window.location.href;
    if(url != "http://localhost:4000/?id=" +sessioncon)
    {
        if (sessioncon != null) 
        {
           location.replace('/?id=' + sessioncon);//로그인 페이지에 못들어오게 함.
        } else if (sessioncon === null){
            window.history.forward();  
    }//넘기는 거 막는 거. 
       
});