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
  $("#TestBtn").click(function () {

    var input_value1 = $("input[id='userId']").val();
    var input_value2 = $("input[id='password1']").val();
    var input_value3 = $("input[id='password2']").val();
    var input_value4 = $("input[id='nickname']").val();
    var input_value5 = $("input[id='mail']").val();
    var input_value6 = $("input[id='mobile']").val();
    var input_value7 = $("select[name ='suba']").val();
    var input_value8 = $("input[id='subb']").val();

    if (input_value1 != "" && input_value2 != "" && input_value3 != "" && input_value4 != "" && input_value5 != "" && input_value6 != "" && input_value7 != "" && input_value8 != "") {
      if (input_value2 == input_value3) 
      {
        $.ajax({
          url: '/member',
          dataType: 'json',
          type: 'POST',
          data: { data1: input_value1, data4: input_value4 },
          success: function (result) 
          {
            if (result.length > 0) 
            {
              $("#erroring").text('아이디나 닉네임이 중복이라 가입할 수 없습니다.');
              $("#popup").css('display', 'flex').hide().fadeIn();
            }
            else 
            {
              $.ajax
              ({
                url: '/member2',
                dataType: 'json',
                type: 'POST',
                data: { data1: input_value1, data2: input_value2, data4: input_value4, data5 : input_value5, data6 : input_value6 , data7 : input_value7, data8 : input_value8 },
                success: function () 
                {
                     location.replace('/membered');
                },
                error: function (error) 
                {
                  if (error) 
                  {
                    $("#erroring").text('첫번째 서버 접속 도중 오류가 발생하였습니다.');
                    $("#popup").css('display', 'flex').hide().fadeIn();
                  }
                }  
              })
            } 
        },
           error: function (error) 
           {
              if (error) {
                $("#erroring").text('첫번째 서버 접속 도중 오류가 발생하였습니다.');
                $("#popup").css('display', 'flex').hide().fadeIn();
              }
            }
          })
      }
      else {
        $("#erroring").text('비밀번호와 비밀번호 확인의 값이 달라 가입이 불가능합니다.');
        $("#popup").css('display', 'flex').hide().fadeIn();
      }
    }
    else {
      $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
      $("#popup").css('display', 'flex').hide().fadeIn();
    }
  })
  $('#subb').keypress(function (e) {


    if (e.which == 13) {
      var input_value1 = $("input[id='userId']").val();
      var input_value2 = $("input[id='password1']").val();
      var input_value3 = $("input[id='password2']").val();
      var input_value4 = $("input[id='nickname']").val();
      var input_value5 = $("input[id='mail']").val();
      var input_value6 = $("input[id='mobile']").val();
      var input_value7 = $("select[name ='suba']").val();
      var input_value8 = $("input[id='subb']").val();

      if (input_value1 != "" && input_value2 != "" && input_value3 != "" && input_value4 != "" && input_value5 != "" && input_value6 != "" && input_value7 != "" && input_value8 != "") {

        $("#userId").keyup();
        $("#mobile").keyup();
        $("#nickname").keyup();
        $('#TestBtn').click();
        
      }
      else 
      {
        $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
        $("#popup").css('display', 'flex').hide().fadeIn();
      }

    }
  });// 수정 : subb에서 엔터키를 누를 경우, 클릭 버튼이 사용된다. 
  $('#password2').keypress(function (e) 
  {


    if (e.which == 13) {
      var input_value1 = $("input[id='userId']").val();
      var input_value2 = $("input[id='password1']").val();
      var input_value3 = $("input[id='password2']").val();
      var input_value4 = $("input[id='nickname']").val();
      var input_value5 = $("input[id='mail']").val();
      var input_value6 = $("input[id='mobile']").val();
      var input_value7 = $("select[name ='suba']").val();
      var input_value8 = $("input[id='subb']").val();

      if (input_value1 != "" && input_value2 != "" && input_value3 != "" && input_value4 != "" && input_value5 != "" && input_value6 != "" && input_value7 != "" && input_value8 != "") {

        $("#userId").keyup();
        $("#mobile").keyup();
        $("#nickname").keyup();
        $('#TestBtn').click();
        
      }
      else 
      {
        $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
        $("#popup").css('display', 'flex').hide().fadeIn();
      }

    }
  });// 수정 : subb에서 엔터키를 누를 경우, 클릭 버튼이 사용된다. 

});
