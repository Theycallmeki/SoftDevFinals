import React, { useEffect, useState } from 'react';
import { getAllItems } from '../api/ItemApi';
import ItemCard from '../components/ItemCard';

export default function MarketPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadItems = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllItems(); // fetch all users' items
      setItems(data);
    } catch (err) {
      setError(err.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading items...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
