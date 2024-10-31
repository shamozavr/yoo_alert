'use strict';

const input = document.querySelector('.token__input');
const test = document.querySelector('.buttons__test');
const close = document.querySelector('.close');
const accept = document.querySelector('.buttons__accept');

close.addEventListener('click', () => {
  window.close();
})

accept.addEventListener('click', () => {
  getChatId();

  localStorage.setItem('token', input.value);
  alert(`Сохранено:
      Токен '${localStorage.getItem('token')}'
      Чат ИД '${localStorage.getItem('chatID')}'`);
})

async function getChatId() {
  const response = await fetch('https://api.telegram.org/bot' + localStorage.getItem('token') + '/getUpdates');
  const data = await response.json();
  if (data.result.length === 0) {
    alert('Кажется в группе нет сообщений, и бот не может получить ИД чата');
    return;
  }
  const chatID = await data.result[0].message.chat.id;
  localStorage.setItem('chatID', chatID);
}

async function sendMessage(message) {
  const token = localStorage.getItem('token');
  const chatID = localStorage.getItem('chatID');
  const API = `https://api.telegram.org/bot${token}/`;

  const response = await fetch(API + 'sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatID,
      text: message
    })
  });
}


test.addEventListener('click', () => {
  sendMessage('Нажал на кнопку тест')
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "We have new chat on page") {
    console.log("Received message:", request.message);
    //Отправить сообщение в телеграмм
    sendMessage('Есть новый чат!');
  }
});