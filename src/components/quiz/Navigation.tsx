import { InfoSelector, NavigationType, QuestionsHandler } from "@/types/types";
import { LeftArrow, RightArrow } from "../utils/Icons";
import styles from "@/styles/Home.module.css";

interface NavigationInterface {
  answers: QuestionsHandler[];
  stateIndex: number;
  handleIncreaseIndex: () => void;
  handleDecreaseIndex: () => void;
  handleAnimation: (type: NavigationType, animationName: string) => void;
}

export default function Navigation(props: NavigationInterface) {
  return (
    <div className={styles.navigation}>
      <div
        className={props.stateIndex - 1 !== InfoSelector.HomePage ? styles.arrowUtilsAllowed : styles.invisible}
        onClick={() => {
          if (props.stateIndex - 1 !== InfoSelector.HomePage) {
            props.handleDecreaseIndex();
            props.handleAnimation(NavigationType.Previous, styles.fadeOut);
          }
        }}
      >
        <LeftArrow width={70} fill="" className="" onClick={() => null} />
        <p>Previous Question</p>
      </div>
      <div
        className={
          props.answers[props.stateIndex]?.selectedOption?.length === 0
            ? styles.arrowUtilsBlocked
            : styles.arrowUtilsAllowed
        }
        onClick={() => {
          if (props.answers[props.stateIndex]?.selectedOption?.length !== 0) {
            props.handleIncreaseIndex();
            props.handleAnimation(NavigationType.Next, styles.fadeOut);
          }
        }}
      >
        <p>Next Question</p>
        <RightArrow
          width={70}
          fill={props.answers[props.stateIndex]?.selectedOption?.length === 0 ? "gray" : "black"}
          className=""
          onClick={() => null}
        />
      </div>
    </div>
  );
}
