import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Ellipsis } from "lucide-react"
import ToDoListForm from "./ToDoListForm"

export function MyDropDownMenu({data}) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline"><Ellipsis /></Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Manage Phase</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
               Delete
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
