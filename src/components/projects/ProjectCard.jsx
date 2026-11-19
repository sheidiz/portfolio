import { motion } from "framer-motion";
import { FaFigma, FaGithub, FaYoutube } from "react-icons/fa";
import { MdLink } from "react-icons/md";
import PropTypes from "prop-types";

const projectPropType = PropTypes.shape({
  description: PropTypes.string.isRequired,
  figma: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  presentation: PropTypes.oneOf(["desktop", "mobile"]).isRequired,
  repository: PropTypes.string,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  video: PropTypes.string,
  web: PropTypes.string,
});

const DesktopGallery = ({ images, title }) => {
  const [primaryImage, secondaryImage] = images;

  return (
    <div className="relative mx-auto mt-5 h-44 w-64 md:h-52 md:w-full min-[1100px]:flex min-[1100px]:justify-evenly">
      {secondaryImage && (
        <img
          src={secondaryImage}
          alt={`${title} screenshot 2`}
          className="absolute left-[18%] top-0 z-10 h-36 shadow-xl duration-150 hover:z-30 hover:scale-110 sm:left-28 md:left-20 md:h-44 lg:left-44 min-[1100px]:static min-[1100px]:left-[50%]"
        />
      )}
      {primaryImage && (
        <img
          src={primaryImage}
          alt={`${title} screenshot 1`}
          className="absolute -left-2 top-0 z-20 h-36 shadow-xl duration-150 hover:scale-110 md:h-44 min-[1100px]:static"
        />
      )}
    </div>
  );
};

DesktopGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

const MobileGallery = ({ images, title }) => (
  <div className="mx-auto mt-5 flex h-44 w-64 justify-evenly md:h-52 md:w-full lg:w-4/5">
    {images.map((image, index) => (
      <img
        key={image}
        src={image}
        alt={`${title} screenshot ${index + 1}`}
        className="h-36 shadow-xl duration-150 hover:scale-110 md:h-44"
      />
    ))}
  </div>
);

MobileGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export const ProjectCard = ({ project }) => {
  const {
    description,
    figma,
    images,
    presentation,
    repository,
    technologies,
    title,
    video,
    web,
  } = project;
  const links = [
    { href: repository, label: "GitHub", Icon: FaGithub },
    { href: web, label: "Demo", Icon: MdLink },
    { href: figma, label: "Figma", Icon: FaFigma },
    { href: video, label: "Video", Icon: FaYoutube },
  ].filter(({ href }) => href);

  return (
    <motion.div
      className="flex flex-col items-center justify-evenly rounded-2xl border border-secondary bg-primary/80 p-4 hover:bg-primary dark:bg-dm-primary/90 hover:dark:bg-dm-primary"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      <h6 className="mb-1 text-xl font-semibold text-tertiary">{title}</h6>
      <p className="select-none text-center text-sm text-light">{description}</p>
      {presentation === "mobile" ? (
        <MobileGallery images={images} title={title} />
      ) : (
        <DesktopGallery images={images} title={title} />
      )}
      <ul className="mb-2 flex flex-wrap justify-center gap-2">
        {technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-2xl bg-tertiary px-2 py-1 text-xs text-primary"
          >
            {technology}
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-lg text-light">
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110"
            aria-label={`${title} ${label}`}
          >
            <Icon />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: projectPropType.isRequired,
};
