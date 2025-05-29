<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'

const from = ref('')
const to = ref('')
const expenses = ref([])
const error = ref('')
const filtered = ref(false)

function format(date) {
  return date.toISOString().split('T')[0]
}

function setToday() {
  const today = new Date()
  from.value = format(today)
  to.value = format(today)
  applyFilter()
}

function setThisWeek() {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay()) // воскресенье — 0
  from.value = format(start)
  to.value = format(today)
  applyFilter()
}

function setThisMonth() {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  from.value = format(start)
  to.value = format(today)
  applyFilter()
}

async function applyFilter() {
  try {
    const res = await api.get('/api/expenses', {
      params: {
        from: from.value,
        to: to.value
      }
    })
    expenses.value = res.data
    filtered.value = true
  } catch {
    error.value = 'Ошибка при фильтрации'
  }
}

function resetFilter() {
  from.value = ''
  to.value = ''
  applyFilter()
  filtered.value = false
}

onMounted(async () => {
  try {
    const res = await api.get('/api/expenses')
    expenses.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка загрузки'
  }
})
</script>

<template>
  <section class="expenses">
    <h2>Мои траты</h2>
    <div class="filter-wrapper">
      <div class="filter-panel">
        <label>
          С:
          <input type="date" v-model="from" />
        </label>
        <label>
          По:
          <input type="date" v-model="to" />
        </label>
        <button @click="applyFilter">Применить</button>
        <button v-if="filtered" @click="resetFilter">Сброс</button>
      </div>

      <div class="presets">
        <button @click="setToday">Сегодня</button>
        <button @click="setThisWeek">Неделя</button>
        <button @click="setThisMonth">Месяц</button>
      </div>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="expenses.length" class="expense-table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Категория</th>
          <th>Сумма</th>
          <th>Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in expenses" :key="e._id">
          <td>{{ new Date(e.createdAt).toLocaleString() }}</td>
          <td>{{ e.category }} / {{ e.subcategory }}</td>
          <td>{{ e.amount }} {{ e.currency }}</td>
          <td>{{ e.description }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Нет записей</p>
  </section>
</template>

<style scoped>
.expenses {
  max-width: 900px;
  margin: 80px auto 40px;
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  color: #e0e0e0;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.6rem;
}

.expense-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

.expense-table th,
.expense-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.expense-table th {
  background-color: #2c3e50;
  color: #ffffff;
}

.expense-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.04);
}

.expense-table tr:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.error {
  color: red;
  text-align: center;
  margin-bottom: 1rem;
}

.filter-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.filter-panel label {
  color: #ccc;
  font-size: 0.9rem;
}

.filter-panel input[type="date"] {
  background: #2a2a2a;
  border: 1px solid #555;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.95rem;
}

.filter-panel input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.filter-panel button {
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-panel button:hover {
  background-color: #0056b3;
}

.presets {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.presets button {
  background: #444;
  color: white;
  padding: 6px 10px;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.presets button:hover {
  background: #666;
}
</style>
