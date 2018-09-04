'use strict';

let config = require('../config/bot');
let messages = require('../src/messages');
let storage = require('../src/storage');
let autoloader = require('../src/util/autoloader');

module.exports = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/start',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdStart,

    /**
     * command handler
     * @param {TelegramBot} bot
     * @param {object} security
     * @returns {void}
     */
    register: (bot, security) => {
        bot.onText(/^\/start$/i, msg => {
            let chatId = msg.chat.id;
            messages.sendMarkdown(bot, chatId, 'start', {name: config.name}).then(() => {
                if (!security.allowed(msg)) {
                    messages.sendText(bot, chatId, 'userRejected');
                } else {
                    // write to cache
                    storage.addUser(msg.from.username, chatId);
                    messages.sendText(bot, chatId, 'userAllowed').then(() => {
                        let help = messages._('help') + '\n\n';
                        let commands = autoloader.commands();

                        Object.keys(commands).forEach(name => {
                            help += commands[name].cmd + ' - ' + commands[name].description + '\n';
                        });

                        messages.sendMarkdown(bot, chatId, help);
                    });
                }
            });
        });
    }
};