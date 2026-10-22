'use strict';

/* ============================ УТИЛИТЫ ============================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.prototype.slice.call(r.querySelectorAll(s));
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const pad2 = n => String(n).padStart(2, '0');
const money = n => new Intl.NumberFormat('ru-RU').format(Math.round(+n || 0)) + " so'm";
const timeHM = ts => { const d = new Date(ts); return pad2(d.getHours()) + ':' + pad2(d.getMinutes()); };
const dateTime = ts => { const d = new Date(ts); return pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.' + d.getFullYear() + ' ' + timeHM(ts); };
const mmss = ms => { const s = Math.max(0, Math.floor(Math.abs(ms) / 1000)); return pad2(Math.floor(s / 60)) + ':' + pad2(s % 60); };
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hashPass = str => { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0; return 'h' + h.toString(36); };
const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
const DAY = 86400000;

const DB_KEY = 'resto_db_v3', CART_KEY = 'resto_cart_v3',
      SESSION_KEY = 'resto_session_v3', LANG_KEY = 'resto_lang_v3',
      CLIENT_KEY = 'resto_client_v3';

/* ============================ ПЕРЕВОДЫ ============================ */
const I18N = {
  ru: {
    menu:'Меню', kitchen:'Кухня', admin:'Админ',
    search_ph:'Поиск блюда…', all:'Все', add:'Добавить',
    cart:'Корзина', cart_empty:'Корзина пуста. Добавьте блюда из меню.', clear:'Очистить',
    item_comment_ph:'Например: без лука', order_comment_ph:'Например: подать всё одновременно',
    subtotal:'Промежуточная сумма', total:'Итого',
    checkout:'Оформить заказ', table:'Стол', choose_table:'Выберите номер стола',
    no_table:'Сначала укажите номер стола', order_sent:'Заказ отправлен на кухню!',
    order_num:'Заказ', status:'Статус', close:'Закрыть', print:'Печать', cancel:'Отмена',
    save:'Сохранить', del:'Удалить', edit:'Изменить',
    empty_cart_err:'Нельзя оформить пустой заказ',
    stop_err:'Блюдо закончилось и удалено из корзины: ',
    search_empty:'Ничего не найдено', unavailable:'Недоступно', available:'Доступно',
    minutes:'мин', status_new:'Новый', status_cooking:'Готовится', status_ready:'Г