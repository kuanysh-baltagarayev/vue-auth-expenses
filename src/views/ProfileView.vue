<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <section class="profile-card">
    <div class="avatar">👤</div>
    <h2>{{ auth.user?.email }}</h2>
    <p>ID: <span class="dim">{{ auth.user?.userId }}</span></p>

    <button @click="handleLogout" class="logout-btn">Выйти</button>
  </section>
</template>

<style scoped>
.profile-card {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.4);
  text-align: center;
  color: #f0f0f0;
}

.avatar {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  margin: 0.5rem 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.dim {
  color: #888;
  font-size: 0.9rem;
}

.logout-btn {
  margin-top: 1.5rem;
  padding: 10px 20px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.logout-btn:hover {
  background: #c62828;
}
</style>
