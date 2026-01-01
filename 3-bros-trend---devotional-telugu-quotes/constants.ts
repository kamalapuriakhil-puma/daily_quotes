
import { Quote, BackgroundImage } from './types';

export const DEFAULT_QUOTES: Quote[] = [
  {
    id: '1',
    text: 'ధర్మమే జయం. ఎల్లప్పుడూ సత్యాన్ని పలకండి.',
    category: 'Devotional',
    author: 'పురాణాలు'
  },
  {
    id: '2',
    text: 'నీ కర్మ నీ చేతుల్లో ఉంది, ఫలితం భగవంతుడి చేతుల్లో ఉంది.',
    category: 'Devotional',
    author: 'భగవద్గీత'
  },
  {
    id: '3',
    text: 'శాంతి ఎక్కడో లేదు, నీ అంతరాత్మలోనే ఉంది.',
    category: 'Wisdom',
    author: 'అధ్యాత్మికం'
  },
  {
    id: '4',
    text: 'భక్తి అంటే భయం కాదు, భగవంతుని మీద నమ్మకం.',
    category: 'Devotional',
    author: 'స్వామి వివేకానంద'
  },
  {
    id: '5',
    text: 'లోకా సమస్తా సుఖినోభవంతు.',
    category: 'Devotional',
    author: 'వేద మంత్రం'
  }
];

export const TEMPLE_IMAGES: BackgroundImage[] = [
  {
    id: 't1',
    url: 'https://images.unsplash.com/photo-1590050752117-23a9d7f28243?q=80&w=2000',
    attribution: 'Virupaksha Temple, Hampi'
  },
  {
    id: 't2',
    url: 'https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ff?q=80&w=2000',
    attribution: 'Brihadisvara Temple, Thanjavur'
  },
  {
    id: 't3',
    url: 'https://images.unsplash.com/photo-1600100397608-f09074aa889c?q=80&w=2000',
    attribution: 'Meenakshi Amman Temple, Madurai'
  },
  {
    id: 't4',
    url: 'https://images.unsplash.com/photo-1610448721566-473f9c81b175?q=80&w=2000',
    attribution: 'Shore Temple, Mahabalipuram'
  },
  {
    id: 't5',
    url: 'https://images.unsplash.com/photo-1581390129939-946f9a890a7f?q=80&w=2000',
    attribution: 'Sun Temple, Konark'
  }
];
