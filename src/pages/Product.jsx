import { Globe2, Languages, MapPin, MapPinned, MessageCircleHeart, Search, Sparkles, Volume2 } from 'lucide-react';
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

const hanavoyaUrl = 'https://lovable.dev/preview/YL0o7LzqBK57FdmZAsyVV6G0he0m3ezH';

function HanaVoyaPreview() {
  return (
    <div className="product-preview">
      <div className="preview-title"><h3>Stockholm today</h3><span className="status-badge">LIVE PREVIEW</span></div>
      <div className="preview-search"><Search size={15} /><span>Search events, food and hidden places</span></div>
      <div className="route-map is-compact">
        <svg viewBox="0 0 480 300" role="img" aria-label="Animated Stockholm discovery route">
          <path className="map-grid" d="M0 54H480M0 112H480M0 170H480M0 228H480M72 0V300M154 0V300M236 0V300M318 0V300M400 0V300" />
          <path className="water-line" d="M-12 240C86 208 80 125 170 136S272 232 330 180 386 68 500 58" />
          <path className="route-line" d="M72 230C120 182 145 206 190 151S265 118 315 91 374 112 418 55" />
          <circle className="route-point-light" cx="72" cy="230" r="8" /><circle className="route-point-blue" cx="315" cy="91" r="9" /><circle className="route-point-light" cx="418" cy="55" r="8" />
        </svg>
        <span className="map-label label-one"><MapPin size={11} /> Södermalm</span><span className="map-label label-two"><MapPin size={11} /> Djurgården</span>
      </div>
      <div className="filter-row"><span className="active">Today</span><span>Free</span><span>Culture</span><span>Food</span></div>
    </div>
  );
}

export default function Product({ id }) {
  return (
    <section id={id} className="page-section bg-pine-950 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="HanaMood"
          title="Talk to AI like a friend."
          text="HanaMood is a conversational AI companion that recognizes mood, needs, and context, then offers personalized ideas for routines, food, drinks, activities, focus, and everyday wellbeing."
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
                HanaMood is built as a companion experience, designed for natural
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
                Discuss HanaMood
              </Button>
            </div>
          </div>

          <div className="rounded-[8px] border border-pine-200/10 bg-[#02110b] p-5 shadow-soft sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine-300">
              Conversational Preview
            </p>
            <div className="mt-4 rounded-[8px] border border-pine-200/10 bg-pine-950/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-pine-100">HanaMood</p>
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
            eyebrow="HanaMood Vision"
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

        <div className="mt-16 border-t border-pine-200/10 pt-16">
          <SectionHeader
            eyebrow="HanaVoya · Beta / Preview"
            title="Discover Stockholm in your own language."
            text="HanaVoya helps tourists, immigrants, and international residents discover events, culture, food, and hidden places with multilingual context, audio support, maps, search, and saved favourites."
            tone="dark"
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [<Languages className="h-5 w-5 text-pine-300" aria-hidden="true" />, 'Nine languages with Persian and Arabic RTL'],
                  [<Search className="h-5 w-5 text-pine-300" aria-hidden="true" />, 'Search and filters for events and places'],
                  [<MapPinned className="h-5 w-5 text-pine-300" aria-hidden="true" />, 'Map-ready Stockholm exploration'],
                  [<Volume2 className="h-5 w-5 text-pine-300" aria-hidden="true" />, 'Audio, saved favourites, profiles and interests'],
                ].map(([icon, text]) => (
                  <article key={text} className="rounded-[8px] border border-pine-200/10 bg-pine-900/50 p-4">
                    {icon}
                    <p className="mt-3 text-sm font-semibold leading-6 text-pine-100">{text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-pine-100/75">HanaVoya is a separate HanaTech product. It is currently a working beta and does not replace HanaMood or HanaTech’s engineering services.</p>
              <Button href={hanavoyaUrl} className="mt-7" external>Explore HanaVoya</Button>
            </div>
            <HanaVoyaPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
