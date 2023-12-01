import mustache from "mustache";

import type { Resume } from "./resume";

const template = `
<span class="name">{{ Personal.Name }}</span>

<span class="info">

[{{Personal.Email}}](mailto:{{ Personal.Email }})
{{#Personal.Number}}|
[{{ Personal.Number }}](tel:{{ Personal.Number}})
{{/Personal.Number}}
{{#Personal.Linkedin}}|
[Linkedin](https://www.linkedin.com/in/{{ Personal.Linkedin }})
{{/Personal.Linkedin}}
{{#Personal.Github}}|
[GitHub](https://github.com/{{ Personal.Github }})
{{/Personal.Github}}
{{#Personal.Portfolio}}|
[Portfolio](https://{{ Personal.Portfolio }})
{{/Personal.Portfolio}}

</span>

{{#Education.length}}
## Education
{{/Education.length}} 

{{#Education}}
{{#Name.length}}
### {{ Name }} | <location> {{ Location }} </location> <time>{{ StartDate }} - {{ EndDate }}</time>{{/Name.length}}

{{#Degree.length}}{{ Degree }} ___in___{{/Degree.length}}
{{ Field }}

{{#Score.length}}{{Score}}{{/Score.length}}
{{/Education}}

{{#Experience.length}}
## Experience
{{/Experience.length}}

{{#Experience}}
{{#Name.length}}
### {{ Name }} | <location> {{ Location }} </location> <time>{{ StartDate }} - {{ EndDate }}</time>{{/Name.length}}

{{ Title }}

{{#Description}}
- {{ . }}
{{/Description}}

{{/Experience}}

{{#Projects.length}}
## Projects
{{/Projects.length}}

{{#Projects}}
{{#Name.length}}
### {{ Name }} | <location>{{Technologies}} | [Link]({{Link}})</location> <time>{{ StartDate }} - {{ EndDate }}</time>{{/Name.length}}

{{#Description}}
- {{ . }}
{{/Description}}

{{/Projects}}

{{#Skillsets.languages.length}}
## Skillsets
{{/Skillsets.languages.length}}

{{#Skillsets}}

{{#languages.length}}
**Languages**: {{ languages }}
{{/languages.length}}

{{#libraries.length}}
**Libraries**: {{ libraries }}
{{/libraries.length}}

{{#tools.length}}
**Tools**: {{ tools }}
{{/tools.length}}

{{/Skillsets}}

{{#Certifications.length}}
## Certifications
{{/Certifications.length}}
  
{{#Certifications}}
{{#Name.length}}
### {{ Name }} | </location> {{ Issuer }} | [Link]({{ Link }})</location>{{/Name.length}}
{{/Certifications}}

`;

export function resumeToMarkdown(resume: Resume) {
  return mustache.render(template, resume);
}
