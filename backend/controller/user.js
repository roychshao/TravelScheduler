import crypto from "crypto";
import dotenv from "dotenv";
import User from "./../database/user.js";
dotenv.config();

export const register = async (req, res, next) => {
 
    const { username, email } = req.body;
    //使用email hash出 使用者id
    const sha256Hasher = crypto.createHmac("sha256", process.env.SECRET);
    const user_id = sha256Hasher.update(email).digest("base64");
    var isRegistered = false;

    // 將user_id, username, email寫入session
    req.session.user_id = user_id;
    req.session.username = username;
    req.session.email = email;

    await User.authenticate(user_id)
        .then(result => {
            if(result.length !== 0)
                isRegistered = true;
            else
                isRegistered = false;
        }).catch(err => {
            req.err = err;
            next();
        })

    if(!isRegistered) {
        await User.register(user_id, username)
            .then(result => {
                var data = {
                    "user_id": user_id,
                };
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
        req.data = JSON.stringify(data);
        next();
    }
};
