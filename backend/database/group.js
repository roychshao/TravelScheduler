import { pool } from './pool.js';

const print_error = (err) => {
    console.log("error: " + err.message);
}

// TODO: transaction, prevent sql injection


const create = (group_id, group_name, group_discription, group_peoplenum) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO group VALUE(?,?,?,?)";
        // 從pool中拿一條connection
        pool.getConnection( async (err, conn) => {
            // 檢查連線時錯誤
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [group_id, group_name, group_discription, group_peoplenum], (err, results, fields) => {
                    // 檢查sql執行時錯誤
                    if(err)
                        reject(err);
                    else {
                        // 釋放connection回pool
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

export default {create}