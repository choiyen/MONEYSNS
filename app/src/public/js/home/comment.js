"use strict";

const comment = document.querySelector("#comment"),
 comment_contents_title = document.querySelector("#comment_contents_title").className,
 comment_contents_check = document.querySelector("#comment_contents_title").getAttribute('name'),
 commentBtn = document.querySelector("#comment_button");

commentBtn.addEventListener("click", submitComment);

function submitComment() {
    const req = {
        comment: comment.value,
        comment_title: comment_contents_title,
        comment_check: comment_contents_check,
    };
    
    if (req.comment_check == "photo") {
        fetch("/board/:id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    location.href = "/board/" + req.comment_title + "/?id=" + req_id + "&n=" + contents_num;
                } else {
                    alert(res.msg);
                }
            })
            .catch((err) => {
                console.error("로그인 중 에러발생");
            });
    } else if (req.comment_check == "video") {
        fetch("/board_video/:id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    location.href = "/board_video/" + req.comment_title + "/?id=" + req_id + "&n=" + contents_num;
                } else {
                    alert(res.msg);
                }
            })
            .catch((err) => {
                console.error("로그인 중 에러발생");
            });
    } else {
        fetch("/board_question/:id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    location.href = "/board_question/fjfdjdkj$Efjd@/?id=" + req_id + "&n=" + contents_num;
                } else {
                    alert(res.msg);
                }
            })
            .catch((err) => {
                console.error("로그인 중 에러발생");
            });
    }
}