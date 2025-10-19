import React, { useEffect, useState } from 'react';
import { getAllRecipes } from '../api/RecipeApi';
import { getMe } from '../api/authApi';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import "../main.css";

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

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

  const loadCurrentUser = async () => {
    try {
      const data = await getMe();
      setCurrentUser(data.user);
    } catch {
      setCurrentUser(null);
    }
  };

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
  if (error) return <p className="text-center text-red mt-10">{error}</p>;

  return (
    <div className="recipe-page-container">
      <h2 className="recipe-page-title">Recipe Marketplace</h2>

      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search recipes by title, ingredients, or instructions..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="recipe-page-search"
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray">No matching recipes found.</p>
      ) : (
        <div className="recipe-page-grid">
  {filteredRecipes.map((recipe) => (
    <div key={recipe.id} className="recipe-page-grid-item">
      <RecipeCard
        recipe={recipe}
        currentUser={currentUser}
        onClick={() => navigate(`/recipes/${recipe.id}`)}
      />
    </div>
  ))}
</div>

      )}
    </div>
  );
}
