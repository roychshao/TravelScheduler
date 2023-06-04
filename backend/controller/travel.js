import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import Travel from "./../database/travel.js";
dotenv.config();

export const create = async (req, res, next) => {
  // const { user_id } = req?.session;
  const {
    user_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done,
    group_id,
  } = req.body;

  const travel_id = uuid();

  await Travel.create(
    travel_id,
    group_id,
    user_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done
  )
    .then((result) => {
      var data = {};
      req.data = JSON.stringify(data);
      next();
    })
    .catch((err) => {
      req.err = err;
      next();
    });
};

export const delete_ = async (req, res, next) => {
  const { travel_id } = req.body;

  await Travel.delete_(travel_id)
    .then((result) => {
      req.data = JSON.stringify({});
      next();
    })
    .catch((err) => {
      req.err = err;
      next();
    });
};

export const edit = async (req, res, next) => {
  const {
    travel_id,
    group_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done,
  } = req.body;

  await Travel.edit(
    travel_id,
    group_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_description,
    travel_done
  )
    .then((result) => {
      req.data = JSON.stringify({});
      next();
    })
    .catch((err) => {
      req.err = err;
      next();
    });
};
