import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function HouseRulesFAQSection() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('houseRules.faqs.checkInOut.question'),
      answer: t('houseRules.faqs.checkInOut.answer'),
    },
    {
      question: t('houseRules.faqs.cancellation.question'),
      answer: t('houseRules.faqs.cancellation.answer'),
    },
    {
      question: t('houseRules.faqs.deposit.question'),
      answer: t('houseRules.faqs.deposit.answer'),
    },
    {
      question: t('houseRules.faqs.pets.question'),
      answer: t('houseRules.faqs.pets.answer'),
    },
    {
      question: t('houseRules.faqs.heating.question'),
      answer: t('houseRules.faqs.heating.answer'),
    },
    {
      question: t('houseRules.faqs.noise.question'),
      answer: t('houseRules.faqs.noise.answer'),
    },
    {
      question: t('houseRules.faqs.snow.question'),
      answer: t('houseRules.faqs.snow.answer'),
    },
  ];

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[var(--almond)]/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">
            {t('houseRules.title')}
          </h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            {t('houseRules.subtitle')}
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--almond)]/10 rounded-2xl p-6 mb-8 border border-[var(--forest-roast)]/5"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--matcha-brew)]/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-[var(--matcha-brew)]" />
            </div>
            <div>
              <h3 className="text-lg mb-2 text-[var(--eclipse)]">
                {t('houseRules.infoCard.title')}
              </h3>
              <p className="text-sm text-[var(--forest-roast)]/70 leading-relaxed">
                {t('houseRules.infoCard.description')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedItems.includes(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-md border border-[var(--forest-roast)]/5 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--almond)]/5 transition-colors"
                >
                  <h3 className="text-lg text-[var(--eclipse)] pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-[var(--matcha-brew)]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-[var(--forest-roast)]/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}