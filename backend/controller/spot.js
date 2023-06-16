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
            var has_id = "null";
            var data = {
                "spots": []
            };

            while (result[0].length > 0) {
                let foundIndex = -1;
              
                for (let i = 0; i < result[0].length; i++) {
                    if(result[0][i].arrive_id === null){
                        result[0][i].arrive_id = "null";
                    }
                    if (result[0][i].arrive_id === has_id) {
                        foundIndex = i;
                        var spot = {
                            "has_id": parseEscape(result[0][i].has_id),
                            "arrive_id": parseEscape(result[0][i].arrive_id),
                            "spot_id": parseEscape(result[0][i].spot_id),
                            "spot_name": parseEscape(result[0][i].spot_name),
                            "spot_location": parseEscape(result[0][i].location),
                            "spot_longtitude": parseEscape(result[0][i].longtitude),
                            "spot_latitude": parseEscape(result[0][i].latitude),
                            "spot_transportation": parseEscape(result[0][i].transportation),
                            "spot_rank": parseEscape(result[0][i].ranking),
                            "spot_openhour": parseEscape(result[0][i].open_hour),
                            "spot_description": parseEscape(result[0][i].description),
                            "spot_tag_name": parseEscape(result[0][i].spot_tag_name),
                            "spot_tag_color": parseEscape(result[0][i].color),
                            "spot_done": parseEscape(result[0][i].done)
                        };
                        data.spots.unshift(spot);
                        has_id = parseEscape(result[0][i].has_id);
                        break;
                    }
                }
              
                if (foundIndex !== -1) {
                    result[0].splice(foundIndex, 1); 
                } else {
                    break; 
                }
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

    // const { user_id } = req?.session; 
    const user_id = "user_id_1";
    const { has_id, spot_id, spot_description, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id, travel_id, spot_star } = req.body;

    var origin_last_spot;//, origin_next_spot, new_last_spot;
    var origin_next_spot;
    var new_last_spot;

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
    await Spot.update_spot(spot_id, spot_description)
    .then(result => {
        req.data = JSON.stringify({});
        next();
    }).catch(err => {
        req.err = err;
        next();
    })
    
    await Spot.get_origin_spots(has_id)
    .then(result => {
        if(result[0].length > 0){
            origin_last_spot = parseEscape(result[0][0].has_id);
        }else{
            origin_last_spot = null
        }    
        if(result[1][0].arrive_id === null){
            origin_next_spot = result[1][0].arrive_id;
        }else if(arrive_id === result[1][0].arrive_id){
            origin_next_spot = has_id;
        }else{
            origin_next_spot = parseEscape(result[1][0].arrive_id);
        }
        next();
    }).catch(err => {
        req.err = err;
        next();
    })
    
    await Spot.get_new_last_spot(arrive_id)
    .then(result => {
        new_last_spot = parseEscape(result[0][0].has_id);
        next();
    }).catch(err => {
        req.err = err;
        next();
    })
    await Spot.update_has(has_id, travel_id, spot_id, spot_tag_name, spot_transportation, spot_start_time, spot_arrive_time, arrive_id, origin_last_spot, origin_next_spot, new_last_spot)
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
