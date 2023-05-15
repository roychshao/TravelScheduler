import { pool } from './pool.js';

export const useTransaction = (sqls, values) => {
    return new Promise( async (resolve, reject) => {
        const conn = await pool.getConnection( async (err, conn) => {
            if(err)
                reject(err);
            else {
                try {
                    // start transaction
                    await conn.beginTransaction();
                    var results = [];
                    for (let i = 0; i < sqls.length; ++i) {
                        const sql = sqls[i];
                        const value = values[i] || [];
                        
                        // prevent sql injection
                        for(let i = 0; i < value.length; ++i) {
                            if(sql.startsWith("SELECT"))
                                break;
                            if(isNaN(Number(value[i]))) {
                                value[i] = conn.escape(value[i]);
                            }
                        }

                        const result = await new Promise((resolve, reject) => {
                            conn.query(sql, value, (err, result, fields) => {
                                if(err)
                                    reject(err);
                                else {
                                    resolve(result);
                                }
                            });
                        })
                        results.push(result);
                    }

                    await conn.commit();
                    resolve(results);
                } catch (err) {
                    await conn.rollback();
                    reject(err);
                } finally {
                    conn.release();
                }
            }
        })
    })
};