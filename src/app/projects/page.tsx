import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"

const projects = [
  {
    title: "openprobe",
    description:
      "an open-source deep research agent using python, langchain, and langgraph. designed to outperform existing search and research systems through advanced multi-hop reasoning capabilities.",
    role: "creator",
    period: "may 2025 - june 2025",
    achievements: [
      "outperformed openai's gpt-4o-search on the FRAMES benchmark (+1.5% accuracy)",
      "state-based orchestration of agents/tools like websearch, coding and logical reasoning via LangGraph.",
    ],
    technologies: [
      "python",
      "langgraph",
      "agentic ai",
      "lambda api",
      "typescript",
      "gemini api"
    ],
    href: "https://github.com/Open-Probe/Open-Probe",
    // image: "/projects/openprobe.png", // Add your project screenshots to public/projects/
  },
  {
    title: "PersonaAI",
    description:
      "Build and test A/B digital campaigns using millions of AI-generated personas. PersonaAI automates persona creation and variant generation to help marketers maximize engagement and conversion.",
    role: "creator",
    period: "Oct 2025",
    achievements: [
      "Won 3rd place at the lovable.dev hackathon, created this in 6 hours.",
      "Still in development, but will be released soon.",
    ],
    technologies: [
      "python",
      "microsoft phi-4",
      "gemini api",
      "typescript",
      "lovable.dev",
    ],
    href: "https://personai.lovable.app/",
  },
  {
    title: "KeyCognition",
    description:
      "Predicting cognitive load of users based on their behavior and interactions with their keyboard stroke data using machine learning models.",
    role: "team",
    period: "Nov 2025",
    achievements: [
      "Won 3rd place at the UW Databricks Hackathon, created this in 12 hours.",
      "Utilized 136 million+ keyboard stroke data to train the machine learning models.",
    ],
    technologies: [
      "python",
      "pandas",
      "numpy",
      "scikit-learn",
      "databricks",
      "azure",
      "azure ml",
      "azure sql",
    ],
    href: "https://github.com/xsuryanshx/KeyCognition",
  },
  {
    title: "Detecting GAN Generated Deepfake Images",
    description:
      "research project focused on detecting gan-generated deepfake images using custom convolutional neural network architectures. achieved state-of-the-art performance on the stylegan dataset.",
    role: "creator",
    period: "jan 2021 - june 2021",
    achievements: [
      "achieved 97.77% accuracy on the StyleGAN dataset",
      "designed custom cnn architecture optimized for deepfake detection",
    ],
    technologies: [
      "python",
      "tensorflow",
      "keras",
      "deep learning",
      "cnn",
      "computer vision",
    ],
    href: "https://github.com/xsuryanshx/Detecting-GAN-Generated-DeepFake-Images",
  },
  {
    title: "Plant-FATE",
    description:
      "Plant-FATE is an eco-evolutionary vegetation model that accounts for multi-timescale adaptations of invdividual plants and plant species to the environment.",
    role: "contributor",
    period: "Jan 2022 - Aug 2022",
    achievements: [
      "Contributed to software development for the Plant-FATE simulation model, developed key modules in C++.",
      "integrated forest patch models to simulate plant responses in climate variations, analyzed generated plots using R programming.",
    ],
    technologies: [
      "C++",
      "R",
    ],
    href: "https://github.com/jaideep777/Plant-FATE",
  }
]

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-neutral-600 dark:text-gray-400 mb-12 leading-relaxed">
        here are some of the projects i&apos;ve worked on.
      </p>

      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "AI and deep learning projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://suryansh.space/og/home?title=projects",
      },
    ],
  },
}
