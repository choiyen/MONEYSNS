"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./board.ctrl");

const multer = require('multer');
const fs = require("fs");

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        const dir_video = './src/public/uploads/video/';
        const dir_thumbnail = './src/public/uploads/thumbnail/';
       
        const list_video = fs.readdirSync(dir_video).map(filename => {
          return { filename: filename, mtime: fs.statSync(dir_video + filename).mtime }
        });
        const list_thumbnail = fs.readdirSync(dir_thumbnail).map(filename => {
          return { filename: filename, mtime: fs.statSync(dir_thumbnail + filename).mtime }
        });

        if (list_video.length > list_thumbnail.length) {
          cb(null, 'src/public/uploads/thumbnail');
        }
        else{
          cb(null, 'src/public/uploads/photo');
        }
      }
      else {
        cb(null, 'src/public/uploads/video');
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
})

const upload = multer({ storage: _storage });

router.get("/board", ctrl.output.board);
router.get("/upload", ctrl.output.upload);
router.get("/board_video", ctrl.output.board_video);
router.get("/board_video/:id", ctrl.output.board_video_id);
router.get("/board/:id", ctrl.output.board_id);
router.get("/mypage", ctrl.output.mypage);
router.get("/mypage/:id", ctrl.output.mypage_id);
router.get("/question", ctrl.output.question);
router.get("/board_question/:id", ctrl.output.board_question_id);

// 사용자가 post 방식으로 전달한 데이터가 업로드라는 디렉토리로 향하고 있다면 ctrl에 소스코드가 실행 될것이다.
// 두번째 파라미터는 파일을 가공해서 req 객체에 파일이라는 프로퍼티를 암시적으로 추가함
router.post("/upload", upload.single('upload'), ctrl.process.upload);
router.post("/board/:id", ctrl.process.board_id);
router.post("/board_video/:id", ctrl.process.board_video_id);
router.post("/board_question/:id", ctrl.process.board_question_id);

module.exports = router;