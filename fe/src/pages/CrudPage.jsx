import React, { useEffect, useState } from 'react';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from '../api/RecipeApi';
import "../assets/crudPage.css"; 

function CrudPage() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (err) {
      console.error('Error loading recipes:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateRecipe(editId, form);
        setEditId(null);
      } else {
        await addRecipe(form);
      }
      setForm({ title: '', ingredients: '', instructions: '', image: null });
      loadRecipes();
    } catch (err) {
      console.error('Error saving recipe:', err);
    }
  };

  const handleEdit = (recipe) => {
    setForm({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: null,
    });
    setEditId(recipe.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      loadRecipes();
    } catch (err) {
      console.error('Error deleting recipe:', err);
    }
  };

  return (
    <div className="crud-page-container">
      <h1 className="crud-page-title">Manage Recipes</h1>

      <div className="crud-page-flex">
        {/* Recipe Form */}
        <form onSubmit={handleSubmit} className="crud-form">
          <h2 className="crud-form-title">{editId ? 'Edit Recipe' : 'Add Recipe'}</h2>

          <input
            name="title"
            placeholder="Recipe Title"
            value={form.title}
            onChange={handleChange}
            required
            className="crud-form-input"
          />

          <textarea
            name="ingredients"
            placeholder="Ingredients"
            value={form.ingredients}
            onChange={handleChange}
            required
            className="crud-form-textarea"
          />

          <textarea
            name="instructions"
            placeholder="Instructions"
            value={form.instructions}
            onChange={handleChange}
            required
            className="crud-form-textarea"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="crud-form-file"
          />

          <button type="submit" className="crud-form-submit">
            {editId ? 'Update Recipe' : 'Add Recipe'}
          </button>
        </form>

        {/* Recipes Table */}
        <div className="crud-table-container">
          <table className="crud-table">
            <thead>
              <tr className="crud-table-header">
                <th>ID</th>
                <th>Title</th>
                <th>Ingredients</th>
                <th>Instructions</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>{recipe.id}</td>
                    <td>{recipe.title}</td>
                    <td className="pre-wrap">{recipe.ingredients}</td>
                    <td className="pre-wrap">{recipe.instructions}</td>
                    <td>
                      {recipe.image ? (
                        <img
                          src={`http://localhost:5000${recipe.image}`}
                          alt={recipe.title}
                          className="crud-table-image"
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(recipe)}>✏️</button>
                      <button onClick={() => handleDelete(recipe.id)} className="crud-delete-btn">
                        ❌
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No recipes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CrudPage;
