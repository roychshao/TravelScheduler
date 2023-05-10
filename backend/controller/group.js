import crypto from 'crypto';
import dotenv from 'dotenv';
import Group from './../database/group.js';
import {v4 as uuid} from "uuid";
dotenv.config();

export const create = async (req, res, next) => {

    const { user_id } = req?.session;
    const { group_name, group_discription, group_peoplenum } = req.body;
    
    const group_id = uuid();

    await Group.create(group_id, group_name, group_discription, group_peoplenum, user_id)
        .then(result => {
            var data = {
                "group_id": group_id
            };
            req.data = JSON.stringify(data);
            next();
        }).catch(err => {
            req.err = err;
            next();
        })
}

