import { useLanguage } from '../context/LanguageContext';

export function TermsPage() {
  const { t } = useLanguage();

  const sections = [
    { id: 'object', title: t('terms.sections.object.title'), body: t('terms.sections.object.body') },
    { id: 'quote', title: t('terms.sections.quote.title'), body: t('terms.sections.quote.body') },
    { id: 'pricing', title: t('terms.sections.pricing.title'), body: t('terms.sections.pricing.body') },
    { id: 'checkin', title: t('terms.sections.checkin.title'), body: t('terms.sections.checkin.body') },
    { id: 'houseRules', title: t('terms.sections.houseRules.title'), body: t('terms.sections.houseRules.body') },
    { id: 'pets', title: t('terms.sections.pets.title'), body: t('terms.sections.pets.body') },
    { id: 'accessibility', title: t('terms.sections.accessibility.title'), body: t('terms.sections.accessibility.body') },
    { id: 'cancellations', title: t('terms.sections.cancellations.title'), body: t('terms.sections.cancellations.body') },
    { id: 'liability', title: t('terms.sections.liability.title'), body: t('terms.sections.liability.body') },
    { id: 'website', title: t('terms.sections.website.title'), body: t('terms.sections.website.body') },
  ];

  return (
    <main className="pt-28 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl text-[var(--eclipse)] mb-3">{t('terms.title')}</h1>
        <p className="text-sm text-[var(--forest-roast)]/60 mb-10">{t('terms.lastUpdated')}</p>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-xl text-[var(--eclipse)] mb-2">{section.title}</h2>
              <p className="text-[var(--forest-roast)]/75 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
