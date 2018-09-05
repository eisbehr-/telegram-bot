'use strict';

let messages = require('../src/messages');
let autoloader = require('../src/util/autoloader');

/**
 * help command
 * @param {TelegramBot} bot
 * @returns void
 */
module.exports = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/help',

    /**
     * command description, used for help
     * @type {string}
     */
    description: messages.config.cmdHelp,

    /**
     * show command in help message
     * @type {boolean}
     */
    showInHelp: true,

    /**
     * command register handler
     * @param {TelegramBot} bot
     * @param {object} messages
     * @param {object} security
     * @returns {void}
     */
    register: (bot, messages, security) => {
        bot.onText(/^\/?help$/i, msg => {
            if (!security.check(bot, msg)) {
                return;
            }

            let help = messages._('help') + '\n\n';
            let commands = autoloader.getCommands();

            Object.keys(commands).forEach(name => {
                if (commands[name].showInHelp) {
                    help += commands[name].cmd + ' - ' + commands[name].description + '\n';
                }
            });

            messages.sendMarkdown(bot, msg.chat.id, help);
        });
    }
};