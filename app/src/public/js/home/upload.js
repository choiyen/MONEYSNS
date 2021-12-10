"use strict";

const video_plusBtn = document.querySelector("#plus_video_btn"),
 upload_videofile = document.querySelector("#file1"),

 photo_plusBtn = document.querySelector("#plus_photo_btn"),
 upload_photofile = document.querySelector("#file2"),

 thumbnail_photo_plusBtn = document.querySelector("#plus_thumbnailphoto_btn"),
 upload_thumbnail_photofile = document.querySelector("#file3"),
 
 title = document.querySelector("#title"),
 description = document.querySelector("#description"),
 submitBtn = document.querySelector("#button");

video_plusBtn.addEventListener("click", videoPlus);
photo_plusBtn.addEventListener("click", photoPlus);
thumbnail_photo_plusBtn.addEventListener("click", photoPlus);
submitBtn.addEventListener("click", contentsPlus);

function videoPlus() {
    const video_file = upload_videofile.files[0];
    const formData = new FormData();
    formData.append('upload', video_file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                document.getElementById("plus_thumbnailphoto_btn").disabled = false;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            // 애러 발생시 적을것 들
        });
}

function photoPlus() {
    const formData = new FormData();
    if (upload_photofile.files.length > 0) { // 사진 업로드 창에서 사진 추가 했을 때
        const photo_file = upload_photofile.files[0];
        formData.append('upload', photo_file)
    } else if (upload_thumbnail_photofile.files.length > 0) { // 영상 업로드 창에서 썸네일용 사진 추가 했을 때
        const thumbnail_photo_file = upload_thumbnail_photofile.files[0];
        formData.append('upload', thumbnail_photo_file)
    }

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                if (res.destination === 'src/public/uploads/photo') { // 사진 업로드 시에 사진 올라갔을 때
                    document.getElementById("pre_photo").style.display = "block";
                    document.getElementById("pre_photo").src = "uploads/photo/" + res.image;
                    document.getElementById("pre_photo").style.margin = "0 auto";
                } else { // 영상 업로드 시에 썸네일용 사진이 올라갔을 때
                    document.getElementById("video_photo").style.display = "block";
                    document.getElementById("video_photo").src = "uploads/thumbnail/" + res.image;
                    document.getElementById("video_photo").style.margin = "0 auto";
                }
                document.getElementById("button").disabled = false;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            // 애러 발생시 적을것 들
        });
}

function contentsPlus() {
    const req = {
        title: title.value,
        description: description.value,
        extension: req_extension,
    };
    
    fetch("/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                if (req_extension === "question") {
                    location.href = "/question?id=" + req_id;
                } else {
                    location.href = "/board?id=" + req_id;
                }
                
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("로그인 중 에러발생");
        });
}

if (req_extension === "mp4") { // 영상 업로드 화면에 들어오면 숨겨져 있던것 출력
    document.getElementById("mp4").style.display = "block";
    document.getElementById("photo_video_cancel").style.display = "inline-block";
} else if(req_extension === "img") {
    document.getElementById("img").style.display = "block";
    document.getElementById("photo_video_cancel").style.display = "inline-block";

} else {
    document.getElementById("question").style.display = "block";
    document.getElementById("button").disabled = false;
    document.getElementById("question_cancel").style.display = "inline-block";
}