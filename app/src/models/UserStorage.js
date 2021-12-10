"use strict";

const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM users WHERE id = ?;";
          db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            else resolve(data[0]);
          });
        });
      }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
            db.query(query, 
            [userInfo.id, userInfo.name, userInfo.psword],
            (err) => {
                if(err) reject(`${err}`);
                resolve({ success: true });
            })
        });
    }

    static getIdCheck(memberid) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE memberid = ?;";
        db.query(query, [memberid], (err, data) => {
          if (err) {
            console.log("err ocurred", err);
          }
          else {
              if (data.length == 0) {
                  console.log("해당 아이디로 가입이 가능합니다");
                  resolve(data);
              }
              else {
                  console.log("해당 아이디로 가입이 불가능합니다.");
                  resolve(data);
              }
          }
        });
      });
    }

    static getNickCheck(nickname) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE nickname = ?;";
        db.query(query, [nickname], (err, data) => {
          if (err) {
            console.log("err ocurred", err);
          }
          else {
              if (data.length == 0) {
                  console.log("해당 닉네임로 가입이 가능합니다");
                  resolve(data);
              }
              else {
                  console.log("해당 닉네임으로 가입이 불가능합니다.");
                  resolve(data);
              }
          }
        });
      });
    }

    static getIdNickCheck(memberid, nickname) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE memberid = ? OR nickname = ?;";
        db.query(query, [memberid, nickname], (err, data) => {
          if (err) {
            console.log('user infor is:', err);
          }
          else {
              if (data.length == 0) {
                  console.log("가입된 정보가 없습니다. 가입이 가능합니다.");
                  resolve(data);
              }
              else {
                  console.log('아이디와 닉네임에 중복이 존재해 회원이 되실 수 없습니다.');
                  resolve(data);
              }
          }
        });
      });
    }

    static getMailPhoneCheck(mail, phone) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE mail = ? AND phone = ?;";
        db.query(query, [mail, phone], (err, data) => {
          if (err) {
            console.log("err ocurred", err);
          }
          else {
              if (data.length == 0) {
                  console.log("가입 가능한 정보입니다.");
                  resolve(data);
              }
              else {
                  console.log("이메일과 전화번호가 둘다 같은 회원이 존재합니다. 찾기를 진행해주세요....");
                  resolve(data);
              }
          }
        });
      });
    }

    static saveMember(memberid,password,nickname,mail,phone,sua,sub) 
    {
      return new Promise((resolve, reject) => {
        const query = "INSERT INTO member(memberid, password, nickname, mail, phone, passwordfind, passwordanswer) VALUES(?, ?, ?, ?, ?, ?, ?);";
        
        db.query(query, [memberid, password, nickname, mail, phone, sua, sub], 
          (err, data) => {
          if (err) {
            console.log('user infor is:', err);
          }
          else {
              console.log('성공적으로 쿼리 문을 이식하였습니다.');
              console.log(Object.keys(data).length);
              resolve(data);
          }
          });
      });
    }

    static loginMember(memberid) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE memberid = ?;";
        db.query(query, [memberid], (err, data) => {
          if (err) 
          {
            console.log("err ocurred", err);
            resolve(data);
          }
          else 
          {
            resolve(data);
          }
        });
      });
    }

    static infomationModify(memberid,password,nickname,mail,phone,sua,sub) 
    {

      console.log(memberid);
      return new Promise((resolve, reject) => {
        const query = "UPDATE member SET password=?, nickname=?,  mail=?, phone=?, passwordfind=?, passwordanswer=? WHERE memberid =?;";
        db.query(query, [password, nickname, mail, phone, sua, sub, memberid], 
        (err, data) => {
          if (err) 
                {

                    console.log(err);
                    resolve(data);
                }
                else 
                {
                    console.log(Object.keys(data).length);
                    resolve(data);
                }
        });
      });
    }

    static infomationFind(infomation) {
      return new Promise((resolve, reject) => {
        const query = "UPDATE member SET password=?, nickname=?,  mail=?, phone=?, passwordfind=?, passwordanswer=? WHERE memberid =?;";
        db.query(query, [infomation.memberid, infomation.password, infomation.nickname, 
        information.mobile, infomation.mail, infomation.passwordfind, infomation.passwordanswer], 
        (err, data) => {
          if (err) 
                {
                    console.log(err);
                    resolve(data);
                }
                else 
                {
                    console.log(Object.keys(data).length);
                    resolve(data);
                }
        });
      });
    }

    static idFind(mail, phone) {
      return new Promise((resolve, reject) => {
        const query = "SELECT memberid FROM member WHERE mail =? AND phone =?;";
        db.query(query, [mail, phone], (err, data) => {
          if (data.length != 0) 
          {
            if (err) {
                console.log('user infor is:', err);
            }
            else {
                console.log("귀하의 아이디는 :", data[0].memberid);
                resolve(data);
            }
        } else {
              console.log('귀하의 조건에 맞는 아이디가 존재하지 않습니다.');
              resolve(data);
          }
        });
      });
    }

    static passwordFind(memberid, sua, sub) {
      return new Promise((resolve, reject) => {
        const query = "SELECT password FROM member WHERE memberid =? AND passwordfind =? AND passwordanswer =?;";
        db.query(query, [memberid, sua, sub], (err, data) => {
          if (data.length != 0) {
              if (err) {
                  console.log('user infor is:', err);
              }
              else {
                  console.log("귀하의 아이디는 :", memberid);
                  console.log("그에 맞는 귀하의 비밀번호는", data[0].password);
                  resolve(data);
              }
          }
          else {
              console.log('회원 정보에 없는 아이디이거나, 비밀번호 찾기와 답이 틀립니다.');
              resolve(data);
          }
        });
      });
    }

    static resignMember(memberid, password1, password2) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE memberid = ?;";
        db.query(query, [memberid], (err, data) => {
          if (data.length != 0) {
            if (err) {
              console.log("err ocurred", err);
            }
            else {
                if (data.length > 0) {
                    if (data[0].password == password1) {
                        if (password1 == password2) {
                            console.log("회원님과 함께 할 수 있어 영광이었습니다.");
                            db.query('DELETE FROM member WHERE memberid = ?', [memberid], function (error, results, field) {
                                if (error) {
                                    cnonsole.log("err ocurred", error);
                                }
                                else {
                                    
                                    console.log("떠나신 회원님의 앞날에 행복이 있기를....")
                                    resolve(data);
                                }
                            });
                        }
                        else {
                            console.log("본 회사의 회원이나, 두 비밀번호가 다릅니다.");
                            resolve(data);
                        }
                    }
                    else {
                        console.log("본 회사의 회원이나, 비밀번호가 다릅니다.");
                        resolve(data);
                    }
                }
                else {
                    console.log("관련 아이디가 존재하지 않습니다.");
                    resolve(data);
                }
            }
          }
          else {
              console.log('회원 정보에 없는 아이디이거나, 비밀번호 찾기와 답이 틀립니다.');
              resolve(data);
          }
        });
      });
    }
}

module.exports = UserStorage;