<template>
  <div class="login-page">
    <!-- ... jouw bestaande login code ... -->
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      error: ''
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        this.error = 'Vul alle velden in'
        return
      }
      
      this.loading = true
      this.error = ''
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (this.email === 'demo@voedselbank.nl' && this.password === 'demo123') {
        // Navigeer naar homepage na succesvolle login
        this.$router.push('/home')
      } else {
        this.error = 'Ongeldige inloggegevens. Gebruik demo@voedselbank.nl / demo123'
      }
      
      this.loading = false
    }
  }
}
</script>

<style scoped>
/* ... jouw bestaande styles ... */
</style>