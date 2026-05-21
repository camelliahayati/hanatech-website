import { Globe2, MessageCircleHeart, Sparkles } from 'lucide-react';
import Button from '../components/Button.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { productFeatures } from '../data/services.js';

const chatMockup = [
  {
    role: 'ai',
    text: 'You sound a bit tired today. Want a lighter routine and a calm dinner suggestion?',
  },
  {
    role: 'user',
    text: 'Yes, and maybe a non-caffeinated evening drink.',
  },
  {
    role: 'ai',
    text: 'Great choice. I suggest a short walk, simple salmon bowl, and chamomile with citrus.',
  },
];

const visionHighlights = [
  'Conversational AI interaction',
  'Mood and sentiment understanding',
  'Personalized recommendations',
  'Multilingual communication',
  'AI-assisted routines and productivity',
  'Future-ready platform architecture',
];

export default function Product({ id }) {
  return (
    <section id={id} className="page-section bg-pine-950 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="HanaAI Platform"
          title="Talk to AI like a friend."
          text="Our conversational AI platform understands your mood, needs, and context and offers personalized suggestions for food, daily routines, drinks, activities, and much more."
          tone="dark"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {productFeatures.map((feature) => (
                <article
                  key={feature}
                  className="rounded-[8px] border border-pine-200/10 bg-pine-900/50 p-4"
                >
                  <p className="text-sm font-semibold text-pine-100">{feature}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[8px] border border-pine-200/10 bg-pine-900/55 p-5">
              <p className="text-sm leading-7 text-pine-100/80">
                HanaAI is built as a companion experience, designed for natural
                conversation, emotional context awareness, and multilingual
                dialogue. The long-term roadmap includes a dedicated mobile app
                vision for everyday personal assistance.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-pine-950/80 px-4 py-2 text-sm text-pine-100">
                  <MessageCircleHeart className="h-4 w-4" />
                  Human-like conversation
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-pine-950/80 px-4 py-2 text-sm text-pine-100">
                  <Globe2 className="h-4 w-4" />
                  Designed for multilingual communication worldwide
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-pine-950/80 px-4 py-2 text-sm text-pine-100">
                  <Sparkles className="h-4 w-4" />
                  Companion AI experience
                </span>
              </div>
              <Button href="#contact" className="mt-7">
                Request product consultation
              </Button>
            </div>
          </div>

          <div className="rounded-[8px] border border-pine-200/10 bg-[#02110b] p-5 shadow-soft sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine-300">
              Conversational Preview
            </p>
            <div className="mt-4 rounded-[8px] border border-pine-200/10 bg-pine-950/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-pine-100">HanaAI</p>
                <span className="rounded-full bg-pine-800 px-3 py-1 text-xs text-pine-100">
                  Active
                </span>
              </div>
              <div className="grid gap-3">
                {chatMockup.map((message) => (
                  <div
                    key={message.text}
                    className={`max-w-[92%] rounded-[8px] px-4 py-3 text-sm leading-6 ${
                      message.role === 'ai'
                        ? 'bg-pine-900 text-pine-100'
                        : 'ml-auto bg-pine-200 text-pine-950'
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-pine-100/70">
              Designed for emotionally aware dialogue, contextual routine
              guidance, and lifestyle recommendations with a trusted AI tone.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-[8px] border border-pine-200/10 bg-pine-900/55 p-6 shadow-soft sm:p-8">
          <SectionHeader
            eyebrow="HanaAI Vision"
            title="Practical, human-centered conversational AI for everyday assistance"
            text="HanaTech is building a conversational AI experience focused on practical daily assistance, multilingual interaction, and human-centered AI communication."
            tone="dark"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visionHighlights.map((item) => (
              <article
                key={item}
                className="rounded-[8px] border border-pine-200/10 bg-pine-950/75 p-4"
              >
                <p className="text-sm font-semibold text-pine-100">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
