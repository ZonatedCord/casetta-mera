import { useLanguage } from '../context/LanguageContext';

export function FaqPage() {
  const { t } = useLanguage();

  const items = [
    { id: 'checkin', q: t('faqPage.items.checkin.q'), a: t('faqPage.items.checkin.a') },
    { id: 'parking', q: t('faqPage.items.parking.q'), a: t('faqPage.items.parking.a') },
    { id: 'lifts', q: t('faqPage.items.lifts.q'), a: t('faqPage.items.lifts.a') },
    { id: 'accessibility', q: t('faqPage.items.accessibility.q'), a: t('faqPage.items.accessibility.a') },
    { id: 'pets', q: t('faqPage.items.pets.q'), a: t('faqPage.items.pets.a') },
    { id: 'linens', q: t('faqPage.items.linens.q'), a: t('faqPage.items.linens.a') },
    { id: 'skiStorage', q: t('faqPage.items.skiStorage.q'), a: t('faqPage.items.skiStorage.a') },
  ];

  return (
    <main className="pt-28 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl text-[var(--eclipse)] mb-10">{t('faqPage.title')}</h1>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-6 shadow-lg border border-[var(--forest-roast)]/5">
              <h2 className="text-lg text-[var(--eclipse)] mb-2">{item.q}</h2>
              <p className="text-[var(--forest-roast)]/75 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
