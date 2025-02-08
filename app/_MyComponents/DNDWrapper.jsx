"use client";
import { useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import InformationSlide from "./InformationSlide";
import SlideHeader from "./SlideHeader";

function DNDWrapper({ data, setData }) {
   const [items, setItems] = useState(data.messages || []);

   // Sync local state when data.messages changes
   useEffect(() => {
      setItems(data.messages || []);
   }, [data.messages]);

   const handleDragEnd = (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((msg) => msg._id === active.id);
      const newIndex = items.findIndex((msg) => msg._id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
   };

   return (
      <CardContent>
         <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((msg) => msg._id)} strategy={verticalListSortingStrategy}>
               <div className="flex flex-col gap-2">
                  <SlideHeader data={data} />
                  {items.map((itemData) => (
                     <InformationSlide key={itemData._id} id={itemData._id} phaseId={data._id} data={itemData} />
                  ))}
               </div>
            </SortableContext>
         </DndContext>
      </CardContent>
   );
}

export default DNDWrapper;
