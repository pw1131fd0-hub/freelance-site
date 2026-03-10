export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  status: string;
  emoji: string;
}

export const projects: Project[] = [
  {
    id: 'openclaw-fps',
    name: 'OpenClaw FPS',
    description: '3D WebGL 第一人稱射擊遊戲 - 實時物理引擎、敵人 AI、波次管理系統',
    techStack: ['TypeScript', 'Three.js', 'Cannon.js', 'Vite'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-fps',
    status: '✅ 生產就緒',
    emoji: '🎮'
  },
  {
    id: 'k8s-copilot',
    name: 'K8s Copilot',
    description: 'Kubernetes 自動化平台 - 自動化部署、叢集監控、GitOps 整合',
    techStack: ['Node.js', 'Kubernetes', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/pw1131fd0-hub/k8s-copilot',
    status: '✅ 生產就緒',
    emoji: '☸️'
  },
  {
    id: 'crm',
    name: 'Openclaw CRM',
    description: '企業級 CRM 系統 - 客戶管理、銷售管道、資料分析儀表板',
    techStack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-crm',
    status: '✅ 生產就緒',
    emoji: '📊'
  },
  {
    id: 'ckad-exec',
    name: 'CKAD Executor',
    description: 'Kubernetes 認證自動化考試練習平台',
    techStack: ['TypeScript', 'Kubernetes', 'Docker'],
    githubUrl: 'https://github.com/pw1131fd0-hub/CKAD-exec',
    status: '✅ 生產就緒',
    emoji: '📝'
  },
  {
    id: 'openclaw-deployer',
    name: 'OpenClaw Deployer',
    description: 'CI/CD 一鍵部署工具 - 自動化測試、構建、部署流程',
    techStack: ['Node.js', 'GitHub Actions', 'Docker'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-deployer',
    status: '✅ 生產就緒',
    emoji: '🚀'
  }
];