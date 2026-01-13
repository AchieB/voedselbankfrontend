<template>
  <div class="bestellingen-page">
    <div class="header">
      <div class="header-container">
        <div class="logo">
          <i class="fas fa-hands-helping"></i>
          <h1>Voedselbank</h1>
        </div>
        
        <nav class="navigation">
          <router-link to="/home" class="nav-link">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
          <router-link to="/productencatalogus" class="nav-link">
            <i class="fas fa-utensils"></i>
            <span>Producten</span>
          </router-link>
          <router-link to="/voorraad" class="nav-link">
            <i class="fas fa-boxes"></i>
            <span>Voorraad</span>
          </router-link>
          <router-link to="/bestellingen" class="nav-link active">
            <i class="fas fa-shopping-cart"></i>
            <span>Bestellingen</span>
          </router-link>
          <router-link to="/mijn-account" class="nav-link account">
            <i class="fas fa-user-circle"></i>
            <span>Mijn Account</span>
          </router-link>
        </nav>
      </div>
    </div>

    <main class="main-content">
      <div class="container">
        <div class="page-header">
          <div class="header-left">
            <h1><i class="fas fa-shopping-cart"></i> Mijn Bestellingen</h1>
            <p>Overzicht van al je bestellingen</p>
          </div>
          <div class="header-right">
            <button class="btn-primary" @click="navigeerNaarProducten">
              <i class="fas fa-plus-circle"></i>
              Nieuwe Bestelling
            </button>
            <button class="btn-secondary" @click="verwijderAlleBestellingen" v-if="bestellingen.length > 0">
              <i class="fas fa-trash"></i>
              Leegmaken
            </button>
          </div>
        </div>

        <div class="bestellingen-container">
          <div v-if="bestellingen.length === 0" class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-shopping-cart fa-4x"></i>
            </div>
            <h2>Nog geen bestellingen</h2>
            <p>Je hebt nog geen producten besteld. Ga naar de productcatalogus om je eerste bestelling te plaatsen.</p>
            <button class="btn-primary" @click="navigeerNaarProducten">
              <i class="fas fa-utensils"></i>
              Naar Productcatalogus
            </button>
          </div>

          <div v-else>
            <div class="statistics">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-box"></i>
                </div>
                <div class="stat-content">
                  <h3>{{ totaalProducten }}</h3>
                  <p>Totaal producten</p>
                </div>
              </div>
              
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-content">
                  <h3>{{ voltooideBestellingen }}</h3>
                  <p>Voltooid</p>
                </div>
              </div>
              
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="stat-content">
                  <h3>{{ inBehandelingBestellingen }}</h3>
                  <p>In behandeling</p>
                </div>
              </div>
              
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-truck"></i>
                </div>
                <div class="stat-content">
                  <h3>{{ verzondenBestellingen }}</h3>
                  <p>Verzonden</p>
                </div>
              </div>
            </div>

            <div class="bestellingen-grid">
              <div v-for="bestelling in bestellingen" :key="bestelling.id" class="bestelling-card">
                <div class="bestelling-header">
                  <div class="bestelling-title">
                    <h3>{{ bestelling.naam }}</h3>
                    <span class="order-id">Bestelling #{{ bestelling.id }}</span>
                  </div>
                  <div class="bestelling-status" :class="bestelling.status">
                    <i :class="getStatusIcon(bestelling.status)"></i>
                    {{ getStatusText(bestelling.status) }}
                  </div>
                </div>
                
                <div class="bestelling-content">
                  <div class="bestelling-info">
                    <div class="info-row">
                      <i class="fas fa-box"></i>
                      <span><strong>Aantal:</strong> {{ bestelling.aantal }} {{ bestelling.eenheid }}</span>
                    </div>
                    <div class="info-row">
                      <i class="fas fa-barcode"></i>
                      <span><strong>EAN:</strong> {{ bestelling.ean }}</span>
                    </div>
                    <div class="info-row">
                      <i class="fas fa-calendar-alt"></i>
                      <span><strong>Besteld op:</strong> {{ formatDate(bestelling.datum) }}</span>
                    </div>
                    <div class="info-row" v-if="bestelling.locatie">
                      <i class="fas fa-map-marker-alt"></i>
                      <span><strong>Locatie:</strong> {{ bestelling.locatie }}</span>
                    </div>
                  </div>
                  
                  <div class="bestelling-actions">
                    <button class="action-btn view" @click="bekijkDetails(bestelling)">
                      <i class="fas fa-eye"></i>
                      Details
                    </button>
                    <button class="action-btn reorder" @click="herbestel(bestelling)" v-if="bestelling.status === 'verwerkt'">
                      <i class="fas fa-redo"></i>
                      Herbestel
                    </button>
                    <button class="action-btn delete" @click="verwijderBestelling(bestelling.id)">
                      <i class="fas fa-trash"></i>
                      Verwijder
                    </button>
                  </div>
                </div>
                
                <div class="bestelling-footer">
                  <div class="bestelling-category">
                    <i :class="getCategoryIcon(bestelling.categorie)"></i>
                    {{ getCategoryLabel(bestelling.categorie) }}
                  </div>
                  <div class="bestelling-klant" v-if="bestelling.klantNaam">
                    <i class="fas fa-user"></i>
                    {{ bestelling.klantNaam }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <div class="footer-logo">
            <i class="fas fa-hands-helping"></i>
            <h3>Voedselbank Bestellingen</h3>
          </div>
          <p class="footer-text">
            Beheer al je bestellingen op één centrale plek.
          </p>
        </div>
        
        <div class="footer-section">
          <h4>Snel naar</h4>
          <ul class="footer-links">
            <li><router-link to="/productencatalogus"><i class="fas fa-utensils"></i> Productcatalogus</router-link></li>
            <li><router-link to="/home"><i class="fas fa-home"></i> Homepage</router-link></li>
            <li><router-link to="/voorraad"><i class="fas fa-boxes"></i> Voorraad</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Snelle Acties</h4>
          <div class="quick-actions">
            <button class="quick-btn" @click="navigeerNaarProducten">
              <i class="fas fa-plus"></i> Nieuwe Bestelling
            </button>
            <button class="quick-btn" @click="printBestellingen">
              <i class="fas fa-print"></i> Print Overzicht
            </button>
            <button class="quick-btn" @click="exportBestellingen">
              <i class="fas fa-download"></i> Exporteer
            </button>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2024 Voedselbank Bestellingen Systeem | Versie 1.0.0</p>
        <p class="stats">Bestellingen: {{ bestellingen.length }} | Producten: {{ totaalProducten }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Bestellingen',
  data() {
    return {
      bestellingen: []
    };
  },
  computed: {
    totaalProducten() {
      return this.bestellingen.reduce((total, bestelling) => total + bestelling.aantal, 0);
    },
    voltooideBestellingen() {
      return this.bestellingen.filter(b => b.status === 'verwerkt').length;
    },
    inBehandelingBestellingen() {
      return this.bestellingen.filter(b => b.status === 'in behandeling').length;
    },
    verzondenBestellingen() {
      return this.bestellingen.filter(b => b.status === 'verzonden').length;
    }
  },
  created() {
    this.laadBestellingen();
  },
  methods: {
    laadBestellingen() {
      const opgeslagenBestellingen = localStorage.getItem('bestellingen');
      if (opgeslagenBestellingen) {
        this.bestellingen = JSON.parse(opgeslagenBestellingen);
      }
    },
    
    getStatusIcon(status) {
      const icons = {
        'in behandeling': 'fas fa-clock',
        'verwerkt': 'fas fa-check-circle',
        'verzonden': 'fas fa-truck',
        'afgeleverd': 'fas fa-home'
      };
      return icons[status] || 'fas fa-question-circle';
    },
    
    getStatusText(status) {
      const texts = {
        'in behandeling': 'In behandeling',
        'verwerkt': 'Voltooid',
        'verzonden': 'Verzonden',
        'afgeleverd': 'Afgeleverd'
      };
      return texts[status] || status;
    },
    
    getCategoryIcon(category) {
      const icons = {
        groenten: 'fas fa-carrot',
        fruit: 'fas fa-apple-alt',
        vlees: 'fas fa-drumstick-bite',
        zuivel: 'fas fa-cheese',
        brood: 'fas fa-bread-slice',
        droog: 'fas fa-warehouse',
        drank: 'fas fa-wine-bottle',
        anders: 'fas fa-box'
      };
      return icons[category] || 'fas fa-box';
    },
    
    getCategoryLabel(category) {
      const labels = {
        groenten: 'Groenten',
        fruit: 'Fruit',
        vlees: 'Vlees & Vis',
        zuivel: 'Zuivel',
        brood: 'Brood',
        droog: 'Droog',
        drank: 'Dranken',
        anders: 'Anders'
      };
      return labels[category] || category;
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('nl-NL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    bekijkDetails(bestelling) {
      alert(`Bestelling #${bestelling.id}\n\n` +
            `Product: ${bestelling.naam}\n` +
            `Categorie: ${this.getCategoryLabel(bestelling.categorie)}\n` +
            `Aantal: ${bestelling.aantal} ${bestelling.eenheid}\n` +
            `Status: ${this.getStatusText(bestelling.status)}\n` +
            `Besteld op: ${this.formatDate(bestelling.datum)}\n` +
            `EAN: ${bestelling.ean}\n` +
            `Klant: ${bestelling.klantNaam || 'Niet gespecificeerd'}`);
    },
    
    herbestel(bestelling) {
      if (confirm(`Weet je zeker dat je ${bestelling.naam} opnieuw wilt bestellen?`)) {
        const nieuweBestelling = {
          ...bestelling,
          id: Date.now(),
          datum: new Date().toISOString(),
          status: 'in behandeling'
        };
        
        this.bestellingen.unshift(nieuweBestelling);
        this.slaBestellingenOp();
        alert(`${bestelling.naam} is opnieuw besteld!`);
      }
    },
    
    verwijderBestelling(bestellingId) {
      if (confirm('Weet je zeker dat je deze bestelling wilt verwijderen?')) {
        this.bestellingen = this.bestellingen.filter(b => b.id !== bestellingId);
        this.slaBestellingenOp();
        alert('Bestelling verwijderd!');
      }
    },
    
    verwijderAlleBestellingen() {
      if (confirm('Weet je zeker dat je ALLE bestellingen wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
        this.bestellingen = [];
        localStorage.removeItem('bestellingen');
        alert('Alle bestellingen zijn verwijderd.');
      }
    },
    
    slaBestellingenOp() {
      localStorage.setItem('bestellingen', JSON.stringify(this.bestellingen));
    },
    
    navigeerNaarProducten() {
      this.$router.push('/productencatalogus');
    },
    
    printBestellingen() {
      window.print();
    },
    
    exportBestellingen() {
      alert('Bestellingen worden geëxporteerd naar CSV...');
    }
  }
};
</script>

<style scoped>
.bestellingen-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 15px 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo i {
  font-size: 2rem;
  color: #ff6b35;
}

.logo h1 {
  font-size: 1.5rem;
  color: #2c3e50;
}

.navigation {
  display: flex;
  gap: 15px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  text-decoration: none;
  color: #7f8c8d;
  border-radius: 6px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #3498db;
}

.nav-link.active {
  background: #ff6b35;
  color: white;
}

.nav-link i {
  font-size: 1.2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.header-left h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 5px;
}

.header-left p {
  color: #7f8c8d;
}

.header-right {
  display: flex;
  gap: 15px;
}

.btn-primary, .btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b35, #ff6b35);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #ff6b35, #ff6b35);
  transform: translateY(-2px);
}

.btn-secondary {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}

.btn-secondary:hover {
  background: #e9ecef;
}

.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  font-size: 2rem;
  color: #3498db;
  background: #ebf5fb;
  padding: 15px;
  border-radius: 50%;
}

.stat-content h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0;
}

.stat-content p {
  color: #7f8c8d;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.empty-icon {
  color: #bdc3c7;
  margin-bottom: 20px;
}

.empty-state h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-state p {
  color: #7f8c8d;
  max-width: 500px;
  margin: 0 auto 30px;
}

.bestellingen-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.bestelling-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.bestelling-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.2);
}

.bestelling-header {
  background: #f8f9fa;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bestelling-title h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.order-id {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.bestelling-status {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
}

.bestelling-status.in-behandeling {
  background: #fff3cd;
  color: #856404;
}

.bestelling-status.verwerkt {
  background: #d4edda;
  color: #ff6b35;
}

.bestelling-status.verzonden {
  background: #d1ecf1;
  color: #0c5460;
}

.bestelling-content {
  padding: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.info-row i {
  color: #3498db;
  width: 20px;
}

.bestelling-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.action-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.3s;
}

.action-btn.view {
  background: #3498db;
  color: white;
}

.action-btn.reorder {
  background: #ff6b35;
  color: white;
}

.action-btn.delete {
  background: #e74c3c;
  color: white;
}

.action-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.bestelling-footer {
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.bestelling-category, .bestelling-klant {
  display: flex;
  align-items: center;
  gap: 5px;
}

.footer {
  background: #2c3e50;
  color: white;
  margin-top: 50px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.footer-logo i {
  font-size: 2rem;
  color: #ff6b35;
}

.footer-text {
  color: #bdc3c7;
  line-height: 1.6;
}

.footer-section h4 {
  color: white;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #ff6b35;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-btn {
  background: #34495e;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s;
}

.quick-btn:hover {
  background: #ff6b35;
}

.footer-bottom {
  background: #1a252f;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #34495e;
}

.footer-bottom p {
  margin: 5px 0;
  color: #bdc3c7;
}

.stats {
  font-weight: 600;
  color: #ff6b35; 
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
  
  .page-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .bestellingen-grid {
    grid-template-columns: 1fr;
  }
  
  .statistics {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>