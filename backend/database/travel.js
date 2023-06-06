import { pool } from "./pool.js";
import user from "./user.js";
import { useTransaction } from "./utils.js";

const print_error = (err) => {
  console.log("error: " + err.message);
};

const get = (user_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
      "SELECT * FROM `TRAVEL` WHERE user_id = ? OR group_id IN (SELECT group_id FROM `CONTAIN` WHERE user_id = ?)"
    ];
    var values = [ 
      [user_id, user_id]
    ];

    await useTransaction(sqls, values)
    .then((results) => {
      resolve(results);
    })
    .catch((err) => {
      print_error(err);
      reject(err);
    });
  });
};


const create = (
  travel_id,
  group_id,
  user_id,
  travel_name,
  travel_date,
  travel_peoplenum,
  travel_description,
  travel_done
) => {
  return new Promise(async (resolve, reject) => {
    var sqls = ["INSERT INTO travel VALUE(?,?,?,?,?,?,?,?)"];

    if(group_id)
      user_id = null;

    var values = [
      [
        travel_id,
        group_id,
        user_id,
        travel_name,
        travel_date,
        travel_peoplenum,
        travel_description,
        travel_done,
      ],
    ];

    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

const delete_ = (travel_id) => {
  return new Promise(async (resolve, reject) => {
    var sqls = ["DELETE FROM `TRAVEL` WHERE travel_id = ?"];

    var values = [[travel_id]];

    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

const edit = (
  travel_id,
  group_id,
  travel_name,
  travel_date,
  travel_peoplenum,
  travel_description,
  travel_done
) => {
  return new Promise(async (resolve, reject) => {
    var sqls = [
      "UPDATE `TRAVEL` SET group_id = ?, name = ?, date = ?, people_num = ?, description = ?, done = ? WHERE travel_id = ?",
    ];
    var values = [
      [
        group_id,
        travel_name,
        travel_date,
        travel_peoplenum,
        travel_description,
        travel_done,
        travel_id,
      ]
    ];
    
    await useTransaction(sqls, values)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        print_error(err);
        reject(err);
      });
  });
};

export default { create, delete_, edit, get };
