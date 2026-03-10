import { projects } from './projects';

describe('Projects Data', () => {
  it('should have a list of projects', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should have required fields for each project', () => {
    projects.forEach(project => {
      expect(project.id).toBeDefined();
      expect(project.name).toBeDefined();
      expect(project.description).toBeDefined();
      expect(project.techStack).toBeDefined();
      expect(project.githubUrl).toBeDefined();
      expect(project.imageUrl).toBeDefined();
    });
  });

  it('should have the specific openclaw-fps project', () => {
    const fps = projects.find(p => p.id === 'openclaw-fps');
    expect(fps).toBeDefined();
    expect(fps?.name).toBe('OpenClaw FPS');
  });
});
