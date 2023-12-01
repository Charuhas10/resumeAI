import type { Draft } from "immer";

import type { Resume, ResumeArray, ResumeFlat } from "./resume";

export type Named<T, U> = { name: T; value: U };

export type ResumeActions =
  | Named<"add", { path: keyof ResumeArray }>
  | Named<"delete", { path: keyof ResumeArray; index: number }>
  | Named<"mutate", MutateAction<keyof ResumeFlat>>
  | Named<"mutate-array", MutateArrayAction<keyof ResumeArray>>;

type MutateAction<T = keyof ResumeFlat> = {
  object: T;
  key: any;
  value: any;
};

type MutateArrayAction<T = keyof ResumeArray> = {
  object: T;
  key: any;
  index: number;
  value: any;
};
