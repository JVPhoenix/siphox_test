import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ProgressBar from "../components/quiz/ProgressBar";
import Button from "@/components/utils/Button";
import { useState } from "react";
import Questions from "@/components/quiz/Questions";
import { InfoSelector, QuestionsHandler, QuizTypeSelector, NavigationType, QuestionTypeData } from "@/types/types";
import RandomQuestions from "../data/QuizQuestions-1.json";
import ChemistryQuestions from "../data/QuizQuestions-2.json";
import Navigation from "@/components/quiz/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // INITIAL ANSWERS STATE AND/OR RESET
  const handleReset = () => {
    return Array(5).fill({ selectedOption: [], isCorrect: false });
  };

  // HANDLE QUIZ QUESTIONS SUBJECT AND PAGES
  const [quizType, setQuizType] = useState<QuizTypeSelector | null>(null);
  const [stateIndex, setStateIndex] = useState<number>(InfoSelector.HomePage);

  const handleQuizType = (newValue: QuizTypeSelector) => {
    setQuizType((state) => (state === newValue ? null : newValue));
  };

  const handleDecreaseIndex = () => {
    if (stateIndex === InfoSelector.HomePage) {
      setStateIndex(InfoSelector.HomePage);
      setQuizType(null);
    } else {
      setStateIndex((prevValue) => prevValue - 1);
    }
  };

  const handleIncreaseIndex = () => {
    if (stateIndex <= 5) {
      setStateIndex((prevValue) => prevValue + 1);
    }
  };

  // HANDLE QUESTIONS ANSWERS
  const [answers, setAnswers] = useState<QuestionsHandler[]>(handleReset());
  const score = answers.reduce((accumulator, current) => (current.isCorrect === true ? ++accumulator : accumulator), 0);

  const [animation, setAnimation] = useState<string>("");
  const handleAnimation = (type: NavigationType, animationName: string) => {
    if (type === NavigationType.Next) {
      setAnimation(animationName);
      setTimeout(() => {
        setAnimation(styles.fadeInLeft);
      }, 200);
    } else if (type === NavigationType.Previous) {
      setAnimation(animationName);
      setTimeout(() => {
        setAnimation(styles.fadeInLeft);
      }, 200);
    }
  };

  return (
    <main
      className={`
        ${styles.main} 
        ${inter.className} 
        ${
          quizType === null
            ? styles.borderColorToPattern
            : quizType === QuizTypeSelector.Random
            ? styles.borderColorToOrange
            : styles.borderColorToGreen
        }
        `}
    >
      <div className={`${quizType === null && styles.fadeInLeft}`}>
        <Head>
          <title>SiPhox Task</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {stateIndex === InfoSelector.HomePage && (
          <div className={styles.homepage}>
            <h1>Hello and welcome!</h1>
            <h3>Select the questions subject</h3>
            <div>
              <Button
                className={styles.backgroundOrange}
                style={{ borderColor: "#e66700" }}
                onClick={() => {
                  handleQuizType(QuizTypeSelector.Random);
                  setStateIndex(InfoSelector.Question1);
                }}
              >
                Random Questions
              </Button>
              <Button
                className={styles.backgroundGreen}
                style={{ borderColor: "#90bd14" }}
                onClick={() => {
                  handleQuizType(QuizTypeSelector.Chemistry);
                  setStateIndex(InfoSelector.Question1);
                }}
              >
                Chemistry Questions
              </Button>
            </div>
          </div>
        )}

        {stateIndex >= InfoSelector.Question1 && stateIndex <= InfoSelector.Question5 && (
          <div className={`${styles.questionsWrapper} ${styles.fadeInLeft}`}>
            <Navigation
              answers={answers}
              stateIndex={stateIndex}
              handleIncreaseIndex={handleIncreaseIndex}
              handleDecreaseIndex={handleDecreaseIndex}
              handleAnimation={handleAnimation}
            />
            <ProgressBar currentQuestion={stateIndex} totalQuestions={5} quizType={quizType} />
            <Questions
              data={(quizType === QuizTypeSelector.Random ? RandomQuestions : ChemistryQuestions) as QuestionTypeData[]}
              questionIndex={stateIndex}
              answers={answers}
              setAnswers={setAnswers}
              animation={animation}
              setAnimation={setAnimation}
            />
          </div>
        )}

        {stateIndex === InfoSelector.Results && (
          <div className={`${styles.result} ${styles.fadeInLeft}`}>
            <h2>Your scored {(score / 5) * 100}%</h2>
            <p>
              You answered <b>{score}</b> question{score !== 1 ? "s" : null} correctly!
            </p>
            <Button
              onClick={() => {
                setStateIndex(InfoSelector.HomePage);
                setQuizType(null);
                setAnswers(handleReset());
              }}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
