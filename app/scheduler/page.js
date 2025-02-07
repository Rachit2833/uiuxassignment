import Schedule from "../_MyComponents/Schedule"





async function page() {
   const projectDetails = await fetch(
     "https://backend-1-sg24.onrender.com/projects"
   );
   const projectdata = await projectDetails.json();
   const taskDetails = await fetch("https://backend-1-sg24.onrender.com/tasks");
   const data = await taskDetails.json()

   return (
     <>
<Schedule data={data.data} users={projectdata[0].peopleWorkingOn} />
      </>
   )
}

export default page
