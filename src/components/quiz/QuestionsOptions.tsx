import { QuestionsHandler, QuestionTypeData, QuestionTypeSelector } from "@/types/types";
import { CheckMark } from "../utils/Icons";
import styles from "@/styles/Home.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface QuestionsOneChoiceInterface {
  questionsData: QuestionTypeData;
  questionIndex: number;
  answers: QuestionsHandler[] | null;
  setAnswers: Dispatch<SetStateAction<QuestionsHandler[]>>;
}

export default function AnswersOptions(props: QuestionsOneChoiceInterface) {
  // HANDLE SELECTED OPTION
  const [currentSelectedOption, setCurrentSelectedOption] = useState<string[] | null | undefined>(null);

  useEffect(() => {
    const answers = props.answers?.filter((value, index) => index === props.questionIndex && value);
    setCurrentSelectedOption(answers?.[0].selectedOption);
  }, [props.answers, props.questionIndex]);

  // CHECK IF ONE OR MULTIPLE CHOICES IS CORRECT
  const checkIsCorrect = (userAnswer: string[]) => {
    const correctAnswer = props.questionsData.answer;
    return (
      userAnswer?.length == correctAnswer.length &&
      userAnswer.every((answer1) => correctAnswer.some((answer2) => answer1 == answer2 && answer1 == answer2))
    );
  };

  return (
    <div>
      {props.questionsData.type !== QuestionTypeSelector.InputQuestion ? (
        <>
          {props.questionsData.options?.map((option, optionIndex) => {
            return (
              <div
                key={optionIndex}
                className={styles.checkMarkUtils}
                onClick={() => {
                  // ONE CHOICE ANSWERS HANDLER
                  if (props.questionsData.type === QuestionTypeSelector.OneChoice) {
                    props.setAnswers((prevAnswers) => {
                      const newAnswers = [...prevAnswers];
                      newAnswers[props.questionIndex] = {
                        selectedOption: [option],
                        isCorrect: checkIsCorrect([option]),
                      };
                      return newAnswers;
                    });

                    // MULTIPLE CHOICE ANSWERS HANDLER
                  } else if (props.questionsData.type === QuestionTypeSelector.MultipleChoice) {
                    props.setAnswers((prevAnswers) => {
                      const finalResult = [...prevAnswers];
                      const answered = prevAnswers[props.questionIndex].selectedOption;

                      const newAnswer = !finalResult[props.questionIndex].selectedOption?.includes(option)
                        ? answered?.concat(option)
                        : finalResult[props.questionIndex].selectedOption?.filter(
                            (markedAnswers) => markedAnswers !== option
                          );

                      finalResult[props.questionIndex] = {
                        selectedOption: newAnswer,
                        isCorrect: checkIsCorrect(newAnswer ? newAnswer : []),
                      };

                      return finalResult;
                    });
                  }
                }}
              >
                <>
                  <CheckMark
                    onClick={() => null}
                    width={30}
                    className={""}
                    fill={currentSelectedOption?.includes(option) ? "black" : "none"}
                  />
                  <p>{option}</p>
                </>
              </div>
            );
          })}
        </>
      ) : (
        // INPUT ANSWER HANDLER
        <div className={styles.inputFields}>
          <textarea
            placeholder="Insert your answer here"
            onChange={(e) => {
              props.setAnswers((prevAnswers) => {
                const newAnswers = [...prevAnswers];
                const handleAnswer = e.target.value !== "" ? [e.target.value.toUpperCase()] : [];
                newAnswers[props.questionIndex] = {
                  selectedOption: handleAnswer,
                  isCorrect: handleAnswer.join("").includes(props.questionsData.answer.join("")),
                };
                return newAnswers;
              });
            }}
            value={currentSelectedOption?.length !== 0 ? currentSelectedOption?.join(", ") : ""}
          />
        </div>
      )}
    </div>
  );
}
