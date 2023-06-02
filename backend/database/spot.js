import { useTransaction } from './utils.js';

const print_error = (err) => {
    console.log("error: " + err.message);
};

const get1 = () => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT * FROM SPOT WHERE spot_id in (SELECT spot_id FROM HAS WHERE spot_id NOT IN (SELECT spot_id FROM HAS INNER JOIN travel ON HAS.travel_id = travel.travel_id WHERE travel.done = true)GROUP BY spot_id);",
            "SELECT * FROM SPOT WHERE spot_id in (SELECT spot_id FROM HAS WHERE spot_id IN (SELECT spot_id FROM HAS INNER JOIN travel ON HAS.travel_id = travel.travel_id WHERE travel.done = true)GROUP BY spot_id);",
            "SELECT * FROM SPOT WHERE spot_id in (SELECT spot_id FROM STAR);"
        ]

        var values = [
            [],
            [],
            []
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}

const get2 = (travel_id) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "SELECT SPOT.spot_id, SPOT.name as spot_name, SPOT.location, HAS.transportation, SPOT.ranking, SPOT.open_hour, SPOT.description, HAS.tag_id, TAG.name as tag_name, TAG.color, TRAVEL.done from SPOT JOIN HAS ON HAS.spot_id = SPOT.spot_id JOIN TAG ON HAS.tag_id = TAG.tag_id JOIN TRAVEL ON TRAVEL.travel_id = HAS.travel_id where TRAVEL.travel_id = ?;"
        ]

        var values = [
            [travel_id]
        ]

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}
const check_spot_exist = (spot_id) => {
    return new Promise(async(resolve, reject) => {
        var sqls = [
            "SELECT spot_id FROM SPOT WHERE spot_id = ?"
        ];
        
        var values = [  
            [spot_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}
const create = (spot_id, spot_name, spot_location, spot_rank, spot_openhour, spot_description) => {
    return new Promise(async(resolve, reject) => {
        var sqls = [
            "INSERT INTO SPOT VALUE(?,?,?,?,?,?)"
        ];
        
        var values = [
            [spot_id, spot_name, spot_location, spot_rank, spot_openhour, spot_description],
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}

const add_to_has = (spot_id, tag_id, arrive_id, transportation, spot_start_time, spot_arrive_time, travel_id) => {
    return new Promise(async(resolve, reject) => {
        var sqls = [
            "INSERT INTO HAS VALUE(?,?,?,?,?,?,?)",
            "UPDATE HAS SET arrive_id = ? WHERE travel_id = ? AND arrive_id IS NULL AND spot_id != ?;"
        ];
        
        var values = [
            [travel_id, spot_id, tag_id, transportation, spot_start_time, spot_arrive_time, arrive_id],   
            [spot_id, travel_id, spot_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    });
}

const update = (spot_id, spot_description, tag_id, transportation, start_time, arrive_time, arrive_id, travel_id) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "UPDATE SPOT SET description = ? WHERE spot_id = ?;",
            "UPDATE HAS SET tag_id = ?, transportation = ?, start_time = ?, arrive_time = ?, arrive_id = ? WHERE spot_id = ? AND travel_id = ?;"
        ];

        var values = [
            [spot_description, spot_id], 
            [tag_id, transportation, start_time, arrive_time, arrive_id, spot_id, travel_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
}

const delete_ = (spot_id, travel_id) => {
    return new Promise( async (resolve, reject) => {

        var sqls = [
            "DELETE FROM HAS WHERE spot_id = ? and travel_id = ?;"
        ];

        var values = [
            [spot_id, travel_id]
        ];

        await useTransaction(sqls, values).then(results => {
            resolve(results);
        }).catch(err => {
            print_error(err);
            reject(err);
        })
    })
};
export default { get1, get2, check_spot_exist, create, add_to_has, update, delete_ };
