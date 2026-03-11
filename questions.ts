export type Question = {
  id: string;
  text: string;
};

const questions: Question[] = [
  {
    id: "note-1",
    text: "Remember to review k-NN decision boundaries before the next Machine Learning lecture.",
  },
  {
    id: "note-2",
    text: "Double-check if feature normalization is expected in the Pattern Recognition assignment report.",
  },
  {
    id: "note-3",
    text: "Ask the TA whether pairs are allowed for the first Cryptography project.",
  },
  {
    id: "note-4",
    text: "Prepare one concise question about discount factor choices for the RL project.",
  },
];

export function getLatestQuestions(): Question[] {
  return [...questions];
}
