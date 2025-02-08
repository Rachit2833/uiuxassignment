import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deletePhase } from "../_lib/server";
import { useFormStatus } from "react-dom";

export default function DeleteForm({data}) {
   const [open, setOpen] = useState(false);
   const phaseId = data._id
   const messageArray =[]
   const taskArray =[]
   data.messages.forEach((m,i)=>{
     messageArray.push(m._id)
     if(m.type==="task"&& m.task){
      taskArray.push(m.task)
     }
   })
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <Button variant="destructive" className="bg-black" onClick={() => setOpen(true)}>
            <Trash2 className=" h-5 w-5" /> 
         </Button>

         <DialogContent>
            <DialogTitle className="flex items-center gap-2">
               <Trash2 className="h-5 w-5" />
               Are you sure about this?
            </DialogTitle>
            <DialogDescription>
               This action cannot be undone, you will lose your data.
            </DialogDescription>
            <DialogFooter>
               <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
               </Button>
               <form action={() => deletePhase(phaseId,messageArray,taskArray)}>
                 <DeleteButton />
              </form>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
function DeleteButton() {
const status = useFormStatus()
   return (
      <Button variant="destructive" className="" disabled={status.pending} type="submit">
         {status.pending ? <span className="animate-spin  inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span> : <span>Continue</span>}
      </Button>
   )
}
