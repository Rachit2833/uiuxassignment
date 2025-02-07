import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import { useState } from "react";
import { addTodoList, deleteToDoItem } from "../_lib/server";
import { useFormStatus } from "react-dom";

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
            <SaveButton info="Add" />
         </form>
         <ul className="mt-4">
            {tasks.map((item, index) => (
               <li key={index} className="flex justify-between p-2 border-b">
                  {item.title}
                 <form action={()=>deleteToDoItem(phaseId,item._id)}>
                     <SaveButton info="Delete" variant="destructive" />
                 </form>
               </li>
            ))}
         </ul>
      </PopoverContent>
   );
}

export default ToDoListForm;
export function SaveButton({info,variant}) {
   const status = useFormStatus();
   console.log(status,"status");
   return (
      <Button variant={variant||"default"} className="" disabled={status.pending} type="submit">
         {status.pending ? <span className="animate-spin  inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span> :<span>{info}</span>}
         {/* <span> Save</span> */}
        </Button>
   )
}





