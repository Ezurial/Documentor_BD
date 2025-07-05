export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software development proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
    <h1>Software Development Proposal</h1>
    <h2>Project Overview</h2>
    <p>Brief description of the proposed software development project.

    <h2>Scope of Work</h2>
    <p>Detailed breakdown of project deliverables and requirements.

    <h2>Timeline</h2>
    <p>Project milestones and delivery schedule.

    <h2>Budget</h2>
    <p>Cost breakdown and payment terms.
    `,
  },
  {
    id: "project-proposal",
    label: "Project proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
    <h1>Project Proposal</h1>
    <h2>Executive Summary</h2>
    <p>Brief overview of the project proposal.

    <h2>Project Goals</h2>
    <p>Key objectives and expected outcomes.

    <h2>Implementation Plan</h2>
    <p>Strategy and methodology for project execution.

    <h2>Resources Required</h2>
    <p>Team, equipment, and budget requirements.
    `,
  },
  {
    id: "bussiness-letter",
    label: "Business letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px;">
      <div style="margin-bottom: 30px;">
        <h1 style="margin-bottom: 10px; font-size: 24px;">YOUR COMPANY</h1>
        <p style="margin: 5px 0;">123 YOUR STREET</p>
        <p style="margin: 5px 0;">YOUR CITY, ST 12345</p>
        <p style="margin: 5px 0;">(123) 456-7890</p>
        <p style="margin: 5px 0;">MYEMAIL@EXAMPLE.COM</p>
      </div>

      <div style="margin-bottom: 30px;">September 24, 20XX</div>

      <div style="margin-bottom: 15px;">Dear Ms. Reader,</div>

      <div style="margin-bottom: 20px;">
        <p style="margin-bottom: 15px;">Thank you for your interest in our services.</p>
        <p style="margin-bottom: 15px;">We are pleased to provide you with our latest product offerings.</p>
        <p style="margin-bottom: 15px;">Our team has extensive experience in business solutions.</p>
        <p style="margin-bottom: 15px;">We look forward to discussing this opportunity further.</p>
        <p style="margin-bottom: 15px;">Please contact us if you have any questions.</p>
      </div>

      <div style="margin-top: 40px;">Sincerely,</div>

      <div style="margin-top: 50px; border-top: 1px solid #000; padding-top: 10px; display: inline-block;">
        <strong>YOUR NAME</strong>
      </div>
    </div>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
    <h1>[Your Name]</h1>
    <p>[Contact Information]</p>

    <h2>Professional Summary</h2>
    <p>Brief overview of your professional background and key strengths .< /p>

    <h2>Work Experience</h2>
    <p>[Company Name] - [Position]<br>
    [Date Range]</p>

    <h2>Education</h2>
    <p>[Degree] - [Institution]<br>
    [Graduation Year]</p>

    <h2>Skills</h2>
    <p>List of relevant skills and competencies .< /p>`,
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
    <p>[Your Name]<br>
    [Your Address]<br>
    [City, State ZIP]</p>

    <p>[Date]</p>

    <p>[Recipient's Name]<br>
    [Company Name]<br>
    [Company Address]</p>

    <p>Dear [Recipient's Name],</p>

    <p>I am writing to express my interest in [position] at [company name] .< /p>

    <p>Sincerely,<br>
    [Your Name]</p>`,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
    <p>Subject: [Email Subject]</p>

    <p>Dear [Recipient],</p>

    <p>I hope this email finds you well .< /p>

    <p>[Email Body]</p>

    <p>Best regards,<br>
    [Your Name]</p>`,
  },
];
