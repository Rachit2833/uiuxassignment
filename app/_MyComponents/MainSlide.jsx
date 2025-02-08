'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { List, Plus } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import DeleteForm from "./DelteForm";
import InformationSlide from "./InformationSlide";
import PopOverWrapper from "./PopOverWrapper";
import SlideHeader from "./SlideHeader";
import ToDoListForm from "./ToDoListForm";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DNDWrapper from "./DNDWrapper";




const ModelOptionsSub = [
   { label: "Title", inputType: "text" },
   { label: "Status", inputType: "select", options: ["Open", "In Progress", "Completed"] },
];
function MainSlide({data,users}) {
   const [isPopUpOpen, setIsPopUpOpen]=useState(false)
   const colors =[]
    data.messages.forEach((e,i)=>{
     if(e.type==="task"){
       colors.push(e.task)
     }
   })


   return (

      <Card className="min-w-[30rem]  max-h-fit ">
         <CardHeader className="  ">
            <CardTitle className="flex justify-between align-middle ">
              {data.name}
               <div className="flex gap-4">
                  <Popover>
                     <PopoverTrigger>
                        <List />
                     </PopoverTrigger>
                     <ToDoListForm tasks={data.todoList} phaseId={data._id} />
                  </Popover>
                  <DeleteForm data={data} />
               </div>
            </CardTitle>
            <CardTitle></CardTitle>
         </CardHeader>
         <DNDWrapper data={data} />
         <CardFooter className="flex justify-between">
            <div className="flex justify-center align-middle items-center">
               <Popover open={isPopUpOpen} onOpenChange={setIsPopUpOpen}>
                  <PopoverTrigger onClick={() => setIsPopUpOpen(!isPopUpOpen)}  className=" bg-slate-100 flex justify-center  items-center rounded-full h-12 w-12" variant="outline">
                     <Plus />
                  </PopoverTrigger>
                  <PopOverWrapper
                     popChange={setIsPopUpOpen} // ✅ Passing function properly
                     phaseId={data._id}
                     users={users}
                     options={ModelOptionsSub}
                  >
                    <SaveButton />
                  </PopOverWrapper>
              </Popover>
               <h3 className="  mx-2  tracking-wider">Add a card</h3>
            </div>
         </CardFooter>
      </Card>
   )
}

export default MainSlide
export function SaveButton() {
   const status = useFormStatus();
   console.log(status,"status");
   return (
      <Button className="" disabled={status.pending} type="submit">
         {status.pending ? <span className="animate-spin  inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span> :<span>Save</span>}
         {/* <span> Save</span> */}
        </Button>
   )
}



