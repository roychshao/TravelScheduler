import { pool } from "./pool.js";
import { useTransaction } from "./utils.js";

const print_error = (err) => {
    console.log("error: " + err.message);
};

const create = (
    travel_id,
    group_id,
    user_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    trvel_done,
) => {
    return new Promise( async (resolve, reject) => {
        
        var sqls = [
            "INSERT INTO travel VALUE(?,?,?,?,?,?,?,?,?)",
        ]

        var values = [
            [travel_id, group_id, user_id, travel_name, travel_date, travel_peoplenum, travel_description, travel_done]
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
};

export default { create };
