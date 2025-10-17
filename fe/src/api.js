const API_URL = 'http://localhost:5000/api/items';

export const getItems = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};

export const addItem = async (item) => {
  const formData = new FormData();
  Object.entries(item).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res.json();
};

export const updateItem = async (id, item) => {
  const formData = new FormData();
  Object.entries(item).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
};

export const deleteItem = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
};
