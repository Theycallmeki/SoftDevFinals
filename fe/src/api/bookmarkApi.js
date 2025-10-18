const API_URL = 'http://localhost:5000/api/bookmarks';

// Get all bookmarks for logged-in user
export const getUserBookmarks = async () => {
  const res = await fetch(API_URL, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch bookmarks');
  return res.json();
};

// Add a bookmark
export const addBookmark = async (recipeId) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeId }),
  });
  if (!res.ok) throw new Error('Failed to add bookmark');
  return res.json();
};

// Remove a bookmark
export const removeBookmark = async (recipeId) => {
  const res = await fetch(`${API_URL}/${recipeId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to remove bookmark');
  return res.json();
};
