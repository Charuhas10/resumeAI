export default function DisplayDataResume({ data }) {
  let jsonString = data.answer;
  const jsonData1 = jsonString.replace("```json", "");
  const jsonData = jsonData1.replace("```", "");

  console.log(jsonData);

  const resumeData = JSON.parse(jsonData);
  console.log(resumeData);
  const candidateOverview = resumeData.candidate_overview;
  const keyDetails = resumeData.key_details;
  const keyDetails_HonorsAndAwards = keyDetails["Honors and Awards"] || [];

  return (
    <div>
      <h1>Candidate Review</h1>
      <div>{candidateOverview}</div>
      <h1>Key Details</h1>
      {keyDetails.Education && keyDetails.Education.length > 0 && (
        <div>
          <h2>Education:</h2>
          {keyDetails.Education.map((edu, index) => (
            <div key={index}>
              <div>Degree: {edu.Degree}</div>
              {edu.Field && <div>Field: {edu.Field}</div>}
              <div>Institution: {edu.Institution}</div>
              <div>Duration: {edu.Duration}</div>
              {edu.Percentage && <div>Percentage: {edu.Percentage}</div>}
              {edu.CGPA && <div>CGPA: {edu.CGPA}</div>}
            </div>
          ))}
        </div>
      )}
      {keyDetails.Experience && keyDetails.Experience.length > 0 && (
        <div>
          <h2>Experience:</h2>
          {keyDetails.Experience.map((exp, index) => (
            <div key={index}>
              <div>Job Title: {exp["Job Title"]}</div>
              <div>Company: {exp.Company}</div>
              <div>Duration: {exp.Duration}</div>
            </div>
          ))}
        </div>
      )}
      {keyDetails.Projects && keyDetails.Projects.length > 0 && (
        <div>
          <h2>Projects:</h2>
          {keyDetails.Projects.map((project, index) => (
            <div key={index}>
              <div>Project Name: {project["Project Name"]}</div>
              <div>Technologies: {project.Technologies}</div>
              <div>Description: {project.Description}</div>
            </div>
          ))}
        </div>
      )}
      {keyDetails.Skills && keyDetails.Skills.length > 0 && (
        <div>
          <h2>Skills:</h2>
          <ul>
            {keyDetails.Skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
      {keyDetails["Honors and Awards"] &&
        keyDetails["Honors and Awards"].length > 0 && (
          <div>
            <h2>Honors and Awards:</h2>
            {keyDetails_HonorsAndAwards.map((award, index) => (
              <div key={index}>
                <div>Award: {award.Award}</div>
                {award.Body && <div>Body: {award.Body}</div>}
              </div>
            ))}
          </div>
        )}
      {resumeData.important_questions &&
        resumeData.important_questions.length > 0 && (
          <div>
            <h2>Important Questions:</h2>
            <ul>
              {resumeData.important_questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
