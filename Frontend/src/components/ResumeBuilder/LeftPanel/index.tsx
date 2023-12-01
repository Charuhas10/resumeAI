import React, { useState } from "react";
import { produce } from "immer";

import Input from "../Input";
import Collapsible from "../Collapsible";

import styles from "./index.module.css";
import { Resume, ResumeArray, ResumeFlat } from "../../data/resume";
import type { ResumeActions } from "../../data/actions";

function LeftPanel(props: {
  resume: Resume;
  dispatch: React.Dispatch<ResumeActions>;
}) {
  return (
    <div className={styles.Style}>
      {Object.entries(props.resume).map(([key, value]) =>
        !Array.isArray(value) ? (
          <Collapsible name={key} key={key} className={styles.Collapsible}>
            <InputsGroup
              fields={value}
              dispatch={props.dispatch}
              object={key as Parameters<typeof InputsGroup>[0]["object"]}
            />
          </Collapsible>
        ) : (
          <Collapsible name={key} key={key}>
            <InputsGroup
              fields={value}
              dispatch={props.dispatch}
              object={key as Parameters<typeof InputsGroup>[0]["object"]}
            />
          </Collapsible>
        )
      )}
    </div>
  );
}

function InputsGroup<Type = "mutate" | "mutate-array">({
  fields,
  dispatch,
  object,
}: {
  fields: Resume[keyof Resume];
  object: Type extends "mutate" ? keyof ResumeFlat : keyof ResumeArray;
  dispatch: React.Dispatch<ResumeActions>;
}) {
  if (!Array.isArray(fields)) {
    return (
      <Inputs
        fields={fields}
        dispatch={dispatch}
        index={undefined}
        object={object as keyof ResumeFlat}
      />
    );
  }

  return (
    <>
      {fields.map((fields, i) => (
        <Collapsible name={fields.Name} className={styles.InnerCollapsible}>
          <Inputs
            fields={fields}
            dispatch={dispatch}
            index={i}
            object={object as keyof ResumeArray}
            key={i}
          />
          <button
            onClick={() =>
              dispatch({
                name: "delete",
                value: { path: object as keyof ResumeArray, index: i },
              })
            }
          >
            Delete
          </button>
        </Collapsible>
      ))}
      <button
        onClick={() =>
          dispatch({
            name: "add",
            value: { path: object as keyof ResumeArray },
          })
        }
      >
        Add
      </button>
    </>
  );
}

function Inputs<Type = "mutate" | "mutate-array">(props: {
  fields: Record<string, string | Date | number>;
  dispatch: React.Dispatch<ResumeActions>;
  index: Type extends "mutate-array" ? number : undefined;
  object: Type extends "mutate" ? keyof ResumeFlat : keyof ResumeArray;
}) {
  return (
    <>
      {Object.entries(props.fields).map(([key, value]) => (
        <Input
          label={key}
          key={key}
          value={value.toString()}
          setValue={(value) => {
            if (props.index !== undefined) {
              props.dispatch({
                name: "mutate-array",
                value: {
                  index: props.index,
                  key: key,
                  object: props.object as keyof ResumeArray,
                  value,
                },
              });
            } else {
              props.dispatch({
                name: "mutate",
                value: {
                  key: key,
                  object: props.object as keyof ResumeFlat,
                  value,
                },
              });
            }
          }}
        />
      ))}
    </>
  );
}

export default LeftPanel;
