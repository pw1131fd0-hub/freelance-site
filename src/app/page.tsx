export default function Home() {
  const projects = [
    {
      id: 'openclaw-fps',
      name: 'OpenClaw FPS',
      description: '3D WebGL 第一人稱射擊遊戲 - 實時物理引擎、敵人 AI、波次管理系統',
      tech: ['TypeScript', 'Three.js', 'Cannon.js', 'Vite'],
      url: 'https://github.com/pw1131fd0-hub/openclaw-fps',
      status: '✅ 生產就緒'
    },
    {
      id: 'k8s-copilot',
      name: 'K8s Copilot',
      description: 'Kubernetes 自動化平台 - 自動化部署、叢集監控、GitOps 整合',
      tech: ['Node.js', 'Kubernetes', 'Docker', 'GitHub Actions'],
      url: 'https://github.com/pw1131fd0-hub/k8s-copilot',
      status: '✅ 生產就緒'
    },
    {
      id: 'crm',
      name: 'Openclaw CRM',
      description: '企業級 CRM 系統 - 客戶管理、銷售管道、資料分析儀表板',
      tech: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
      url: 'https://github.com/pw1131fd0-hub/openclaw-crm',
      status: '✅ 生產就緒'
    },
    {
      id: 'lobster-autoops',
      name: 'Lobster AutoOps',
      description: '自動化運維平台 - 任務排程、監控告警、日誌彙整',
      tech: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
      url: 'https://github.com/pw1131fd0-hub/lobster-autoops',
      status: '✅ 生產就緒'
    },
    {
      id: 'ckad-exec',
      name: 'CKAD Executor',
      description: 'Kubernetes 認證自動化考試練習平台',
      tech: ['TypeScript', 'Kubernetes', 'Docker'],
      url: 'https://github.com/pw1131fd0-hub/CKAD-exec',
      status: '✅ 生產就緒'
    },
    {
      id: 'openclaw-deployer',
      name: 'OpenClaw Deployer',
      description: 'CI/CD 一鍵部署工具 - 自動化測試、構建、部署流程',
      tech: ['Node.js', 'GitHub Actions', 'Docker'],
      url: 'https://github.com/pw1131fd0-hub/openclaw-deployer',
      status: '✅ 生產就緒'
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white mb-6">
            Hi, I'm a Full-Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
            Building intelligent systems for modern challenges
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
            Passionate about cloud infrastructure, AI, and creating products that matter. 
            Currently exploring Kubernetes, AI automation, and web3 technologies.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-4 py-20 bg-gray-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-black dark:text-white">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors hover:shadow-lg dark:hover:shadow-green-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                    {project.name}
                  </h3>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-black dark:text-white">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Have a project in mind? Let's collaborate.
          </p>
          <a
            href="mailto:contact@example.com"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Me an Email
          </a>
        </div>
      </section>
    </main>
  );
}
