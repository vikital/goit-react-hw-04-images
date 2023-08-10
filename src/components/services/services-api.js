import axios from 'axios';

const API_KEY = '37421365-508677d6bf0e4f2b0f58d3593';
const API_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'all',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
