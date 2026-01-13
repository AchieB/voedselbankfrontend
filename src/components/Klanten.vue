<template>
  <div style="max-width:900px;margin:20px auto;">
    <h2>Klanten API Test</h2>

    <button @click="load" :disabled="loading">
      {{ loading ? "Laden..." : "Laad klanten" }}
    </button>

    <p v-if="error" style="color:red;margin-top:10px;">{{ error }}</p>

    <pre style="background:#f6f6f6;padding:12px;margin-top:12px;overflow:auto;">
{{ klanten }}
    </pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../Api";

const klanten = ref([]);
const loading = ref(false);
const error = ref("");

async function load() {
  loading.value = true;
  error.value = "";
  try {
    const res = await api.get("/klanten");
    klanten.value = res.data;
  } catch (e) {
    error.value =
      e?.response?.data?.error ||
      `${e?.response?.status || ""} ${e?.message || "Request mislukt"}`.trim();
  } finally {
    loading.value = false;
  }
}
</script>