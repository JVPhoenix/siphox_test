import React from "react";
import styles from "@/styles/Home.module.css";
import { QuizTypeSelector } from "@/types/types";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  quizType: QuizTypeSelector | null;
}

export default function ProgressBar(props: ProgressBarProps) {
  const progress = (props.currentQuestion / props.totalQuestions) * 100;

  return (
    <div className={styles.status}>
      <h3>
        Answer 5 {props.quizType === QuizTypeSelector.Random ? QuizTypeSelector.Random : QuizTypeSelector.Chemistry}{" "}
        questions
      </h3>
      <p>Your Progression</p>
      <div className={styles.progressBar}>
        <div style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
