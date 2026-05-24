import React, { useState, useEffect } from 'react';
import { RestaurantCard } from '../components/Cards';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { api } from '../services/api';
import Loader from '../components/Loader';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['American', 'Italian', 'Japanese', 'Fast Food', 'Healthy', 'Indian'];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await api.getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to load restaurants", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || r.cuisine.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const heroStyle = {
    backgroundColor: 'var(--white)',
    padding: '60px 20px',
    textAlign: 'center',
    marginBottom: '40px',
    boxShadow: 'var(--shadow-sm)',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    marginTop: '20px',
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div style={heroStyle}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--secondary-color)', marginBottom: '16px' }}>Hungry? You're in the right place</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Order food from favourite restaurants near you and enjoy delicious meals delivered fresh and hot.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Categories</h2>
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
        
        <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px' }}>
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Top Restaurants near you'}
        </h2>
        
        {filteredRestaurants.length === 0 ? (
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>No restaurants found matching your criteria.</p>
        ) : (
          <div style={gridStyle}>
            {filteredRestaurants.map(rest => (
              <RestaurantCard key={rest.id} {...rest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
