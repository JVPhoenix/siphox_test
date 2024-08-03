import { QuestionsHandler, QuestionTypeData, QuestionTypeSelector } from "@/types/types";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "@/styles/Home.module.css";
import AnswersOptions from "./QuestionsOptions";

interface QuestionProps {
  data: QuestionTypeData[];
  questionIndex: number;
  answers: QuestionsHandler[] | null;
  setAnswers: Dispatch<SetStateAction<QuestionsHandler[]>>;
  animation: string;
  setAnimation: Dispatch<SetStateAction<string>>;
}

export default function Questions(props: QuestionProps) {
  // SELECT 5 RANDOM QUESTIONS
  const [questionOrder, setQuestionOrder] = useState<QuestionTypeData[] | null>(
    props.data.sort(() => 0.5 - Math.random()).slice(0, 5)
  );

  // SELECT THE CURRENT QUESTION TO BE SHOWED
  const currentQuestion = questionOrder?.filter(
    (question, index) => index === props.questionIndex && question.question
  );

  // CHANGES THE ANIMATION WHEN USER SKIPS TO NEXT/PREVIOUS QUESTION
  const handleResetAnimation = () => {
    props.setAnimation("");
  };

  return (
    <>
      {currentQuestion?.map((questionsData, index) => (
        <div
          key={index}
          className={`${styles.answersOptionsWrapper} ${props.animation}`}
          onAnimationEnd={() => handleResetAnimation}
        >
          <h3>
            {props.questionIndex + 1}) {questionsData.question}
          </h3>
          <AnswersOptions
            questionsData={questionsData}
            answers={props.answers}
            setAnswers={props.setAnswers}
            questionIndex={props.questionIndex}
          />
        </div>
      ))}
    </>
  );
}
