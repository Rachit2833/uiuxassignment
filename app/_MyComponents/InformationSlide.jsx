"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { deleteMessage, updateMessage } from "../_lib/server";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useSortable } from "@dnd-kit/sortable";
import {CSS}from "@dnd-kit/utilities"
function InformationSlide({id, data, phaseId }) {
   const [title, setTitle] = useState(data.content);
   const [content, setContent] = useState(data.description || "No Description"); // Added a state for content
   const [isEditing, setIsEditing] = useState(false);
   const [isEditingContent, setIsEditingContent] = useState(false);

   const handleTitleBlur = () => {
      setIsEditing(false);
   };
   const  {attributes,listeners,setNodeRef,transform,transition}=useSortable({id})
   const style={
      transition,
      transform:CSS.Transform.toString(transform)
   }

   const handleContentBlur = () => {
      setIsEditingContent(false);
   };

   const generateColorFromString = (str, index) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      // Introduce index variation to spread out colors
      return `hsl(${(Math.abs(hash) + index * 50) % 360}, 80%, 80%)`;
   };

   // Generate color based on data content
   const backgroundColor = data.task ? generateColorFromString(data.task || "default", 0) : "white";

   return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style} >
      <Card >
         <div className="rounded-lg" style={{ backgroundColor }}>
            <CardHeader className="py-4">
               {isEditing ? (
                  <form onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }}>
                     <textarea
                        cols={20}
                        rows={10}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={()=>{
                           handleTitleBlur()
                           updateMessage(data._id,title,content)
                        }}
                        autoFocus
                        className="w-full border-none outline-none bg-transparent text-lg font-semibold"
                     />
                  </form>
               ) : (
                  <CardTitle
                     onClick={() => setIsEditing(true)}
                     className="cursor-pointer select-none"
                  >
                     {title || "This Is a New Header"}
                  </CardTitle>
               )}
            </CardHeader>
            <CardContent>
               {isEditingContent ? (
                  <textarea
                     rows={6}
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     onBlur={() => {
                        handleContentBlur()
                        updateMessage(data._id, title, content)
                     }}
                     autoFocus
                     className="w-full p-2 border-none bg-transparent text-base"
                  />
               ) : (
                  <pre
                     onClick={() => setIsEditingContent(true)}
                     className="cursor-pointer w-full select-none leading-6 whitespace-pre-wrap break-words overflow-hidden"
                  >
                     {content}
                  </pre>
               )}

               <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                     <form onSubmit={(e) => { e.preventDefault(); deleteMessage(phaseId, data?._id, data?.task); }}>
                        <DeleteButton />
                     </form>
                  </div>
                  {data.type === "task" && (
                     <div className="flex items-center">
                        {data.assignedTo.map((user, i) => (
                           <Image
                              key={i}
                              width={36}
                              height={36}
                              className="w-12 h-12 rounded-full border-2 border-white -ml-4 first:ml-0"
                              src={user.profilePicture}
                              alt="profile picture of a user"
                           />
                        ))}
                     </div>
                  )}
               </div>
            </CardContent>
         </div>
      </Card>
      </div>
   );
}

export default InformationSlide;
function DeleteButton() {
const status = useFormStatus()
   return (
      <Button className="" disabled={status.pending} type="submit">
         {status.pending ? <span className="animate-spin  inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span> : <Trash2 />}
         {/* <span> Save</span> */}
      </Button>
   )
}



