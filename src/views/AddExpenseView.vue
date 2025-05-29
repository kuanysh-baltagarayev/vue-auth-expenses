<script setup>
import { ref } from 'vue'
import api from '@/api'

const input = ref('')
const success = ref(false)
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  if (!input.value.trim()) return
  success.value = false
  error.value = ''
  loading.value = true

  try {
    await api.post('/api/expenses', { text: input.value })
    success.value = true
    input.value = ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка сохранения'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="add-expense">
    <h2>➕ Добавить трату</h2>

    <textarea
      v-model="input"
      placeholder="Например: Купил кофе за 800 ₸"
      rows="4"
      autofocus
    ></textarea>

    <button @click="handleSubmit" :disabled="loading">
      {{ loading ? 'Отправка...' : 'Отправить' }}
    </button>

    <p v-if="success" class="success">✅ Успешно добавлено!</p>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<style scoped>
.add-expense {
  max-width: 500px;
  margin: 100px auto;
  padding: 2rem;
  background: #1e1e1e;
  border-radius: 12px;
  color: white;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.add-expense h2 {
  margin-bottom: 1rem;
  font-size: 1.6rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  background: #333;
  border: none;
  border-radius: 6px;
  color: #fff;
  resize: none;
  margin-bottom: 1rem;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

button[disabled] {
  background-color: #555;
  cursor: wait;
}

.success {
  margin-top: 1rem;
  color: #7cf67c;
}

.error {
  margin-top: 1rem;
  color: #f66;
}
</style>
