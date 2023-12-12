import styles from "./index.module.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

export default function DisplayDataCV({ data }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const formatResponse = (text) => {
    let formattedText = text;

    if (
      text.startsWith("Dear Hiring Manager,") ||
      text.startsWith("Dear Recruitment Team,")
    ) {
      const startIndex = text.indexOf(",") + 1;
      const endIndex = text.lastIndexOf("Sincerely,");

      const openingLine = text.substring(0, startIndex);
      const mainContent = text.substring(startIndex, endIndex).trim();
      const closingLines = text.substring(endIndex).trim();

      formattedText = `${openingLine}\n\n${mainContent}\n\n${closingLines}`;
    }

    return formattedText;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  const handleCopyClick = () => {
    copyToClipboard(formatResponse(data.answer));
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 750); // Hide tooltip after 750 milliseconds
  };

  return (
    <div className={styles.responseContainer}>
      <div className={styles.contentWithButton}>
        <button onClick={handleCopyClick} className={styles.copyButton}>
          <FontAwesomeIcon icon={faCopy} className={styles.iconStyle} />
        </button>
        {showTooltip && <div className={styles.tooltip}>Copied</div>}
        <pre className={styles.responseText}>{formatResponse(data.answer)}</pre>
      </div>
    </div>
  );
}
