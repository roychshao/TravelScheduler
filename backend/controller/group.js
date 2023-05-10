import crypto from 'crypto';
import dotenv from 'dotenv';
import Group from './../database/group.js';
import {v4 as uuid} from "uuid";
dotenv.config();

export const create = async (req, res, next) => {

    // 待資料庫架好後 使用session改為從session中拿使用者相關資料
    // const { username, email } = req.session?.passport?.user;
    const {group_name, group_discription, group_peoplenum} = req.body;
    //使用email hash出 使用者id
    const group_id = uuid();

    await Group.create(group_id, group_name, group_discription, group_peoplenum)
            .then(result => {
                var data = {};
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
}

