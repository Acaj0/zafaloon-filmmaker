import { Droppable } from "react-beautiful-dnd";

<Droppable droppableId="posts">
  {(provided) => (
    <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
      {/* Conteúdo */}
      {provided.placeholder}
    </ul>
  )}
</Droppable>
