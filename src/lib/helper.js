export const api_merchandise = 'https://localhost:7123/api/merchandise';

Date.prototype.toDate = function () {
    return this.toLocaleString().split(' ')[0];
}

class datetime {
    constructor() {
        this.day = new Date();
    }
    getLastday(day = this.day) {
        const d = new Date(day.getTime() - (24 * 60 * 60 * 1000));
        return d;
    }

    getNextday(day) {
        const d = new Date(day.getTime() + (24 * 60 * 60 * 1000));
        return d;
    }

    getTodayDate() {
        return this.day.toLocaleString().split(' ')[0];
    }

    getDateTime() {
        return this.day.toLocaleString();
    }

    getLastDate(day = this.day) {
        return this.getLastday(day).toLocaleString().split(' ')[0];
    }
}

const Dom = (cls) => {
    // const dom = document.querySelector(cls);
    const dom = cls instanceof HTMLElement ? cls : document.querySelector(cls);
    return {
        dom,
        event: function (event, callback) {
            this.dom.addEventListener(event, callback);
        }
    }
}

function empty(item) {
    const action = {
        DEFAULT: k => k
    }
    return Object.keys(item).reduce((acc, k) => {
        acc[action.DEFAULT(k)] = '';
        return acc;
    }, {});
}

function lowerize(item) {
    const action = {
        KEY_LOWERCASE: k => k.toLowerCase()
    }
    return Object.keys(item).reduce((acc, k) => {
        acc[action.KEY_LOWERCASE(k)] = item[k];
        return acc;
    }, {});
}

function createElement(obj) {
    const div = document.createElement('div');
    const textnode = document.createTextNode(obj.name);
    div.appendChild(textnode);
}

function uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function isObjectEmpty(objectName) {
    return Object.keys(objectName).length === 0
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

// const capitalize = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

const dt = new datetime();
export { empty, lowerize, uuid, isObjectEmpty, createElement, dt, Dom }
// export from ajax;
export * from './ajax'; 