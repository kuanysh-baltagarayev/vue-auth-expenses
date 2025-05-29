<script setup>
import { ref } from 'vue'
import api from '@/api.js'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const message = ref('')

const register = async () => {
  try {
    await api.post('/auth/register', {
      email: email.value,
      password: password.value
    })
    message.value = 'Успешная регистрация!'
    setTimeout(() => router.push('/'), 1500)
  } catch (err) {
    console.log(err);

    message.value = err.response?.data?.message || 'Ошибка регистрации'
  }
}
</script>

<template>
  <form @submit.prevent="register">
    <h2>Регистрация</h2>
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Пароль" required />
    <button type="submit">Создать аккаунт</button>
    <p>{{ message }}</p>
    <p><router-link to="/">Уже есть аккаунт? Войти</router-link></p>
  </form>
</template>
