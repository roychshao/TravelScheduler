import dotenv from "dotenv";
import Spot from "./../database/spot.js";
import { v4 as uuid } from "uuid";
dotenv.config();

export const create = async (req, res, next) => {
  // 待資料庫架好後 使用session改為從session中拿使用者相關資料
  // const { username, email } = req.session?.passport?.user;
  const {
    spot_tag_id,
    spot_arrive_id,
    spot_name,
    spot_location,
    spot_rank,
    spot_openhour,
    spot_discription,
    spot_transportation,
    spot_start_time,
    spot_arrive_time,
  } = req.body;

  const spot_id = uuid();

  await Spot.create(
    spot_id,
    spot_tag_id,
    spot_arrive_id,
    spot_name,
    spot_location,
    spot_rank,
    spot_openhour,
    spot_discription,
    spot_transportation,
    spot_start_time,
    spot_arrive_time
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
