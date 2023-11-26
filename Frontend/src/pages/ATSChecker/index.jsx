import ATSChecker from "../../components/ATSChecker";

export default function ATSCheckerPage({ATSDataReceived}) {
  return (
    <div>
      <ATSChecker DataReceived={ATSDataReceived} />
    </div>
  );
}
