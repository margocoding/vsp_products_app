import { useState, useEffect } from 'react';
import menuApi from './api/menuApi';
import type { Category, MenuItem } from './types';
import './App.scss';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadMenuItems();
  }, [selectedCategory, searchQuery]);

  const loadCategories = async () => {
    try {
      const data = await menuApi.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await menuApi.getMenu(
        selectedCategory || undefined,
        searchQuery || undefined
      );
      setMenuItems(data);
    } catch (err) {
      setError('Failed to load menu items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🍽️ Наше Меню</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Поиск блюд..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </header>

      <nav className="categories">
        <button
          className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => handleCategoryClick(null)}
        >
          Все
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </nav>

      <main className="menu-container">
        {loading && <p className="loading">Загрузка...</p>}
        {error && <p className="error">{error}</p>}
        
        {!loading && !error && menuItems.length === 0 && (
          <p className="no-items">Блюда не найдены</p>
        )}

        <div className="menu-grid">
          {menuItems.map((item) => (
            <article key={item.id} className="menu-item-card">
              {item.image && (
                <img src={item.image} alt={item.name} className="menu-item-image" />
              )}
              <div className="menu-item-content">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                  <span className="menu-item-price">{item.price.toFixed(2)} ₽</span>
                  {item.categories.length > 0 && (
                    <div className="menu-item-categories">
                      {item.categories.map((cat: Category) => (
                        <span key={cat.id} className="category-tag">
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
