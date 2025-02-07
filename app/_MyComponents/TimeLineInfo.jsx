import { Checkbox } from "@/components/ui/checkbox";
import { PopoverContent } from "@/components/ui/popover";
import { useState } from "react";

function TimeLineInfo({ task,  }) {
   const [isEditing, setIsEditing] = useState(false);
   const [text, setText] = useState("This is Editable");

   const toggleEdit = () => {
      setIsEditing(!isEditing);
   };

   const handleTextChange = (e) => {
      setText(e.target.value);
   };


   return (
      <PopoverContent className="w-80">
         <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex justify-between ">
                  <h4 className="font-medium leading-none">{task.title}</h4>

                     <h4 className="font-medium w-24 leading-none">{task.startDate.split("T")[0] === task.endDate.split("T")[0] ? task.startDate.split("T")[0] : `${task.startDate.split("T")[0]} - ${task.endDate.split("T")[0]}`}</h4>

              </div> 
            </div>
            {isEditing ? (
               <input
                  type="text"
                  value={text}
                  onChange={handleTextChange}
                  onBlur={toggleEdit} // Turn off editing when focus is lost
                  className="text-sm border-b-2 border-gray-300 focus:outline-none"
                  autoFocus
               />
            ) : (
               <p
                  className="text-sm text-muted-foreground"
                  onClick={toggleEdit}
                  style={{ cursor: 'pointer' }}
               >
                  {text}
               </p>
            )}
         </div>
      </PopoverContent>
   );
}

export default TimeLineInfo;
