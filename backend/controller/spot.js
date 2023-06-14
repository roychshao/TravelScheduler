import crypto from 'crypto';
import dotenv from 'dotenv';
import Spot from "./../database/spot.js";
dotenv.config();

const parseEscape = (value) => {
    var length = value.length;
    return (length >= 6 && typeof value.slice(1, length - 1) === "boolean") ? value.slice(1, length - 1) : value;
};

export const get1 = async (req, res, next) => {

    await Spot.get1()
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
                    "location": parseEscape(element.location),
                    "ranking": parseEscape(element.ranking),
                    "open_hour": parseEscape(element.open_hour),
                    "description": parseEscape(element.description)
                }
                data.undone_spots.push(spot);
            }

            for(const element of result[1]) {
                var spot = {
                    "spot_id": parseEscape(element.spot_id),
                    "spot_name": parseEscape(element.name),
                    "location": parseEscape(element.location),
                    "ranking": parseEscape(element.ranking),
                    "open_hour": parseEscape(element.open_hour),
                    "description": parseEscape(element.description)
                }
                data.done_spots.push(spot);
            }

            for(const element of result[2]) {
                var spot = {
                    "spot_id": parseEscape(element.spot_id),
                    "spot_name": parseEscape(element.name),
                    "location": parseEscape(element.location),
                    "ranking": parseEscape(element.ranking),
                    "open_hour": parseEscape(element.open_hour),
                    "description": parseEscape(element.description)
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

    // const { user_id } = req?.session;
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
                    "location": parseEscape(element.location),
                    "transportation": parseEscape(element.transportation),
                    "ranking": parseEscape(element.ranking),
                    "open_hour": parseEscape(element.open_hour),
                    "description": parseEscape(element.description),
                    "tag_id": parseEscape(element.tag_id),
                    "tag_name": parseEscape(element.tag_name),
                    "color": parseEscape(element.color),
                    "done": parseEscape(element.done)
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
 
    const { spot_tag_id, arrive_id, spot_name, spot_location, spot_rank, spot_openhour, spot_description, spot_transportation, spot_start_time, spot_arrive_time, travel_id} = req.body;
    const sha256Hasher = crypto.createHmac("sha256", process.env.SECRET);
    const spot_id = sha256Hasher.update(spot_location).digest("base64");
    var spot_exist = false;

    // 將user_id, username, email寫入session
    // req.session.user_id = user_id;
    // req.session.username = username;
    // req.session.email = email;
    // req.session.photoURL = photoURL;

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
        await Spot.create(spot_id, spot_name, spot_location, spot_rank, spot_openhour, spot_description)
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

    await Spot.add_to_has(spot_id, spot_tag_id, arrive_id, spot_transportation, spot_start_time, spot_arrive_time, travel_id)
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

    const { spot_id, spot_description, tag_id, transportation, start_time, arrive_time, arrive_id, travel_id } = req.body;

    await Spot.update(spot_id, spot_description, tag_id, transportation, start_time, arrive_time, arrive_id, travel_id)
        .then(result => {
            req.data = JSON.stringify({});
            next();
        }).catch(err => {
            req.err = err;
            next();
        })
}

export const delete_ = async (req, res, next) => {
    // const { spot_id } = req?.session;
    const { spot_id, travel_id } = req.body;
    
    await Spot.delete_(spot_id, travel_id)
        .then(result => {
            req.data = JSON.stringify({});
            next();
        }).catch(err => {
            req.err = err;
            next();
        })
}
