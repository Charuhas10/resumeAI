import CoverLetterUpload from "../../components/CoverLetterUpload";

export default function CoverLetterPage({ DataReceived }) {
  return (
    <div>
      <CoverLetterUpload DataReceived={DataReceived} />
    </div>
  );
}
