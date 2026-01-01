
export interface Quote {
  id: string;
  text: string;
  author?: string;
  category: 'Devotional' | 'Wisdom' | 'Daily';
}

export interface BackgroundImage {
  id: string;
  url: string;
  attribution: string;
}
