export type ToolGuideSection = {
  title: string;
  content: string;
};

export type ToolGuideStep = {
  step: string;
  description: string;
};

export type ToolGuideProps = {
  /** Main heading for the guide section */
  title: string;
  /** "What is [Tool]?" overview paragraph */
  overview: string;
  /** Step-by-step how-to-use instructions */
  steps: ToolGuideStep[];
  /** Key features / differentiators as bullet points */
  features: string[];
  /** Common real-world use cases */
  useCases: string[];
  /** Optional additional sections */
  additionalSections?: ToolGuideSection[];
};

export default function ToolGuide({
  title,
  overview,
  steps,
  features,
  useCases,
  additionalSections,
}: ToolGuideProps) {
  return (
    <section className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 mb-8 space-y-8">
      {/* Overview */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-3">{title}</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          {overview}
        </p>
      </div>

      {/* How to Use */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          How to Use This Tool
        </h3>
        <ol className="space-y-3">
          {steps.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <div>
                <span className="font-semibold text-slate-800">
                  {item.step}
                </span>
                <span className="text-slate-600 text-sm md:text-base">
                  {' — '}
                  {item.description}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">
          Why Use This Tool?
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm md:text-base text-slate-600"
            >
              <span className="text-emerald-500 mt-1 flex-shrink-0">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Common Use Cases */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">
          Common Use Cases
        </h3>
        <ul className="space-y-2">
          {useCases.map((useCase, index) => (
            <li
              key={index}
              className="text-sm md:text-base text-slate-600 leading-relaxed pl-4 border-l-2 border-indigo-200"
            >
              {useCase}
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Sections */}
      {additionalSections?.map((section, index) => (
        <div key={index}>
          <h3 className="text-lg font-bold text-slate-800 mb-3">
            {section.title}
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            {section.content}
          </p>
        </div>
      ))}
    </section>
  );
}
