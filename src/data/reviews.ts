export interface Review {
  id: number;
  text: string;
  rating: number;
  source: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    text: 'Willing to answer any questions I had. Provided early updates to provide the best possible report. And delivered the report early. Quick to respond, very happy with my order.',
    rating: 5,
    source: 'Fiverr',
  },
  {
    id: 2,
    text: 'Went above and beyond, and delivered a great product',
    rating: 5,
    source: 'Fiverr',
  },
  {
    id: 3,
    text: 'Excellent understanding of astrocartography and delivery of information and time. Would do buy again.',
    rating: 5,
    source: 'Fiverr',
  },
  {
    id: 4,
    text: 'This was a great treat for me and it did not disappoint. Shed light into some details I needed to hear.',
    rating: 5,
    source: 'Fiverr',
  },
  {
    id: 5,
    text: 'Ashley, provided a great in-depth reading. Which was very insightful. She was also very professional and was excellent to deal with. Would recommend.',
    rating: 5,
    source: 'Fiverr',
  },
  {
    id: 6,
    text: 'Thank you, this report was beautifully written. Pleasure ordering from',
    rating: 5,
    source: 'Fiverr',
  },
];

// Short reviews for inline social proof on homepage/shop
export const featuredReviews = [reviews[0], reviews[4], reviews[3]];
