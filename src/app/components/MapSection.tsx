import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Car, Plane } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CASA_COORDS = { lat: 45.810573, lng: 8.028934 }; // TODO verify exact coords

declare global {
  interface Window {
    google?: {
      maps?: any;
    };
  }
}

export function MapSection() {
  const { t, language } = useLanguage();
  const [isMapInteractive, setIsMapInteractive] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
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

  const addressText = 'Località Alpe di Mera, 1, 13028 Mera (VC)';
  const addressQuery = encodeURIComponent(addressText);
  const openMapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`;
  const markerLabel = t('map.markerLabel');
  const iframeSrc = `https://www.google.com/maps?q=${addressQuery}&output=embed`;

  const addressLines = [
    t('map.address.line1'),
    t('map.address.line2'),
    t('map.address.line3'),
  ];

  const distances = [
    {
      icon: Car,
      label: t('map.distances.milan.label'),
      value: t('map.distances.milan.value'),
    },
    {
      icon: Car,
      label: t('map.distances.turin.label'),
      value: t('map.distances.turin.value'),
    },
    {
      icon: Plane,
      label: t('map.distances.malpensa.label'),
      value: t('map.distances.malpensa.value'),
    },
    {
      icon: Navigation,
      label: t('map.distances.chairlift.label'),
      value: t('map.distances.chairlift.value'),
    },
  ];

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      if (import.meta.env.DEV) {
        console.warn('VITE_GOOGLE_MAPS_API_KEY is missing. Falling back to iframe.');
      }
      setMapLoadError(true);
      return;
    }

    if (!mapContainerRef.current) {
      return;
    }

    const loadGoogleMaps = () =>
      new Promise<void>((resolve, reject) => {
        if (window.google?.maps) {
          resolve();
          return;
        }

        const existingScript = document.getElementById('google-maps-js');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => reject(new Error('Google Maps failed to load.')));
          return;
        }

        const script = document.createElement('script');
        script.id = 'google-maps-js';
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&loading=async&region=IT&language=${language}`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Google Maps failed to load.'));
        document.head.appendChild(script);
      });

    let isMounted = true;

    loadGoogleMaps()
      .then(() => {
        if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) {
          return;
        }
        if (!window.google?.maps) {
          throw new Error('Google Maps not available after load.');
        }

        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: CASA_COORDS,
          zoom: 15,
          styles: mapStyles,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: true,
          gestureHandling: 'none',
          clickableIcons: false,
        });

        // Marker for Casetta Mera
        markerRef.current = new window.google.maps.Marker({
          position: CASA_COORDS,
          map,
          title: markerLabel,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: '#677D6A',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          },
        });

        mapInstanceRef.current = map;
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.error(error);
        }
        setMapLoadError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [language, mapStyles, markerLabel]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    mapInstanceRef.current.setOptions({
      gestureHandling: isMapInteractive ? 'auto' : 'none',
      scrollwheel: isMapInteractive,
      draggable: isMapInteractive,
      keyboardShortcuts: isMapInteractive,
    });
  }, [isMapInteractive]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setTitle(markerLabel);
    }
  }, [language, markerLabel]);

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
            className="lg:col-span-3 relative h-[380px] lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--forest-roast)]/10"
            aria-label={t('map.ariaLabel')}
          >
            {!isMapInteractive && (
              <button
                type="button"
                onClick={() => setIsMapInteractive(true)}
                className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 text-[var(--eclipse)] text-sm font-medium backdrop-blur-[2px]"
              >
                <span className="px-4 py-2 rounded-full bg-white/90 shadow-md border border-[var(--forest-roast)]/10">
                  {t('map.interact')}
                </span>
              </button>
            )}

            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
              <a
                href={openMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 text-xs font-medium text-[var(--eclipse)] shadow-md border border-[var(--forest-roast)]/10 hover:bg-white"
              >
                {t('map.openInMaps')}
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 text-xs font-medium text-[var(--eclipse)] shadow-md border border-[var(--forest-roast)]/10 hover:bg-white"
              >
                {t('map.directionsCta')}
              </a>
            </div>

            {!mapLoadError ? (
              <div
                ref={mapContainerRef}
                className="h-full w-full"
                aria-label={t('map.embedTitle')}
                role="application"
                tabIndex={0}
              />
            ) : (
              <iframe
                src={iframeSrc}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'saturate(0.7) contrast(0.9) brightness(1.05)',
                  pointerEvents: isMapInteractive ? 'auto' : 'none',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('map.embedTitle')}
                className="rounded-3xl"
              />
            )}
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
                  <h3 className="text-xl mb-2 text-[var(--eclipse)]">{t('map.address.title')}</h3>
                  <div className="text-[var(--forest-roast)]/70 leading-relaxed space-y-1">
                    {addressLines.map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[var(--forest-roast)]/5">
              <h3 className="text-xl mb-6 text-[var(--eclipse)]">{t('map.distances.title')}</h3>
              <div className="space-y-5">
                {distances.map((distance, index) => {
                  const Icon = distance.icon;
                  const showDivider = index < distances.length - 1;

                  return (
                    <div
                      key={distance.label}
                      className={`flex items-center gap-4 ${showDivider ? 'pb-4 border-b border-[var(--forest-roast)]/5' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[var(--almond)]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[var(--matcha-brew)]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[var(--eclipse)] font-medium">{distance.label}</p>
                        <p className="text-sm text-[var(--forest-roast)]/60">{distance.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
