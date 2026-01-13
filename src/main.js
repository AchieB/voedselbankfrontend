import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router'

if (!localStorage.getItem('bestellingen')) {
  const voorbeeldBestellingen = [
    {
      id: 1,
      naam: "Verse Pasta",
      categorie: "Pasta & Noodles",
      beschrijving: "Verse pasta voor voedzame maaltijden",
      aantal: 2,
      datum: "2024-01-10",
      status: "verwerkt"
    },
    {
      id: 2,
      naam: "Biologische Rijst",
      categorie: "Rijst & Granen",
      beschrijving: "Hoge kwaliteit volkoren rijst",
      aantal: 1,
      datum: "2024-01-12",
      status: "verzonden"
    }
  ];
  
  localStorage.setItem('bestellingen', JSON.stringify(voorbeeldBestellingen));
}

createApp(App).use(createPinia()).use(router).mount("#app");