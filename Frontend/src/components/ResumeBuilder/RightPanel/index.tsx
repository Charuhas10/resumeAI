import React, { useEffect, useMemo, useRef } from "react";

import type { Resume } from "../../../data/resume";

import styles from "./index.module.css";
import { resumeToHtml } from "../../../data/markdown";

function RightPanel(props: { resume: Resume; signal: number }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rendered = useMemo(() => resumeToHtml(props.resume), [props.resume]);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.contentDocument!.documentElement.innerHTML = rendered;
  }, [rendered, iframeRef]);

  useEffect(() => {
    props.signal != 0 && iframeRef.current?.contentWindow?.print();
  }, [iframeRef, props.signal]);

  return (
    <div className={styles.Div}>
      <div className={styles.Paper}>
        <iframe className={styles.Iframe} ref={iframeRef} />
      </div>
    </div>
  );
}

export default RightPanel;
