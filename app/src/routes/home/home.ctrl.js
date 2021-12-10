"use strict";

const db = require("../../config/db");
const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    find: (req, res) => {
        res.render("login/find");
    },
    join: (req, res) => {
        res.render("login/join");
    },
    login2: (req, res) => {
        res.render("login/login2");
    },
    member: (req, res) => {
        res.render("login/member");
    },
    resign: (req, res) => {
        res.render("login/resign");
    },
    resignA: (req, res) => {
        res.render("login/resignA");
    },
    terms: (req, res) => {
        res.render("login/terms");
    },
    idfind: (req, res) => {
        res.render("login/idfind");
    },
    modify: (req, res) => {
        if (req.session.user) 
        {
            db.query('SELECT * FROM member WHERE memberid = ?', [req.session.user_id], function (error, data) 
            {


                if (data.length > 0) {
                    if (error) {
                        console.log('user infor is:', error);
                    }
                    else {
                        res.render('login/modify.ejs', { 'data': data }, function (err, html) {
                            if (err) {
                                console.log(err);
                            }
                            res.end(html);
                        })
                    }
                }
                else 
                {
                    console.log('데이터 베이스에 오류 발생');
                    res.redirect('/loginout');
                }
            });
        }
        else {
            console.log("session is not finded")
            res.redirect('/login2');
        }
    },
    passwordfind: (req, res) => {
        res.render("login/passwordfind");
    },
    membered: (req, res) => {
        res.render("login/member");
    },
    loginout: (req, res) => {
        if (req.session.user) {
            req.session.destroy(function (err) 
            {
                if (err) 
                {
                    console.log('세션 삭제시 오류 발생함');
                    return;
                }
                console.log("회원이 로그아웃하였습니다.");
                res.redirect('/');
            });
        }
        else {
            console.log('로그인이 되어있지 않음');
            res.redirect('/');
        }
    },
    finded: (req, res) => {
        var data1 = req.query.data1;
        var data2 = req.query.data2;

        if (data1 != "" && data2 == "undefined") {
            res.render("login/passwordfind", { data: data1 });
        }
        else {
            res.render("login/idfind", { data: data2 });
        }
    },
}

const process = {
    login: async(req, res) => {
        const user = new User(req.body);
        const response = await user.loginB();

        return res.json(response);
    },
    register: async(req, res) => {
        const user = new User(req.body);
        const response = await user.registerB();

        return res.json(response);
    },
    usercheck: async(req, res) => {
        const user = new User(req.body);
        const response = await user.idCheck();

        return res.json(response);
    },
    nickcheck: async(req, res) => {
        const user = new User(req.body);
        const response = await user.nickCheck();

        return res.json(response);
    },
    docheck: async(req, res) => {
        const user = new User(req.body);
        const response = await user.mailphoneCheck();

        return res.json(response);
    },
    member: async(req, res) => {
        const user = new User(req.body);
        const response = await user.idnickCheck();

        return res.json(response);
    },
    member2: async(req, res) => {

        const user = new User(req.body);
        const response = await user.register();
        
        return res.json(response);
    },
    loging: async(req, res) => {
        if (req.session.user) 
        {
            res.send("<h1>또 오실려고요?</h1>");
        }
        else {
            var comand = req.body;
            var memberid = comand.data1;
            var password = comand.data2;

            const user = new User();
            const response = await user.login(memberid);
            if (response.length > 0) {
                if (response[0].password == password) 
                {
                    req.session.user = req.body;
                    req.session.user_id = memberid;
                    req.session.user.expire = new Date();
                    console.log("The solution is :", response)
                    res.json(response);
                }
                else {
                    res.json(response);
                }
            }
            else {
                res.json(response);
            }
        }
    },
    modfiysave: async(req, res) => {
        const user = new User(req.body);
        const response = await user.modifyInfomation();
        return res.json(response);

    },
    finding: async(req, res) => {
        const user = new User(req.body);

        var comand = req.body;
        var mail = comand.data1;
        var phone = comand.data2;
        var memberid = comand.data3;
        var sua = comand.data4;
        var sub = comand.data5;

        if (phone != "" && mail != "" && memberid == "" && sua == "" && sub == "")
        {
            const response = await user.findId(mail, phone);
            return res.json(response);
        } 
        else if (phone == "" && mail == "" && memberid != "" && sua != "" && sub != "")
        {
            const response = await user.findPassword(memberid, sua, sub);
            return res.json(response);
        }
    },
    resigned: async(req, res) => {
        const user = new User(req.body);

        if (req.session.user) 
        {
            const response = await user.meberResign();
            req.session.destroy();
            return res.json(response);
        }
        else {
            console.log("session is not finded")
            res.redirect('/login2');
        }
    },   
};

module.exports = {
    output,
    process,
};