<template>
  <div class="product-catalogus">
    <!-- Header/Navigatie -->
    <header class="header">
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
          <router-link to="/productencatalogus" class="nav-link active">
            <i class="fas fa-utensils"></i>
            <span>Producten</span>
          </router-link>
          <router-link to="/voorraad" class="nav-link">
            <i class="fas fa-boxes"></i>
            <span>Voorraad</span>
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

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <div class="header-left">
            <h1><i class="fas fa-box-open"></i> Producten Catalogus</h1>
            <p>Beheer alle producten in het voedselbank systeem</p>
          </div>
          <div class="header-right">
            <button class="btn-primary" @click="openProductForm">
              <i class="fas fa-plus-circle"></i>
              Nieuw Product Toevoegen
            </button>
            <!-- Bestellingen snelkoppeling -->
            <button class="btn-order" @click="gaNaarBestellingen" v-if="bestellingenAantal > 0">
              <i class="fas fa-shopping-cart"></i>
              Bestellingen ({{ bestellingenAantal }})
            </button>
          </div>
        </div>

        <!-- Control Bar -->
        <div class="control-bar">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Zoek op naam, EAN of categorie..."
              @input="filterProducts"
            >
          </div>
          
          <div class="filters">
            <div class="filter-group">
              <label for="sortBy"><i class="fas fa-sort"></i> Sorteren op:</label>
              <select id="sortBy" v-model="sortBy" @change="sortProducts">
                <option value="name">Naam (A-Z)</option>
                <option value="nameDesc">Naam (Z-A)</option>
                <option value="category">Categorie</option>
                <option value="quantity">Voorraad (Hoog-Laag)</option>
                <option value="quantityAsc">Voorraad (Laag-Hoog)</option>
                <option value="ean">EAN Code</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label for="categoryFilter"><i class="fas fa-filter"></i> Filter categorie:</label>
              <select id="categoryFilter" v-model="categoryFilter" @change="filterProducts">
                <option value="">Alle categorieën</option>
                <option value="groenten">Groenten</option>
                <option value="fruit">Fruit</option>
                <option value="vlees">Vlees & Vis</option>
                <option value="zuivel">Zuivel</option>
                <option value="brood">Brood & Bakkerij</option>
                <option value="droog">Droge Voeding</option>
                <option value="drank">Dranken</option>
                <option value="anders">Anders</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notificatie voor bestelling -->
        <div v-if="bestellingSuccess" class="notification success">
          <i class="fas fa-check-circle"></i>
          <span>{{ bestellingSuccess }}</span>
          <button @click="bestellingSuccess = ''" class="close-notification">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Product Grid -->
        <div class="product-grid">
          <div class="product-card" v-for="product in paginatedProducts" :key="product.id">
            <div class="product-header">
              <span class="product-id">ID: {{ product.id }}</span>
              <span class="product-category" :class="product.category">
                {{ getCategoryLabel(product.category) }}
              </span>
            </div>
            
            <div class="product-image">
              <i :class="getCategoryIcon(product.category)"></i>
            </div>
            
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              
              <div class="product-details">
                <div class="detail">
                  <i class="fas fa-barcode"></i>
                  <span><strong>EAN:</strong> {{ product.ean }}</span>
                </div>
                <div class="detail">
                  <i class="fas fa-box"></i>
                  <span><strong>Locatie:</strong> {{ product.location }}</span>
                </div>
                <div class="detail">
                  <i class="fas fa-calendar-alt"></i>
                  <span><strong>Houdbaar tot:</strong> {{ formatDate(product.expiryDate) }}</span>
                </div>
              </div>
            </div>
            
            <div class="product-actions">
              <div class="stock-control">
                <button class="stock-btn minus" @click="decreaseStock(product.id)">
                  <i class="fas fa-minus"></i>
                </button>
                <div class="stock-display">
                  <span class="stock-label">Voorraad:</span>
                  <span class="stock-count" :class="{ 
                    'low-stock': product.quantity < 10,
                    'no-stock': product.quantity === 0
                  }">
                    {{ product.quantity }} stuks
                  </span>
                </div>
                <button class="stock-btn plus" @click="increaseStock(product.id)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              
              <div class="action-buttons">
                <!-- Bestel knop -->
                <button 
                  class="action-btn order" 
                  @click="voegToeAanBestelling(product)"
                  :disabled="product.quantity === 0"
                  :class="{ 'disabled': product.quantity === 0 }"
                >
                  <i class="fas fa-cart-plus"></i>
                  Bestel
                </button>
                
                <button class="action-btn edit" @click="editProduct(product)">
                  <i class="fas fa-edit"></i>
                  Bewerken
                </button>
                <button class="action-btn delete" @click="deleteProduct(product.id)">
                  <i class="fas fa-trash"></i>
                  Verwijderen
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bestel Modal -->
        <div v-if="showBestelModal" class="modal-overlay" @click.self="closeBestelModal">
          <div class="modal bestel-modal">
            <div class="modal-header">
              <h2><i class="fas fa-cart-plus"></i> Product Bestellen</h2>
              <button class="close-btn" @click="closeBestelModal">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="bestel-content" v-if="selectedProduct">
              <div class="bestel-product">
                <div class="bestel-image">
                  <i :class="getCategoryIcon(selectedProduct.category)"></i>
                </div>
                <div class="bestel-info">
                  <h3>{{ selectedProduct.name }}</h3>
                  <p class="product-description">{{ selectedProduct.description }}</p>
                  <div class="product-details">
                    <div class="detail">
                      <i class="fas fa-box"></i>
                      <span>Beschikbaar: {{ selectedProduct.quantity }} stuks</span>
                    </div>
                    <div class="detail">
                      <i class="fas fa-barcode"></i>
                      <span>EAN: {{ selectedProduct.ean }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bestel-controls">
                <div class="quantity-control">
                  <label for="aantal">Aantal:</label>
                  <div class="quantity-input">
                    <button class="qty-btn minus" @click="decreaseAantal" :disabled="bestelAantal <= 1">
                      <i class="fas fa-minus"></i>
                    </button>
                    <input 
                      type="number" 
                      id="aantal" 
                      v-model="bestelAantal" 
                      min="1" 
                      :max="selectedProduct.quantity"
                      @change="validateAantal"
                    >
                    <button class="qty-btn plus" @click="increaseAantal" :disabled="bestelAantal >= selectedProduct.quantity">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                  <span class="max-aantal">Max: {{ selectedProduct.quantity }} stuks</span>
                </div>
                
                <div class="bestel-actions">
                  <button class="btn-secondary" @click="closeBestelModal">
                    Annuleren
                  </button>
                  <button class="btn-primary" @click="bevestigBestelling">
                    <i class="fas fa-shopping-cart"></i>
                    Toevoegen aan Bestelling
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Form Modal -->
        <div v-if="showProductForm" class="modal-overlay" @click.self="closeProductForm">
          <div class="modal">
            <div class="modal-header">
              <h2>{{ editingProduct ? 'Product Bewerken' : 'Nieuw Product Toevoegen' }}</h2>
              <button class="close-btn" @click="closeProductForm">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <form @submit.prevent="saveProduct" class="product-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="productName">
                    <i class="fas fa-tag"></i>
                    Product Naam *
                  </label>
                  <input 
                    type="text" 
                    id="productName" 
                    v-model="productForm.name" 
                    required
                    placeholder="Bijv: Biologische Appels"
                  >
                </div>
                
                <div class="form-group">
                  <label for="productCategory">
                    <i class="fas fa-list"></i>
                    Categorie *
                  </label>
                  <select id="productCategory" v-model="productForm.category" required>
                    <option value="">Kies een categorie</option>
                    <option value="groenten">Groenten</option>
                    <option value="fruit">Fruit</option>
                    <option value="vlees">Vlees & Vis</option>
                    <option value="zuivel">Zuivel</option>
                    <option value="brood">Brood & Bakkerij</option>
                    <option value="droog">Droge Voeding</option>
                    <option value="drank">Dranken</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="productEAN">
                    <i class="fas fa-barcode"></i>
                    EAN Code *
                  </label>
                  <input 
                    type="text" 
                    id="productEAN" 
                    v-model="productForm.ean" 
                    required
                    placeholder="Bijv: 8712345678901"
                    pattern="[0-9]{13}"
                    title="Voer een geldige 13-cijferige EAN code in"
                  >
                </div>
                
                <div class="form-group">
                  <label for="productQuantity">
                    <i class="fas fa-box"></i>
                    Huidige Voorraad
                  </label>
                  <input 
                    type="number" 
                    id="productQuantity" 
                    v-model="productForm.quantity" 
                    min="0"
                    placeholder="Aantal stuks"
                  >
                </div>
              </div>
              
              <div class="form-group">
                <label for="productDescription">
                  <i class="fas fa-align-left"></i>
                  Beschrijving
                </label>
                <textarea 
                  id="productDescription" 
                  v-model="productForm.description" 
                  rows="3"
                  placeholder="Product beschrijving..."
                ></textarea>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="productLocation">
                    <i class="fas fa-map-marker-alt"></i>
                    Locatie in Magazijn
                  </label>
                  <input 
                    type="text" 
                    id="productLocation" 
                    v-model="productForm.location" 
                    placeholder="Bijv: Rek A-12"
                  >
                </div>
                
                <div class="form-group">
                  <label for="productExpiry">
                    <i class="fas fa-calendar-alt"></i>
                    Houdbaar tot
                  </label>
                  <input 
                    type="date" 
                    id="productExpiry" 
                    v-model="productForm.expiryDate"
                  >
                </div>
              </div>
              
              <div class="form-actions">
                <button type="button" class="btn-secondary" @click="closeProductForm">
                  Annuleren
                </button>
                <button type="submit" class="btn-primary">
                  <i class="fas fa-save"></i>
                  {{ editingProduct ? 'Wijzigingen Opslaan' : 'Product Opslaan' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">
            <i class="fas fa-chevron-left"></i> Vorige
          </button>
          
          <div class="page-numbers">
            <span v-for="page in totalPages" 
                  :key="page"
                  class="page-number"
                  :class="{ active: page === currentPage }"
                  @click="goToPage(page)">
              {{ page }}
            </span>
          </div>
          
          <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">
            Volgende <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <div class="footer-logo">
            <i class="fas fa-hands-helping"></i>
            <h3>Voedselbank Productbeheer</h3>
          </div>
          <p class="footer-text">
            Beheer uw voedselvoorraad efficiënt en help voedselverspilling tegen te gaan.
          </p>
        </div>
        
        <div class="footer-section">
          <h4>Snelle Acties</h4>
          <div class="quick-actions">
            <button class="quick-btn" @click="openProductForm">
              <i class="fas fa-plus"></i> Nieuw Product
            </button>
            <button class="quick-btn" @click="exportProducts">
              <i class="fas fa-download"></i> Exporteer
            </button>
            <button class="quick-btn" @click="gaNaarBestellingen" v-if="bestellingenAantal > 0">
              <i class="fas fa-shopping-cart"></i> Bestellingen ({{ bestellingenAantal }})
            </button>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2024 Voedselbank Product Management System | Versie 2.1.0</p>
        <p class="stats">Producten: {{ products.length }} | Voorraad Totaal: {{ totalStock }} stuks</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ProductCatalogus',
  data() {
    return {
      products: [
        { id: 1, name: 'Biologische Appels', category: 'fruit', ean: '8712345678901', quantity: 45, description: 'Verse biologische appels van lokale boer', location: 'Koeling A-1', expiryDate: '2024-02-15' },
        { id: 2, name: 'Volkoren Brood', category: 'brood', ean: '8712345678902', quantity: 32, description: 'Vers volkoren brood van bakkerij', location: 'Rek B-3', expiryDate: '2024-01-12' },
        { id: 3, name: 'Magere Melk', category: 'zuivel', ean: '8712345678903', quantity: 60, description: 'Magere melk 1 liter verpakking', location: 'Koeling C-2', expiryDate: '2024-01-20' },
        { id: 4, name: 'Kipfilet', category: 'vlees', ean: '8712345678904', quantity: 28, description: 'Vers gesneden kipfilet', location: 'Vrieskist D-4', expiryDate: '2024-01-25' },
        { id: 5, name: 'Rijst 1kg', category: 'droog', ean: '8712345678905', quantity: 85, description: 'Lange korrel rijst 1kg verpakking', location: 'Rek E-7', expiryDate: '2025-06-30' },
        { id: 6, name: 'Tomaten', category: 'groenten', ean: '8712345678906', quantity: 38, description: 'Verse kerstomaatjes', location: 'Koeling A-3', expiryDate: '2024-01-18' },
        { id: 7, name: 'Appelsap', category: 'drank', ean: '8712345678907', quantity: 42, description: 'Appelsap 1 liter pak', location: 'Rek F-2', expiryDate: '2024-08-15' },
        { id: 8, name: 'Kaasplakken', category: 'zuivel', ean: '8712345678908', quantity: 25, description: 'Goudse kaas plakken', location: 'Koeling C-5', expiryDate: '2024-02-10' },
        { id: 9, name: 'Bananen', category: 'fruit', ean: '8712345678909', quantity: 55, description: 'Verse gele bananen', location: 'Rek A-5', expiryDate: '2024-01-14' },
        { id: 10, name: 'Pasta', category: 'droog', ean: '8712345678910', quantity: 67, description: 'Spaghetti 500g', location: 'Rek E-3', expiryDate: '2025-03-20' },
        { id: 11, name: 'Wortelen', category: 'groenten', ean: '8712345678911', quantity: 40, description: 'Winterpeen biologisch', location: 'Koeling B-2', expiryDate: '2024-01-22' },
        { id: 12, name: 'Zalmfilet', category: 'vlees', ean: '8712345678912', quantity: 18, description: 'Verse zalmfilet', location: 'Vrieskist D-1', expiryDate: '2024-01-30' }
      ],
      searchQuery: '',
      sortBy: 'name',
      categoryFilter: '',
      filteredProducts: [],
      showProductForm: false,
      showBestelModal: false,
      editingProduct: null,
      selectedProduct: null,
      bestelAantal: 1,
      bestellingSuccess: '',
      productForm: {
        name: '',
        category: '',
        ean: '',
        quantity: 0,
        description: '',
        location: '',
        expiryDate: ''
      },
      currentPage: 1,
      itemsPerPage: 8
    }
  },
  computed: {
    totalStock() {
      return this.products.reduce((total, product) => total + product.quantity, 0)
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredProducts.slice(start, end)
    },
    bestellingenAantal() {
      const bestellingen = JSON.parse(localStorage.getItem('bestellingen') || '[]');
      return bestellingen.length;
    }
  },
  created() {
    this.filteredProducts = [...this.products]
    this.sortProducts()
  },
  methods: {
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
      }
      return icons[category] || 'fas fa-box'
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
      }
      return labels[category] || category
    },

    formatDate(dateString) {
      if (!dateString) return 'Niet gespecificeerd';
      const date = new Date(dateString);
      return date.toLocaleDateString('nl-NL');
    },
    
    filterProducts() {
      let filtered = [...this.products]
      
      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.ean.includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
      }
      
      // Category filter
      if (this.categoryFilter) {
        filtered = filtered.filter(product => product.category === this.categoryFilter)
      }
      
      this.filteredProducts = filtered
      this.currentPage = 1
      this.sortProducts()
    },
    
    sortProducts() {
      this.filteredProducts.sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'nameDesc':
            return b.name.localeCompare(a.name)
          case 'category':
            return a.category.localeCompare(b.category)
          case 'quantity':
            return b.quantity - a.quantity
          case 'quantityAsc':
            return a.quantity - b.quantity
          case 'ean':
            return a.ean.localeCompare(b.ean)
          default:
            return 0
        }
      })
    },
    
    increaseStock(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.quantity++
        this.filterProducts()
      }
    },
    
    decreaseStock(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product && product.quantity > 0) {
        product.quantity--
        this.filterProducts()
      }
    },

    voegToeAanBestelling(product) {
      // Als er genoeg voorraad is, open modal voor aantal
      if (product.quantity > 0) {
        this.selectedProduct = product;
        this.bestelAantal = 1;
        this.showBestelModal = true;
      } else {
        alert('Dit product is niet op voorraad!');
      }
    },

    increaseAantal() {
      if (this.selectedProduct && this.bestelAantal < this.selectedProduct.quantity) {
        this.bestelAantal++;
      }
    },

    decreaseAantal() {
      if (this.bestelAantal > 1) {
        this.bestelAantal--;
      }
    },

    validateAantal() {
      if (!this.selectedProduct) return;
      
      if (this.bestelAantal < 1) {
        this.bestelAantal = 1;
      } else if (this.bestelAantal > this.selectedProduct.quantity) {
        this.bestelAantal = this.selectedProduct.quantity;
      }
    },

    bevestigBestelling() {
      if (!this.selectedProduct) return;

      // Verminder de voorraad
      const productIndex = this.products.findIndex(p => p.id === this.selectedProduct.id);
      if (productIndex !== -1) {
        this.products[productIndex].quantity -= this.bestelAantal;
      }

      // Maak bestelling object
      const bestelling = {
        id: Date.now(),
        productId: this.selectedProduct.id,
        naam: this.selectedProduct.name,
        categorie: this.selectedProduct.category,
        beschrijving: this.selectedProduct.description,
        ean: this.selectedProduct.ean,
        aantal: this.bestelAantal,
        eenheid: 'stuks',
        datum: new Date().toISOString(),
        status: 'in behandeling',
        klantId: 1, // Zou uit authenticatie moeten komen
        klantNaam: 'Voedselbank Medewerker',
        locatie: this.selectedProduct.location
      };

      // Sla bestelling op in localStorage
      let bestellingen = JSON.parse(localStorage.getItem('bestellingen') || '[]');
      bestellingen.unshift(bestelling);
      localStorage.setItem('bestellingen', JSON.stringify(bestellingen));

      // Sluit modal en toon bevestiging
      this.closeBestelModal();
      this.bestellingSuccess = `${this.bestelAantal}x ${this.selectedProduct.name} toegevoegd aan bestellingen!`;
      this.filterProducts(); // Refresh de voorraad weergave

      // Automatisch verwijder de notificatie na 5 seconden
      setTimeout(() => {
        this.bestellingSuccess = '';
      }, 5000);
    },

    closeBestelModal() {
      this.showBestelModal = false;
      this.selectedProduct = null;
      this.bestelAantal = 1;
    },

    gaNaarBestellingen() {
      this.$router.push('/bestellingen');
    },
    
    openProductForm(product = null) {
      this.editingProduct = product
      if (product) {
        this.productForm = { ...product }
      } else {
        this.productForm = {
          name: '',
          category: '',
          ean: '',
          quantity: 0,
          description: '',
          location: '',
          expiryDate: ''
        }
      }
      this.showProductForm = true
    },
    
    closeProductForm() {
      this.showProductForm = false
      this.editingProduct = null
    },
    
    saveProduct() {
      if (this.editingProduct) {
        const index = this.products.findIndex(p => p.id === this.editingProduct.id)
        if (index !== -1) {
          this.products[index] = { ...this.productForm, id: this.editingProduct.id }
        }
      } else {
        const newId = Math.max(...this.products.map(p => p.id)) + 1
        this.products.push({ ...this.productForm, id: newId })
      }
      
      this.closeProductForm()
      this.filterProducts()
      alert('Product opgeslagen!')
    },
    
    editProduct(product) {
      this.openProductForm(product)
    },
    
    deleteProduct(productId) {
      if (confirm('Weet u zeker dat u dit product wilt verwijderen?')) {
        this.products = this.products.filter(p => p.id !== productId)
        this.filterProducts()
        alert('Product verwijderd!')
      }
    },
    
    exportProducts() {
      alert('Producten worden geëxporteerd naar CSV...')
    },
    
    printCatalog() {
      window.print()
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    
    goToPage(page) {
      this.currentPage = page
    }
  }
}
</script>

<<style scoped>
.product-catalogus {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
  min-height: 100vh;
}

/* Header - zelfde als homepage */
.header {
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1400px;
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

/* Main Content */
.main-content {
  padding: 30px 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.header-left h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-left h1 i {
  color: #ff6b35;
}

.header-left p {
  color: #666;
  font-size: 16px;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
}

/* Control Bar */
.control-bar {
  background: white;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-bar i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
}

.search-bar input {
  width: 100%;
  padding: 15px 20px 15px 50px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s;
  background: #f8f9fa;
}

.search-bar input:focus {
  outline: none;
  border-color: #ff6b35;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.filters {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 250px;
}

.filter-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #555;
  font-weight: 600;
  font-size: 15px;
}

.filter-group label i {
  color: #ff6b35;
}

.filter-group select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
}

.filter-group select:focus {
  outline: none;
  border-color: #ff6b35;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.product-header {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.product-id {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.product-category {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
}

.product-category.groenten { background: #d4edda; color: #155724; }
.product-category.fruit { background: #fff3cd; color: #856404; }
.product-category.vlees { background: #f8d7da; color: #721c24; }
.product-category.zuivel { background: #d1ecf1; color: #0c5460; }
.product-category.brood { background: #e2d9f3; color: #483d8b; }
.product-category.droog { background: #d6d8d9; color: #383d41; }
.product-category.drank { background: #cce5ff; color: #004085; }
.product-category.anders { background: #f5e6ca; color: #8a6d3b; }

.product-image {
  height: 120px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.product-image i {
  font-size: 48px;
  color: #ff6b35;
}

.product-info {
  padding: 20px;
  flex-grow: 1;
}

.product-info h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.product-description {
  color: #666;
  line-height: 1.5;
  font-size: 14px;
  margin-bottom: 15px;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #555;
}

.detail i {
  color: #ff6b35;
  width: 16px;
}

.product-actions {
  padding: 20px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.stock-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}

.stock-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.stock-btn.plus {
  background: #d4edda;
  color: #155724;
}

.stock-btn.plus:hover {
  background: #c3e6cb;
}

.stock-btn.minus {
  background: #f8d7da;
  color: #721c24;
}

.stock-btn.minus:hover {
  background: #f5c6cb;
}

.stock-display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stock-label {
  font-size: 12px;
  color: #666;
}

.stock-count {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.stock-count.low-stock {
  color: #dc3545;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}

.action-btn.edit {
  background: #e3f2fd;
  color: #1971c2;
}

.action-btn.edit:hover {
  background: #d0ebff;
}

.action-btn.delete {
  background: #ffebee;
  color: #c62828;
}

.action-btn.delete:hover {
  background: #ffcdd2;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 5px;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #ff6b35;
}

.product-form {
  padding: 25px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 15px;
  }
}

.form-group {
  flex: 1;
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

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  background: #f8f9fa;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6b35;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-secondary {
  background: #f8f9fa;
  color: #555;
  border: 2px solid #e0e0e0;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #e9ecef;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
}

.page-btn {
  background: white;
  border: 2px solid #e0e0e0;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.page-btn:not(:disabled):hover {
  border-color: #ff6b35;
  color: #ff6b35;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover {
  background: #f0f7ff;
  color: #ff6b35;
}

.page-number.active {
  background: #ff6b35;
  color: white;
}

/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  padding-top: 40px;
  margin-top: 60px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.footer-section {
  margin-bottom: 30px;
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
}

.scrum-list {
  list-style: none;
  padding: 0;
}

.scrum-list li {
  margin-bottom: 12px;
  color: #bdc3c7;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.scrum-list li i {
  color: #4CAF50;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.quick-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  border-color: #ff6b35;
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

.stats {
  color: #7f8c8d;
  font-size: 12px;
}

/* Responsive */
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
  
  .filters {
    flex-direction: column;
    gap: 20px;
  }
  
  .modal {
    width: 95%;
  }
}

@media print {
  .header, .footer, .control-bar, .product-actions, .modal-overlay {
    display: none !important;
  }
  
  .product-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
</style>