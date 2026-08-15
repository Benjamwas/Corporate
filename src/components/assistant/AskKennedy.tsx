import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpIcon,
  CalendarCheckIcon,
  MessageCircleIcon,
  SendIcon,
  SparklesIcon,
  XIcon } from
'lucide-react';
import { suggestedPrompts } from '../../data/knowledgeBase';
import { profile } from '../../data/profile';
import { answerQuestion, buildWhatsappLink } from '../../utils/assistant';
import { useUi } from '../../contexts/UiContext';
import { LeadForm } from '../LeadForm';
import { cn } from '../../utils/cn';

interface Message {
  id: string;
  role: 'assistant' | 'visitor';
  text: string;
}

const greeting: Message = {
  id: 'greeting',
  role: 'assistant',
  text: "Hello — I'm the assistant for Dr. Kennedy Ndue Mutua. Ask me about his expertise, research, roles or advisory areas, and I'll answer from his professional record."
};

export function AskKennedy() {
  const { assistantOpen, openAssistant, closeAssistant, seedQuestion, clearSeed } = useUi();
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [view, setView] = useState<'chat' | 'handoff'>('chat');
  const [topic, setTopic] = useState('General enquiry');
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = useCallback((question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: `v-${Date.now()}`, role: 'visitor', text: trimmed }]);
    setInput('');
    setThinking(true);

    window.setTimeout(() => {
      const reply = answerQuestion(trimmed);
      setTopic(reply.topic);
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: reply.answer }]);
      setThinking(false);
      setShowActions((prev) => prev || reply.consultationIntent);
    }, 520);
  }, []);

  useEffect(() => {
    if (assistantOpen && seedQuestion) {
      send(seedQuestion);
      clearSeed();
    }
  }, [assistantOpen, seedQuestion, send, clearSeed]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking, showActions]);

  const exchanges = messages.filter((m) => m.role === 'visitor').length;
  const actionsVisible = showActions || exchanges >= 2;
  const transcript = messages.
  map((m) => `${m.role === 'assistant' ? 'Assistant' : 'Visitor'}: ${m.text}`).
  join('\n');

  return (
    <>
      <AnimatePresence>
        {!assistantOpen &&
        <motion.button
          type="button"
          onClick={() => openAssistant()}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="glass-strong fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full py-3 pl-4 pr-5 text-left transition-[border-color,transform] duration-200 ease-premium hover:border-accent/40 sm:bottom-6 sm:right-6">
          
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-contrast">
              <SparklesIcon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-medium text-ink">Ask Kennedy</span>
              <span className="hidden text-[11px] text-ink-subtle sm:block">Expertise • research • work</span>
            </span>
          </motion.button>
        }
      </AnimatePresence>

      <AnimatePresence>
        {assistantOpen &&
        <motion.aside
          role="dialog"
          aria-label="Ask Kennedy assistant"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="glass-strong fixed inset-0 z-50 flex flex-col overflow-hidden rounded-none sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[38rem] sm:w-[26rem] sm:rounded-4xl">
          
            <header className="flex items-start justify-between gap-3 border-b border-line/60 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent text-accent-contrast">
                  <SparklesIcon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <h2 className="font-display text-[15px] font-semibold text-ink">Ask Kennedy</h2>
                  <p className="text-[11.5px] text-ink-subtle">
                    Explore his expertise, research and sustainability work.
                  </p>
                </div>
              </div>
              <button
              type="button"
              onClick={closeAssistant}
              aria-label="Close assistant"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line/70 text-ink-muted transition-colors duration-200 hover:text-accent">
              
                <XIcon className="h-4 w-4" />
              </button>
            </header>

            {view === 'chat' ?
          <>
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.map((message) =>
              <div
                key={message.id}
                className={cn(
                  'max-w-[88%] whitespace-pre-line rounded-3xl px-4 py-3 text-[13.5px] leading-relaxed',
                  message.role === 'assistant' ?
                  'border border-line/60 bg-canvas/70 text-ink' :
                  'ml-auto bg-accent text-accent-contrast'
                )}>
                
                      {message.text}
                    </div>
              )}

                  {thinking &&
              <div className="flex items-center gap-1.5 rounded-3xl border border-line/60 bg-canvas/70 px-4 py-3">
                      {[0, 1, 2].map((i) =>
                <motion.span
                  key={i}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                  className="h-1.5 w-1.5 rounded-full bg-accent" />

                )}
                    </div>
              }

                  {exchanges === 0 && !thinking &&
              <div className="space-y-2 pt-1">
                      {suggestedPrompts.slice(0, 5).map((prompt) =>
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  className="flex w-full items-center justify-between gap-2 rounded-2xl border border-line/60 px-3.5 py-2.5 text-left text-[12.5px] text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
                  
                          {prompt}
                          <ArrowUpIcon className="h-3.5 w-3.5 rotate-45" aria-hidden="true" />
                        </button>
                )}
                    </div>
              }

                  {actionsVisible && !thinking &&
              <div className="rounded-3xl border border-accent/25 bg-accent/8 p-3.5">
                      <p className="text-[13px] font-medium text-ink">
                        Would you like Kennedy to review this request?
                      </p>
                      <div className="mt-3 flex flex-col gap-2">
                        <button
                    type="button"
                    onClick={() => setView('handoff')}
                    className="flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-medium text-accent-contrast transition-[filter] duration-200 hover:brightness-110">
                    
                          <SendIcon className="h-3.5 w-3.5" /> Send This Conversation
                        </button>
                        <BookingLink onNavigate={closeAssistant} />
                        <a
                    href={buildWhatsappLink(
                      profile.whatsapp,
                      `Hello Dr. Kennedy, I was using the assistant on your website about ${topic.toLowerCase()} and would like to continue the conversation.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-line/70 px-4 py-2.5 text-[13px] text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
                    
                          <MessageCircleIcon className="h-3.5 w-3.5" /> Continue on WhatsApp
                        </a>
                      </div>
                    </div>
              }
                </div>

                <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line/60 p-3">
              
                  <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about his work…"
                aria-label="Your question"
                className="h-11 flex-1 rounded-full border border-line/70 bg-canvas/60 px-4 text-[13.5px] text-ink placeholder:text-ink-subtle focus:border-accent/60 focus:outline-none" />
              
                  <button
                type="submit"
                aria-label="Send question"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast transition-[filter] duration-200 hover:brightness-110">
                
                    <SendIcon className="h-4 w-4" />
                  </button>
                </form>
              </> :

          <div className="flex-1 overflow-y-auto p-4">
                <h3 className="font-display text-base font-semibold text-ink">Send this to Kennedy</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                  Topic detected: <span className="text-accent">{topic}</span>. Your details go straight to
                  Kennedy with the conversation attached.
                </p>
                <div className="mt-4">
                  <LeadForm source="Ask Kennedy" transcript={transcript} defaultTopic={topic} compact />
                </div>
                <button
              type="button"
              onClick={() => setView('chat')}
              className="mt-4 text-[12.5px] text-ink-subtle transition-colors duration-200 hover:text-accent">
              
                  ← Back to the conversation
                </button>
              </div>
          }
          </motion.aside>
        }
      </AnimatePresence>
    </>);

}

function BookingLink({ onNavigate }: {onNavigate: () => void;}) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        onNavigate();
        navigate('/booking');
      }}
      className="flex items-center gap-2 rounded-full border border-line/70 px-4 py-2.5 text-[13px] text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent">
      
      <CalendarCheckIcon className="h-3.5 w-3.5" /> Book Consultation
    </button>);

}