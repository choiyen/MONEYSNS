// 아이디 중복여부 확인 js

var form = 0;


$(document).ready(function(){
    $("#userId").keyup(function(e) {
        e.preventDefault();
        var input_value = $("input[id='userId']").val();

      
        $.ajax({
            url : '/usercheck',
            dataType : 'json',
            type : 'POST',
            data : {data : input_value},
            success : function(result) {
                if(result.length > 0)
                {
                    $('#_check1').text("이미 회원으로 가입된 아이디입니다.");
                    $('#_check1').css({
                        display: 'block',
                        color : 'red'
                    });
                    form = 1;    
                }
                else
                {
                    if(checkUserId(input_value))
                    {
                        $('#_check1').text("해당 아이디로 가입하여도 괜찮습니다.");
                        $('#_check1').css({
                        display: 'block',
                        color : 'green'
                        });
                        form = 0;
                        checking(form);
                    }
                } 
            },
            error : function(error) 
            {
                if(error)
                {
                   alert("오류가 발생하였습니다. 다시 입력해주세요");
                }
            }
        })
     
    })
    $("#nickname").keyup(function(e) {
        e.preventDefault();
        var input_value = $("input[id='nickname']").val();

        

        $.ajax({
            url : '/nickcheck',
            dataType : 'json',
            type : 'POST',
            data : {data : input_value},
            success : function(result) {
                if(result.length > 0)
                {
                    $('#_check7').text("이미 중복된 닉네임이 존재합니다.");
                    $('#_check7').css({
                        display: 'block',
                        color : 'red'
                    });
                    form = 1;    
                }
                else
                {
                    if(checknickname(input_value))
                    {
                        $('#_check7').text("회원가입이 가능한 닉네임입니다.");
                        $('#_check7').css({
                            display: 'block',
                            color : 'green'
                        });
                        form = 0;
                        checking(form);
                    }
                    
                } 
            },
            error : function(error) 
            {
                if(error)
                {
                   alert("오류가 발생하였습니다. 다시 입력해주세요");
                }
            }
        })
    })

    $("#mobile").keyup(function(e) {//이메일과 전화번호가 모두 같은 경우, 가입 불가능.
        e.preventDefault();
        var input_value1 = $("input[id='mail']").val();
        var input_value2 = $("input[id='mobile']").val();


        $.ajax({
            url : '/docheck',
            dataType : 'json',
            type : 'POST',
            data : {data1 : input_value1 , data2 : input_value2},
            success : function(result) {
                if(result.length > 0)
                {
                    $('#_check5').text("전화번호와 이메일이 같은 아이디가 존재합니다");
                    $('#_check5').css({
                        display: 'block',
                        color : 'red'
                    });
                    form = 1; 
                       
                }
                else
                {
                    if(checkmobile(input_value2))
                    {
                        $('#_check5').text("본 정보는 회원가입이 가능합니다.");
                        $('#_check5').css({
                            display: 'block',
                            color : 'green'
                        });
                        form = 0;
                        checking(form);

                    }
                    
                } 
            },
            error : function(error) 
            {
                if(error)
                {
                   alert("오류가 발생하였습니다. 다시 입력해주세요");
                }
            }
        })
    })
    $('#TestBtn').mouseenter(function(e) 
    {
       checking(form);
    })

});
