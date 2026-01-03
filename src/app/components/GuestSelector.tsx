import { Users, Baby, Dog, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface GuestSelectorProps {
  adults: number;
  children: number;
  pets: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onPetsChange: (value: number) => void;
}

export function GuestSelector({
  adults,
  children,
  pets,
  onAdultsChange,
  onChildrenChange,
  onPetsChange,
}: GuestSelectorProps) {
  const GuestRow = ({ 
    icon: Icon, 
    label, 
    description, 
    value, 
    onChange, 
    min = 0, 
    max = 10 
  }: { 
    icon: any; 
    label: string; 
    description: string; 
    value: number; 
    onChange: (val: number) => void; 
    min?: number; 
    max?: number; 
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-[var(--forest-roast)]/5 last:border-0">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--almond)]/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[var(--matcha-brew)]" />
        </div>
        <div>
          <p className="text-[var(--eclipse)] font-medium">{label}</p>
          <p className="text-sm text-[var(--forest-roast)]/60">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center transition-all
            ${value <= min 
              ? 'bg-[var(--forest-roast)]/5 text-[var(--forest-roast)]/30 cursor-not-allowed' 
              : 'bg-[var(--almond)]/20 hover:bg-[var(--almond)]/40 text-[var(--eclipse)]'
            }
          `}
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="text-[var(--eclipse)] font-medium w-8 text-center">
          {value}
        </span>
        
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center transition-all
            ${value >= max 
              ? 'bg-[var(--forest-roast)]/5 text-[var(--forest-roast)]/30 cursor-not-allowed' 
              : 'bg-[var(--almond)]/20 hover:bg-[var(--almond)]/40 text-[var(--eclipse)]'
            }
          `}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-[var(--forest-roast)]/10"
    >
      <h3 className="text-2xl mb-6 text-[var(--eclipse)]">Ospiti</h3>
      
      <div className="space-y-1">
        <GuestRow
          icon={Users}
          label="Adulti"
          description="Età 13 o superiore"
          value={adults}
          onChange={onAdultsChange}
          min={1}
          max={8}
        />
        
        <GuestRow
          icon={Baby}
          label="Bambini"
          description="Età 2-12"
          value={children}
          onChange={onChildrenChange}
          min={0}
          max={5}
        />
        
        <GuestRow
          icon={Dog}
          label="Animali domestici"
          description="Cani e gatti ammessi"
          value={pets}
          onChange={onPetsChange}
          min={0}
          max={3}
        />
      </div>
      
      <div className="mt-6 pt-6 border-t border-[var(--forest-roast)]/10">
        <p className="text-sm text-[var(--forest-roast)]/60">
          Capacità massima: 8 ospiti • Gli animali domestici potrebbero comportare un costo aggiuntivo
        </p>
      </div>
    </motion.div>
  );
}
