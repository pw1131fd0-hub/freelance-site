export default function Home() {
  const projects = [
    {
      id: 'openclaw-fps',
      name: 'OpenClaw FPS',
      description: '3D WebGL 第一人稱射擊遊戲 - 實時物理引擎、敵人 AI、波次管理系統',
      tech: ['TypeScript', 'Three.js', 'Cannon.js', 'Vite'],
      url: 'https://github.com/pw1131fd0-hub/openclaw-fps',
      status: '✅ 生產就緒',
      emoji: '🎮'
    },
    {
      id: 'k8s-copilot',
      name: 'K8s Copilot',
      description: 'Kubernetes 自動化平台 - 自動化部署、叢集監控、GitOps 整合',
      tech: ['Node.js', 'Kubernetes', 'Docker', 'GitHub Actions'],
      url: 'https://github.com/pw1131fd0-hub/k8s-copilot',
      status: '✅ 生產就緒',
      emoji: '☸️'
    },
    {
      id: 'crm',
      name: 'Openclaw CRM',
      description: '企業級 CRM 系統 - 客戶管理、銷售管道、資料分析儀表板',
      tech: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
      url: 'https://github.com/pw1131fd0-hub/openclaw-crm',
      status: '✅ 生產就緒',
      emoji: '📊'
    },
    {
      id: 'ckad-exec',
      name: 'CKAD Executor',
      description: 'Kubernetes 認證自動化考試練習平台',
      tech: ['TypeScript', 'Kubernetes', 'Docker'],
      url: 'https://github.com/pw1131fd0-hub/CKAD-exec',
      status: '✅ 生產就緒',
      emoji: '📝'
    },
    {
      id: 'openclaw-deployer',
      name: 'OpenClaw Deployer',
      description: 'CI/CD 一鍵部署工具 - 自動化測試、構建、部署流程',
      tech: ['Node.js', 'GitHub Actions', 'Docker'],
      url: 'https://github.com/pw1131fd0-hub/openclaw-deployer',
      status: '✅ 生產就緒',
      emoji: '🚀'
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">
      {/* Header Section - Inspired by iiNumbers */}
      <section className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          iiNumbers, Inc - 木刻思股份有限公司
        </h1>
        <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
          The Leading AI Foundry
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 italic border-l-4 border-gray-200 dark:border-gray-800 pl-4">
          &quot;A Story about Hack the future &amp; Enlighten the future.&quot;
        </p>
        
        <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            👋 <span className="font-semibold text-black dark:text-white">iiNumbers</span>, The Leading AI Foundry, helps enterprises build their AI-oriented and data-oriented solution ✨ to continuously solve 💡 the most valuable 💰 previously unsolvable problem 🔍 in a more systematic way.
          </p>
          <p>
            📍 With new business model, service model and frontier AI technologies, iiNumbers will be the part of the revolution of specialization in AI industry, just like IC industry.
          </p>
        </div>
      </section>

      {/* Projects List - Minimalist approach */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-100 dark:border-gray-900">
        <h2 className="text-2xl font-bold mb-10">Featured Projects</h2>
        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-4 decoration-1 decoration-gray-300 dark:decoration-gray-700 hover:decoration-blue-600 transition-all"
                >
                  {project.emoji} {project.name}
                </a>
                <span className="text-sm font-mono text-green-600 dark:text-green-400 mt-1 md:mt-0">
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3 max-w-2xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-mono text-gray-500 dark:text-gray-500">
                {project.tech.map((tech) => (
                  <span key={tech}>#{tech.toLowerCase()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="max-w-4xl mx-auto px-6 py-24 border-t border-gray-100 dark:border-gray-900">
        <h2 className="text-2xl font-bold mb-6">Connect</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Interested in AI solutions or collaboration?
        </p>
        <div className="flex flex-wrap gap-8">
          <a 
            href="/contact" 
            className="text-lg font-bold border-b-2 border-black dark:border-white hover:text-blue-600 hover:border-blue-600 transition-all"
          >
            Send a Message
          </a>
          <a 
            href="mailto:contact@iinumbers.com" 
            className="text-lg font-bold border-b-2 border-black dark:border-white hover:text-blue-600 hover:border-blue-600 transition-all"
          >
            Email
          </a>
        </div>
        <p className="mt-16 text-sm text-gray-400">
          © {new Date().getFullYear()} iiNumbers, Inc. All rights reserved.
        </p>
      </footer>
    </main>
  );
}