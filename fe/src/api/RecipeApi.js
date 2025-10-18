const API_URL = 'http://localhost:5000/api/recipes';

// Get recipes for logged-in user (CRUD)
export const getRecipes = async () => {
  const res = await fetch(API_URL, {
    method: 'GET',
    credentials: 'include', // send cookie
  });
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};

// Add new recipe
export const addRecipe = async (recipe) => {
  const formData = new FormData();
  Object.entries(recipe).forEach(([key, value]) => {
    if (value !== null && value !== undefined) formData.append(key, value);
  });

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to add recipe');
  return res.json();
};

// Update recipe
export const updateRecipe = async (id, recipe) => {
  const formData = new FormData();
  Object.entries(recipe).forEach(([key, value]) => {
    if (value !== null && value !== undefined) formData.append(key, value);
  });

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to update recipe');
  return res.json();
};

// Delete recipe
export const deleteRecipe = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
  return res.json();
};

// Get all recipes (public)
export const getAllRecipes = async () => {
  const res = await fetch(`${API_URL}/all`, {
    method: 'GET',
    credentials: 'include', // include cookies if needed
  });
  if (!res.ok) throw new Error('Failed to fetch all recipes');
  return res.json();
};
