import { pool } from "./pool.js";

const print_error = (err) => {
  console.log("error: " + err.message);
};

const create = (
  travel_id,
  user_id,
  travel_name,
  travel_date,
  travel_peoplenum,
  travel_discription,
  travel_done,
  group_id
) => {
  return new Promise((resolve, reject) => {
    var sql = "INSERT INTO travel VALUE(?,?,?,?,?,?,?,?)";
    // 從pool中拿一條connection
    pool.getConnection(async (err, conn) => {
      // 檢查連線時錯誤
      if (err) {
        print_error(err);
        reject(err);
      } else {
        await conn.query(
          sql,
          [
            travel_id,
            user_id,
            travel_name,
            travel_date,
            travel_peoplenum,
            travel_discription,
            travel_done,
            group_id,
          ],
          (err, results, fields) => {
            // 檢查sql執行時錯誤
            if (err) reject(err);
            else {
              // 釋放connection回pool
              conn.release();
              resolve(results);
            }
          }
        );
      }
    });
  });
};

export default { create };
