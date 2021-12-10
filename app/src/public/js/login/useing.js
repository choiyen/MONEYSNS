// 회원가입 하고 난 후 비밀번호 일치여부 확인 및 아이디 유효성 검사

function page_move()
{
       var f= index.paging; //폼 name
       f.action="Servers/WebContent/index.html";//이동할 페이지
       f.method="post";//POST방식
       document.write("내용");
       f.submit();
}

function checking(form) 
{
  if(form == 1)
  {
    const target = document.getElementById('TestBtn');
    target.disabled = true;
  }
  else
  {
    const target = document.getElementById('TestBtn');
    target.disabled = false;
  }
}

function modifynot()
{
  window.location.href ="/";
}   
function checkAll() 
{
       if (!checkUserId(form.userId.value)) 
       {    
           return false;
       }
       if (!checkPasswordA(form.password1.value)) 
       {
           return false;
       }
       if (!checkPasswordB(form.userId.value, form.password1.value, form.password2.value)) {
           return false;
       }
       if(!checknickname(form.nickname.value))
       {
         return false;
       }
       if (!checkMail(form.mail.value)) {
           return false;
       }
       if(!checkmobile(form.mobile.value))
       {
         return false;
       }
       if (!checkA(form.suba.value)) {
           return false;
       } 

       if (!checkB(form.subb.value)) 
       {
           return false;
       }
        
       return true;
   }


     // 공백확인 함수
     function checkExistData(value, dataName) 
     {
       if (value == "") 
       {
           return false;
       }
       return true;
     }

   function checkUserId(id) {
       //Id가 입력되었는지 확인하기
       var idRegExp = /^[a-zA-z0-9]{4,12}$/; //아이디 유효성 검사
       if (!checkExistData(id, "아이디를"))
       {
           document.getElementById('_check1').innerHTML = "아이디를 입력하여주세요";
           document.getElementById('_check1').style.display = "block";
           document.getElementById('_check1').style.color = "red";
           return false;
       }
       else if (!idRegExp.test(id)) {
           document.getElementById('_check1').innerHTML = "아이디는 영문 대소문자와 숫자의 혼합으로 4~12자리만 입력해야 합니다!! ";
           document.getElementById('_check1').style.display = "block";
           document.getElementById('_check1').style.color = "red";
           form.id.value = "";
           form.id.focus();
           return false;
       }
       else
       {
         //중복성 검사 후에는 중복일 경우도 확인하는 코드 필요.
         document.getElementById('_check1').innerHTML = "아이디의 조건에 부합합니다.";
         document.getElementById('_check1').style.display = "block";
         document.getElementById('_check1').style.color = "#08A600";
          return true; //확인이 완료되었을 때
       }
   }
   function checkPasswordA(password1) 
   { 
     var password1RegExp = /^[a-zA-z0-9]{4,12}$/; //비밀번호 유효성 검사
     if (!checkExistData(password1, "비밀번호를"))
     {
           document.getElementById('_check2').innerHTML = "비밀번호를 입력하여 주세요";
           document.getElementById('_check2').style.display = "block";
           document.getElementById('_check2').style.color = "red";
           document.getElementById('pswd1_img1').src= "img/icon/m_icon_pass.png";
           return false;
     }
     else if (!password1RegExp.test(password1)) 
     {
           document.getElementById('_check2').innerHTML = "비밀번호는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!";
           document.getElementById('_check2').style.display = "block";
           document.getElementById('_check2').style.color = "red";
           form.password1.value = "";
           form.password1.focus();
           document.getElementById('pswd1_img1').src= "img/icon/m_icon_not_use.png";
           return false;
     }
     else 
     {
         document.getElementById('_check2').innerHTML = "비밀번호의 조건에 부합합니다.";
         document.getElementById('_check2').style.display = "block";
         document.getElementById('_check2').style.color = "#08A600";
         document.getElementById('pswd1_img1').src= "img/icon/m_icon_safe.png";
         return true; //확인이 완료되었을 때
     }


   }

   function checkPasswordB(id, password1, password2) 
   {

       //비밀번호 확인이 입력되었는지 확인하기
       if (!checkExistData(password2, "비밀번호 확인을"))
       {
           document.getElementById('_check3').innerHTML = "비밀번호 확인을 입력해주세요";
           document.getElementById('_check3').style.display = "block";
           document.getElementById('_check3').style.color = "red";

           return false;
       }
      
       //비밀번호와 비밀번호 확인이 맞지 않다면..
       if (password1 != password2) 
       {
           
           document.getElementById('_check3').innerHTML = "비밀번호와 비밀번호 확인이 일치하지 않아요ㅠㅠㅠㅠㅠㅠㅠㅠㅠ";
           document.getElementById('_check3').style.display = "block";
           document.getElementById('_check3').style.color = "red";
           document.getElementById('pswd2_img1').src= "img/icon/m_icon_check_disable.png";
           form.password1.value = "";
           form.password2.value = "";
           form.password2.focus();
           return false;
       }
       else
       {

         //아이디와 비밀번호가 같을 때..
         if (id == password1) 
         {
         
           document.getElementById('_check2').innerHTML = " ";
           document.getElementById('_check3').innerHTML = "아이디와 비밀번호는 일치할 수 없습니다.";
           document.getElementById('_check3').style.display = "block";
           document.getElementById('_check3').style.color = "red";
           form.password1.value = "";
           form.password2.value = "";
           form.password2.focus();
           return false;
         }
         
         if(checkPasswordA(password1))
         {
           document.getElementById('pswd2_img1').src= "img/icon/m_icon_check_enable.png";
           document.getElementById('_check3').innerHTML = "비밀번호와 비밀번호 확인이 같습니다.";
           document.getElementById('_check3').style.display = "block";
           document.getElementById('_check3').style.color = "#08A600";
           
            return true; //확인이 완료되었을 때
         }

       }
   }
 
   
   function checknickname(nickname) {
       //Id가 입력되었는지 확인하기
       if (!checkExistData(nickname, "닉네임을"))
       {
           document.getElementById('_check7').innerHTML = "닉네임을 입력하여주세요";
           document.getElementById('_check7').style.display = "block";
           document.getElementById('_check7').style.color = "red";
           return false;
       }
       else
       {
         //중복성 검사 후에는 중복일 경우도 확인하는 코드 필요.
         document.getElementById('_check7').innerHTML = "바람직한 닉네임입니다.";
         document.getElementById('_check7').style.display = "block";
         document.getElementById('_check7').style.color = "#08A600";
          return true; //확인이 완료되었을 때
       }
   }
 
   function checkMail(mail) 
   {
     
     var emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
       //mail이 입력되었는지 확인하기
       if (!checkExistData(mail, "이메일을"))
       {

           document.getElementById('_check4').innerHTML = "이메일을 입력하여주세요";
           document.getElementById('_check4').style.display = "block";
           document.getElementById('_check4').style.color = "red";
           return false;
       }
       else if (!emailRegExp.test(mail)) {
           
           document.getElementById('_check4').innerHTML = "이메일의 규정형식을 지켜주셔야 합니다.";
           document.getElementById('_check4').style.display = "block";
           document.getElementById('_check4').style.color = "red";
           form.mail.value = "";
           form.mail.focus();
           return false;
       }
       else
       {
         
         document.getElementById('_check4').innerHTML = "이메일의 규정 형식을 지켜주셨습니다.";
         document.getElementById('_check4').style.display = "block";
         document.getElementById('_check4').style.color = "#08A600";
         return true; //확인이 완료되었을 때
       }
   }
   
   function checkmobile(mobile) {
       //mail이 입력되었는지 확인하기
       var mobileRegExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
       if (!checkExistData(mobile, "휴대전화를"))
       {
           document.getElementById('_check5').innerHTML = "휴대전화를 입력하지 않으셨어요.";
           document.getElementById('_check5').style.display = "block";
           document.getElementById('_check5').style.color = "red";
           return false;
       }
       else if (!mobileRegExp.test(mobile)) 
       {

           document.getElementById('_check5').innerHTML = "전화번호의 형식이 올바르지 않습니다.";
           document.getElementById('_check5').style.display = "block";
           document.getElementById('_check5').style.color = "red";
           form.mobile.value = "";
           form.mobile.focus();
           return false;
       }
       else 
       {
         document.getElementById('_check5').innerHTML = "전화번호의 규정 형식을 지켜주셨습니다.";
         document.getElementById('_check5').style.display = "block";
         document.getElementById('_check5').style.color = "#08A600";
         return true; //확인이 완료되었을 때
       }
       
   }
   

   function checkA(suba) {
       //mail이 입력되었는지 확인하기
       if (form.suba.value == "00")
       {
           document.getElementById('_check6').innerHTML = "비밀번호 찾기용 질문을 선택하지 않으셨습니다.";
           document.getElementById('_check6').style.display = "block";
           document.getElementById('_check6').style.color = "red";
           return false;
       }
       else
       {
         document.getElementById('_check6').innerHTML = "";
           return true; //확인이 완료되었을 때
       }
   }
   
   function checkB(subb) 
   {
       //mail이 입력되었는지 확인하기
       if (!checkExistData(subb, "확인 답을"))
       {
           document.getElementById('_check6').innerHTML = "확인 용 답을 입력하지 않으셨습니다.";
           document.getElementById('_check6').style.display = "block";
           document.getElementById('_check6').style.color = "red";
           
           return false;
       } 
       else
       { 
         document.getElementById('_check6').innerHTML = "";
           return true; //확인이 완료되었을 때
       }
   }
  
   