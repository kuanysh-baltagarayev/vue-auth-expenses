# 💰 Расходник — Vue 3 + Pinia + Auth + MongoDB

Приложение для учёта личных расходов с авторизацией, JWT-токенами и фильтрацией по датам.  
Полноценный fullstack-проект: фронт на Vue 3 + Vite, бэкенд на Node.js + Express + MongoDB.

---

## 🚀 Функциональность

✅ Регистрация и вход по email/паролю  
✅ Хранение JWT в Pinia + `localStorage`  
✅ Защищённые маршруты (Vue Router + middleware)  
✅ Добавление трат с автоматической категоризацией  
✅ Просмотр истории трат (сортировка по дате)  
✅ Фильтрация по дате: сегодня / неделя / месяц  
✅ Адаптация под тёмную тему  
✅ Стильный и отзывчивый интерфейс

---

## 🛠️ Стек технологий

**Фронтенд:**
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) — state-менеджер
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)
- [jwt-decode](https://github.com/auth0/jwt-decode)

**Бэкенд (в другой репе):**
- Node.js / Express
- MongoDB / Mongoose
- OpenAI API (категоризация трат)

---

## 🧑‍💻 Локальный запуск

```bash
# Клонировать проект
git clone https://github.com/kuanysh-baltagarayev/vue-expense-tracker.git
cd vue-expense-tracker

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# Запустить
npm run dev