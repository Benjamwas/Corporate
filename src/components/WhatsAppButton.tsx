import React from 'react';
import { MessageCircleIcon } from 'lucide-react';
import { profile } from '../data/profile';
import { buildWhatsappLink } from '../utils/assistant';
import { useUi } from '../contexts/UiContext';

export function WhatsAppButton() {
  const { interestedService, assistantOpen } = useUi();

  const message = interestedService ?
  `Hello Dr. Kennedy, I found your website and would like to discuss ${interestedService.toLowerCase()}.` :
  profile.defaultWhatsappMessage;

  if (assistantOpen) return null;

  return (
    <a
      href={buildWhatsappLink(profile.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Dr. Kennedy on WhatsApp"
      className="glass fixed bottom-[5.6rem] right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full text-accent transition-[border-color,transform] duration-200 ease-premium hover:border-accent/50 hover:-translate-y-0.5 sm:bottom-[6.2rem] sm:right-6">
      
      <MessageCircleIcon className="h-5 w-5" />
    </a>);

}