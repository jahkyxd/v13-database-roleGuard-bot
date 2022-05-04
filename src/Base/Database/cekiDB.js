import { data, saveData } from "./Base/splash.js";
import db from "./index.js";

class cekiDB {
    get(key) {
        if (!key)
            throw TypeError(
                "data to be extracted is not specified! (data.get() undefined data!)"
            );

        return data[key];
    }

    has(key) {
        if (!key)
            throw TypeError(
                "data to be extracted is not specified! (data.has() undefined data!)"
            );

        return Boolean(data[key]);
    }

    set(key, value) {
        if (!key)
            throw TypeError(
                "data to be extracted is not specified! (data.set() undefined data!)"
            );

        if (value === null || value === undefined)
            throw TypeError(
                "value to set is not specified! (data.set() undefined value!)"
            );

        data[key] = value;
        saveData();
    }

    delete(key) {
        if (!key)
            throw TypeError(
                "data to be deleted is not specified! (data.delete() undefined data!)"
            );
        delete data[key];
        saveData();
    }

    add(key, count) {
        if (!key)
            throw TypeError("No key to be added! (data.add() undefined key!)");
        if (count === null || count === undefined)
            throw TypeError(
                "no value specified! (data.add() undefined value!)"
            );
        if (!isNaN(key)) throw TypeError("key isNaN! (data.add() isNaN key!)");

        if (db.get(key)) {
            data[key] += count
        } else {
            data[key] = count;
        }

        saveData();
    }

    subtrack(key, count) {
        if (!key)
            throw TypeError(
                "No data to be added! (data.subtrack() undefined data!)"
            );
        if (count === null || count === undefined)
            throw TypeError(
                "no value specified! (data.subtrack() undefined value!)"
            );

            if (db.get(key)) {
                data[key] -= count
            } else {
                data[key] = count;
            }
        saveData();
    }

    push(key, elements) {
        if (!key) throw TypeError("No data to add value specified! ");
        if (!elements) throw TypeError("No value to be added!");

        if (!data[key]) data[key] = [];
        data[key].push(elements);
        saveData();
    }
}

export default cekiDB;
