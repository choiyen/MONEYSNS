// 아이디, 비밀번호 찾기 및 바꾸기

$(function () {
  
    $('input[type="radio"][id="id"]').on('click', function () 
    {   

        var chkValue = $('input[type=radio][id="id"]:checked').val();
        if (chkValue) 
        {   
             
            $("#join")[0].reset();
            $('#mail').css('display', 'block');
            $('#mail2').css('display', 'block');
            $('#_check4').css('display', 'block');
            
            $('#mobile').css('display', 'block');
            $('#mobile2').css('display', 'block');
            
            $('#_check5').css('display', 'block');
            $('#userId').val('');
            $('#userId').css('display', 'none');
            $('#userid2').css('display', 'none');
             
            $('#_check1').css('display', 'none');           
            $('#aaa').css('display', 'none');
            $('#aaab').css('display', 'none');
            
            $('#aaax').css('display', 'none');
            
            $('#_check6').css('display', 'none');

            $('#TestBtn').attr("disabled",false);
            
        }

    });
    $('input[type="radio"][id="password"]').on('click', function () 
    {
        
        var chkValue = $('input[type=radio][id="password"]:checked').val();
        if (chkValue) 
        {
         
            
            $("#join")[0].reset();
            $('#mail').css('display', 'none');
            $('#mail2').css('display', 'none');
            
            $('#_check4').css('display', 'none');
            $('#mobile').css('display', 'none');
            $('#mobile2').css('display', 'none');
           
            $('#_check5').css('display', 'none');
            $('#userId').css('display', 'block');
            $('#userid2').css('display', 'block');
            $('#_check1').css('display', 'block');
            $('#aaa').css('display', 'block');
            $('#aaax').css({
                display: 'block',
                position: 'relative'
            });
            $('#aaab').css({
                display: 'block',
                position: 'relative'
            });
            $('#_check6').css({display : 'block', position: 'relative'});

            
            $('#TestBtn').attr("disabled",false);
       } 

    });

});
