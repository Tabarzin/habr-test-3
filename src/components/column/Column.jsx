import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ itemsOrder, id, ITEMS }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          {itemsOrder.map((item_id, index) => {
            const item = ITEMS[item_id];

            return (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <p>{item.title}</p>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
