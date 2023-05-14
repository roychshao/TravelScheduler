import crypto from "crypto";
import dotenv from "dotenv";
import User from "./../database/user.js";
dotenv.config();

export const register = async (req, res, next) => {
    // 待資料庫架好後 使用session改為從session中拿使用者相關資料
    // const { username, email } = req.session?.passport?.user;
    const { username, email } = req.body;
    //使用email hash出 使用者id
    const sha256Hasher = crypto.createHmac("sha256", process.env.SECRET);
    const user_id = sha256Hasher.update(email).digest("base64");
    var isRegistered = false;

    // if(req.session.user_id != undefined) {
    //     console.log("user_id in session: " + req.session.user_id);
    // }

    req.session.user_id = user_id;
    req.session.username = username;
    req.session.email = email;

    await User.authenticate(user_id)
        .then(result => {
            if(result.length !== 0)
                isRegistered = true;
        }).catch(err => {
            req.err = err;
            next();
        })

    if(!isRegistered) {
        await User.register(user_id, username, email)
            .then(result => {
                var data = {
                    "user_id": user_id,
                };
                /*
                 * 處理資料區,如果格式不對
                 * 將data處理成response中data的格式
                 */
                req.data = JSON.stringify(data);
                next();
            }).catch(err => {
                req.err = err;
                next();
            })
    } else {
        var data = {
            user_id: user_id,
        };
        /*
         * 處理資料區,如果格式不對
         * 將data處理成response中data的格式
         */
        req.data = JSON.stringify(data);
        next();
    }
};
