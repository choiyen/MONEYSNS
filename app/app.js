"use strict";

// 모듈
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require("dotenv");
dotenv.config();

// 라우팅
const home = require("./src/routes/home");
const board = require("./src/routes/home/board");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use(session({
    key: 'sid',
    secret: "ksdjwv@!!ssz224455mml;/.v", // 이 값을 이용해 암호화옵션
    resave: false, // 세션이 수정되지 않아도 항상 저장할지 확인하는 옵션
    saveUninitialized: true, // 세션이 uninitalized 상태로 미리 만들어서 저장하는지 묻는 옵션
    cookie: { // 쿠키에 들어가는 세션 ID값의 옵션
        maxAge: 4000 * 60 * 10 // 2분후 폭파
    }
}));

app.use("/", home); // use -> 미들 웨어를 등록해주는 메소드
app.use("/", board);

module.exports = app;