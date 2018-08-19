process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api')
const TOKEN = '544251963:AAGh4YmlVxOkgs2NFpoC_BnyqIrZ6gxtwdQ'
const debug = require('./helpers')
const fs = require('fs')//модуль работы с файлами node js
console.log('Bot has been started...')
/*const bot = new TelegramBot(TOKEN, {
    polling:true
})*/

    const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params:{
            timeout: 10
        }
    }
})
                            //обработка сообщений
        /*    bot.on('message', (msg) => {
    const {id} = msg.chat

    bot.sendMessage(id,'Здравствуйте  ' + msg.from.first_name)
    // bot.sendMessage(id, debug(msg))
         .then(() => {
           console.log('Message has been send')
         })
         .catch((error) => {
             console.error(error)
         })
    }) */

                             // обработка команд
        bot.onText(/\/start/, msg => {
            const {id} = msg.chat
            //  bot.sendMessage(id, debug(msg))
        })
        bot.onText(/\/pay/, msg => {
            const {id} = msg.chat
            //  bot.sendMessage(id, debug(msg))
        })
        bot.onText(/\/loc/, msg => {
            const {id} = msg.chat
            //  bot.sendMessage(id, debug(msg))
        })
     /*  bot.on('message', msg => {
              bot.sendMessage(msg.chat.id, 'message!')

    }) */

                            // клавиатура
  bot.on('message', msg => {
    setTimeout(() => {
    const chatId = msg.chat.id

    if (msg.text === 'ЗАКРЫТЬ') {

       bot.sendMessage(chatId, 'Рад был помочь, хорошего дня',{
           reply_markup: {
               remove_keyboard: true
           }
           })
    }  else if (msg.text === 'ВИДЕО')
    {

       bot.sendMessage(msg.chat.id, 'https://www.youtube.com/watch?v=jWDJWfPIw2k' ,{
            // disable_web_page_preview: true,   // выключение превью web страницы
           // disable_notification: true,      // выключение нотификации
        })
      /*  bot.onText(/\/video1/, msg => {
            const chatId = msg.chat.id

            bot.sendMessage(chatId, 'sending video...')

            bot.sendVideo(chatId, 'http://techslides.com/demos/sample-videos/small.mp4')// ссылка на видео
        }) */

  /*  {bot.sendMessage(chatId, 'Введите /video', {
            reply_markup: {
                // force_reply: true
            }
        })  */
     /*     //video in library
     bot.onText(/\/video/, msg => {
         const chatId = msg.chat.id
         bot.sendMessage(chatId, 'sending video...')
         bot.sendVideo(chatId, './video.mp4')
     }) */


    }  else if (msg.text === 'РАСПОЛОЖЕНИЕ'){

        bot.sendMessage(chatId, 'Введите /loc', {
            reply_markup: {
                remove_keyboard: true
                // force_reply: true
            }
        })
    } else if (msg.text === 'СВЯЗЬ') {

        bot.sendMessage(chatId, 'делай выбор', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'городской', callback_data: 'current'}],
                    [{text: 'мобильный', callback_data: 'free'}]
                ]
            }
        })

        bot.on('callback_query', query => {

            if (query.data === 'current')
                bot.sendMessage(chatId, '0487700994')
            else
                bot.sendMessage(chatId, '+380973267499')


        })
    } else if (msg.text === 'ОПЛАТА') {

        /*  bot.on('message', (msg) => {
     const chatId = msg.chat.id */

     /*   bot.sendMessage(chatId,'выбирайте',{
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'КАРТОЙ',
                            callback_data: 'картой',}
                    ],

                    [
                        {
                            text: 'наличными мастеру',
                            callback_data: 'наличными мастеру'}
                    ]
                ]
            }
        })
        bot.on('callback_query', query => {
            bot.sendMessage(query.message.chat.id, debug(query))

            // bot.answerCallbackQuery(query.id, `${query.data}`)
        }) */
        bot.sendMessage(chatId, 'Введите /pay',{
            reply_markup: {
                remove_keyboard: true
               // force_reply: true
            }
        })

    } else if (msg.text === 'СТОИМОСТЬ') {

        bot.sendMessage(chatId, '200 UAH в час', {
            reply_markup: {
                inline_keyboard: [

                ]
            }
        })


    }  else if (msg.text === 'САЙТ') {

        bot.sendMessage(msg.chat.id, 'http://creator.od.ua',{
            disable_web_page_preview: true,   // выключение превью web страницы
           // disable_notification: true,      // выключение нотификации
        })

    }  else {
        bot.sendMessage(chatId,'?', {
            reply_markup: {
                keyboard: [

                        ['САЙТ ',                      'ВИДЕО' ],
                        ['РАСПОЛОЖЕНИЕ',           'СТОИМОСТЬ' ],
                        ['СВЯЗЬ',                     'ОПЛАТА' ],
                                     ['ЗАКРЫТЬ']
                    ],
                    one_time_keyboard: true
    }
    })

    }
    },1000)
  })
                          // создание и оплата товара

 // token Paymentwall ( 372774012:LIVE:fc870691535548064c3c0b5fe0445847 )

 bot.onText(/\/pay/,msg => {
    const chatId = msg.chat.id

    bot.sendInvoice(
        chatId,
        'разработка',
        'один час',
    'payload',
    '372774012:LIVE:fc870691535548064c3c0b5fe0445847',
        'some_random_string_key',
        'UAH',
        [
            {
                label:'разработка',
                 amount:'20000'  // стоимость в копейках
            }
        ],
        {
            photo_url:'https://upload-images.jianshu.io/upload_images/2574263-0044255d504e3bbb.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',

            need_phone_number:true,
            need_email:true,
            need_name:true
        }

    )
})


bot.onText(/\/loc/, msg => {
    // акварель 46.436527, 30.749767
    bot.sendLocation(msg.chat.id, 46.436527, 30.749767)
})


bot.onText(/\/start/, msg => {
    const text = `Здравствуйте! , ${msg.from.first_name}
    \nЯ могу вам помочь, чтобы не отвлекать хояина.
    \nВыберите команду для начала работы:`

    bot.sendMessage(msg.chat.id, text)
   // bot.on('message', (msg) => {
     //   const {id} = msg.chat

      //bot.sendMessage(id,'Здравствуйте  ' + msg.from.first_name)
        // bot.sendMessage(id, debug(msg))
           // .then(() => {
                console.log('Message has been send')
           // })
           // .catch((error) => {
                console.error(error)
          //  })
    })