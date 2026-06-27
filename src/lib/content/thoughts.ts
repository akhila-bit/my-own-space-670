export type Thought = { text: string; author?: string; slot: "morning" | "afternoon" | "evening" | "any" };

export const THOUGHTS: Thought[] = [
  { text: "The plural of anecdote is not data.", author: "Frank Kotsonis", slot: "morning" },
  { text: "All models are wrong, but some are useful.", author: "George Box", slot: "any" },
  { text: "Torture the data long enough and it will confess to anything.", author: "Ronald Coase", slot: "afternoon" },
  { text: "If you can't measure it, you can't improve it.", author: "Peter Drucker", slot: "morning" },
  { text: "Without data, you're just another person with an opinion.", author: "W. Edwards Deming", slot: "any" },
  { text: "The goal is to turn data into information, and information into insight.", author: "Carly Fiorina", slot: "afternoon" },
  { text: "In God we trust. All others must bring data.", author: "W. Edwards Deming", slot: "morning" },
  { text: "Numbers have an important story to tell. They rely on you to give them a clear voice.", author: "Stephen Few", slot: "evening" },
  { text: "Errors using inadequate data are much less than those using no data at all.", author: "Charles Babbage", slot: "evening" },
  { text: "Data is a precious thing and will last longer than the systems themselves.", author: "Tim Berners-Lee", slot: "evening" },
];
