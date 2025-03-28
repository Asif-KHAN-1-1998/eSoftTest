function deepClone(obj, seen = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (seen.has(obj)) {
        return seen.get(obj);
    }

    let clone;

    if (Array.isArray(obj)) {
        clone = [];
    } else if (obj instanceof Date) {
        clone = new Date(obj);
    } else if (obj instanceof Map) {
        clone = new Map();
    } else if (obj instanceof Set) {
        clone = new Set();
    } else {
        clone = Object.create(Object.getPrototypeOf(obj));
    }

    seen.set(obj, clone);

    if (Array.isArray(clone)) {
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deepClone(obj[i], seen);
        }
    } else if (clone instanceof Map) {
        obj.forEach((value, key) => {
            clone.set(key, deepClone(value, seen));
        });
    } else if (clone instanceof Set) {
        obj.forEach(value => {
            clone.add(deepClone(value, seen));
        });
    } else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deepClone(obj[key], seen);
            }
        }
    }

    return clone;
}
