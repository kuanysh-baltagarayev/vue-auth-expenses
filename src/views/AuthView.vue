<script setup>
import { ref, watch } from 'vue'
import api from '@/api.js'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const login = async () => {
  error.value = ''
  try {
    const res = await api.post('/auth/login', { email: email.value, password: password.value })
    auth.setToken(res.data.token)
    router.push('/add-expense')
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка входа'
  }
}

watch([email, password], () => {
  if (error.value) error.value = ''
})
</script>

<template>
  <form @submit.prevent="login">
    <h2>Вход</h2>
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Пароль" required />
    <button type="submit">Войти</button>

    <p class="error-message" v-if="error">{{ error }}</p>

    <p>Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 350px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #e63946;
  background-color: #ffe5e5;
  border: 1px solid #e63946;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  text-align: center;
}
</style>
