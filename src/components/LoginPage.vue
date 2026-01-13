
<template>
  <div class="login-page">
    <div class="login-container">
      <div class="welcome-section">
        <div class="welcome-content">
          <div class="logo">
            <i class="fas fa-hands-helping"></i>
            <h1>Voedselbank</h1>
            <span class="tagline">Samen tegen voedselverspilling</span>
          </div>
          
          <div class="welcome-text">
            <h2>Welkom terug!</h2>
            <p>
              Log in om toegang te krijgen tot het voedselbank beheersysteem. 
              Hier kun je voedselvoorraden beheren, donaties registreren en 
              hulpbehoevenden ondersteunen.
            </p>
            
            <div class="features">
              <div class="feature">
                <i class="fas fa-utensils"></i>
                <span>Voedselvoorraad beheren</span>
              </div>
              <div class="feature">
                <i class="fas fa-heart"></i>
                <span>Donaties registreren</span>
              </div>
              <div class="feature">
                <i class="fas fa-users"></i>
                <span>Vrijwilligers coördineren</span>
              </div>
            </div>
          </div>
          
          <div class="contact-info">
            <p><i class="fas fa-phone"></i> 0800 - VOEDSEL (863337)</p>
            <p><i class="fas fa-envelope"></i> help@voedselbank.nl</p>
          </div>
        </div>
      </div>
      
      <div class="login-section">
        <div class="login-card">
          <div class="login-header">
            <h2>Inloggen</h2>
            <p>Vul je gegevens in om verder te gaan</p>
          </div>
          
          <div v-if="error" class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <span>{{ error }}</span>
          </div>
          
          <form @submit.prevent="login" class="login-form">
            <div class="form-group">
              <label for="email">
                <i class="fas fa-user-circle"></i>
                E-mailadres
              </label>
              <div class="input-wrapper">
                <i class="fas fa-envelope input-icon"></i>
                <input 
                  type="email" 
                  id="email" 
                  v-model="email" 
                  placeholder="voorbeeld@voedselbank.nl"
                  required
                  :class="{ 'error': error && !email }"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="password">
                <i class="fas fa-key"></i>
                Wachtwoord
              </label>
              <div class="input-wrapper">
                <i class="fas fa-lock input-icon"></i>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="password" 
                  placeholder="Voer je wachtwoord in"
                  required
                  :class="{ 'error': error && !password }"
                >
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="toggle-password"
                  :aria-label="showPassword ? 'Verberg wachtwoord' : 'Toon wachtwoord'"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
            
            <div class="form-options">
              <div class="remember-me">
                <input type="checkbox" id="remember">
                <label for="remember">Onthou mijn gegevens</label>
              </div>
              <a href="#" @click.prevent="forgotPassword" class="forgot-password">
                Wachtwoord vergeten?
              </a>
            </div>
            
            <button 
              type="submit" 
              :disabled="loading" 
              class="login-btn"
              :class="{ 'loading': loading }"
            >
              <span v-if="loading" class="spinner">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
              <span v-else class="btn-text">
                <i class="fas fa-sign-in-alt"></i>
                Inloggen
              </span>
            </button>
            
            <div class="demo-hint">
              <p><strong> Accounts:</strong></p>
              <p>• admin@voedselbank.local / Admin123!</p>
              <p>• magazijn@voedselbank.local / Magazijn123!</p>
              <p>• vrijwilliger@voedselbank.local / Vrijwilliger123!</p>
            </div>
          </form>
          
          <div class="login-footer">
            <p>Versie 1.0.2 | © 2026 Voedselbank Nederland</p>
            <p class="support">
              <i class="fas fa-life-ring"></i>
              Problemen met inloggen? Bel 0800 - VOEDSEL
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const error = ref("");

const auth = useAuthStore();
const router = useRouter();

async function login() {
  // basic check
  if (!email.value || !password.value) {
    error.value = "Vul alle velden in om verder te gaan";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    // call backend via store
    await auth.login(email.value, password.value);

    // optional: form reset
    email.value = "";
    password.value = "";
    showPassword.value = false;

    // route after login (pas aan als jij /home gebruikt)
    router.push("/home");
  } catch (e) {
    error.value = e?.response?.data?.error || "Login mislukt";
  } finally {
    loading.value = false;
  }
}

// Optioneel: "wachtwoord vergeten" melding
function forgotPassword() {
  if (!email.value) {
    error.value = "Vul eerst je e-mailadres in";
    return;
  }
  alert(`Wachtwoord reset is nog niet gebouwd. Email ingevuld: ${email.value}`);
}
</script>


<style scoped>
.login-page {
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.login-container {
  display: flex;
  min-height: 100vh;
}

.welcome-section {
  flex: 1;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
  color: white;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-content {
  max-width: 500px;
}

.logo {
  text-align: center;
  margin-bottom: 60px;
}

.logo i {
  font-size: 64px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  display: inline-block;
}

.logo h1 {
  font-size: 42px;
  font-weight: 800;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
}

.tagline {
  font-size: 18px;
  opacity: 0.9;
  font-weight: 300;
}

.welcome-text h2 {
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 600;
}

.welcome-text p {
  font-size: 18px;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 40px;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 40px 0;
}

.feature {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
}

.feature i {
  font-size: 20px;
  background: rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
}

.contact-info {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.contact-info p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  font-size: 16px;
}

.login-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
}

.login-card {
  width: 100%;
  max-width: 450px;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 700;
}

.login-header p {
  color: #666;
  font-size: 16px;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-left: 4px solid #c62828;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-message i {
  font-size: 18px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
  font-size: 15px;
}

.form-group label i {
  color: #ff6b35;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 16px 20px 16px 50px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s;
  background: #f8f9fa;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #ff6b35;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.input-wrapper input.error {
  border-color: #c62828;
}

.input-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
}

.toggle-password {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #ff6b35;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remember-me input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #ff6b35;
}

.remember-me label {
  color: #666;
  font-size: 14px;
  font-weight: normal;
}

.forgot-password {
  color: #ff6b35;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #e55a2b;
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.login-btn:hover:not(:disabled):not(.loading) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
}

.login-btn:disabled,
.login-btn.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
}

.demo-hint {
  margin-top: 30px;
  padding: 20px;
  background: #f0f7ff;
  border-radius: 10px;
  border-left: 4px solid #4dabf7;
}

.demo-hint p {
  margin: 5px 0;
  color: #555;
  font-size: 14px;
}

.demo-hint code {
  background: #e3f2fd;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  color: #1971c2;
}

.demo-btn {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  background: #e3f2fd;
  color: #1971c2;
  border: 1px solid #a5d8ff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.demo-btn:hover {
  background: #d0ebff;
  border-color: #74c0fc;
}

.login-footer {
  margin-top: 40px;
  text-align: center;
  color: #666;
  font-size: 14px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.support {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  color: #ff6b35;
  font-weight: 500;
}

@media (max-width: 992px) {
  .login-container {
    flex-direction: column;
  }
  
  .welcome-section {
    padding: 40px 20px;
  }
  
  .login-section {
    padding: 40px 20px;
  }
}

@media (max-width: 768px) {
  .logo h1 {
    font-size: 32px;
  }
  
  .welcome-text h2 {
    font-size: 24px;
  }
  
  .login-header h2 {
    font-size: 28px;
  }
  
  .form-options {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>