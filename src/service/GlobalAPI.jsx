// src/service/GlobalAPI.jsx
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const GlobalAPI = {
  fetchPlaceImage: async (query) => {
    try {
      if (!query || query.trim() === '') return '/placeholder.jpg';

      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query,
          per_page: 5,
          orientation: 'landscape',
          order_by: 'relevant', // or 'popular'
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      // Prefer wide landscape images with good resolution
      const image = response.data.results.find(
        (img) => img.width >= img.height && img.urls?.regular
      );

      const imageUrl = image?.urls?.regular;

      return imageUrl || '/placeholder.jpg';
    } catch (error) {
      console.error('Unsplash image fetch failed:', error);
      return '/placeholder.jpg';
    }
  },
};

export default GlobalAPI;
