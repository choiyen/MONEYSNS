"use strict";

var pass = document.getElementById('select__img');
var btn = document.getElementsByClassName('section__logo__title');

function selectImg(number) {
    pass.style.display = "none";

    if(number == 1){
        pass = document.getElementById('select__img');
        if (req_id != null){
            $('#photo_upload').css('display', 'block');
            $('#video_upload').css('display', 'none');
        }
    }
    else if(number == 2){
        pass = document.getElementById('select__video');
        if (req_id != null){
            $('#video_upload').css('display', 'block');
            $('#photo_upload').css('display', 'none');
        }
    }
    pass.style.display = "flex";
}

// 사진 또는 비디오 항목 선택 시 글자 색상 변경
$('.section__logo').on('click', function(){
    $('.section__logo').removeClass('selected');
    $(this).addClass('selected');
});

// 둥근 탭 버튼을 클릭 했을 때
$('.fa-ellipsis-h').on('click', function(){
    $("#modal").attr("style", "display:block");
});

// 둥근 탭으로 인한 모달의 바깥쪽 부분을 클릭했을 때
$(".modal_layer, #cancel").click(function(){
    $("#modal").attr("style", "display:none");
}); 


var seq = document.getElementById("for_like").getAttribute('name');
var question_id = document.getElementById("video_comment").className;
// 질문창 에서 댓글 삭제 버튼을 눌렀을 때
function questioncommentDelete(delete_seq) {
    location = "/board_question/fjfdjdkj$Efjd@/?id=" + question_id + "&n=" + seq + "&comment_delete_seq=" + delete_seq;
}
// 질문창에서 댓글 수정 버튼을 눌렀을 때
function questioncommentUpdate(update_seq) {
    var update_comment_text = prompt("댓글 수정");
    if (update_comment_text !== null && update_comment_text !== "") {
        location = "/board_question/fjfdjdkj$Efjd@/?id=" + question_id + "&n=" + seq + "&comment_update_seq=" + update_seq + "&update_comment=" + update_comment_text;
    }
    
}
// 질문 게시판에서 신고 클릭 시 DB에 카운터
$('#question_declaration').on('click', function(){
    var declaration_text = prompt("어떠한 사유로 신고하시는지 자세히 적어주세요");
    if (declaration_text !== null && declaration_text !== "") {
        location = "/board_question/fjfdjdkj$Efjd@/?id=" + question_id + "&n=" + seq + "&declaration=" + declaration_text;
    }
});

var title = document.getElementById('nickname').innerHTML;
var like_check = document.getElementById("like_cnt").getAttribute('name');
var id = document.getElementById("like_cnt").className;


// 모달 취소 또는 바깥 화면 누르면 board로 이동
$('label').on('click', function(){
    if (label == 'g'){ // mypage에서 모달을 클릭했으면..
        location = '/mypage?id=' + id;
    } else { // board에서 모달을 클릭했으면..
        location = '/board?id=' + id;
    }
});

// 사진 또는 영상 클릭 시 like_check가 1또는 3이면 꽉찬 하트 아니면 빈 하트
if (like_check == 1){
    $('.like').addClass('selected');
}
else if (like_check == 0) {
    $('.like').removeClass('selected');
}
else if (like_check == 3){
    $('.video_like').addClass('selected');
}
else {
    $('.video_like').removeClass('selected');
}

// 좋아요(하트) 클릭시 변화
$('.fa-heart, .fa-heart').on('click', function(){
    if (like_check == 0){ // 체크 되지 않았을 때 클릭하면
        location = "/board/" + title + "?id=" + id + "&n=" + seq + "&like=1";
    } 
    else if(like_check == 1) {
        location = "/board/" + title + "?id=" + id + "&n=" + seq + "&like=0";
    }
    else if(like_check == 2) {
        location = "/board_video/" + title + "?id=" + id + "&n=" + seq + "&like=3";
    }
    else{
        location = "/board_video/" + title + "?id=" + id + "&n=" + seq + "&like=2";
    }
});

// 사진창에서 신고 클릭 시 DB에 카운터
$('#photo_declaration').on('click', function(){
    var declaration_text = prompt("어떠한 사유로 신고하시는지 자세히 적어주세요");
    if (declaration_text !== null && declaration_text !== ""){
        location = "/board/" + title + "?id=" + id + "&n=" + seq + "&declaration=" + declaration_text;
    }
});
// 영상에서 신고 클릭 시 DB에 카운터
$('#video_declaration').on('click', function(){
    var declaration_text = prompt("어떠한 사유로 신고하시는지 자세히 적어주세요");
    if (declaration_text !== null && declaration_text !== "") {
        location = "/board_video/" + title + "?id=" + id + "&n=" + seq + "&declaration=" + declaration_text;
    }
});

// 사진에서 게시물 삭제 버튼을 눌렀을때
$('#photo_delete').on('click', function(){
    location = "/board?id=" + id + "&seq=" + seq + "&delete=photo_delete";
});
// 영상에서 게시물 삭제 버튼을 눌렀을 때
$('#video_delete').on('click', function(){
    location = "/board?id=" + id + "&seq=" + seq + "&delete=video_delete";
});
// 질문 게시판에서 게시물 삭제 버튼을 눌렀을 때
$('#question_delete').on('click', function(){
    location = "/question?id=" + id + "&seq=" + seq + "&delete=question_delete";
});

var upload_id = document.getElementById("video_nickname").getAttribute('name');
if (upload_id === req_id) { // 자신이 업로드한 사진이나 영상만 삭제 버튼이 보인다
    if (contents === "v"){ // board_video 창에서
        document.getElementById('video_delete').style.display = "inline-block";
    } else if (contents === "q"){
        document.getElementById('question_delete').style.display = "inline-block";
    } else {
        document.getElementById('Photo_delete').style.display = "block";
        document.getElementById('Photo_delete_line').style.display = "block";
    }
} else { // 자신이 업로드한 사진이 아닌 경우 삭제 하지 못하므로 칸이 1개 없으므로 전체 높이를 줄여준다
    document.getElementById('modal_top_content').style.height = "100px";
}

// 사진에서 댓글 삭제 버튼을 눌렀을 때
function photocommentDelete(delete_seq) {
    location = "/board/" + title + "/?id=" + id + "&n=" + seq + "&comment_delete_seq=" + delete_seq;
}
// 사진에서 댓글 수정 버튼을 눌렀을 때
function photocommentUpdate(update_seq) {
    var update_comment_text = prompt("댓글 수정");
    if (update_comment_text !== null && update_comment_text !== "") {
        location = "/board/" + title + "/?id=" + id + "&n=" + seq + "&comment_update_seq=" + update_seq + "&update_comment=" + update_comment_text;    }
}
// 영상에서 댓글 삭제 버튼을 눌렀을 때
function videocommentDelete(delete_seq) {
    location = "/board_video/" + title + "/?id=" + id + "&n=" + seq + "&comment_delete_seq=" + delete_seq;
}
// 영상에서 댓글 수정 버튼을 눌렀을 때
function videocommentUpdate(update_seq) {
    var update_comment_text = prompt("댓글 수정");
    if (update_comment_text !== null && update_comment_text !== "") {
        location = "/board_video/" + title + "/?id=" + id + "&n=" + seq + "&comment_update_seq=" + update_seq + "&update_comment=" + update_comment_text;
    }
    
}