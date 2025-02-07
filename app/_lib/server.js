"use server";

import { revalidatePath } from "next/cache";

function formDataToObject(formData) {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

export async function addMessage(formData, phaseId) {
  try {
    const assignedTo = JSON.parse(formData.get("assignedTo"));
    const formDataObject = formDataToObject(formData); // Convert FormData to plain object

    console.log(formDataObject, phaseId);

    const response = await fetch("https://backend-1-sg24.onrender.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the content type is set to JSON
      },
      body: JSON.stringify({
        ...formDataObject, // Spread the plain object into the body
        phaseId,
        assignedTo,
      }),
    });

    const data = await response.json();
    console.log(data);
    revalidatePath("/"); 
  } catch (error) {
    console.error(error);
  }
}
export async function addTodoList(formData, phaseId) {
 try {
   const task = formData.get("Task");
   console.log(task); // Should log the task value from formData

   const res = await fetch(`https://backend-1-sg24.onrender.com/phases/${phaseId}/todos`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json", // Ensure JSON is properly parsed
     },
     body: JSON.stringify({
       task, // The task value from formData
       status: "pending",
     }),
   })
   const data = await res.json();
   revalidatePath('/')
 } catch (error) {
  console.error(error);
 }

}

export async function deleteToDoItem(phaseId,id) {
  try {
    const res = await fetch(
      `https://backend-1-sg24.onrender.com/phases/${phaseId}/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Ensure JSON is properly parsed
        },
      }
    );
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
export async function addNewPhase(formData){
   try {
     const name = formData.get("phase-name");
     const title= formData.get("Title")
     const description = formData.get("Description");

     console.log(name); // Should log the task value from formData

     const res = await fetch(`https://backend-1-sg24.onrender.com/phases`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json", // Ensure JSON is properly parsed
       },
       body: JSON.stringify({
         name,
         projectId:"67a21b3fe5641051708d42e0",
         title,
         description
       }),
     });
     const data = await res.json();
     revalidatePath("/");
   } catch (error) {
     console.error(error);
   }
}
export async function deleteMessage(phaseId,messageId,taskId) {
    try {
      console.log(messageId,phaseId,taskId);
       const data = await fetch("https://backend-1-sg24.onrender.com/message", {
         method: "DELETE",
         body: JSON.stringify({
           messageId,
           phaseId,
           taskId,
         }),
         headers: {
           "Content-Type": "application/json",
         },
       });
        revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
   
}
export async function updatePhaseHeader(phaseId,title,content){
  try {
    console.log(phaseId, title, content);
     const data = await fetch("https://backend-1-sg24.onrender.com/phase/header",{
      method:"POST",
      body:JSON.stringify({
        title,
        content,
        phaseId
      }),
      headers: {
           "Content-Type": "application/json",
         },
     });
  } catch (error) {
    
  }
}
export async function updateMessage(phaseId, title, description) {
  try {
    console.log(phaseId,title,description);
    const data = await fetch("https://backend-1-sg24.onrender.com/message", {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
        phaseId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
export async function deletePhase(phaseId,messArray,taskArray) {
  try {
    console.log(phaseId,messArray,taskArray,"vgvjv");
    const data = await fetch("https://backend-1-sg24.onrender.com/phase", {
      method: "DELETE",
      body: JSON.stringify({
        phaseId,
        messageArray: messArray,
        taskArray,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidatePath("/");
  } catch (error) {
     console.error(error);
  }
}
