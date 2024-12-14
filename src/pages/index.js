import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import Column from "../components/column/Column";

const INITIAL_COLUMN_ORDER = ["column-1", "column-2", "column-3"];

const INITIAL_COL_DATA = {
  "column-1": {
    id: "column-1",
    title: "В работе",
    itemsOrder: ["item-1", "item-2", "item-3"],
  },
  "column-2": {
    id: "column-2",
    title: "На проверке",
    itemsOrder: ["item-4", "item-5"],
  },
  "column-3": {
    id: "column-3",
    title: "Завершено",
    itemsOrder: ["item-6", "item-7", "item-8"],
  },
};

const ITEMS = {
  "item-1": { id: "item-1", title: "Item 1" },
  "item-2": { id: "item-2", title: "Item 2" },
  "item-3": { id: "item-3", title: "Item 3" },
  "item-4": { id: "item-4", title: "Item 4" },
  "item-5": { id: "item-5", title: "Item 5" },
  "item-6": { id: "item-6", title: "Item 6" },
  "item-7": { id: "item-7", title: "Item 7" },
  "item-8": { id: "item-8", title: "Item 8" },
};

export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {},
  };
}

export default function Home() {
  const [columnsOrder, setColumnsOrder] = useState(INITIAL_COLUMN_ORDER);
  const [data, setData] = useState(INITIAL_COL_DATA);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (type === "COLUMN") {
      const reorderedColumns = [...columnsOrder];
      const [removedItem] = reorderedColumns.splice(sourceIndex, 1);
      reorderedColumns.splice(destinationIndex, 0, removedItem);

      setColumnsOrder(reorderedColumns);
      return;
    } else {
      if (source.droppableId === destination.droppableId) {
        const source_col_id = source.droppableId;
        const new_items_id_collection = [...data[source_col_id].itemsOrder];
        const [deleted_item_id] = new_items_id_collection.splice(
          sourceIndex,
          1
        );
        new_items_id_collection.splice(destinationIndex, 0, deleted_item_id);
        const new_data = { ...data };
        new_data[source_col_id].itemsOrder = new_items_id_collection;
        setData(new_data);
      } else {
        const source_col_id = source.droppableId;
        const dest_col_id = destination.droppableId;

        const new_source_items_id_collc = [...data[source_col_id].itemsOrder];
        const new_dest_items_id_collc = [...data[dest_col_id].itemsOrder];
        const [deleted_item_id] = new_source_items_id_collc.splice(
          sourceIndex,
          1
        );

        new_dest_items_id_collc.splice(destinationIndex, 0, deleted_item_id);
        const new_data = { ...data };
        new_data[source_col_id].itemsOrder = new_source_items_id_collc;
        new_data[dest_col_id].itemsOrder = new_dest_items_id_collc;

        setData(new_data);
      }
    }
  };

  return (
    <div className="container">
      <p className="header">Канбан</p>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="COLUMN" direction="HORIZONTAL">
          {(provided) => (
            <div
              className="droppable-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnsOrder.map((colId, index) => {
                const columnData = data[colId];
                return (
                  <Draggable
                    draggableId={columnData.id}
                    key={columnData.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="column-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="column-header"
                        >
                          <p className="column-title">{columnData.title}</p>
                        </div>
                        <Column {...columnData} ITEMS={ITEMS} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
