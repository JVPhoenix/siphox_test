import styles from "@/styles/Home.module.css";
import { CSSProperties } from "react";

interface ButtonProps {
  className?: string;
  style?: CSSProperties | undefined;
  onClick: () => void;
}

export default function Button(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <button className={`${styles.buttonUtils} ${props.className}`} onClick={props.onClick} style={props.style}>
      {props.children}
    </button>
  );
}
