import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Ellipsis, MessageCircle, Plus } from "lucide-react";
import Image from "next/image";
import InformationSlide from "./_MyComponents/InformationSlide";
import { Button } from "@/components/ui/button";
import MainSlide from "./_MyComponents/MainSlide";
import { project } from "./_lib/project";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog } from "@/components/ui/dialog";
import DialogOpener from "./_MyComponents/DialogOpener";
import AddPhaseForm from "./_MyComponents/AddPhaseForm";
import DialogForm from "./_MyComponents/DialogForm";
import { MyAlert } from "./_MyComponents/MyAlert";

export default async function Home() {
  const projectDetails = await fetch("http://localhost:2833/projects")
  const data = await projectDetails.json()
  const userData = data[0].peopleWorkingOn;

  return (
    <Card className="relative h-screen overflow-auto ">
      <MyAlert  />
      <CardHeader>
        <CardContent className="h-full min-h-screen overflow-auto w-screen  flex gap-4 p-4  bg-blue-300">
          {data[0].phases.map((e, i) => (
            <MainSlide data={e} key={i} users={userData} />
          ))}
        </CardContent>
      </CardHeader>
       <DialogForm />
    </Card>
  );
}
