<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-left">
      <h1 class="logo">💰 Расходник</h1>
    </div>
    <div class="nav-right">
      <router-link to="/" v-if="!auth.isAuthenticated">Вход</router-link>
      <router-link to="/register" v-if="!auth.isAuthenticated">Регистрация</router-link>

      <router-link to="/profile" v-if="auth.isAuthenticated">Профиль</router-link>
      <router-link to="/expenses" v-if="auth.isAuthenticated">Мои траты</router-link>
      <button @click="handleLogout" v-if="auth.isAuthenticated">Выйти</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  background: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.nav-left .logo {
  font-size: 1.2rem;
}

.nav-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

a,
button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background 0.3s;
}

a:hover,
button:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
