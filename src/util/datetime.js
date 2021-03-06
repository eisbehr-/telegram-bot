'use strict';

module.exports = {
    /**
     * get current date or date from timestamp
     * @param {string|number} [timestamp]
     * @returns {string}
     */
    getDate: timestamp => {
        let now = timestamp ? new Date(timestamp) : new Date(),
            day = now.getDate(),
            month = now.getMonth() + 1,
            year = now.getFullYear();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return day + '.' + month + '.' + year;
    },

    /**
     * get current time or time from timestamp
     * @param {string|number} [timestamp]
     * @returns {string}
     */
    getTime: timestamp => {
        let now = timestamp ? new Date(timestamp) : new Date(),
            hours = now.getHours(),
            minutes = now.getMinutes(),
            seconds = now.getSeconds();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return hours + ':' + minutes + ':' + seconds;
    },

    /**
     * calculate runtime from a value of seconds
     * @param {string|number} uptime
     */
    getRuntime: uptime => {
        uptime = parseInt(uptime, 10);

        let days = Math.floor(uptime / 86400),
            hours = Math.floor((uptime - (days * 86400)) / 3600),
            minutes = Math.floor((uptime - (hours * 3600)) / 60),
            seconds = uptime - (hours * 3600) - (minutes * 60);

        return (days > 0 ? days + 'd' : '') +
               (hours > 0 ? hours + 'h ' : '') + 
               (minutes > 0 ? minutes + 'm ' : '') +
               seconds + 's';
    }
};