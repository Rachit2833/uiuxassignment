const messages = [
  {
    _id: "603d2f9e9b1e8b3c09d6c892",
    content:
      "Complete research on deep learning techniques for image recognition.",
    type: "task",
    assignedTo: ["64a1f2d3e8b45c7a9f123456"],
    createdAt: "2025-02-04T12:34:56.000Z",
  },
  {
    _id: "603d2f9e9b1e8b3c09d6c893",
    content:
      "Prepare a report on market research for potential AI use cases in healthcare.",
    type: "information",
    assignedTo: ["64a1f2d3e8b45c7a9f123457"],
    createdAt: "2025-02-04T13:10:00.000Z",
  },
  {
    _id: "603d2fd89b1e8b3c09d6c895",
    content:
      "Start development of a prototype for the image recognition system.",
    type: "task",
    assignedTo: ["64a1f2d3e8b45c7a9f123458"],
    createdAt: "2025-02-04T14:45:21.000Z",
  },
  {
    _id: "603d2fd89b1e8b3c09d6c896",
    content: "Conduct internal testing on the prototype and refine the model.",
    type: "task",
    assignedTo: ["64a1f2d3e8b45c7a9f123459",'64a1f2d3e8b45c7a9f123460'],
    createdAt: "2025-02-04T15:00:42.000Z",
  },
];

const phases = [
  {
    _id: "603d2f9e9b1e8b3c09d6c891",
    name: "Genearl Information",
    messages: messages,
  },
  {
    _id: "603d2fd89b1e8b3c09d6c894",
    name: "Backlogs",
    messages: messages,
  },
  {
    _id: "603d2fd89b1e8b3c09d6c895",
    name: "In-Progress",
    messages: messages,
  },
  {
    _id: "603d2fd89b1e8b3c09d6c896",
    name: "Paused",
    messages: messages,
  },
  {
    _id: "603d2fd89b1e8b3c09d6c897",
    name: "Ready For Launch",
    messages: messages,
  },
];

export const project = {
  _id: "603d2f1f9b1e8b3c09d6c890",
  title: "Innovative AI Solutions",
  description:
    "Develop cutting-edge AI algorithms for various applications in industries like healthcare, finance, and retail.",
  peopleWorkingOn: ["64a1f2d3e8b45c7a9f123458", "64a1f2d3e8b45c7a9f123457"],
  phases: phases,
};
