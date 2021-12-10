

$(document).ready(function () 
{

    var sessioncon = sessionStorage.getItem("memberid");
    var url = window.location.href;
    if(url != "http://localhost:4000/board?id=" +sessioncon)
    {
        if (sessioncon != null) 
        {
            location.replace('/board?id=' + sessioncon);
        } else if (sessioncon === null){
            window.history.forward();  
          }
              
    }//처음 해당 화면이 로딩됐을 경우, session값의 유무를 확인하여 있으면 링크를 바꾼다.
       
});