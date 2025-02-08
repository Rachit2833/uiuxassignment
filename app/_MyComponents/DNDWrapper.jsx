import { useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SlideHeader from "./SlideHeader";
import InformationSlide from "./InformationSlide";
import { CardContent } from "@/components/ui/card";

function DNDWrapper({ data }) {
   const [items, setItems] = useState(data.messages.map((msg) => msg._id));

   const handleDragEnd = (event) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((id) => id === active.id);
      const newIndex = items.findIndex((id) => id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
   };

   return (
    <CardContent>
         <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
               <div className="flex flex-col gap-2">
                  <SlideHeader data={data} />
                  {items.map((id) => {
                     const itemData = data.messages.find((msg) => msg._id === id);
                     return <InformationSlide key={id} id={id} phaseId={data._id} data={itemData} />;
                  })}
               </div>
            </SortableContext>
         </DndContext>
    </CardContent>
   );
}

export default DNDWrapper;
