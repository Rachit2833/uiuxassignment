import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
import { addTodoList, deleteToDoItem } from "../_lib/server";

function ToDoListForm({phaseId,tasks  }) {
  

   
   return (
      <PopoverContent className="w-[20rem]">

         <h2 className="text-lg font-bold mb-2">Add a To-Do list for the phase</h2>
         <form  action={(formData)=>{
            addTodoList(formData,phaseId)
         }} className="flex gap-2">
            <Input
               name="Task"
               type="text"
               placeholder="Enter a task..."
               className="border p-2 flex-grow rounded-md"
            />
            <Button
               type="submit"
               className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
               Add
            </Button>
         </form>
         <ul className="mt-4">
            {tasks.map((item, index) => (
               <li key={index} className="flex justify-between p-2 border-b">
                  {item.title}
                 <form action={()=>deleteToDoItem(phaseId,item._id)}>
                     <button
                        className="text-red-500 hover:text-red-700"
                     >
                        Delete
                     </button>
                 </form>
               </li>
            ))}
         </ul>
      </PopoverContent>
   );
}

export default ToDoListForm;
