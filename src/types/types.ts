export type QuestionTypeData = {
  question: string;
  options?: string[];
  answer: string[];
  type: string;
};

export enum QuestionTypeSelector {
  OneChoice = "OneChoice",
  MultipleChoice = "MultipleChoice",
  InputQuestion = "InputQuestion",
}

export enum QuizTypeSelector {
  Random = "Random",
  Chemistry = "Chemistry",
}

export enum InfoSelector {
  HomePage = -1,
  Question1 = 0,
  Question2 = 1,
  Question3 = 2,
  Question4 = 3,
  Question5 = 4,
  Results = 5,
}

export enum NavigationType {
  Next = 1,
  Previous = 2,
}

export type QuestionsHandler = {
  selectedOption: string[] | null | undefined;
  isCorrect: boolean | null;
};
