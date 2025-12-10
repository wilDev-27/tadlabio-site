# Tadla Bio - Artisanal Moroccan Products E-commerce

A modern, mobile-friendly single-page e-commerce website for Tadla Bio, featuring traditional Moroccan natural products.

## Features

- 🛍️ Complete e-commerce functionality (product catalog, cart, checkout)
- 📱 Fully responsive design (mobile-first)
- ♿ Accessible (semantic HTML, keyboard navigation, ARIA labels)
- 🎨 Modern Moroccan-inspired design with earthy colors
- 💬 WhatsApp integration for order processing
- 🛒 Persistent cart with localStorage
- ⚡ Optimized for performance
- 🔍 SEO-friendly structure

## Quick Start

### Running Locally

1. Download and extract all files to a folder
2. Open `index.html` in a web browser
3. That's it! No build process required

### Customization

#### Products

Edit `data/products.json` to add/update products. Each product should include:

```json
{
  "id": 1,
  "name": "Product Name",
  "slug": "product-name",
  "price_mad": 100,
  "weight": "500g",
  "short_desc": "Brief description",
  "long_desc": "Detailed description",
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "is_organic": true,
  "category": "oil|dairy|pantry",
  "image": "assets/images/product.jpg"
}
```
