export type Resume = ResumeFlat & ResumeArray;

export type ResumeFlat = {
  Personal: Personal;
  Skillsets: Skillsets;
};

export type ResumeArray = {
  Education: Education[];
  Experience: Experience[];
  Projects: Project[];
  Certifications: Certification[];
};

export const emptyResumeArray: {
  Education: Education;
  Experience: Experience;
  Projects: Project;
  Certifications: Certification;
} = {
  Education: {
    Name: "",
    Location: "",
    Degree: "",
    Field: "",
    Score: 0,
    StartDate: "",
    EndDate: "",
  },
  Experience: {
    Name: "",
    Title: "",
    Location: "",
    Description: "",
    StartDate: "",
    EndDate: "",
  },

  Projects: {
    Name: "",
    Technologies: "",
    Link: "",
    Description: "",
  },
  Certifications: {
    Name: "",
    Link: "",
    Issuer: "",
  },
};

export const emptyResume: Resume = Object.freeze({
  Personal: {
    Name: "",
    Email: "",
    Number: "",
    Linkedin: "",
    Github: "",
    Portfolio: "",
  },
  Education: [],
  Experience: [],
  Projects: [],
  Skillsets: {
    Languages: "",
    Libraries: "",
    Tools: "",
  },
  Certifications: [],
});

export type Personal = {
  Name: string;
  Email: string;
  Number: string;
  Linkedin: string;
  Github: string;
  Portfolio: string;
};

export type Experience = {
  Name: string;
  Title: string;
  Location: string;
  Description: string;
  StartDate: string;
  EndDate: string;
};

export type Education = {
  Name: string;
  Location: string;
  Degree: string;
  Field: string;
  Score: number;
  StartDate: string;
  EndDate: string;
};

export type Project = {
  Name: string;
  Technologies: string;
  Link: string;
  Description: string;
};

export type Skillsets = {
  Languages: string;
  Libraries: string;
  Tools: string;
};

export type Certification = {
  Name: string;
  Link: string;
  Issuer: string;
};
