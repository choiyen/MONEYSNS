$(document).ready(function () {

    $(function () {
        $("#confirm").click(function () {
            modalClose();
            //컨펌 이벤트 처리
        });
        function modalClose() {
            $("#popup").fadeOut();
        }
    }); screen

    $("#TestBtn").click(function () 
    {
        var input_value1 = $("input[id='mail']").val();
        var input_value2 = $("input[id='mobile']").val();
        var input_value3 = $("input[id='userId']").val();
        var input_value4 = $("select[name ='suba']").val();
        var input_value5 = $("input[id='subb']").val();


        if ((input_value1 != "" && input_value2 != "") || (input_value3 != "" && input_value4 != "" && input_value5 != "")) 
        {
            $.ajax({
                url: '/finding',
                dataType: 'json',
                type: 'POST',
                data: { data1: input_value1, data2: input_value2, data3: input_value3, data4: input_value4, data5: input_value5 },
                success: function (result) 
                {
                    if (result.length > 0) 
                    {
                       location.replace('/finded?data1='+result[0].password + '&data2=' + result[0].memberid);
                    }
                    else 
                    {
                        $("#erroring").text('해당 입력값으로는 회원정보를 찾을 수 없습니다.');
                        $("#popup").css('display', 'flex').hide().fadeIn();
                    }
                },
                error: function (error) 
                {
                    if (error) 
                    {
                        $("#erroring").text('서버 접속 도중 오류가 발생하였습니다.');
                        $("#popup").css('display', 'flex').hide().fadeIn();
                    }
                }
            })
        }
        else {

            $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
            $("#popup").css('display', 'flex').hide().fadeIn();
        }

    })
    $('#mobile').keypress(function (e) 
    {
        var input_value1 = $("input[id='mobile']").val();
        var input_value2 = $("input[id='mail']").val();
       

        if (e.which == 13) 
        {
            if (input_value1 != "" && input_value2 != "") 
            {   
                $('#TestBtn').click();
            }
            else
            {
                $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
                $("#popup").css('display', 'flex').hide().fadeIn();
            }
        }

    })//수정 : 폼의 비밀번호에서 엔터키를 누를 시 키 감지 가능.
    $('#subb').keypress(function (e) 
    {
        var input_value3 = $("input[id='userId']").val();
        var input_value4 = $("select[name ='suba']").val();
        var input_value5 = $("input[id='subb']").val();

        if (e.which == 13) 
        {
            if (input_value3 != "" && input_value4 != "" && input_value5 != "") 
            {   
                $('#TestBtn').click();
            }
            else
            {
                $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
                $("#popup").css('display', 'flex').hide().fadeIn();
            }
        }

    })//수정 : 폼의 비밀번호 찾기 답에서 엔터키를 누를 시 키 감지 가능.
    
});
