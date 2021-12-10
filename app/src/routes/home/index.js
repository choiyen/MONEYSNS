"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

// 마지막에는 이거를 사용!!!
// router.get("/chat", ctrl.output.chat);
router.get("/find", ctrl.output.find);
router.get("/join", ctrl.output.join);
router.get("/login2", ctrl.output.login2);
router.get("/member", ctrl.output.member);
router.get("/resign", ctrl.output.resign);
router.get("/resignA", ctrl.output.resignA);
router.get("/terms", ctrl.output.terms);
router.get("/idfind", ctrl.output.idfind);
router.get("/modify", ctrl.output.modify); // 보류(session)
router.get("/passwordfind", ctrl.output.passwordfind);

// ejs 파일 없는 거
router.get("/membered", ctrl.output.membered); //1
router.get("/loginout", ctrl.output.loginout); //2 //보류(session)
router.get("/finded", ctrl.output.finded); //3 

router.post("/usercheck", ctrl.process.usercheck); //1
router.post("/nickcheck", ctrl.process.nickcheck); //2
router.post("/docheck", ctrl.process.docheck); //4
router.post("/member", ctrl.process.member); //3
router.post("/member2", ctrl.process.member2); //5 // 보류
router.post("/loging", ctrl.process.loging); //6 // 보류(session))
router.post("/modfiy-save", ctrl.process.modfiysave); //7 //보류(modify 작동 다음)
router.post("/finding", ctrl.process.finding); //8
router.post("/resigned", ctrl.process.resigned); //9

module.exports = router;