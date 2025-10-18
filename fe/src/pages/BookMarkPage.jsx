import React, { useEffect, useState } from 'react';
import { getUserBookmarks } from '../api/bookmarkApi';
import { getMe } from '../api/authApi';
import RecipeCard from '../components/RecipeCard';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const loadBookmarks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUserBookmarks();
      setBookmarks(data);
    } catch (err) {
      setError(err.message || 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const data = await getMe();
      setCurrentUser(data.user);
    } catch {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    loadCurrentUser();
    loadBookmarks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading bookmarks...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">My Bookmarked Recipes</h2>

      {bookmarks.length === 0 ? (
        <p>You haven’t bookmarked any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              currentUser={currentUser}
              // no onDelete here, delete feature removed
            />
          ))}
        </div>
      )}
    </div>
  );
}
