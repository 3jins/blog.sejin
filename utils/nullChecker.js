const isEmpty = (obj) => {
    if (obj === null) return true;
    switch(typeof obj) {
        case 'undefined':
            return true;
        case 'object':
            return Object.keys(obj).length === 0;
        case 'string':
            return obj === "";
        case 'number':
            return obj === 0;
        case 'boolean':
            return !obj;    // I'll consider false as an empty boolean
    }
};

export {isEmpty};