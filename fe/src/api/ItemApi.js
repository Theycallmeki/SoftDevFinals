const API_URL = 'http://localhost:5000/api/items';

// Get items for logged-in user (CRUD)
export const getItems = async () => {
  const res = await fetch(API_URL, { 
    method: 'GET', 
    credentials: 'include' // send cookie
  });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};

// Add new item
export const addItem = async (item) => {
  const formData = new FormData();
  Object.entries(item).forEach(([key, value]) => {
    if (value !== null && value !== undefined) formData.append(key, value);
  });

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res.json();
};

// Update item
export const updateItem = async (id, item) => {
  const formData = new FormData();
  Object.entries(item).forEach(([key, value]) => {
    if (value !== null && value !== undefined) formData.append(key, value);
  });

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
};

// Delete item
export const deleteItem = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
};

// Get all items for marketplace (public)
export const getAllItems = async () => {
  const res = await fetch(`${API_URL}/all`, {
    method: 'GET',
    credentials: 'include', // include cookies if needed
  });
  if (!res.ok) throw new Error('Failed to fetch all items');
  return res.json();
};
