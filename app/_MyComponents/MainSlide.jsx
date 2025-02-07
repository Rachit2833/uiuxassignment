'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Ellipsis, List, MessageCircle, Plus, Trash2 } from "lucide-react";
import InformationSlide from "./InformationSlide";
import { Button } from "@/components/ui/button";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import PopOverMainContent from "./PopOverMainContent.jsx";
import PopOverWrapper from "./PopOverWrapper";
import { useState } from "react";
import ToDoListForm from "./ToDoListForm";
import SlideHeader from "./SlideHeader";
import { MyDropDownMenu } from "./MyDropDownMenu";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import DeleteForm from "./DelteForm";




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
   console.log(colors,"color");


   return (
      <Card className="min-w-[25rem] max-h-fit ">
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
         <CardContent className=" flex flex-col gap-2">
             <SlideHeader data={data} />
             {data.messages.map((e,i)=><InformationSlide phaseId={data._id} data={e} key={i}  />)}
         </CardContent>
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
                     <Button type="submit">Save</Button>
                  </PopOverWrapper>
              </Popover>
               <h3 className="  mx-2  tracking-wider">Add a card</h3>
            </div>
         </CardFooter>
      </Card>
   )
}

export default MainSlide
