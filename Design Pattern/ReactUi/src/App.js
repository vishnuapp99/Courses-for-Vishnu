import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import PatternCategories from './components/PatternCategories';
import PatternGrid from './components/PatternGrid';
import PatternDetail from './components/PatternDetail';
import Footer from './components/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPattern, setSelectedPattern] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedPattern(null);
  };

  const handlePatternSelect = (pattern) => {
    setSelectedPattern(pattern);
  };

  const handleBack = () => {
    setSelectedPattern(null);
  };

  return (
    <div className="App">
      <Header />
      <div className="container-fluid py-4">
        {!selectedPattern ? (
          <>
            <PatternCategories 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <PatternGrid 
              category={selectedCategory}
              onPatternSelect={handlePatternSelect}
            />
          </>
        ) : (
          <PatternDetail 
            pattern={selectedPattern}
            onBack={handleBack}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

