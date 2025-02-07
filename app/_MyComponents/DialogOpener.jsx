'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import profile from "@/public/profile.jpg"
import { DialogContent, DialogTitle } from "@/components/ui/dialog";

function DialogOpener({ children, options, heading, users = [] }) {
   const [selectedUsers, setSelectedUsers] = useState([]);

   const handleUserSelect = (event) => {
      const selectedUserId = event.target.value;
      const user = users.find((u) => u.id === selectedUserId);
      if (user && !selectedUsers.some((u) => u.id === selectedUserId)) {
         setSelectedUsers([...selectedUsers, user]);
      }
   };

   const removeUser = (userId) => {
      setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
   };

   return (
      <DialogContent className="w-[25rem]">
         <div className="grid gap-4">
            <div className="space-y-2">
               <DialogTitle className="font-medium leading-none">{heading || "Add new card"}</DialogTitle>
            </div>
            <div className="grid gap-2">
               {options.map((e, i) => (
                  <div key={i} className="grid grid-cols-3 items-center gap-4">
                     <Label htmlFor={e.label}>{e.label}</Label>
                     {e.inputType === "select" ? (
                        <select id={e.label} className="col-span-2 h-8 border rounded px-2">
                           {e.options?.map((option, index) => (
                              <option key={index} value={option}>{option}</option>
                           ))}
                        </select>
                     ) : (
                        <Input type={e.inputType} id={e.label} className="col-span-2 h-8" />
                     )}
                  </div>
               ))}

               {/* User Selection */}
               <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="assignUser">Assign To</Label>
                  <select
                     id="assignUser"
                     className="col-span-2 h-8 border rounded px-2"
                     onChange={handleUserSelect}
                  >
                     <option value="">Select User</option>
                     {users.map((user) => (
                        <option key={user.id} value={user.id}>
                           {user.name}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Selected Users */}
               {selectedUsers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                     {selectedUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-2 border p-2 rounded">
                           <Image
                              src={profile}
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                           />
                           <span>{user.name}</span>
                           <button
                              onClick={() => removeUser(user.id)}
                              className="text-red-500 text-sm"
                           >
                              ✕
                           </button>
                        </div>
                     ))}
                  </div>
               )}
            </div>
            {children}
         </div>
      </DialogContent>
   );
}

export default DialogOpener;
