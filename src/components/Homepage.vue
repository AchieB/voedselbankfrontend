<template>
  <div class="homepage">
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <i class="fas fa-hands-helping"></i>
          <h1>Voedselbank</h1>
        </div>
        
        <nav class="navigation">
          <router-link to="/" class="nav-link active">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
          <router-link to="/productencatalogus" class="nav-link">
            <i class="fas fa-utensils"></i>
            <span>Producten</span>
          </router-link>
          <router-link to="/klanten" class="nav-link">
            <i class="fas fa-users"></i>
            <span>Klanten</span>
          </router-link>
          <router-link to="/bestellingen" class="nav-link">
            <i class="fas fa-shopping-cart"></i>
            <span>Bestellingen</span>
          </router-link>
          <router-link to="/mijn-account" class="nav-link account">
            <i class="fas fa-user-circle"></i>
            <span>Mijn Account</span>
          </router-link>
        </nav>
      </div>
    </header>

    <div class="quick-actions">
      <div class="actions-container">
        <button class="action-btn" @click="navigateTo('producten')">
          <div class="action-icon">
            <i class="fas fa-utensils"></i>
          </div>
          <span class="action-text">Producten</span>
        </button>
        
        <button class="action-btn" @click="navigateTo('voorraad')">
          <div class="action-icon">
            <i class="fas fa-boxes"></i>
          </div>
          <span class="action-text">Voorraad</span>
        </button>
        
        <button class="action-btn" @click="navigateTo('bestellingen')">
          <div class="action-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <span class="action-text">Bestellen</span>
        </button>
        
        <button class="action-btn" @click="navigateTo('doneren')">
          <div class="action-icon">
            <i class="fas fa-heart"></i>
          </div>
          <span class="action-text">Doneren</span>
        </button>
      </div>
    </div>

    <section class="welcome-section">
      <div class="welcome-container">
        <div class="welcome-content">
          <h2>Welkom bij Voedselbank</h2>
          <p class="welcome-text">
            Wij helpen mensen in nood met voedselpakketten. Als klant kunt u hier 
            bestellingen plaatsen voor voedselhulp. Onze vrijwilligers staan klaar 
            om u te helpen met een gezonde en voedzame voedselvoorraad.
          </p>
          
          <div class="welcome-actions">
            <button class="primary-btn" @click="navigateTo('bestellingen')">
              <i class="fas fa-shopping-basket"></i>
              Ik wil bestellen
            </button>
            <button class="secondary-btn" @click="navigateTo('doneren')">
              <i class="fas fa-hand-holding-heart"></i>
              Ik wil doneren
            </button>
          </div>
        </div>
        
        <div class="welcome-image">
          <i class="fas fa-people-carry"></i>
        </div>
      </div>
    </section>

    <section class="products-section">
      <div class="section-header">
        <h2><i class="fas fa-star"></i> Nieuwe Producten</h2>
        <router-link to="/producten" class="view-all">
          Bekijk alle producten <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
      
      <div class="products-grid">
        <div class="product-card">
          <div class="product-image">
            <i class="fas fa-pizza-slice"></i>
          </div>
          <div class="product-info">
            <h3>Pasta & Noodles</h3>
            <p class="product-description">Verse pasta en noodles voor voedzame maaltijden</p>
            <div class="product-stats">
              <div class="stat">
                <i class="fas fa-box"></i>
                <span>Beschikbaar: <strong>45</strong> stuks</span>
              </div>
              <div class="stat">
                <i class="fas fa-clock"></i>
                <span>Verse houdbaarheid: 7 dagen</span>
              </div>
            </div>
            <button class="order-btn" @click="addToCart('pasta')">
              <i class="fas fa-cart-plus"></i>
              Toevoegen
            </button>
          </div>
        </div>
        
        <div class="product-card">
          <div class="product-image">
            <i class="fas fa-bread-slice"></i>
          </div>
          <div class="product-info">
            <h3>Rijst & Granen</h3>
            <p class="product-description">Hoge kwaliteit rijst en volkoren granen</p>
            <div class="product-stats">
              <div class="stat">
                <i class="fas fa-box"></i>
                <span>Beschikbaar: <strong>60</strong> stuks</span>
              </div>
              <div class="stat">
                <i class="fas fa-clock"></i>
                <span>Lange houdbaarheid</span>
              </div>
            </div>
            <button class="order-btn" @click="addToCart('rijst')">
              <i class="fas fa-cart-plus"></i>
              Toevoegen
            </button>
          </div>
        </div>
        
        <div class="product-card">
          <div class="product-image">
            <i class="fas fa-apple-alt"></i>
          </div>
          <div class="product-info">
            <h3>Verse Groenten</h3>
            <p class="product-description">Seizoensgebonden groenten van lokale boeren</p>
            <div class="product-stats">
              <div class="stat">
                <i class="fas fa-box"></i>
                <span>Beschikbaar: <strong>32</strong> stuks</span>
              </div>
              <div class="stat">
                <i class="fas fa-clock"></i>
                <span>Verse houdbaarheid: 3 dagen</span>
              </div>
            </div>
            <button class="order-btn" @click="addToCart('groenten')">
              <i class="fas fa-cart-plus"></i>
              Toevoegen
            </button>
          </div>
        </div>
        
        <div class="product-card">
          <div class="product-image">
            <i class="fas fa-drumstick-bite"></i>
          </div>
          <div class="product-info">
            <h3>Eiwitproducten</h3>
            <p class="product-description">Vlees, vis en vegetarische alternatieven</p>
            <div class="product-stats">
              <div class="stat">
                <i class="fas fa-box"></i>
                <span>Beschikbaar: <strong>28</strong> stuks</span>
              </div>
              <div class="stat">
                <i class="fas fa-clock"></i>
                <span>Verse houdbaarheid: 5 dagen</span>
              </div>
            </div>
            <button class="order-btn" @click="addToCart('eiwit')">
              <i class="fas fa-cart-plus"></i>
              Toevoegen
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <h3 class="stat-number">1,245</h3>
            <p class="stat-label">Mensen geholpen deze maand</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-box-open"></i>
          </div>
          <div class="stat-content">
            <h3 class="stat-number">3,892</h3>
            <p class="stat-label">Voedselpakketten verdeeld</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <div class="stat-content">
            <h3 class="stat-number">156</h3>
            <p class="stat-label">Actieve vrijwilligers</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-store"></i>
          </div>
          <div class="stat-content">
            <h3 class="stat-number">42</h3>
            <p class="stat-label">Samenwerkende winkels</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <div class="footer-logo">
            <i class="fas fa-hands-helping"></i>
            <h3>Voedselbank Amsterdam</h3>
          </div>
          <p class="footer-text">
            Samen tegen voedselverspilling, samen voor elkaar.
          </p>
          <div class="footer-contact">
            <p><i class="fas fa-phone"></i> 0800 - VOEDSEL (863337)</p>
            <p><i class="fas fa-envelope"></i> info@voedselbank-amsterdam.nl</p>
            <p><i class="fas fa-map-marker-alt"></i> Voedselstraat 123, Amsterdam</p>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Snel naar</h4>
          <ul class="footer-links">
            <li><a href="#"><i class="fas fa-chevron-right"></i> Over ons</a></li>
            <li><a href="#"><i class="fas fa-chevron-right"></i> Word vrijwilliger</a></li>
            <li><a href="#"><i class="fas fa-chevron-right"></i> Doneer voedsel</a></li>
            <li><a href="#"><i class="fas fa-chevron-right"></i> Veelgestelde vragen</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Openingstijden</h4>
          <ul class="opening-hours">
            <li>Maandag: 09:00 - 17:00</li>
            <li>Dinsdag: 09:00 - 17:00</li>
            <li>Woensdag: 09:00 - 17:00</li>
            <li>Donderdag: 09:00 - 17:00</li>
            <li>Vrijdag: 09:00 - 16:00</li>
            <li>Weekend: Op afspraak</li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2024 Voedselbank Nederland. Alle rechten voorbehouden.</p>
        <p class="version">Versie 1.0.2</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  methods: {
    navigateTo(page) {
      alert(`Navigeren naar: ${page}`);
    },
    
    addToCart(product) {
      alert(`Product toegevoegd: ${product}`);
    }
  }
}
</script>

<style scoped>
.homepage {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #ff6b35;
}

.logo i {
  font-size: 32px;
}

.logo h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.navigation {
  display: flex;
  gap: 25px;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #555;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: #f0f7ff;
  color: #ff6b35;
}

.nav-link.active {
  background: #ff6b35;
  color: white;
}

.nav-link.account {
  background: #e3f2fd;
  color: #1971c2;
}

.nav-link.account:hover {
  background: #d0ebff;
}

.quick-actions {
  background: white;
  padding: 20px 0;
  border-bottom: 1px solid #e9ecef;
}

.actions-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: none;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 20px 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  border-color: #ff6b35;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 107, 53, 0.1);
}

.action-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
}

.action-text {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.welcome-section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.welcome-container {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
  border-radius: 20px;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.2);
}

.welcome-content {
  flex: 1;
  padding-right: 40px;
}

.welcome-content h2 {
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: 700;
}

.city {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 600;
}

.welcome-text {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.95;
}

.welcome-actions {
  display: flex;
  gap: 20px;
}

.primary-btn, .secondary-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.primary-btn {
  background: white;
  color: #ff6b35;
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid white;
}

.secondary-btn:hover {
  background: white;
  color: #ff6b35;
}

.welcome-image {
  flex-shrink: 0;
}

.welcome-image i {
  font-size: 120px;
  opacity: 0.8;
}

.products-section {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 28px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header h2 i {
  color: #ff6b35;
}

.view-all {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.2s;
}

.view-all:hover {
  gap: 12px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 180px;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image i {
  font-size: 64px;
  color: #ff6b35;
}

.product-info {
  padding: 25px;
}

.product-info h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.product-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 14px;
}

.product-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
  font-size: 14px;
}

.stat i {
  color: #ff6b35;
  width: 16px;
}

.order-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}

.order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
}

.stats-section {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  margin: 60px 0;
  padding: 60px 20px;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 107, 53, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6b35;
  font-size: 24px;
}

.stat-content {
  color: white;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 5px 0;
}

.stat-label {
  margin: 0;
  opacity: 0.9;
  font-size: 14px;
}

.footer {
  background: #2c3e50;
  color: white;
  padding-top: 60px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section {
  margin-bottom: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.footer-logo i {
  font-size: 32px;
  color: #ff6b35;
}

.footer-logo h3 {
  font-size: 20px;
  margin: 0;
}

.footer-text {
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 25px;
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0;
  color: #bdc3c7;
  font-size: 14px;
}

.footer-section h4 {
  color: #ff6b35;
  margin-bottom: 20px;
  font-size: 18px;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #ff6b35;
}

.opening-hours {
  list-style: none;
  padding: 0;
  color: #bdc3c7;
  font-size: 14px;
}

.opening-hours li {
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.opening-hours li:last-child {
  border-bottom: none;
}

.footer-bottom {
  background: #1a252f;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
}

.footer-bottom p {
  margin: 5px 0;
  color: #bdc3c7;
  font-size: 14px;
}

.version {
  color: #7f8c8d;
  font-size: 12px;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .navigation {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .welcome-container {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }
  
  .welcome-content {
    padding-right: 0;
    margin-bottom: 30px;
  }
  
  .welcome-actions {
    flex-direction: column;
  }
  
  .section-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>