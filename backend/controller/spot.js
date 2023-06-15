import crypto from 'crypto';
import dotenv from 'dotenv';
import Spot from "./../database/spot.js";
import Tag from "./../database/tag.js";
import Star from "./../database/star.js";
import { v4 as uuid } from "uuid";


dotenv.config();

const parseEscape = (value) => {
    var length = value.length;
    return (length >= 6 && typeof value.slice(1, length - 1) === "boolean") ? value.slice(1, length - 1) : value;
};

export const get1 = async (req, res, next) => {

    const { user_id } = req?.session;
    
    await Spot.get1(user_id)
        .then(result => {
            var data = {
                "undone_spots": [],
                "done_spots": [],
                "star_spots": []
            };
          
            // console.log(result[2]);

            for(const element of result[0]) {
                var spot = {
                    "spot_id": parseEscape(element.spot_id),
                    "spot_name": parseEscape(element.name),
                    "spot_location": parseEscape(element.location),
                    "spot_longtitude": parseEscape(element.longtitude),
                    "spot_latitude": parseEscape(element.latitude),
                    "sot_rank": parseEscape(element.ranking),
                    "spot_openhour": parseEscape(element.open_hour),
                    "spot_description": parseEscape(element.description)
                }
                data.undone_spots.push(spot);
            }

            for(const element of result[1]) {
                var spot = {
                    "spot_id": parseEscape(element.spot_id),
                    "spot_name": parseEscape(element.name),
                    "spot_location": parseEscape(element.location),
                    "spot_longtitude": parseEscape(element.longtitude),
                    "spot_latitude": parseEscape(element.latitude),
                    "spot_rank": parseEscape(element.ranking),
                    "spot_openhour": parseEscape(element.open_hour),
                    "spot_description": parseEscape(element.description)
                }
                data.done_spots.push(spot);
            }

            for(const element of result[2]) {
                var spot = {
                    "spot_id": parseEscape(element.spot_id),
                    "spot_name": parseEscape(element.name),
                    "spot_location": parseEscape(element.location),
                    "spot_longtitude": parseEscape(element.longtitude),
                    "spot_latitude": parseEscape(element.latitude),
                    "spot_rank": parseEscape(element.ranking),
                    "spot_openhour": parseEscape(element.open_hour),
                    "spot_description": parseEscape(element.description)
                }
                data.star_spots.push(spot);
            }

            req.data = JSON.stringify(data);
            next();
        }).catch(err => {
            req.err = err;
            next();
        })
}

export const get2 = async (req, res, next) => {

    const { travel_id } = req.body;
    await Spot.get2(travel_id)
        .then(result => {
            var data = {
                "spots": []
            };
          
            console.log(result[0]);

            for(const element of result[0]) {
                var spot = {
                    "spot_id": parseEscape(element.spot_id),
                    "spot_name": parseEscape(element.spot_name),
                    "spot_location": parseEscape(element.location),
                    "spot_longtitude": parseEscape(element.longtitude),
                    "spot_latitude": parseEscape(element.latitude),
                    "spot_transportation": parseEscape(element.transportation),
                    "spot_rank": parseEscape(element.ranking),
                    "spot_openhour": parseEscape(element.open_hour),
                    "spot_description": parseEscape(element.description),
                    "spot_tag_name": parseEscape(element.spot_tag_name),
                    "spot_tag_color": parseEscape(element.color),
                    "spot_done": parseEscape(element.done)
                }
                data.spots.push(spot);
            }

            req.data = JSON.stringify(data);
            next();
        }).catch(err => {
            req.err = err;
            next();
        })
}

export const create = async (req, res, next) => {
    
    const {
        spot_name,
        spot_latitude,
        spot_longtitude,
        spot_location,
        spot_rank,
        spot_openhour,
        spot_description,
        spot_tag_name,
        spot_tag_color,
        arrive_id,
        spot_transportation,
        spot_start_time,
        spot_arrive_time,
        travel_id,
    } = req.body;
    const sha256Hasher = crypto.createHmac("sha256", process.env.SECRET);
    const spot_id = sha256Hasher.update(spot_location).digest("base64");
    const has_id = uuid();

    var spot_exist = false;
    var tag_exist = false;

    await Spot.check_spot_exist(spot_id)
        .then(result => {
            if(result[0].length !== 0)
                spot_exist = true;
            else
                spot_exist = false;
        }).catch(err => {
            req.err = err;
            next();
        })
    if(!spot_exist) {
        await Tag.check_tag(spot_tag_name)
            .then(result => {
                if(result[0].length !== 0)
                    tag_exist = true;
                else
                    tag_exist = false;
            }).catch(err => {
                req.err = err;
                next();
            })

        if(!tag_exist) {
            await Tag.create(spot_tag_name, spot_tag_color)
                .then().catch(err => {
                    req.err = err;
                    next();
                })
        }

        await Spot.create(spot_id, spot_name, spot_rank, spot_description, spot_longtitude, spot_latitude, spot_openhour, spot_location)
            .then(result => {
                var data = {};
                req.data = JSON.stringify(data);
                next();
            }).catch(err => {
                req.err = err;
                next();
            })
    } else {
        var data = {};
        req.data = JSON.stringify(data);
        next();
    }
    
    await Spot.add_to_has(has_id, travel_id, spot_id, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id)
    .then(result => {
        var data = {};
        req.data = JSON.stringify(data);
        next();
    }).catch(err => {
        req.err = err;
        next();
    })
};

export const update = async (req, res, next) => {

    const { user_id } = req?.session; 

    const { spot_id, spot_description, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id, travel_id, spot_star } = req.body;

    if (spot_star) {
        await Star.create(user_id, spot_id).then().catch(err => {
            req.err = err;
            next();
        })
    } else if(spot_star === false)(
        await Star.delete_(user_id, spot_id).then().catch(err => {
            req.err = err;
            next();
        })
    )

    await Spot.update(spot_id, spot_description, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id, travel_id)
        .then(result => {
            req.data = JSON.stringify({});
            next();
        }).catch(err => {
            req.err = err;
            next();
        })
}

export const delete_ = async (req, res, next) => {

    const { has_id } = req.body;
    await Spot.delete_(has_id)
        .then(result => {
            req.data = JSON.stringify({});
            next();
        }).catch(err => {
            req.err = err;
            next();
        })
}
