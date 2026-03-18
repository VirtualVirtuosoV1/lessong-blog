export type Question = {
  id: string;
  text: string;
};

const questions: Question[] = [
  {
    id: "note-1",
    text: "Check on creating your own vpn.",
  },
  {
    id: "note-1-2",
    text: "If it were possible for other users to publish posts in here, there'd have to be some sort of automated moderation system to prevent spam and inappropriate content. LLM API?",
  },
  {
    id: "note-2",
    text: "The following notes are fake.",
  },
  {
    id: "note-3",
    text: "Ask the TA whether pairs are allowed for the first Cryptography project.",
  },
  {
    id: "note-4",
    text: "Prepare one concise question about discount factor choices for the RL project.",
  },
  {
    id: "note-5",
    text: "Double-check if feature normalization is expected in the Pattern Recognition assignment report.",
  },
];

export function getLatestQuestions(): Question[] {
  return [...questions];
}
