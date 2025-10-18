const API_URL = 'http://localhost:5000/api/comments';

export const getComments = async (recipeId) => {
  const res = await fetch(`${API_URL}/${recipeId}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
};

export const addComment = async (recipeId, text, parentId = null) => {
  const res = await fetch(`${API_URL}/${recipeId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ text, parentId })
  });
  if (!res.ok) throw new Error('Failed to add comment');
  return res.json();
};
