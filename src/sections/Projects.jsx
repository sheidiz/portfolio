import { useLanguage } from "../contexts/useLanguage";
import translations from "../translations/data";
import { ProjectCard } from "../components/projects/ProjectCard";

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="projects" className="mt-5">
      <h5 className="mb-5 text-xl font-semibold text-white">
        {language == "es" ? "Proyectos Personales" : "Personal Projects"}
      </h5>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {t.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
