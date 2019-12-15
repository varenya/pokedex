import React, { useState, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { produceWithPatches, applyPatches } from "immer";
import DeleteCategory from "../components/DeleteCategory";
import useLocalStorage from "../hooks/useLocalStorage";
import { PokemonItem, PokemonList } from "../components/Pokemon";
import "./DraggablePokemonView.css";

const reorder = produceWithPatches((draft, startIndex, endIndex) => {
  const [removed] = draft.splice(startIndex, 1);
  draft.splice(endIndex, 0, removed);
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "#fbd38d" : "#fff",
  ...draggableStyle
});

function DraggablePokemonViewer(props) {
  const { pokemons, category } = props;
  const [currentOrder, setOrder] = useState(pokemons);
  const [showDeleteForm, setDeleteForm] = useState(false);

  function toggleDeleteForm() {
    setDeleteForm(state => !state);
  }

  const [lastOperation, setLastOperation] = useLocalStorage(
    "lastOperation",
    []
  );
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const [newOrder, _, inversePatches] = reorder(
      currentOrder,
      result.source.index,
      result.destination.index
    );
    setLastOperation(inversePatches || []);
    setOrder(newOrder);
  }

  function undoOrder() {
    if (!lastOperation) {
      return;
    }
    const lastOrder = applyPatches(currentOrder, lastOperation);
    setLastOperation([]);
    setOrder(lastOrder);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="category-actions">
          <button onClick={toggleDeleteForm} className="delete">
            Delete Category
          </button>
          <button
            disabled={lastOperation.length === 0}
            onClick={undoOrder}
            className="undo"
          >
            Undo Reorder
          </button>
        </div>
        <Droppable droppableId="droppable">
          {provided => {
            return (
              <PokemonList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {currentOrder.map((pokemon, index) => (
                  <Fragment key={index}>
                    <Draggable
                      key={pokemon.id}
                      draggableId={pokemon.name}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <PokemonItem
                          innerRef={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          {...pokemon}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        ></PokemonItem>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </Fragment>
                ))}
              </PokemonList>
            );
          }}
        </Droppable>
        {showDeleteForm ? (
          <DeleteCategory
            category={category}
            closeModal={() => setDeleteForm(false)}
          >
            Are you sure you want to delete{" "}
            <span style={{ color: "red" }}>{pokemons.length}</span> pokemons in
            the category?
          </DeleteCategory>
        ) : null}
      </div>
    </DragDropContext>
  );
}

export { DraggablePokemonViewer };
