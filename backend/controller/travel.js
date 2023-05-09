import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import Travel from "./../database/travel.js";
dotenv.config();

export const create = async (req, res, next) => {
  // 待資料庫架好後 使用session改為從session中拿使用者相關資料
  // const { username, email } = req.session?.passport?.user;
  const {
    user_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_discription,
    travel_done,
    group_id,
  } = req.body;
  //使用email hash出 使用者id

  const travel_id = uuid();

  await Travel.create(
    travel_id,
    user_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_discription,
    travel_done,
    group_id
  )
    .then((result) => {
      var data = {};
      /*
       * 處理資料區,如果格式不對
       * 將data處理成response中data的格式
       */
      req.data = JSON.stringify(data);
      next();
    })
    .catch((err) => {
      req.err = err;
      next();
    });
};
