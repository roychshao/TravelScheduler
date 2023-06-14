import { pool } from "./pool.js";
import { useTransaction } from "./utils.js";

const print_error = (err) => {
    console.log("error: " + err.message);
};

const get = () => {
    return new Promise(async (resolve, reject) => {
        var sqls =[
            "SELECT * FROM TAG"
        ];

        var values = [[]];

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

export default { get };
