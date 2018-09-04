'use strict';

let config = require('../config/bot');
let messages = require('../src/messages');

/**
 * say hello command
 * @param {TelegramBot} bot
 * @returns void
 */
module.exports = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/sayhello',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdSayHello,

    /**
     * command register handler
     * @param {TelegramBot} bot
     * @returns {void}
     */
    register: bot => {
        bot.onText(/\/sayhello/, msg => {
            messages.sendMarkdown(bot, msg.chat.id, 'start', {name: config.name});
        });
    }
};