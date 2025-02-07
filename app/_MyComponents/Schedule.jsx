"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addDays, format, startOfWeek, parseISO, differenceInDays, isBefore, isAfter } from "date-fns";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover } from "@/components/ui/popover";
import TimeLineInfo from "./TimeLineInfo";
import Image from "next/image";

const generateColorFromString = (str, index) => {
   let hash = 0;
   for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
   }
   return `hsl(${(Math.abs(hash) + index * 50) % 360}, 60%, 70%)`;
};

function Schedule({ data, users }) {
   const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

   const handlePrevWeek = () => setCurrentWeekStart(prev => addDays(prev, -7));
   const handleNextWeek = () => setCurrentWeekStart(prev => addDays(prev, 7));

   return (
      <Card className="m-6 p-4 relative shadow-lg h-screen flex flex-col">
         <CardHeader className="sticky top-0 bg-white z-10 shadow-md p-4">
            <div className="flex flex-wrap justify-between items-center">
               <Button onClick={handlePrevWeek} className="w-full sm:w-auto">&larr; Previous Week</Button>
               <h2 className="text-lg sm:text-xl font-bold text-center w-full sm:w-auto">
                  Week of {format(currentWeekStart, "MMMM d, yyyy")} - {format(addDays(currentWeekStart, 6), "MMMM d, yyyy")}
               </h2>
               <Button onClick={handleNextWeek} className="w-full sm:w-auto">Next Week &rarr;</Button>
            </div>
         </CardHeader>

         <CardContent className="flex-1 overflow-auto">
            <div className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-[1000px] grid grid-cols-8 text-center bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
               <div className="border-r border-b p-2 font-bold bg-gray-200 h-8 text-xs sm:text-sm md:text-base">
                  Users
               </div>
               {[...Array(7)].map((_, i) => {
                  const day = addDays(currentWeekStart, i);
                  return (
                     <div key={i} className="border-r text-right border-b p-2 font-bold bg-gray-200 h-8 text-xs sm:text-sm md:text-base">
                        {format(day, "EEE, MMM d")}
                     </div>
                  );
               })}

               {users.map((user, index) => {
                  const newUserTasks = data.filter(t => t.assignedTo.includes(user._id));
                  const taskCount = newUserTasks.length;

                  return (
                     <>
                        <div
                           key={index}
                           className="border-r border-b p-2 font-semibold bg-gray-50 text-xs sm:text-sm md:text-base"
                           style={{ minHeight: `${Math.max(taskCount * 2.5, 8)}rem` }}
                        >
                           <div className="my-6">
                              <Image alt="User" width={48} height={48} className="mx-auto rounded-full" src={user.profilePicture} />
                              <p>{user.name}</p>
                           </div>
                        </div>

                        <div
                           className="relative grid grid-cols-7 gap-1 border-2 col-span-7"
                           style={{ alignItems: "start", minHeight: "4rem" }} // Ensuring tasks align properly
                        >
                           {newUserTasks.map((t, index) => {
                              const taskStart = parseISO(t.startDate);
                              const taskEnd = parseISO(t.endDate);
                              const weekEnd = addDays(currentWeekStart, 6);

                              if (isAfter(taskStart, weekEnd) || isBefore(taskEnd, currentWeekStart)) {
                                 return null;
                              }

                              const adjustedStart = isBefore(taskStart, currentWeekStart) ? currentWeekStart : taskStart;
                              const adjustedEnd = isAfter(taskEnd, weekEnd) ? weekEnd : taskEnd;
                              const colStart = differenceInDays(adjustedStart, currentWeekStart) + 1;
                              const colSpan = differenceInDays(adjustedEnd, adjustedStart) + 1;
                              const taskColor = generateColorFromString(t._id, 0);

                              return (
                                 <Popover key={t.id}>
                                    <PopoverTrigger
                                       className={`${t.status ? "bg-green-400" : ""} text-white text-[0.5rem] text-xs sm:text-sm md:text-base p-1 rounded-lg text-center shadow-md flex items-center justify-center`}
                                       style={{
                                          gridColumnStart: colStart,
                                          gridColumnEnd: `span ${colSpan}`,
                                          minHeight: "2rem", // Minimum height
                                          backgroundColor: taskColor,
                                       }}
                                    >
                                       {t.title}
                                    </PopoverTrigger>
                                    <TimeLineInfo task={t} />
                                 </Popover>
                              );
                           })}
                        </div>

                     </>
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
}

export default Schedule;