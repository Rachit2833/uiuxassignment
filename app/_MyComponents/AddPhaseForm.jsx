'use client'
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { addNewPhase } from "../_lib/server";
import { useFormStatus } from "react-dom";

function AddPhaseForm({onClose}) {

   return (
     <DialogContent>
      <DialogTitle>Add a new Slide</DialogTitle>
         <form   action={(formData)=>{
            onClose(false)
            addNewPhase(formData)}} className="space-y-4 p-4">
            <div className="flex flex-col gap-2">
               <Label htmlFor="phase-name" className="text-lg font-semibold">
                  Slide Name
               </Label>
               <Input
                  name="phase-name"
                  id="phase-name"
                  type="text"
                  placeholder="Enter slide name..."
                  required
               />
            </div>
            <div className="flex flex-col gap-2">
               <Label htmlFor="Title" className="text-lg font-semibold">
                  Title
               </Label>
               <Input
                  className="p-2"
                  rows={5}
                  name="Title"
                  id="phase-name"
                  type="text"
                  placeholder="Title"
                  required
               />
            </div>
            <div className="flex flex-col gap-2">
               <Label htmlFor="Description" className="text-lg font-semibold">
                  Description
               </Label>
               <textarea
               className="p-2 border-2 rounded-lg"
                  rows={5}
                  name="Description"
                  id="phase-name"
                  type="text"
                  placeholder="Enter information for the phase"
                  required
               />
            </div>
            <SaveButton info="Add Slide"  />
         </form>
     </DialogContent>
   );
}

export default AddPhaseForm;
export function SaveButton({info,variant}) {
   const status = useFormStatus();
   return (
      <Button variant={variant||"default"} className="" disabled={status.pending} type="submit">
         {status.pending ? <span className="animate-spin  inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span> :<span>{info}</span>}
        </Button>
   )
}
