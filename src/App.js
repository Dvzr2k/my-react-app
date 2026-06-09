import React from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2d1f 0%, #1a4a2e 50%, #0f2d1f 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#e8f5e9",
    padding: "0",
    margin: "0",
  },
  header: {
    background: "rgba(0,0,0,0.35)",
    borderBottom: "2px solid #4caf50",
    padding: "28px 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "700",
    color: "#00bcd4",
    margin: "0 0 6px 0",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#a5d6a7",
    margin: "0",
  },
  main: {
    maxWidth: "820px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  authorCard: {
    background: "rgba(76, 175, 80, 0.12)",
    border: "1px solid #4caf50",
    borderRadius: "12px",
    padding: "28px",
    textAlign: "center",
    marginBottom: "30px",
  },
  authorName: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#69f0ae",
    margin: "0 0 6px 0",
  },
  authorBio: {
    fontSize: "1rem",
    color: "#c8e6c9",
    margin: "0 0 12px 0",
  },
  year: {
    display: "inline-block",
    background: "#1b5e20",
    color: "#69f0ae",
    padding: "4px 14px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "16px",
  },
  githubLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#69f0ae",
    textDecoration: "none",
    border: "1px solid #4caf50",
    borderRadius: "8px",
    padding: "8px 18px",
    fontSize: "0.95rem",
    transition: "background 0.2s",
  },
  badgeRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "30px",
  },
  badge: {
    background: "#1b5e20",
    color: "#a5d6a7",
    border: "1px solid #388e3c",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "0.85rem",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  sectionTitle: {
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#69f0ae",
    marginBottom: "14px",
    borderLeft: "3px solid #4caf50",
    paddingLeft: "10px",
  },
  descCard: {
    background: "rgba(0,0,0,0.25)",
    border: "1px solid #2e7d32",
    borderRadius: "10px",
    padding: "22px",
    marginBottom: "24px",
    lineHeight: "1.75",
    color: "#c8e6c9",
    fontSize: "0.97rem",
  },
  infraGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "14px",
    marginBottom: "30px",
  },
  infraItem: {
    background: "rgba(0,0,0,0.3)",
    border: "1px solid #2e7d32",
    borderRadius: "10px",
    padding: "18px",
    textAlign: "center",
  },
  infraLabel: {
    fontSize: "0.78rem",
    color: "#81c784",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "6px",
  },
  infraValue: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#69f0ae",
  },
  footer: {
    background: "rgba(0,0,0,0.35)",
    borderTop: "1px solid #2e7d32",
    textAlign: "center",
    padding: "20px",
    fontSize: "0.88rem",
    color: "#81c784",
  },
  footerLink: {
    color: "#69f0ae",
    textDecoration: "none",
  },
};

const techStack = ["React", "AWS S3", "CloudFront", "Terraform", "GitHub Actions", "Claude Code"];

const infraItems = [
  { label: "Cloud Provider", value: "AWS" },
  { label: "Region", value: "us-east-1" },
  { label: "Hosting", value: "S3 + CloudFront" },
  { label: "IaC Tool", value: "Terraform" },
  { label: "CI/CD", value: "GitHub Actions" },
  { label: "AI Agent", value: "Claude Code" },
];

function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 My React App — AWS </h1>
        <p style={styles.subtitle}>
          Deployed with Claude Code · Agentic DevOps Workflow
        </p>
      </header>

      <main style={styles.main}>
        {/* Author Card */}
        <div style={styles.authorCard}>
          <h2 style={styles.authorName}>Diego Valdez</h2>
          <p style={styles.authorBio}>DevOps Engineer Student</p>
          <span style={styles.year}>© 2026</span>
          <br />
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginTop: "12px" }}>
            <a href="https://github.com/Dvzr2k" target="_blank" rel="noopener noreferrer" style={styles.githubLink}>
              ⚡ GitHub
            </a>
            <a href="https://www.linkedin.com/in/diego-valdez-rodriguez" target="_blank" rel="noopener noreferrer" style={styles.githubLink}>
              💼 LinkedIn
            </a>
            <a href="mailto:diegovaldezrodriguez3@gmail.com" style={styles.githubLink}>
              ✉ Gmail
            </a>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div style={styles.badgeRow}>
          {techStack.map((t) => (
            <span key={t} style={styles.badge}>{t}</span>
          ))}
        </div>

        {/* What this project implements */}
        <div style={styles.sectionTitle}>About This Deployment</div>
        <div style={styles.descCard}>
          This project demonstrates a full AGENTIC DEVOPS WORKFLOW using{" "}
          <strong style={{ color: "#69f0ae" }}>Claude Code</strong> as the AI
          orchestration engine. The React app is deployed to{" "}
          <strong style={{ color: "#69f0ae" }}>AWS S3</strong> and served
          globally through a{" "}
          <strong style={{ color: "#69f0ae" }}>CloudFront CDN</strong>{" "}
          distribution, with infrastructure provisioned entirely via{" "}
          <strong style={{ color: "#69f0ae" }}>Terraform</strong>.
          <br /><br />
          The project includes a complete{" "}
          <strong style={{ color: "#69f0ae" }}>.claude/</strong> directory with
          custom <strong style={{ color: "#69f0ae" }}>skills</strong> (
          /scaffold-terraform, /tf-plan, /tf-apply, /deploy, /setup-gh-actions,
          /infra-audit),{" "}
          <strong style={{ color: "#69f0ae" }}>subagents</strong> (
          security-auditor, cost-optimizer, drift-detector), and{" "}
          <strong style={{ color: "#69f0ae" }}>hooks</strong> that guard every
          prompt and tool call. The CI/CD pipeline runs automatically via{" "}
          <strong style={{ color: "#69f0ae" }}>GitHub Actions</strong>, building
          the app with <code style={{ color: "#a5d6a7" }}>npm run build</code>{" "}
          and syncing the <code style={{ color: "#a5d6a7" }}>build/</code>{" "}
          directory to S3 on every push to main.
        </div>

        {/* Infra Card */}
        <div style={styles.sectionTitle}>Infrastructure</div>
        <div style={styles.infraGrid}>
          {infraItems.map((item) => (
            <div key={item.label} style={styles.infraItem}>
              <div style={styles.infraLabel}>{item.label}</div>
              <div style={styles.infraValue}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Course credit */}
        <div style={styles.descCard}>
          Credits to my teacher{" "}
          <strong style={{ color: "#69f0ae" }}>Pravin Mishra</strong>{" "}
          for the guidance and knowledge that made this possible.
        </div>
      </main>

      <footer style={styles.footer}>
        Built by Diego Valdez · Powered by React &amp; AWS · 2026
      </footer>
    </div>
  );
}

export default App;
