import { BASE_URI } from "../constants/API";
import { fetchData } from "./fetchHelper";

function getCategories() {
  return fetchData(`${BASE_URI}/categories/`);
}

function createCategory(categoryName, pokemons = []) {
  return fetchData(`${BASE_URI}/categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ category: categoryName, pokemons })
  });
}
function updateCategory(categoryId, pokemons = []) {
  return fetchData(`${BASE_URI}/categories/${categoryId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pokemons })
  });
}

function deleteCategory(id) {
  return fetch(`${BASE_URI}/categories/${id}/`, {
    method: "DELETE"
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.text();
  });
}

export { getCategories, createCategory, deleteCategory, updateCategory };
