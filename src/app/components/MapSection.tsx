import { motion } from 'motion/react';
import { MapPin, Navigation, Car, Plane } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function MapSection() {
  const { t } = useLanguage();
  
  // Custom map style - muted, desaturated, natural colors
  const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
    { featureType: "administrative.land_parcel", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
    { featureType: "poi", elementType: "labels.text", stylers: [{ visibility: "off" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#c8d6c0" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.arterial", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
    { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "road.local", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9d9e8" }] },
    { featureType: "water", elementType: "labels.text", stylers: [{ visibility: "off" }] },
  ];

  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11109.662728347474!2d8.028934!3d45.810573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47842f0d0f0f0f0f%3A0x0!2sAlpe%20di%20Mera!5e0!3m2!1sen!2sit!4v1234567890&style=${encodeURIComponent(JSON.stringify(mapStyles))}`;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[var(--almond)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[var(--eclipse)]">{t('map.title')}</h2>
          <p className="text-lg text-[var(--forest-roast)]/70 max-w-2xl mx-auto">
            {t('map.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map - Takes up more space now (3/5 of the grid) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--forest-roast)]/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11109.662728347474!2d8.028934!3d45.810573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47842f0d0f0f0f0f%3A0x0!2sAlpe%20di%20Mera!5e0!3m2!1sen!2sit!4v1234567890"
              width="100%"
              height="100%"
              style={{ 
                border: 0,
                filter: 'saturate(0.7) contrast(0.9) brightness(1.05)'
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-3xl"
            />
          </motion.div>

          {/* Directions - Takes up remaining space (2/5 of the grid) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-[var(--almond)]/10 rounded-3xl p-8 border border-[var(--forest-roast)]/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--matcha-brew)]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--matcha-brew)]" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-[var(--eclipse)]">Indirizzo</h3>
                  <p className="text-[var(--forest-roast)]/70 leading-relaxed">
                    Via Alpe di Mera, 23<br />
                    13020 Scopello (VC)<br />
                    Piemonte, Italia
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[var(--forest-roast)]/5">
              <h3 className="text-xl mb-6 text-[var(--eclipse)]">Distanze</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4 pb-4 border-b border-[var(--forest-roast)]/5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--almond)]/20 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-[var(--matcha-brew)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[var(--eclipse)] font-medium">Da Milano</p>
                    <p className="text-sm text-[var(--forest-roast)]/60">2h 15min (150 km)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pb-4 border-b border-[var(--forest-roast)]/5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--almond)]/20 flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 text-[var(--matcha-brew)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[var(--eclipse)] font-medium">Da Torino</p>
                    <p className="text-sm text-[var(--forest-roast)]/60">1h 45min (120 km)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pb-4 border-b border-[var(--forest-roast)]/5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--almond)]/20 flex items-center justify-center flex-shrink-0">
                    <Plane className="w-5 h-5 text-[var(--matcha-brew)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[var(--eclipse)] font-medium">Aeroporto Malpensa</p>
                    <p className="text-sm text-[var(--forest-roast)]/60">1h 50min (110 km)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--almond)]/20 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-5 h-5 text-[var(--matcha-brew)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[var(--eclipse)] font-medium">Impianti di risalita</p>
                    <p className="text-sm text-[var(--forest-roast)]/60">200 metri a piedi</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}