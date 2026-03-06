// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function to build API endpoints
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_URL}/${cleanEndpoint}`;
};

// Export for convenience
export default {
  API_URL,
  buildApiUrl,
};