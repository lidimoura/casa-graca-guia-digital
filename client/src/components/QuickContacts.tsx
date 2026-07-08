import { Phone, MessageCircle, ExternalLink } from 'lucide-react';

interface QuickContactsProps {
  lang: string;
  hostWhatsApp: string;
}

const labels = {
  pt: { call: 'Ligar', whatsapp: 'WhatsApp', airbnb: 'Airbnb' },
  en: { call: 'Call', whatsapp: 'WhatsApp', airbnb: 'Airbnb' },
  es: { call: 'Llamar', whatsapp: 'WhatsApp', airbnb: 'Airbnb' },
};

export function QuickContacts({ lang, hostWhatsApp }: QuickContactsProps) {
  const t = labels[lang as keyof typeof labels] || labels.pt;
  const clean = hostWhatsApp.replace(/\D/g, '');

  return (
    <div className="quick-contact-bar md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${clean}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border font-semibold text-xs transition-all"
          style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
        >
          <Phone className="w-4 h-4" />
          {t.call}
        </a>
        <a
          href={`https://wa.me/${clean}?text=${encodeURIComponent('Olá Graça! Vi seu guia digital e gostaria de saber mais sobre a hospedagem.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-xs text-white transition-all"
          style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
        >
          <MessageCircle className="w-4 h-4" />
          {t.whatsapp}
        </a>
        <a
          href="https://airbnb.com.br/rooms/1703136467602003248"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-xs text-white transition-all"
          style={{ background: 'linear-gradient(135deg,#FF5A5F,#E31C5F)' }}
        >
          <ExternalLink className="w-4 h-4" />
          {t.airbnb}
        </a>
      </div>
    </div>
  );
}
