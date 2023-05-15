import crypto from 'crypto';
import dotenv from 'dotenv';
import Group from './../database/group.js';
import {v4 as uuid} from "uuid";
dotenv.config();

const parseEscape = (value) => {
    return value.slice(1, value.length-1);
}

export const get = async (req, res, next) => {

    // const { user_id } = req?.session;

    const { user_id } = req.body;

    await Group.get(user_id)
        .then(result => {
            var data = {
                "groups": []
            };
          
            console.log(result[0]);
            console.log(result[1]);

            for(let i = 0; i < result[0].length; ++i) {
                var group = {
                    "group_id": parseEscape(result[0][i].group_id),
                    "group_name": parseEscape(result[0][i].name),
                    "group_discription": isNaN(result[0][i].discription) ? parseEscape(result[0][i].discription) : result[0][i].discription,
                    "group_peoplenum": result[0][i].people_num,
                    "group_creator": parseEscape(result[0][i].creator_id),
                    "members": result[1].filter(user => user.group_id === result[0][i].group_id).map(user => {
                        const ids = user.user_ids.split(",");
                        const names = user.names.split(",");
                        const members = [];
                        for(let i = 0; i < ids.length; ++i) {
                            members.push({
                                "user_id": parseEscape(ids[i]),
                                "username": parseEscape(names[i])
                            })
                        }
                        return members; 
                    })
                }
                data.groups.push(group);
            }

            req.data = JSON.stringify(data);
            next();
        }).catch(err => {
            req.err = err;
            next();
        })
}

export const create = async (req, res, next) => {

    const { user_id } = req?.session;
    const { group_name, group_discription } = req.body;
    
    const group_id = uuid();

    await Group.create(group_id, group_name, group_discription, 1, user_id)
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
