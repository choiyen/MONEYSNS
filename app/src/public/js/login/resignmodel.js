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

    var input_value1 = $("input[id='userId']").val();
    var input_value2 = $("input[id='password1']").val();
    var input_value3 = $("input[id='password2']").val();

    if (input_value1 != "" && input_value2 != "" && input_value3 != "") 
    {
      if (input_value2 == input_value3) 
      {
        $.ajax({
          url: '/resigned',
          dataType: 'json',
          type: 'POST',
          data: { data1: input_value1, data2: input_value2, data3: input_value3 },
          success: function (result) {
            if (result.length > 0) 
            {
              if (result[0].password == input_value2) 
              {
                sessionStorage.removeItem('memberid');
                location.href = "/resignA";
              }
              else 
              {
                $("#erroring").text('아이디나 비밀번호가 달라 회원탈퇴가 되질 않습니다.');
                $("#popup").css('display', 'flex').hide().fadeIn();
              }
            }
            else {
              $("#erroring").text('없는 회원이거나, 아이디나 비밀번호가 달라 탈퇴를 받아드릴 수 없습니다.');
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
      else 
      {
        $("#erroring").text('비밀번호와 비밀번호 확인의 값이 다릅니다.');
        $("#popup").css('display', 'flex').hide().fadeIn();
      }
    }
    else 
    {
      $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
      $("#popup").css('display', 'flex').hide().fadeIn();
    }
  })
  $('#password2').keypress(function(e)
  {

    if(e.which == 13)
    {
      var input_value1 = $("input[id='userId']").val();
      var input_value2 = $("input[id='password1']").val();
      var input_value3 = $("input[id='password2']").val();
  
      if (input_value1 != "" && input_value2 != "" && input_value3 != "") 
      {
        $('#TestBtn').click();
      }
      else
      {
        $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
        $("#popup").css('display', 'flex').hide().fadeIn();
      }
    }
    
  })
  
});
