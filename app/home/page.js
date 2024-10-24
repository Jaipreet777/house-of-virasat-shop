'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Firebase Firestore reference
import Link from 'next/link';  // For navigation

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['All', 'Electronics', 'Fashion', 'Home Appliances', 'Books']); // Example categories
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsArray);
      setFilteredProducts(productsArray);
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and selected category
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearchTerm && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div>
      {/* Header */}
      <header style={headerStyle}>
        <div style={logoStyle}>
          <img src="/company-logo.png" alt="Company Logo" style={logoImageStyle} />
        </div>
        <nav style={navStyle}>
          <Link href="/contact">
            <button style={headerButtonStyle}>Contact Us</button>
          </Link>
          <Link href="/login">
            <button style={headerButtonStyle}>Login</button>
          </Link>
        </nav>
      </header>

      {/* Search Bar */}
      <div style={searchBarContainerStyle}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchBarStyle}
        />
      </div>

      {/* Category Buttons */}
      <div style={categoryContainerStyle}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={categoryButtonStyle(selectedCategory === category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Display */}
      <div style={productGridStyle}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={productCardStyle}>
            <img src={product.imageUrl} alt={product.name} style={productImageStyle} />
            <h3 style={productTitleStyle}>{product.name}</h3>
            <p style={productPriceStyle}>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// CSS Styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f7f9fc',
};

const logoStyle = {
  flex: '1',
};

const logoImageStyle = {
  height: '50px',
};

const navStyle = {
  flex: '1',
  display: 'flex',
  justifyContent: 'flex-end',
};

const headerButtonStyle = {
  padding: '10px 20px',
  margin: '0 10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const searchBarContainerStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const searchBarStyle = {
  padding: '10px',
  width: '60%',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const categoryContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const categoryButtonStyle = (isSelected) => ({
  padding: '10px 20px',
  margin: '0 10px',
  backgroundColor: isSelected ? '#007bff' : '#f7f9fc',
  color: isSelected ? 'white' : '#333',
  border: '1px solid #007bff',
  borderRadius: '5px',
  cursor: 'pointer',
});

const productGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '20px',
  padding: '20px',
  marginTop: '20px',
};

const productCardStyle = {
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  textAlign: 'center',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const productImageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '10px',
};

const productTitleStyle = {
  fontSize: '1.2rem',
  margin: '10px 0',
};

const productPriceStyle = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#007bff',
};
