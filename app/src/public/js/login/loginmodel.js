const urlQuery = window.location.search;
const urlParams = new URLSearchParams(urlQuery);
const path = urlParams.get('href');

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
    if (input_value1 != "" && input_value2 != "") 
    {
      $.ajax({
        url: '/loging',
        dataType: 'json',
        type: 'POST',
        data: { data1: input_value1, data2: input_value2 },
        async: false,
        success: function (result) 
        {
          if (result.length > 0) 
          { 
            if(result[0].password == input_value2)
            {
              sessionStorage.removeItem('memberid');
              sessionStorage.setItem('memberid', input_value1);
              if (path == "board") {
                location.replace('/board?id=' + input_value1);//이걸 사용하면 뒤로가기를 하여도 로그인 상태로 인한 오류가 발생되지 않는다.(앞에 접속 기록은 지워짐.)
              } 
              else if (path == "question") {
                location.replace('/question?id=' + input_value1);
              } else {
                location.replace('/?id=' + input_value1);
              }
              //location.replace('/board?id=" + input_value1'); -> 로그인 시스템 확인차 주석으로 묶어뒀음.
            }
            else
            {
              $("#erroring").text('아이디나 비밀번호가 달라 로그인이 되질 않습니다.');
              $("#popup").css('display', 'flex').hide().fadeIn();
            }
          }
          else
          {
            $("#erroring").text('회원이 아님으로 로그인이 되질 않습니다.');
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
      $("#erroring").text('아이디나 비밀번호를 입력하지 않았습니다.');
      $("#popup").css('display', 'flex').hide().fadeIn();
    }
  })
  $('#password1').keypress(function(e){

    if(e.which == 13)
    {
      var input_value1 = $("input[id='userId']").val();
      var input_value2 = $("input[id='password1']").val();
      if (input_value1 != "" && input_value2 != "") 
      {
        $('#TestBtn').click();
      }
      else
      {
        $("#erroring").text('아이디나 비밀번호를 입력하지 않았습니다.');
        $("#popup").css('display', 'flex').hide().fadeIn();
      }
    }  
  })
});
