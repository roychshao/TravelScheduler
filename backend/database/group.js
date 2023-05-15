import { pool } from './pool.js';
import { useTransaction } from './utils.js';

const print_error = (err) => {
    console.log("error: " + err.message);
}

const get = (user_id) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT * FROM `GROUP` WHERE group_id in (SELECT group_id FROM CONTAIN WHERE user_id = ?)",
            // "SELECT user_id, USER.name, group_id FROM USER INNER JOIN `GROUP` WHERE user_id in (SELECT user_id FROM CONTAIN WHERE group_id in (SELECT group_id FROM CONTAIN WHERE user_id = ?))"
            "SELECT g.group_id, GROUP_CONCAT(u.user_id) AS user_ids, GROUP_CONCAT(u.name) AS names FROM `GROUP` AS g INNER JOIN CONTAIN AS c ON g.group_id = c.group_id INNER JOIN USER AS u ON c.user_id = u.user_id WHERE g.group_id IN (SELECT group_id FROM CONTAIN AS c1 WHERE c1.user_id = ?) GROUP BY g.group_id"
        ]

        var values = [
            [user_id],
            [user_id]
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

const create = (group_id, group_name, group_discription, group_peoplenum, user_id) => {
    return new Promise( async (resolve, reject) => {
        
        var sqls = [
            "INSERT INTO `GROUP` VALUE(?,?,?,?,?)",
            "INSERT INTO CONTAIN VALUE(?,?)"
        ];

        var values = [
            [group_id, group_name, group_discription, group_peoplenum, user_id],
            [user_id, group_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

export default { get, create }
