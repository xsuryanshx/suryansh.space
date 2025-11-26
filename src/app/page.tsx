import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"

const workItems: Item[] = [
  {
    title: "ascentt",
    role: "principal ai engineer",
    period: "mar 2024 - sept 2025",
    description:
      "Backend for ToyotaGPT (ChatGPT equivalent) serving 74,000+ daily users and developed scalable Agentic RAG pipelines processing over TBs of enterprise data.",
    href: "https://ascentt.com",
  },
  {
    title: "taptable.club",
    role: "founding engineer",
    period: "aug 2024 - dec 2024",
    description:
      "Engineered core AI backend features, including GenAI visuals and automated menu digitization, driving rapid platform scale to 100+ daily orders within the first month.",
    href: "https://taptable.club",
  },
  {
    title: "deloitte usi",
    role: "data scientist - ai center of excellence",
    period: "july 2022 - mar 2024",
    description:
      "Collaborated on cybersecurity NLP research to engineer autoencoder-based zero-day threat detection and ensemble classification models for multi-document automation pipelines.",
    href: "https://www2.deloitte.com",
  },
  {
    title: "scienaptic ai",
    role: "data scientist intern",
    period: "july 2021 - dec 2021",
    description:
      "Optimized credit underwriting ML models on 100MM+ credit records, driving an 11.5% increase in application approvals for diverse risk segments.",
    href: "https://scienaptic.ai",
  },
]

const projectItems: Item[] = [
  {
    title: "openprobe",
    role: "creator",
    description:
      "an open-source deep research agent using python, langchain, and langgraph. designed to outperform existing search and research systems through advanced multi-hop reasoning capabilities.",
    href: "https://github.com/Open-Probe/Open-Probe",
  },

  {
    title: "detecting gan generated deepfake images",
    role: "creator",
    description:
      "researched custom cnn architecture for deepfake detection, achieving 97.77% accuracy on the stylegan dataset using python, tensorflow, and deep learning.",
    href: "https://github.com/xsuryanshx/Detecting-GAN-Generated-DeepFake-Images",
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <SectionList title="work" items={workItems} />
      <section className="mb-16 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-neutral-900 dark:text-white">
          <span className="text-accent mr-2">*</span> education
        </h2>
        <div className="space-y-3 text-neutral-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <a
              href="https://www.washington.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-white hover:text-accent dark:hover:text-accent transition-colors"
            >
              university of washington
            </a>
            <span className="text-neutral-400 dark:text-gray-500">•</span>
            <span className="text-neutral-600 dark:text-gray-400">sept 2025 - mar 2027</span>
            <span className="text-neutral-400 dark:text-gray-500">•</span>
            <span className="text-neutral-600 dark:text-gray-400">seattle, wa</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.bits-pilani.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 dark:text-white hover:text-accent dark:hover:text-accent transition-colors"
            >
              bits pilani
            </a>
            <span className="text-neutral-400 dark:text-gray-500">•</span>
            <span className="text-neutral-600 dark:text-gray-400">aug 2018 - july 2022</span>
            <span className="text-neutral-400 dark:text-gray-500">•</span>
            <span className="text-neutral-600 dark:text-gray-400">goa, india</span>
          </div>
        </div>
      </section>
      <BlogSection />
      <SectionList
        title="projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="all projects"
      />
      <section className="mb-16 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-neutral-900 dark:text-white">
          <span className="text-accent mr-2">*</span> skills
        </h2>
        <div className="space-y-4 text-neutral-600 dark:text-gray-300">
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-2">languages</h3>
            <p className="text-neutral-600 dark:text-gray-400">
              python, sql, c++, java, typescript, bash, matlab, r
            </p>
          </div>
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-2">developer tools</h3>
            <p className="text-neutral-600 dark:text-gray-400">
              git, microsoft azure, aws, s3, dynamodb, docker, redis, mongodb, postgresql, neo4j
            </p>
          </div>
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-2">frameworks</h3>
            <p className="text-neutral-600 dark:text-gray-400">
              pytorch, tensorflow, keras, spacy, opencv, cuda, langchain, llamaindex, streamlit, beautifulsoup, selenium
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
