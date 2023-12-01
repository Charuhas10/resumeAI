import React from "react";

import styles from "./index.module.css";

function Input(props: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className={styles.Input}>
      {props.label == "Description" ? (
        <>
          <label>{props.label}</label>
          <textarea
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        </>
      ) : (
        <>
          <label>{props.label}</label>
          <input
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        </>
      )}
    </div>
  );
}

export default Input;
