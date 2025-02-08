'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Eye, Logs, MessageSquare } from "lucide-react";
import { useState } from "react";
import { updatePhaseHeader } from "../_lib/server";

function SlideHeader({ data }) {
   const [title, setTitle] = useState(data?.header?.title || "This is a Header");
   const [content, setContent] = useState(data?.header?.content || "This Is a new Header");
   const [isEditingTitle, setIsEditingTitle] = useState(false);
   const [isEditingContent, setIsEditingContent] = useState(false);
   const handleTitleBlur = () => {
      setIsEditingTitle(false);
   };

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

   return (
      <Card className=" bg-blue-500 text-white">
         <div>
            <CardHeader className="py-4">
               <div className="flex gap-2">
               {data.messages.map((mes,i)=>{
                  if(mes.type==="task"&& mes.task){
                     const backgroundColor = generateColorFromString(mes.task,0)
                    return (
                    <div style={{backgroundColor}} key={i} className="h-4 w-12 rounded-full " />
                    )
                  }
               })}
               </div>
               {isEditingTitle ? (
                 <form action="">
                     <textarea
                        cols={20}
                        rows={2}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => {
                           handleTitleBlur()
                           updatePhaseHeader(data._id,title,content)
                        }}
                        autoFocus
                        className="w-full border-none outline-none bg-transparent text-lg font-semibold"
                     />
                 </form>
               ) : (
                  <CardTitle
                     onClick={() => setIsEditingTitle(true)}
                     className="cursor-pointer w-full select-none"
                  >
                     <pre className="cursor-pointer w-full select-none leading-6 whitespace-pre-wrap break-words overflow-hidden">
                        {title}
                     </pre>
                  </CardTitle>
               )}
            </CardHeader>

            <CardContent>
               {/* Editable Content */}
               {isEditingContent ? (
                  <textarea

                     rows={6}
                     type="text"
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     onBlur={() => {
                        handleContentBlur()
                        updatePhaseHeader(data._id, title, content)
                     }}
                     autoFocus
                     className="w-full   border-none  bg-transparent text-base"
                  />
               ) : (
                  <pre
                     onClick={() => setIsEditingContent(true)}
                     className="cursor-pointer w-full select-none leading-6 whitespace-pre-wrap break-words overflow-hidden"
                  >
                     {content}
                  </pre>
               )}

               {data?.todoList?.length > 0 && (
                  <div className="my-2 flex gap-2 w-20 px-1 rounded-xl bg-green-400 py-2 align-middle items-center">
                     <CheckSquare />
                     <p>{data?.todoList?.length} left</p>
                  </div>
               )}

               <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                     <Eye />
                     <Logs />
                     <MessageSquare />
                  </div>
               </div>
            </CardContent>
         </div>
      </Card>
   );
}

export default SlideHeader;
