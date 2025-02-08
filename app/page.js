import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DialogForm from "./_MyComponents/DialogForm";
import MainSlide from "./_MyComponents/MainSlide";
import { MyAlert } from "./_MyComponents/MyAlert";

export default async function Home() {
  const projectDetails = await fetch(
    "https://backend-1-sg24.onrender.com/projects"
  );
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
