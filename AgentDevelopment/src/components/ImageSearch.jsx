import React, { useState } from 'react'
import { Search, Download, Loader, Image as ImageIcon, ExternalLink } from 'lucide-react'
import './ImageSearch.css'

function ImageSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchImages = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Try to use Pexels API if key is available
      const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || ''
      
      if (PEXELS_API_KEY && PEXELS_API_KEY !== 'YOUR_PEXELS_API_KEY') {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=20`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          setImages(data.photos || [])
          setLoading(false)
          return
        }
      }

      // Fallback: Use placeholder images for demo
      throw new Error('No API key configured')
    } catch (err) {
      // Use placeholder images for demo
      console.log('Using placeholder images for demo')
      setImages(generatePlaceholderImages(searchQuery))
      setError(
        'Demo mode: Using placeholder images. To use real image search, add your Pexels API key to a .env file as VITE_PEXELS_API_KEY=your_key_here'
      )
    } finally {
      setLoading(false)
    }
  }

  const generatePlaceholderImages = (query) => {
    // Generate placeholder image URLs using placeholder services
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      src: {
        original: `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}&sig=${i}`,
        large: `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}&sig=${i}`,
        medium: `https://source.unsplash.com/400x300/?${encodeURIComponent(query)}&sig=${i}`,
      },
      photographer: 'Demo',
      photographer_url: '#',
      url: '#',
      alt: `${query} - Image ${i + 1}`,
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchImages()
    }
  }

  const downloadImage = async (imageUrl, imageId) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-agent-image-${imageId}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to download image:', err)
    }
  }

  return (
    <div className="image-search">
      <div className="page-header">
        <div className="header-icon">
          <ImageIcon size={32} />
        </div>
        <h1>Image Search</h1>
        <p className="page-subtitle">
          Search for images from the web to use in your AI agent projects or learning materials.
        </p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search for images (e.g., 'AI agent', 'robot', 'technology')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button className="search-btn" onClick={searchImages} disabled={loading}>
            {loading ? (
              <>
                <Loader size={18} className="spinner" />
                Searching...
              </>
            ) : (
              <>
                <Search size={18} />
                Search
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <p className="error-hint">
              To use real image search, add your API key from{' '}
              <a
                href="https://www.pexels.com/api/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pexels
              </a>{' '}
              or{' '}
              <a
                href="https://unsplash.com/developers"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="images-section">
          <h2 className="results-title">
            Found {images.length} image{images.length !== 1 ? 's' : ''}
          </h2>
          <div className="images-grid">
            {images.map((image) => (
              <div key={image.id} className="image-card">
                <div className="image-wrapper">
                  <img
                    src={image.src?.medium || image.src?.large || image.src?.original}
                    alt={image.alt || searchQuery}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available'
                    }}
                  />
                  <div className="image-overlay">
                    <a
                      href={image.url || image.src?.original}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="overlay-btn"
                      title="View original"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <button
                      className="overlay-btn"
                      onClick={() =>
                        downloadImage(
                          image.src?.original || image.src?.large || image.src?.medium,
                          image.id
                        )
                      }
                      title="Download image"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
                {image.photographer && (
                  <div className="image-info">
                    <p>
                      Photo by{' '}
                      <a
                        href={image.photographer_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {image.photographer}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && images.length === 0 && searchQuery && (
        <div className="empty-state">
          <ImageIcon size={64} />
          <p>No images found. Try a different search term.</p>
        </div>
      )}

      {!loading && images.length === 0 && !searchQuery && (
        <div className="empty-state">
          <ImageIcon size={64} />
          <p>Enter a search term above to find images related to AI agents and technology.</p>
          <div className="suggestions">
            <h3>Try searching for:</h3>
            <div className="suggestion-tags">
              {['AI agent', 'robot', 'technology', 'artificial intelligence', 'automation'].map(
                (tag) => (
                  <button
                    key={tag}
                    className="suggestion-tag"
                    onClick={() => {
                      setSearchQuery(tag)
                      setTimeout(() => searchImages(), 100)
                    }}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageSearch
