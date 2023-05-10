import { pool } from './pool.js';

const print_error = (err) => {
    console.log("error: " + err.message);
}

// TODO: transaction, prevent sql injection

const authenticate = (user_id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT user_id FROM USER WHERE user_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, user_id, (err, results, fields) => {
                    if(err)
                        reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}


const register = (user_id, username, email) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO USER VALUE(?,?)";
        // 從pool中拿一條connection
        pool.getConnection( async (err, conn) => {
            // 檢查連線時錯誤
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [user_id, username], (err, results, fields) => {
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

export default { register, authenticate }
