'use client'
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import AddPhaseForm from "./AddPhaseForm"
import { useState } from "react"

function DialogForm() {
   const [dialogOpen,setDialogOpen]=useState(false)
   return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
         <DialogTrigger onClick={()=>setDialogOpen(!dialogOpen)} className="fixed bottom-24 right-8 z-40">
            <span className="bg-black text-white p-2 rounded-lg">
               Add New
            </span>
         </DialogTrigger>

         <AddPhaseForm onClose={setDialogOpen} />


      </Dialog>
   )
}

export default DialogForm
