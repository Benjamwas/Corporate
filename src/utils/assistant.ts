import { fallbackAnswer, knowledgeBase, type KnowledgeEntry } from '../data/knowledgeBase';

export interface AssistantReply {
  answer: string;
  topic: string;
  consultationIntent: boolean;
}

function scoreEntry(entry: KnowledgeEntry, normalised: string): number {
  return entry.keywords.reduce((score, keyword) => {
    if (normalised.includes(keyword)) {
      return score + keyword.length;
    }
    return score;
  }, 0);
}

export function answerQuestion(question: string): AssistantReply {
  const normalised = question.toLowerCase();
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = scoreEntry(entry, normalised);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best) {
    return { answer: fallbackAnswer, topic: 'General enquiry', consultationIntent: false };
  }

  const projectSignals = ['our', 'we ', 'we\'re', 'my company', 'my organisation', 'my organization', 'need help', 'project', 'quote', 'proposal'];
  const hasProjectSignal = projectSignals.some((signal) => normalised.includes(signal));

  let answer = best.answer;
  if (best.consultationIntent && hasProjectSignal) {
    answer +=
    '\n\nIf you tell me a little about your project — sector, scale and the decision you are trying to make — I can help determine whether a consultation would be relevant.';
  }

  return {
    answer,
    topic: best.topic,
    consultationIntent: Boolean(best.consultationIntent && hasProjectSignal)
  };
}

export function buildWhatsappLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}