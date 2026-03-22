export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  status: string;
  emoji: string;
}

export const projects: Project[] = [
  {
    id: 'openclaw-fps',
    name: "OpenClaw FPS",
    description: '3D WebGL first-person shooter with real-time physics, enemy AI, and wave management.',
    longDescription: 'A fully browser-native 3D first-person shooter built with Three.js and Cannon.js. The game features a real-time physics engine for projectile simulation and environmental interactions, a wave-based enemy AI system with patrol, chase, and attack states, and a level progression architecture. Runs at 60fps in modern browsers with no native plugin required.',
    highlights: [
      'Real-time physics with Cannon.js — collision detection, gravity, projectile arcs',
      'Enemy AI state machine: idle → patrol → chase → attack',
      'Wave management system with dynamic difficulty scaling',
      'WebGL rendering pipeline with Three.js PBR materials and dynamic lighting',
      'Zero-dependency deployment — single HTML build artifact',
    ],
    techStack: ['TypeScript', 'Three.js', 'Cannon.js', 'Vite'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-fps',
    status: '✅ Production Ready',
    emoji: '🎮',
  },
  {
    id: 'k8s-copilot',
    name: 'K8s Copilot',
    description: 'Kubernetes automation platform with auto-deploy, cluster monitoring, and GitOps integration.',
    longDescription: 'K8s Copilot is an internal platform engineering tool that wraps the Kubernetes API and GitHub Actions to deliver a fully automated GitOps deployment pipeline. It monitors cluster health in real-time, auto-scales workloads based on custom metrics, and provides a dashboard for visualizing resource utilization across namespaces. Designed for teams that need production-grade K8s automation without the overhead of enterprise tooling.',
    highlights: [
      'GitOps pipeline: push to main → auto-build → canary deploy → promote or rollback',
      'Real-time cluster health dashboard with namespace-level resource views',
      'Custom HPA triggers based on application-specific metrics via Prometheus',
      'Slack integration for deploy notifications and alert escalation',
      'Helm chart templating with environment-specific value overrides',
    ],
    techStack: ['Node.js', 'Kubernetes', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/pw1131fd0-hub/k8s-copilot',
    status: '✅ Production Ready',
    emoji: '☸️',
  },
  {
    id: 'crm',
    name: "OpenClaw CRM",
    description: 'Enterprise CRM system with customer management, sales pipeline, and analytics dashboard.',
    longDescription: 'A full-featured CRM built specifically for freelancers and small agencies. Centralizes client inquiries from multiple channels into a single pipeline view, tracks deal stages from first contact to signed contract, and surfaces revenue forecasts on the analytics dashboard. Built with Next.js App Router and Server Actions for a snappy, server-first experience with minimal client-side JavaScript.',
    highlights: [
      'Multi-stage sales pipeline with drag-and-drop Kanban board',
      'Automatic customer profile creation from inbound inquiry forms',
      'Revenue forecasting dashboard with monthly and quarterly projections',
      'Bulk status update with CSV export for offline reporting',
      'Role-based access control with NextAuth.js — admin vs. read-only views',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-crm',
    status: '✅ Production Ready',
    emoji: '📊',
  },
  {
    id: 'ckad-exec',
    name: 'CKAD Executor',
    description: 'Kubernetes certification exam practice platform with automated scenario execution.',
    longDescription: 'CKAD Executor is a self-hosted exam simulator for the Certified Kubernetes Application Developer certification. It spins up isolated k3s namespaces per session, injects exam-style task prompts, and runs automated validators to score the candidate\'s kubectl and YAML work against expected cluster state. No more manually comparing output — the grader tells you exactly which objects are missing or misconfigured.',
    highlights: [
      'Spins up isolated k3s namespaces per exam session — no cross-contamination',
      'Automated grading engine validates actual cluster state against expected manifests',
      'Covers all 5 CKAD domains: Application Design, Deployment, Environment, Networking, Services',
      'Time-boxed sessions with live countdown and auto-submission',
      'Detailed score breakdown per task with hints for failed validations',
    ],
    techStack: ['TypeScript', 'Kubernetes', 'Docker', 'k3s'],
    githubUrl: 'https://github.com/pw1131fd0-hub/CKAD-exec',
    status: '✅ Production Ready',
    emoji: '📝',
  },
  {
    id: 'openclaw-deployer',
    name: "OpenClaw Deployer",
    description: 'CI/CD one-click deployment tool with automated testing, build, and deploy pipeline.',
    longDescription: 'OpenClaw Deployer is a lightweight CI/CD orchestrator built on GitHub Actions that reduces a multi-step deploy workflow to a single CLI command or webhook trigger. It handles test execution, Docker image builds, container registry pushes, and rolling Kubernetes deployments — with automatic rollback if the health check fails within a configurable window. Designed for solo developers and small teams who want Heroku-like simplicity on their own infrastructure.',
    highlights: [
      'Single command deploy: `npx openclaw-deployer deploy --env production`',
      'Automatic rollback triggered by failed health check within configurable window',
      'Docker multi-stage build with layer caching for sub-2-minute build times',
      'GitHub Actions integration with reusable workflow templates',
      'Deployment audit log with timestamps, actor, and diff summary',
    ],
    techStack: ['Node.js', 'GitHub Actions', 'Docker', 'Shell'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-deployer',
    status: '✅ Production Ready',
    emoji: '🚀',
  },
];
