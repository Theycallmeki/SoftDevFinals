import React, { useEffect, useState } from 'react';
import { getItems, addItem, updateItem, deleteItem } from '../api';

function CrudPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stock: '', description: '', picture: null });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, picture: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateItem(editId, form);
      setEditId(null);
    } else {
      await addItem(form);
    }
    setForm({ name: '', price: '', stock: '', description: '', picture: null });
    loadItems();
  };

  const handleEdit = (item) => {
    setForm({ ...item, picture: null }); // reset picture on edit
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🧾 Manage Items</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input type="file" name="picture" onChange={handleChange} accept="image/*" />

        <button type="submit">{editId ? 'Update' : 'Add'} Item</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>{item.description}</td>
                <td>
                  {item.picture ? (
                    <img
                      src={`http://localhost:5000${item.picture}`}
                      alt={item.name}
                      style={{ width: 80, height: 80, objectFit: 'cover' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(item)}>✏️</button>
                  <button onClick={() => handleDelete(item.id)} style={{ marginLeft: 5 }}>❌</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CrudPage;
