"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    //회원 가입 및 로그인
    async loginB() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);

        if (user) {
            if (user.id === client.id && user.psword === client.psword) {
                return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다." };
        }
        return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch (err) {
            return { success: false, err };
        }
    }

    async registerB() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: "이미 존재하는 아이디입니다."};
        }
    }

    async idCheck() {
        const client = this.body;
        const response = await UserStorage.getIdCheck(client.data);
        return response;
        
    }

    async nickCheck() {
        const client = this.body;
        const response = await UserStorage.getNickCheck(client.data);
        return response;
        
    }

    async idnickCheck() {
        const client = this.body;
        const response = await UserStorage.getIdNickCheck(client.data1, client.data4);
        return response;
        
    }

    async mailphoneCheck() {
        const client = this.body;
        const response = await UserStorage.getMailPhoneCheck(client.data1, client.data2);
        return response;
        
    }

    async register() 
    {
        const client = this.body;
        const response = await UserStorage.saveMember(client.data1,client.data2,client.data4,client.data5,client.data6,client.data7,client.data8);
        return response;
    }

    async login(memberid) {
        const response = await UserStorage.loginMember(memberid);
        return response;
    }

    async modifyInfomation() {
        const client = this.body;
        const response = await UserStorage.infomationModify(client.data1,client.data2,client.data4,client.data5,client.data6,client.data7,client.data8);
        return response;
    }

    async findId(mail, phone) {
        const response = await UserStorage.idFind(mail, phone);
        return response;
    }

    async findPassword(memberid, sua, sub) {
        const response = await UserStorage.passwordFind(memberid, sua, sub);
        return response;
    }

    async meberResign() {
        const client = this.body;
        const response = await UserStorage.resignMember(client.data1, client.data2, client.data3);
        return response;
    }
}

module.exports = User;