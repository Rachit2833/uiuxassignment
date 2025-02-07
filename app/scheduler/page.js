import Schedule from "../_MyComponents/Schedule"





async function page() {
   const projectDetails = await fetch("http://localhost:2833/projects");
   const projectdata = await projectDetails.json();
   const taskDetails = await fetch("http://localhost:2833/tasks")
   const data = await taskDetails.json()

   return (
     <>
<Schedule data={data.data} users={projectdata[0].peopleWorkingOn} />
      </>
   )
}

export default page
