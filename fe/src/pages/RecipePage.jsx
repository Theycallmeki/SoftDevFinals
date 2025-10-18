import React, { useEffect, useState } from 'react';
import { getAllRecipes } from '../api/RecipeApi';
import { getMe } from '../api/authApi';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  // Load all recipes
  const loadRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (err) {
      setError(err.message || 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  // Load current user info
  const loadCurrentUser = async () => {
    try {
      const data = await getMe();
      setCurrentUser(data.user);
    } catch {
      setCurrentUser(null);
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = recipes.filter((recipe) => {
      const title = recipe.title?.toLowerCase() || '';
      const ingredients = recipe.ingredients?.toLowerCase() || '';
      const instructions = recipe.instructions?.toLowerCase() || '';
      return (
        title.includes(term) ||
        ingredients.includes(term) ||
        instructions.includes(term)
      );
    });

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    loadCurrentUser();
    loadRecipes();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Recipe Marketplace</h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search recipes by title, ingredients, or instructions..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-600">No matching recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              currentUser={currentUser}
              onClick={() => navigate(`/recipe/${recipe.id}`)} // ✅ click to view details
            />
          ))}
        </div>
      )}
    </div>
  );
}
