import React from "react";
import { Modal } from "../Modal";
import { useAsyncCallback } from "react-async-hook";
import { deleteCategory } from "../../api/category";
import { usePokemonDB } from "../../sections/PokemonLoader";
import "./DeleteCategory.css";

function DeleteCategory(props) {
  const { category } = props;
  const deleteCategoryOp = useAsyncCallback(() => deleteCategory(category));
  const { refetch } = usePokemonDB();
  function handleDelete() {
    deleteCategoryOp.execute().then(refetch);
  }
  return (
    <Modal closeModal={props.closeModal}>
      <div className="delete-modal">
        <div>{props.children}</div>
        <div className="delete-wrapper">
          <button
            onClick={handleDelete}
            disabled={deleteCategoryOp.loading}
            className="delete-action"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteCategory;
