import { useLanguage } from '../context/LanguageContext';

export function PrivacyPage() {
  const { t } = useLanguage();

  const sections = [
    { id: 'controller', title: t('privacy.sections.controller.title'), body: t('privacy.sections.controller.body') },
    { id: 'data', title: t('privacy.sections.data.title'), body: t('privacy.sections.data.body') },
    { id: 'purpose', title: t('privacy.sections.purpose.title'), body: t('privacy.sections.purpose.body') },
    { id: 'retention', title: t('privacy.sections.retention.title'), body: t('privacy.sections.retention.body') },
    { id: 'sharing', title: t('privacy.sections.sharing.title'), body: t('privacy.sections.sharing.body') },
    { id: 'rights', title: t('privacy.sections.rights.title'), body: t('privacy.sections.rights.body') },
    { id: 'cookies', title: t('privacy.sections.cookies.title'), body: t('privacy.sections.cookies.body') },
  ];

  return (
    <main className="pt-28 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl text-[var(--eclipse)] mb-3">{t('privacy.title')}</h1>
        <p className="text-sm text-[var(--forest-roast)]/60 mb-10">{t('privacy.lastUpdated')}</p>
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
