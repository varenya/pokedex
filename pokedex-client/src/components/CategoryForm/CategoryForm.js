import React, { useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { usePokemonDB } from "../../sections/PokemonLoader";
import { createCategory, updateCategory } from "../../api/category";
import { Modal } from "../Modal";
import "./CategoryForm.css";

function capitalize(category) {
  return category[0].toUpperCase() + category.slice(1);
}

function CategoryForm(props) {
  const [currentStrategy, setStrategy] = useState("UPDATE");
  const [category, setCategory] = useState("category");
  const [first = {}] = props.categories;
  const { id = "" } = first;
  const [selectExistingCategory, setExisitingCategory] = useState(id);
  const { refetch } = usePokemonDB();
  const handleCreateCategory = useAsyncCallback(() =>
    createCategory(category, props.pokemons)
  );

  const handleUpdateCategory = useAsyncCallback(() =>
    updateCategory(selectExistingCategory, props.pokemons)
  );
  function handleSave() {
    if (currentStrategy === "NEW") {
      handleCreateCategory.execute().then(refetch);
    } else if (currentStrategy === "UPDATE") {
      handleUpdateCategory.execute().then(refetch);
    }
  }
  return (
    <Modal closeModal={props.closeModal}>
      <div className="select-category-wrapper">
        <div className="dot-wrapper">
          <button onClick={() => setStrategy("UPDATE")}>
            <div
              className={`dot ${
                currentStrategy === "UPDATE" ? "selected" : ""
              }`}
            ></div>
          </button>
        </div>
        <div className="select-category-form">
          <label htmlFor="select-category">Select an existing category</label>
          <select
            id="select-category"
            className="select-category"
            type="select"
            onChange={event => setExisitingCategory(event.target.value)}
          >
            {props.categories.map(({ id, category }) => (
              <option key={category} value={id}>
                {capitalize(category)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="new-category-wrapper">
        <div className="dot-wrapper">
          <button onClick={() => setStrategy("NEW")}>
            <div
              className={`dot ${currentStrategy === "NEW" ? "selected" : ""}`}
            ></div>
          </button>
        </div>
        <div className="new-category-form">
          <label htmlFor="new-category">Or create a new category</label>
          <input
            id="new-category"
            type="text"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />
        </div>
      </div>
      <div className="save-wrapper">
        <button
          className="save"
          onClick={handleSave}
          disabled={handleCreateCategory.loading}
        >
          {handleCreateCategory.loading ? "..." : "Save"}
        </button>
      </div>
    </Modal>
  );
}

export { CategoryForm };
