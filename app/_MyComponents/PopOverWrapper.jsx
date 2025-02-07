import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverContent } from "@/components/ui/popover";
import Image from "next/image";
import profile from "@/public/profile.jpg";
import { addMessage } from "../_lib/server";

function PopOverWrapper({ popChange, children, options, heading, users = [],phaseId,closePopUp }) {
   const [isTaskAssigned, setIsTaskAssigned] = useState(false);
   const [selectedUsers, setSelectedUsers] = useState([]);

   // Handle task assignment checkbox
   const handleTaskCheckboxChange = () => {
      setIsTaskAssigned(!isTaskAssigned);
   };

   // Add selected user to the list
   const handleSelectUser = (userId) => {
      const user = users.find((user) => user._id === userId);
      if (user && !selectedUsers.some((u) => u._id === userId)) {
         setSelectedUsers([...selectedUsers, user]);
      }
   };
   function handleSubmit(oldformdata) {
     

      const formData = new FormData();
      const ids = selectedUsers.map((user) => user._id);
      formData.append('assignedTo', JSON.stringify(ids));
      formData.append("assignedOn", oldformdata.get('assignedOn'));
      formData.append("deadline", oldformdata.get('deadline'));
      formData.append("taskAssigned", oldformdata.get('taskAssigned'));
      formData.append("Title", oldformdata.get('Title'));
      formData.append("description", oldformdata.get('Description')||"No Description");
      addMessage(formData, phaseId)
      popChange(false)
      setIsTaskAssigned(false)
   }

  
   // Remove user from the selection
   const removeUser = (userId) => {
      setSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
   };

   // Handle form submission
  
    

   return (
      <PopoverContent className="w-[25rem]">
         <div className="grid gap-4">
            <div className="space-y-2">
               <h4 className="font-medium leading-none">{heading || "Add new card"}</h4>
            </div>

            <form className="grid gap-2" onSubmit={() => setSelectedUsers([])} action={handleSubmit}>
               {options.map((e, i) => (
                  <div key={i} className="grid grid-cols-3 items-center gap-4">
                     <Label htmlFor={e.label}>{e.label}</Label>
                     {e.inputType === "select" ? (
                        <select
                           id={e.label}
                           name={e.label}
                           className="col-span-2 h-8 border rounded px-2"
                       
                        >
                           {e.options?.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                           ))}
                        </select>
                     ) : (
                        <Input
                           type={e.inputType}
                           id={e.label}
                           name={e.label}
                           className="col-span-2 h-8"
                        />
                     )}
                  </div>
               ))}
               <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="col-span-3" htmlFor="Description">Description</Label>
                  <textarea className=" col-span-3 p-2  border-2 rounded-lg " rows={6} name="Description" id="" />
               </div>
               <div className="flex items-center gap-2 mt-4">
                  <input
                     type="checkbox"
                     id="taskAssigned"
                     name="taskAssigned"
                     checked={isTaskAssigned}
                     onChange={handleTaskCheckboxChange}
                     className="h-5 w-5 border rounded-md"
                  />
                  <Label htmlFor="taskAssigned">Does this message include any task assigned?</Label>
               </div>



               {isTaskAssigned && (
                  <div className="mt-4 flex flex-col gap-2 ">
                     <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="assignedOn">Assigned On</Label>
                        <Input
                           type="date"
                           id="assignedOn"
                           name="assignedOn"
                           className="col-span-2 h-8"
                        />
                     </div>

                     <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input
                           type="date"
                           id="deadline"
                           name="deadline"
                           className="col-span-2 h-8"
                        />
                     </div>

                     <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="assignUser">Assign To</Label>
                        <select
                           id="assignUser"
                           name="assignUser"
                           className="col-span-2 h-8 border rounded-md"
                           onChange={(e) => handleSelectUser(e.target.value)}
                        >
                           <option value="">Select User</option>
                           {users
                              .filter((user) => !selectedUsers.includes(user))
                              .map((user) => (
                                 <option key={user._id} value={user._id}>
                                    {user.name}
                                 </option>
                              ))}
                        </select>
                     </div>
                  </div>
               )}

               {/* Display selected users */}
               {selectedUsers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                     {selectedUsers.map((user) => (
                        <div key={user._id} className="flex items-center gap-2 border p-2 rounded">
                           <Image
                              src={user.profilePicture || profile}
                              alt={user.name}
                              className="rounded-full"
                              height={32}
                              width={32}
                           />
                           <span>{user.name}</span>
                           <button
                              onClick={() => removeUser(user._id)}
                              className="text-red-500 text-sm"
                           >
                              ✕
                           </button>
                        </div>
                     ))}
                  </div>
               )}

               {children}
            </form>
         </div>
      </PopoverContent>
   );
}

export default PopOverWrapper;
