'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { useState, useEffect } from "react"

export function MyAlert() {
   const [checkBoxOpen, setCheckBoxOpen] = useState(false)
   const [isChecked, setIsChecked] = useState(false)
   const [isOpen, setIsOpen] = useState(false)

   useEffect(() => {
      const alertStatus = localStorage.getItem("Alert")
      if (alertStatus !== "false") {
         setIsOpen(true)
      }
   }, [])

   function handleCheckboxChange() {
      setIsChecked((prevChecked) => !prevChecked)
   }

   function handleBannerCross() {
      setIsOpen(false)
      if (isChecked) {
         localStorage.setItem("Alert", "false")
      }
   }

   return (
      isOpen ? (
         <Card className="z-40  md:w-[50%] w-[80%] mx-auto   fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center items-center">
               <div className="text-center flex flex-col gap-4 p-2 relative">
                  <Button onClick={handleBannerCross} className="w-8 h-8 border-black absolute right-4 text-black" variant="outline">
                     <X />
                  </Button>
                  <CardHeader>
                     <CardTitle className="lg:text-[2rem] text-[1rem]">Notification 🔔</CardTitle>
                     <CardDescription className=" text-[0.75rem]">
                        Some Information and Requests before you continue
                     </CardDescription>
                  </CardHeader>
                  <CardContent className=" text-[1rem] flex flex-col gap-4">
                     <p>In This Project each Message Cards have some Information about this project so it will be really wonderful if you read those cards as you go on</p>
                     <div className="flex gap-4 items-center my-4 justify-center space-x-2">
                        <input
                        type="checkbox"
                           className="h-8 w-8 "
                           id="terms"
                           checked={isChecked}
                           onChange={handleCheckboxChange}
                        />
                        <label
                           htmlFor="terms"
                           className=" text-[0.75rem] tracking-wider font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                           Don't Show Again
                        </label>
                     </div>
                  </CardContent>
               </div>
            </div>
         </Card>
      ) : null
   )
}
