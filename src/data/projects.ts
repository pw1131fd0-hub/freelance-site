
export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    id: 'openclaw-fps',
    name: 'OpenClaw FPS',
    description: '使用 Three.js 與 Cannon.js 開發的 WebGL 第一人稱射擊遊戲',
    techStack: ['TypeScript', 'Three.js', 'Cannon.js', 'Vite'],
    githubUrl: 'https://github.com/pw1131fd0-hub/openclaw-fps',
    demoUrl: 'http://localhost:3001',
    imageUrl: '/projects/openclaw-fps.png',
    features: ['3D 遊戲引擎', '物理碰撞系統', '敵人 AI 波次管理', '動態 UI 系統']
  }
];
