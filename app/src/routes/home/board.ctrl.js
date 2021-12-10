"use strict";

const User = require("../../models/Board");
const fs = require("fs");
const url = require('url');
const db = require("../../config/db");

var upload_id;
var num;
 // 댓글 처리 하기위한 변수
var comment_seq;
var comment_title; 

const output = {
    board: async (req, res) => {
        var queryData = url.parse(req.url, true).query;
        var delete_seq = queryData.seq;
        var delete_check = queryData.delete;
        var photo_array = [];
        var video_array = [];

        const photo_user = new User();
        const video_user = new User();

        if (delete_check == "photo_delete") {
            var photo_delete_title = await photo_user.photoSearchTitledesLike(delete_seq); // 파일 삭제시 제목 있어야 함
            await photo_user.photoDelete(delete_seq); // seq에 해당하는 photo의 테이블의 데이터를 삭제
            await photo_user.photooverlapDelete(photo_delete_title[1] + delete_seq); // photo_like 테이블에 삭제될 사진의 overlap을 삭제
            await photo_user.photocommentoverlapDelete(photo_delete_title[1] + delete_seq); // photo_comment 테이블에 삭제될 사진의 overlap을 삭제

            await photo_user.photoseqUpdate(delete_seq); // photo 테이블에 seq가 삭제 되었으므로 업데이트
            var photo_final_seq = await photo_user.photoseqSearch(); // title의 목록을 만들기 위해 마지막 seq 조회
            var photo_comment_final_seq = await photo_user.photocommentseqSearch();
            await photo_user.seqstartupdatePhoto(photo_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(photo TB)
            await photo_user.commentseqstartupdatePhoto(photo_comment_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(photo_comment TB)

            await photo_user.minusPoint(photo_delete_title[3], 10); // 삭제한 사진을 업로드한 user의 point를 차감
            fs.unlink(`./src/public/uploads/photo/` + photo_delete_title[1] + delete_seq + `.png`,(err)=>{})
            
            for (var i = 1; i <= photo_final_seq; i++){ // 삭제한 사진 뒤의 seq에 해당하는 사진 파일과 데이터 업데이트
                var photo_title = await photo_user.photoSearchTitle(i);
                photo_array.push(photo_title);
                if (i > delete_seq - 1) {
                    fs.rename('src/public/uploads/photo/' + photo_title + (i + 1) + ".png", 
                    'src/public/uploads/photo/' + photo_title + i + '.png', function(err){});
                    await photo_user.photooverlapUpdate(photo_title, i + 1, i); // photo TB에서 삭제된 사진의 뒤의 사진들의 overlap 번호를 -1
                }
            }

            delete_seq = parseInt(queryData.seq);
            // 삭제 한 뒤 나머지 사진에서 댓글이 정상적으로 출력되기 위한 작업
            for (var i = delete_seq + 1; i <= photo_final_seq + 1; i++) { // 삭제한 사진의 overlap 숫자보다 큰 사진들의 숫자들을 -1 하기 위해서
                var photo_comment_title = await photo_user.photoSearchTitle(i - 1);
                await photo_user.photocommentoverlapUpdate(photo_comment_title, i, i - 1); // photo_comment TB에서 삭제된 사진의 뒤의 사진들의 overlap 번호를 -1
            }
            
            var video_final_seq = await photo_user.videoseqSearch();
            for (var i = 1; i <= video_final_seq; i++){
                var video_title = await video_user.videoSearchTitle(i);
                video_array.push(video_title);
            }
        } else if (delete_check == "video_delete") {
            var video_delete_title = await video_user.videoSearchTitledesLike(delete_seq); // 파일 삭제시 제목 있어야 함
            await video_user.videoDelete(delete_seq); // seq에 해당하는 데이터를 삭제
            await video_user.videooverlapDelete(video_delete_title[1] + delete_seq); // video TB에서 삭제될 사진의 overlap을 삭제
            await video_user.videocommentoverlapDelete(video_delete_title[1] + delete_seq); // video_comment TB에서 삭제될 사진의 overlap을 삭제

            await video_user.videoseqUpdate(delete_seq); // seq가 삭제 되었으므로 업데이트
            var video_final_seq = await video_user.videoseqSearch(); // title의 목록을 만들기 위해 마지막 seq 조회
            var video_comment_final_seq = await video_user.videocommentseqSearch();
            await video_user.seqstartupdateVideo(video_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트
            await video_user.commentseqstartupdateVideo(video_comment_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(video_comment TB)

            await video_user.minusPoint(video_delete_title[3], 10); // 삭제한 사진을 업로드한 user의 point를 차감
            fs.unlink(`./src/public/uploads/video/` + video_delete_title[1] + delete_seq + `.mp4`,(err)=>{});
            fs.unlink(`./src/public/uploads/thumbnail/` + video_delete_title[1] + delete_seq + `.png`,(err)=>{});
            
            for (var i = 1; i <= video_final_seq; i++){ // 삭제한 영상의 뒤의 seq에 해당하는 사진 파일과 데이터 업데이트
                var video_title = await video_user.videoSearchTitle(i);
                video_array.push(video_title);
                if (i > delete_seq - 1) {
                    fs.rename('src/public/uploads/video/' + video_title + (i + 1) + ".mp4", 
                    'src/public/uploads/video/' + video_title + i + '.mp4', function(err){});
                    fs.rename('src/public/uploads/thumbnail/' + video_title + (i + 1) + ".png", 
                    'src/public/uploads/thumbnail/' + video_title + i + '.png', function(err){});
                    await video_user.videooverlapUpdate(video_title, i + 1, i);
                }
            }

            // 삭제 한 후 사진이 정상적으로 출력 되기 위한 작업
            delete_seq = parseInt(queryData.seq);
            for (var i = delete_seq + 1; i <= video_final_seq + 1; i++) { // 삭제한 영상의 overlap 숫자보다 큰 사진들의 숫자들을 -1 하기 위해서
                var video_comment_title = await video_user.videoSearchTitle(i - 1);
                await video_user.videocommentoverlapUpdate(video_comment_title, i, i - 1); // photo_comment TB에서 삭제된 사진의 뒤의 사진들의 overlap 번호를 -1
            }
            
            var photo_final_seq = await photo_user.photoseqSearch();
            for (var i = 1; i <= photo_final_seq; i++){
                var photo_title = await photo_user.photoSearchTitle(i);
                photo_array.push(photo_title);
            }
        } else {
            // fs.name 까지는 가장 최근의 img 파일의 이름을 가장 최근의 txt 파일의 이름으로 변경하는 것이다.
            const dir_photo = './src/public/uploads/photo/';
            const dir_video = './src/public/uploads/video/';
            const dir_thumbnail = './src/public/uploads/thumbnail/';

            const list_photo = fs.readdirSync(dir_photo).map(filename => {
                return {
                    filename: filename,
                    mtime: fs.statSync(dir_photo + filename).mtime
                }
            });
            const list_video = fs.readdirSync(dir_video).map(filename => {
                return {
                    filename: filename,
                    mtime: fs.statSync(dir_video + filename).mtime
                }
            });
            const list_thumbnail = fs.readdirSync(dir_thumbnail).map(filename => {
                return {
                    filename: filename,
                    mtime: fs.statSync(dir_thumbnail + filename).mtime
                }
            });
            
            list_photo.sort((a, b) => b.mtime - a.mtime);
            const photo_title = await photo_user.photoSearchTitle(list_photo.length);
            fs.rename('src/public/uploads/photo/' + list_photo[0].filename, 'src/public/uploads/photo/' + photo_title + list_photo.length + '.png', function(err){});
            
            list_video.sort((a, b) => b.mtime - a.mtime);
            const video_title = await video_user.videoSearchTitle(list_video.length);
            fs.rename('src/public/uploads/video/' + list_video[0].filename, 'src/public/uploads/video/' + video_title + list_video.length + '.mp4', function(err){});

            list_thumbnail.sort((a, b) => b.mtime - a.mtime);
            fs.rename('src/public/uploads/thumbnail/' + list_thumbnail[0].filename, 'src/public/uploads/thumbnail/' + video_title + list_video.length + '.png', function(err){});
            
            for (var i = 1; i <= list_photo.length; i++){
                photo_array.push(await photo_user.photoSearchTitle(i));
            }

            for (var i = 1; i <= list_video.length; i++){
                video_array.push(await video_user.videoSearchTitle(i));
            }
        }

        var queryData = url.parse(req.url, true).query;
        upload_id = queryData.id;
        res.render('home/board', {photo: photo_array, video: video_array, id:upload_id});

    },
    board_id: async (req, res) => {
        var id = req.params.id;

        var queryData = url.parse(req.url, true).query;
        var check = queryData.like;
        var photo_seq = queryData.n;
        var photo_declaration = queryData.declaration;
        var photo_comment_delete = queryData.comment_delete_seq;
        var photo_comment_update = queryData.comment_update_seq;
        var update_comment = queryData.update_comment;
        var user_point = 0;
        var id_check = 0;
        upload_id = queryData.id;

        comment_seq = photo_seq;
        comment_title = id;

        const photo_user = new User();
        var photo_title_des_like = await photo_user.photoSearchTitledesLike(photo_seq); // photo의 title, des, like를 DB에서 같이 가져오는 소스코드

        const query = "SELECT point FROM member WHERE memberid = ?;";
            db.query (query, [photo_title_des_like[3]], async(err, data) => 
            {
                if (data[0] === undefined)
                {
                    id_check = 1;
                }
                if (id_check === 0){
                    user_point = await photo_user.getPoint(photo_title_des_like[3]); // user의 point에 따라 광고를 표시 할지 말지 결정하기 위한 소스코드
                } else {
                    user_point = await photo_user.getPoint("check"); // user의 point에 따라 광고를 표시 할지 말지 결정하기 위한 소스코드
                }
            });
        
        var photo_like_cnt = photo_title_des_like[0];
        await photo_user.photoLike(upload_id, id, photo_seq); // 특정 id의 해당 사진을 방문한 이력을 가지고 있는 DB 생성
        var photo_like_check = await photo_user.getphotoCheck(upload_id + id + photo_seq); // 방문 이력이 있는 DB의 like_check 값을 가져온다

        if (check == 1 && photo_like_check == 0){
            await photo_user.photoUpatelike(photo_seq, check);
            photo_like_cnt += 1;
            await photo_user.photoChecklike(upload_id + id + photo_seq, check); // 방문 이력이 있는 DB의 like_check 값을 1로 수정
            photo_like_check = 1;
            await photo_user.plusPoint(photo_title_des_like[3], 5); // 좋아요 누른 사진을 업로드한 user의 point + 5
        }
        else if (check == 0 && photo_like_check == 1) {
            await photo_user.photoUpatelike(photo_seq, check);
            photo_like_cnt -= 1;
            await photo_user.photoChecklike(upload_id + id + photo_seq, check); // 방문 이력이 있는 DB의 like_check 값을 0으로 수정
            photo_like_check = 0;
            await photo_user.minusPoint(photo_title_des_like[3], 5); // 좋아요 누른 사진을 업로드한 user의 point - 5
        }

        if (photo_declaration && photo_declaration != "null") { // 신고하기 버튼을 눌렀을 때
            await photo_user.photodeclarationUpdate(photo_seq); // 신고버튼을 클릭했으면 신고 Count가 올라갈 수 있도록
        }

        if (photo_comment_delete !== undefined) { // 댓글 삭제 버튼을 눌렀을 때 데이터 삭제 및 seq 초기화
            await photo_user.photocommentDelete(photo_comment_delete); // photo_comment 테이블에서 해당 seq의 데이터를 삭제
            var photo_comment_final_seq = await photo_user.photocommentseqSearch();
            await photo_user.commentseqstartupdatePhoto(photo_comment_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(photo_comment TB)
        }

        if (photo_comment_update !== undefined) { // 댓글 수정 버튼을 눌렀을 때 comment 수정
            await photo_user.photocommentUpdate(photo_comment_update, update_comment); // photo_comment 테이블에서 해당 seq의 comment 수정
        }

        var comment_cnt = await photo_user.photocommentCount("%" + id + photo_seq); // photo_comment 테이블에서 특정 overlap으로 끝나는 데이터 수
        await photo_user.commentpcheckRenew("%" + id + photo_seq); // comment_check를 0으로 업데이트(댓글 여러개를 출력하기 위해)
        var photo_comment_id = [];
        var photo_comment_contents = [];
        var photo_comment_time = [];
        var photo_comment_seq = [];
        var photo_comment_nick = [];

        for (var i = 0; i < comment_cnt; i++) { // board_photo.ejs에서 댓글 출력 하기 위한 객체에 값을 저장
            var photo_comment_infromation = await photo_user.photocommentgetId("%" + id + photo_seq);
            photo_comment_id.push(photo_comment_infromation[0]);
            photo_comment_contents.push(photo_comment_infromation[1]);

            var now_time = new Date().getTime(); // 현재 시간
            var comment_uploadtime = new Date(photo_comment_infromation[2]).getTime(); // 댓글 업로드 당시 시간
            photo_comment_time.push((now_time - comment_uploadtime) / 1000 / 60); // 현재 시간 - 업로드 시간
            photo_comment_seq.push(photo_comment_infromation[3]);
            photo_comment_nick.push(photo_comment_infromation[4]);
        }
        
        res.render('home/board_photo', {title:photo_title_des_like[1], description:photo_title_des_like[2], like:photo_like_cnt, 
            like_check:photo_like_check, user_id:photo_title_des_like[3], id:upload_id, seq:photo_seq, comment_cnt:comment_cnt, 
            comment_id:photo_comment_id, comment_contents:photo_comment_contents, comment_time:photo_comment_time,
            comment_seq:photo_comment_seq, comment_nick:photo_comment_nick, banner_check_point:user_point});
    },
    upload: (req, res) => {
        res.render("home/upload");

        var queryData = url.parse(req.url, true).query;
        upload_id = queryData.id;
    },
    board_video: (req, res) => {
        res.render("home/board_video");
    },
    board_video_id: async (req, res) => {
        var id = req.params.id;
        
        var queryData = url.parse(req.url, true).query;
        var check = queryData.like;
        var video_seq = queryData.n;
        var video_declaration = queryData.declaration;
        var video_comment_delete = queryData.comment_delete_seq;
        var video_comment_update = queryData.comment_update_seq;
        var update_comment = queryData.update_comment;
        var user_point = 0;
        var id_check = 0;
        upload_id = queryData.id; 
        
        comment_seq = video_seq;
        comment_title = id;

        const video_user = new User();
        var video_title_des_like  = await video_user.videoSearchTitledesLike(video_seq);

        const query = "SELECT point FROM member WHERE memberid = ?;";
        db.query (query, [video_title_des_like[3]], async(err, data) => 
        {
            if (data[0] === undefined)
            {
                id_check = 1;
            }
            if (id_check === 0){
                user_point = await video_user.getPoint(video_title_des_like[3]); // user의 point에 따라 광고를 표시 할지 말지 결정하기 위한 소스코드
            } else {
                user_point = await video_user.getPoint("check"); // user의 point에 따라 광고를 표시 할지 말지 결정하기 위한 소스코드
            }
        });

        var video_like_cnt = video_title_des_like[0];
        await video_user.videoLike(upload_id, id, video_seq); // 특정 id의 해당 영상을 방문한 이력을 가지고 있는 DB 생성
        var video_like_check = await video_user.getvideoCheck(upload_id + id + video_seq); // 방문 이력이 있는 DB의 like_check 값을 가져온다

        if (check == 3 && video_like_check == 2){
            await video_user.videoUpatelike(video_seq, check);
            video_like_cnt += 1;
            await video_user.videoChecklike(upload_id + id + video_seq, check); // 방문 이력이 있는 DB의 like_check 값을 3로 수정
            video_like_check = 3;
            await video_user.plusPoint(video_title_des_like[3], 5); 
        }
        else if (check == 2 && video_like_check == 3) {
            await video_user.videoUpatelike(video_seq, check);
            video_like_cnt -= 1;
            await video_user.videoChecklike(upload_id + id + video_seq, check); // 방문 이력이 있는 DB의 like_check 값을 2으로 수정
            video_like_check = 2;
            await video_user.minusPoint(video_title_des_like[3], 5); 
        }

        if (video_declaration && video_declaration != "null") {
            await video_user.videodeclarationUpdate(video_seq); // 신고버튼을 클릭했으면 신고 Count가 올라갈 수 있도록
        }

        if (video_comment_delete !== undefined) { // 댓글 삭제 버튼을 눌렀을 때 데이터 삭제 및 seq 초기화
            await video_user.videocommentDelete(video_comment_delete); // video_comment 테이블에서 해당 seq의 데이터를 삭제
            var video_comment_final_seq = await video_user.videocommentseqSearch();
            await video_user.commentseqstartupdateVideo(video_comment_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(video_comment TB)
        }

        if (video_comment_update !== undefined) { // 댓글 수정 버튼을 눌렀을 때 comment 수정
            await video_user.videocommentUpdate(video_comment_update, update_comment); // video_comment 테이블에서 해당 seq의 comment 수정
        }

        var comment_cnt = await video_user.videocommentCount("%" + id + video_seq); // video_comment 테이블에서 특정 overlap으로 끝나는 데이터 수
        await video_user.commentvcheckRenew("%" + id + video_seq); // comment_check를 0으로 업데이트(댓글 여러개를 출력하기 위해)
        var video_comment_id = [];
        var video_comment_contents = [];
        var video_comment_time = [];
        var video_comment_seq = [];
        var video_comment_nick = [];
        
        for (var i = 0; i < comment_cnt; i++) { // board_video.ejs에서 댓글 출력 하기 위한 객체에 값을 저장
            var video_comment_infromation = await video_user.videocommentgetId("%" + id + video_seq);
            video_comment_id.push(video_comment_infromation[0]);
            video_comment_contents.push(video_comment_infromation[1]);

            var now_time = new Date().getTime(); // 현재 시간
            var comment_uploadtime = new Date(video_comment_infromation[2]).getTime(); // 댓글 업로드 당시 시간
            video_comment_time.push((now_time - comment_uploadtime) / 1000 / 60); // 현재 시간 - 업로드 시간
            video_comment_seq.push(video_comment_infromation[3]);
            video_comment_nick.push(video_comment_infromation[4]);
        }

        res.render('home/board_video', {title:video_title_des_like[1], description:video_title_des_like[2], like:video_like_cnt, 
            like_check:video_like_check, user_id:video_title_des_like[3], id:upload_id, seq:video_seq, comment_cnt:comment_cnt, 
            comment_id:video_comment_id, comment_contents:video_comment_contents, comment_time:video_comment_time,
            comment_seq:video_comment_seq, comment_nick:video_comment_nick, banner_check_point:user_point});
    },
    mypage: async (req, res) => {var queryData = url.parse(req.url, true).query;
        var photo_array = [];
        var video_array = [];
        var photo_id_array = [];
        var video_id_array = [];

        const photo_user = new User();
        const video_user = new User();

        // fs.name 까지는 가장 최근의 img 파일의 이름을 가장 최근의 txt 파일의 이름으로 변경하는 것이다.
        const dir_photo = './src/public/uploads/photo/';
        const dir_video = './src/public/uploads/video/';
        const dir_thumbnail = './src/public/uploads/thumbnail/';

        const list_photo = fs.readdirSync(dir_photo).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_photo + filename).mtime
            }
        });
        const list_video = fs.readdirSync(dir_video).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_video + filename).mtime
            }
        });
        const list_thumbnail = fs.readdirSync(dir_thumbnail).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_thumbnail + filename).mtime
            }
        });
        
        list_photo.sort((a, b) => b.mtime - a.mtime);
        const photo_title = await photo_user.photoSearchTitle(list_photo.length);
        fs.rename('src/public/uploads/photo/' + list_photo[0].filename, 'src/public/uploads/photo/' + photo_title + list_photo.length + '.png', function(err){});
        
        list_video.sort((a, b) => b.mtime - a.mtime);
        const video_title = await video_user.videoSearchTitle(list_video.length);
        fs.rename('src/public/uploads/video/' + list_video[0].filename, 'src/public/uploads/video/' + video_title + list_video.length + '.mp4', function(err){});

        list_thumbnail.sort((a, b) => b.mtime - a.mtime);
        fs.rename('src/public/uploads/thumbnail/' + list_thumbnail[0].filename, 'src/public/uploads/thumbnail/' + video_title + list_video.length + '.png', function(err){});
        
        for (var i = 1; i <= list_photo.length; i++){
            photo_array.push(await photo_user.photoSearchTitle(i));
            var photo_title_des_like  = await photo_user.photoSearchTitledesLike(i);
            photo_id_array.push(photo_title_des_like[3]);
        }

        for (var i = 1; i <= list_video.length; i++){
            video_array.push(await video_user.videoSearchTitle(i));
            var video_title_des_like  = await video_user.videoSearchTitledesLike(i);
            video_id_array.push(video_title_des_like[3]);
        }

        var queryData = url.parse(req.url, true).query;
        upload_id = queryData.id;
        var user_point = await photo_user.getPoint(upload_id); // user의 point에 따라 광고를 표시 할지 말지 결정하기 위한 소스코드;

        res.render("home/mypage", {photo: photo_array, video: video_array, id:upload_id, photo_id:photo_id_array, video_id:video_id_array, point:user_point});
    },
    mypage_id: async (req, res) => {
        var id = req.params.id;

        var queryData = url.parse(req.url, true).query;
        var check = queryData.like;
        var photo_seq = queryData.n;
        var photo_declaration = queryData.declaration;
        var photo_comment_delete = queryData.comment_delete_seq;
        var photo_comment_update = queryData.comment_update_seq;
        var update_comment = queryData.update_comment;
        upload_id = queryData.id;

        comment_seq = photo_seq;
        comment_title = id;

        const photo_user = new User();
        var photo_title_des_like = await photo_user.photoSearchTitledesLike(photo_seq); // photo의 title, des, like를 DB에서 같이 가져오는 소스코드
        var user_point = await photo_user.getPoint(photo_title_des_like[3]); // user의 point에 따라 광고를 표시 할지 말지 결정하기 위한 소스코드

        var photo_like_cnt = photo_title_des_like[0];
        await photo_user.photoLike(upload_id, id, photo_seq); // 특정 id의 해당 사진을 방문한 이력을 가지고 있는 DB 생성
        var photo_like_check = await photo_user.getphotoCheck(upload_id + id + photo_seq); // 방문 이력이 있는 DB의 like_check 값을 가져온다

        if (check == 1 && photo_like_check == 0){
            await photo_user.photoUpatelike(photo_seq, check);
            photo_like_cnt += 1;
            await photo_user.photoChecklike(upload_id + id + photo_seq, check); // 방문 이력이 있는 DB의 like_check 값을 1로 수정
            photo_like_check = 1;
            await photo_user.plusPoint(photo_title_des_like[3], 5); // 좋아요 누른 사진을 업로드한 user의 point + 5
        }
        else if (check == 0 && photo_like_check == 1) {
            await photo_user.photoUpatelike(photo_seq, check);
            photo_like_cnt -= 1;
            await photo_user.photoChecklike(upload_id + id + photo_seq, check); // 방문 이력이 있는 DB의 like_check 값을 0으로 수정
            photo_like_check = 0;
            await photo_user.minusPoint(photo_title_des_like[3], 5); // 좋아요 누른 사진을 업로드한 user의 point - 5
        }

        if (photo_declaration && photo_declaration != "null") { // 신고하기 버튼을 눌렀을 때
            await photo_user.photodeclarationUpdate(photo_seq); // 신고버튼을 클릭했으면 신고 Count가 올라갈 수 있도록
        }

        if (photo_comment_delete !== undefined) { // 댓글 삭제 버튼을 눌렀을 때 데이터 삭제 및 seq 초기화
            await photo_user.photocommentDelete(photo_comment_delete); // photo_comment 테이블에서 해당 seq의 데이터를 삭제
            var photo_comment_final_seq = await photo_user.photocommentseqSearch();
            await photo_user.commentseqstartupdatePhoto(photo_comment_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(photo_comment TB)
        }

        if (photo_comment_update !== undefined) { // 댓글 수정 버튼을 눌렀을 때 comment 수정
            await photo_user.photocommentUpdate(photo_comment_update, update_comment); // photo_comment 테이블에서 해당 seq의 comment 수정
        }

        var comment_cnt = await photo_user.photocommentCount("%" + id + photo_seq); // photo_comment 테이블에서 특정 overlap으로 끝나는 데이터 수
        await photo_user.commentpcheckRenew("%" + id + photo_seq); // comment_check를 0으로 업데이트(댓글 여러개를 출력하기 위해)
        var photo_comment_id = [];
        var photo_comment_contents = [];
        var photo_comment_time = [];
        var photo_comment_seq = [];
        var photo_comment_nick = [];

        for (var i = 0; i < comment_cnt; i++) { // board_photo.ejs에서 댓글 출력 하기 위한 객체에 값을 저장
            var photo_comment_infromation = await photo_user.photocommentgetId("%" + id + photo_seq);
            photo_comment_id.push(photo_comment_infromation[0]);
            photo_comment_contents.push(photo_comment_infromation[1]);

            var now_time = new Date().getTime(); // 현재 시간
            var comment_uploadtime = new Date(photo_comment_infromation[2]).getTime(); // 댓글 업로드 당시 시간
            photo_comment_time.push((now_time - comment_uploadtime) / 1000 / 60); // 현재 시간 - 업로드 시간
            photo_comment_seq.push(photo_comment_infromation[3]);
            photo_comment_nick.push(photo_comment_infromation[4]);
        }
        
        res.render('home/board_photo', {title:photo_title_des_like[1], description:photo_title_des_like[2], like:photo_like_cnt, 
            like_check:photo_like_check, user_id:photo_title_des_like[3], id:upload_id, seq:photo_seq, comment_cnt:comment_cnt, 
            comment_id:photo_comment_id, comment_contents:photo_comment_contents, comment_time:photo_comment_time,
            comment_seq:photo_comment_seq, comment_nick:photo_comment_nick, banner_check_point:user_point});
    },
    question: async (req, res) => {
        var question_array = [];
        var question_id_array = [];
        var question_num_array = [];
        var question_data_array = [];

        var queryData = url.parse(req.url, true).query;
        var delete_seq = queryData.seq;
        var delete_check = queryData.delete;

        const question_user = new User();

        if (delete_check == "question_delete") {
            var question_delete_title = await question_user.questionSearchTitledesLike(delete_seq); // 파일 삭제시 제목 있어야 함
            await question_user.questionDelete(delete_seq); // seq에 해당하는 photo의 테이블의 데이터를 삭제
            await question_user.questioncommentoverlapDelete("fjfdjdkj$Efjd@" + delete_seq); // photo_comment 테이블에 삭제될 사진의 overlap을 삭제

            await question_user.questionseqUpdate(delete_seq); // photo 테이블에 seq가 삭제 되었으므로 업데이트
            var question_final_seq = await question_user.questionseqSearch(); // title의 목록을 만들기 위해 마지막 seq 조회
            var question_comment_final_seq = await question_user.questioncommentseqSearch();
            await question_user.seqstartupdateQuestion(question_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(photo TB)
            await question_user.commentseqstartupdatePhoto(question_comment_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(photo_comment TB)

            await question_user.minusPoint(question_delete_title[3], 10); // 삭제한 사진을 업로드한 user의 point를 차감
            
            for (var i = 1; i <= question_final_seq; i++){ // 삭제한 사진 뒤의 seq에 해당하는 사진 파일과 데이터 업데이트
                var question_title = await question_user.questionSearchTitledesLike(i);
                question_array.push(question_title[1]);
            }

            delete_seq = parseInt(queryData.seq);
            // 삭제 한 뒤 나머지 사진에서 댓글이 정상적으로 출력되기 위한 작업
            for (var i = delete_seq + 1; i <= question_final_seq + 1; i++) { // 삭제한 사진의 overlap 숫자보다 큰 사진들의 숫자들을 -1 하기 위해서
                await question_user.questioncommentoverlapUpdate("fjfdjdkj$Efjd@", i, i - 1); // photo_comment TB에서 삭제된 사진의 뒤의 사진들의 overlap 번호를 -1
            }

            for (var i = 1; i <= question_final_seq; i++){
                var question_title_des_like = await question_user.questionSearchTitledesLike(i);
                question_id_array.push(question_title_des_like[3]); // question의 id
                question_num_array.push(question_title_des_like[0]); // question의 댓글 개수
    
                var now_time = new Date().getTime(); // 현재 시간
                var question_uploadtime = new Date(question_title_des_like[4]).getTime(); // 댓글 업로드 당시 시간
                question_data_array.push((now_time - question_uploadtime) / 1000 / 60); // 현재 접속시 댓글 업로드 당시와의 시간 차이
            }
        } else {
            var question_final_seq = await question_user.questionseqSearch();

            for (var i = 1; i <= question_final_seq; i++){
                var question_title_des_like = await question_user.questionSearchTitledesLike(i);
                question_array.push(question_title_des_like[1]); // question의 title
                question_id_array.push(question_title_des_like[3]); // question의 id
                question_num_array.push(question_title_des_like[0]); // question의 댓글 개수
    
                var now_time = new Date().getTime(); // 현재 시간
                var question_uploadtime = new Date(question_title_des_like[4]).getTime(); // 댓글 업로드 당시 시간
                question_data_array.push((now_time - question_uploadtime) / 1000 / 60); // 현재 접속시 댓글 업로드 당시와의 시간 차이
            }
        }

        var queryData = url.parse(req.url, true).query;
        upload_id = queryData.id;
        res.render("home/question", {question_title: question_array, id:upload_id, question_id:question_id_array, 
            question_num:question_num_array, question_data:question_data_array});
    },
    board_question_id: async (req, res) => {
        var id = req.params.id;
        
        var queryData = url.parse(req.url, true).query;
        var question_seq = queryData.n;
        var question_declaration = queryData.declaration;
        var question_comment_delete = queryData.comment_delete_seq;
        var question_comment_update = queryData.comment_update_seq;
        var update_comment = queryData.update_comment;
        var user_point = 0;
        var id_check = 0;
        upload_id = queryData.id;
        num = question_seq;
        
        comment_seq = question_seq;
        comment_title = id;

        const question_user = new User();
        var question_title_des_like  = await question_user.questionSearchTitledesLike(comment_seq);

        const query = "SELECT point FROM member WHERE memberid = ?;";
        db.query (query, [question_title_des_like[3]], async(err, data) => 
        {
            if (data[0] === undefined)
            {
                id_check = 1;
            }
            if (id_check === 0){
                user_point = await question_user.getPoint(question_title_des_like[3]); // user의 point에 따라 광고를 표시 할지 말지 결정하기 위한 소스코드
            } else {
                user_point = await question_user.getPoint("check"); // user의 point에 따라 광고를 표시 할지 말지 결정하기 위한 소스코드
            }
        });

        if (question_declaration && question_declaration != "null") {
            await question_user.questiondeclarationUpdate(comment_seq); // 신고버튼을 클릭했으면 신고 Count가 올라갈 수 있도록
        }

        if (question_comment_delete !== undefined) { // 댓글 삭제 버튼을 눌렀을 때 데이터 삭제 및 seq 초기화
            await question_user.questioncommentDelete(question_comment_delete); // video_comment 테이블에서 해당 seq의 데이터를 삭제
            var question_comment_final_seq = await question_user.questioncommentseqSearch();
            await question_user.commentseqstartupdateQuestion(question_comment_final_seq + 1); // seq를 파라미터로 넘겨준 숫자부터 시작할 수 있도록 업데이트(video_comment TB)
        }

        if (question_comment_update !== undefined) { // 댓글 수정 버튼을 눌렀을 때 comment 수정
            await question_user.questioncommentUpdate(question_comment_update, update_comment); // video_comment 테이블에서 해당 seq의 comment 수정
        }

        var comment_cnt = await question_user.questioncommentCount("%" + id + question_seq); // video_comment 테이블에서 특정 overlap으로 끝나는 데이터 수
        await question_user.commentqcheckRenew("%" + id + question_seq); // comment_check를 0으로 업데이트(댓글 여러개를 출력하기 위해)
        var question_comment_id = [];
        var question_comment_contents = [];
        var question_comment_time = [];
        var question_comment_seq = [];
        var question_comment_nick = [];
        
        for (var i = 0; i < comment_cnt; i++) { // board_video.ejs에서 댓글 출력 하기 위한 객체에 값을 저장
            var question_comment_infromation = await question_user.questioncommentgetId("%" + id + question_seq);
            question_comment_id.push(question_comment_infromation[0]);
            question_comment_contents.push(question_comment_infromation[1]);

            var now_time = new Date().getTime(); // 현재 시간
            var comment_uploadtime = new Date(question_comment_infromation[2]).getTime(); // 댓글 업로드 당시 시간
            question_comment_time.push((now_time - comment_uploadtime) / 1000 / 60); // 현재 시간 - 업로드 시간
            question_comment_seq.push(question_comment_infromation[3]);
            question_comment_nick.push(question_comment_infromation[4]);
        }

        res.render('home/board_question', {title:question_title_des_like[1], description:question_title_des_like[2], 
            user_id:question_title_des_like[3], id:upload_id, seq:question_seq, comment_cnt:comment_cnt, 
            comment_id:question_comment_id, comment_contents:question_comment_contents, comment_time:question_comment_time,
            comment_seq:question_comment_seq, comment_nick:question_comment_nick, banner_check_point:user_point});
    },
}

const process = {
    upload: async(req, res) => {
        const extension = req.body.extension;

        if (extension !== undefined) { // 사진 또는 영상 추가하는 버튼 말고 마지막 버튼 눌렀을 때
            const user = new User(req.body);
            if (extension == "mp4"){
                const response = await user.videoUpload(upload_id);
                await user.plusPoint(upload_id, 10);
                return res.json(response);
            } else if(extension === "img") {
                const response = await user.photoUpload(upload_id);
                await user.plusPoint(upload_id, 10);
                return res.json(response);
            } else {
                const question_uploadtime = new Date(); // 업로드 시간
                const response = await user.questionUpload(upload_id, question_uploadtime);
                await user.plusPoint(upload_id, 10);
                return res.json(response);
            }
        } else { // 사진 또는 영상 추가하는 버튼
            if (req.file !== undefined) { // 파일이 선택 되었다면
                if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === "image/png") { // 사진을 추가했을 때
                    const response = { success: true, image: req.file.filename, destination: req.file.destination};
                    return res.json(response);
                } else { // 영상을 추가 했을 때
                    const response = { success: true };
                    return res.json(response);
                }
            }
        }
    },
    board_id: async(req, res) => {
        var photo_comment_overlap = upload_id + comment_title + comment_seq;

        const photo_comment = req.body.comment;
        const comment_user = new User(req.body);
        const photo_uploadtime = new Date(); // 업로드 시간
        const photo_comment_nickname = await comment_user.photonickSearch(upload_id);

        // photo_comment DB에 댓글을 작성한 user의 id, overlap, 댓글 내용 Insert
        const response_comment = await comment_user.photocommentUpload(upload_id, photo_comment_overlap, 
            photo_comment, photo_comment_nickname, photo_uploadtime); 
        return res.json(response_comment);
    },
    board_video_id: async(req, res) => {
        var video_comment_overlap = upload_id + comment_title + comment_seq;

        const video_comment = req.body.comment;
        const comment_user = new User(req.body);
        const video_uploadtime = new Date(); // 업로드 시간
        const video_comment_nickname = await comment_user.videonickSearch(upload_id);

        // video_comment DB에 댓글을 작성한 user의 id, overlap, 댓글 내용 Insert
        const response_comment = await comment_user.videocommentUpload(upload_id, video_comment_overlap, 
            video_comment, video_comment_nickname, video_uploadtime);
        return res.json(response_comment);
    },
    board_question_id: async(req, res) => {
        var question_comment_overlap = upload_id + comment_title + comment_seq;

        const question_comment = req.body.comment; // 댓글창에 입력한 내용
        const comment_user = new User(req.body);
        const question_uploadtime = new Date(); // 업로드 시간
        const question_comment_nickname = await comment_user.videonickSearch(upload_id);

        // video_comment DB에 댓글을 작성한 user의 id, overlap, 댓글 내용 Insert
        const response_comment = await comment_user.questioncommentUpload(upload_id, question_comment_overlap, 
            question_comment, question_comment_nickname, question_uploadtime);
            await comment_user.questionAnswer(num);
        
        return res.json(response_comment);
    },
};

module.exports = {
    output,
    process,
};