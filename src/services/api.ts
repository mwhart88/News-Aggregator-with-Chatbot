import { Article, ArticleResponse, SearchParams } from '../types';

// Mock data for development
const MOCK_ARTICLES: Article[] = [
  // Sports category
  {
    id: 's1',
    title: 'Gold Coast recruit Daniel Rioli \'emotional\' after leading Suns to stunning win over Western Bulldogs',
    description: 'The prized recruit celebrated his Darwin homecoming in style.',
    content: 'The prized recruit celebrated his Darwin homecoming in style, leading the Gold Coast Suns to an impressive victory over the Western Bulldogs.',
    source: {
      id: '7news-sports',
      name: '7news.com.au'
    },
    author: 'Murray Wenzel',
    url: 'https://7news.com.au/sport/afl/gold-coast-recruit-daniel-rioli-emotional-after-leading-suns-to-stunning-win-over-western-bulldogs-c-18649951',
    urlToImage: 'https://images.7news.com.au/publication/C-18649951/76be1c8e34db2264147a6bcacb35f9d614e7e0d8-16x9-x0y2w1280h720.jpg',
    publishedAt: '2025-05-10T10:30:00Z',
    category: 'sports'
  },
  {
    id: 's2',
    title: 'Unlikely hero Mark Keane produces one of the marks of the year to help Crows win epic showdown',
    description: 'An unheralded defender stepped up to save his side in the final minute of a pulsating thriller.',
    content: 'An unheralded defender stepped up to save his side in the final minute of a pulsating thriller, making one of the marks of the year.',
    source: {
      id: '7news-sports',
      name: '7news.com.au'
    },
    author: 'Ben Sutton',
    url: 'https://7news.com.au/sport/afl/unlikely-hero-mark-keane-produces-one-of-the-great-marks-to-help-crows-win-epic-showdown-c-18649697',
    urlToImage: 'https://images.7news.com.au/publication/C-18649697/88dd6cb0a1439b6d3a2c7b6abb3fec7369ce7516-16x9-x0y0w1280h720.jpg',
    publishedAt: '2025-05-10T15:45:00Z',
    category: 'sports'
  },
  {
    id: 's3',
    title: 'Wallabies star Noah Lolesio stretchered off with suspected spinal injury',
    description: 'It wasn\'t a great sign that he was holding the green whistle.',
    content: 'Wallabies star Noah Lolesio was stretchered off the field with a suspected spinal injury during a match. It wasn\'t a great sign that he was holding the green whistle.',
    source: {
      id: '7news-sports',
      name: '7news.com.au'
    },
    author: 'Darren Walton',
    url: 'https://7news.com.au/sport/rugby-union/wallabies-superstar-noah-lolesio-stretchered-off-with-suspected-spinal-injury-c-18649387',
    urlToImage: 'https://images.7news.com.au/publication/C-18649387/ec31b6034f04d7c90ee07c636eb060bd7f2c7d3e-16x9-x0y2w1280h720.jpg',
    publishedAt: '2025-05-10T14:20:00Z',
    category: 'sports'
  },
  
  // Finance category
  {
    id: 'f1',
    title: 'Reserve Bank victory in economic markets',
    description: 'Jamie Melham goes back-to-back in The Goodwood with victory on Reserve Bank.',
    content: 'The champion jockey triumphed on Reserve Bank, 12 months after winning the Morphettville feature on Benedetta.',
    source: {
      id: '7news-finance',
      name: '7news.com.au'
    },
    author: 'Craig Brennan',
    url: 'https://7news.com.au/sport/horse-racing/jamie-melham-goes-back-to-back-in-the-goodwood-with-victory-on-reserve-bank--c-18648861',
    urlToImage: 'https://images.7news.com.au/publication/C-18648861/1d57684e261f7f9978372ec8e1725bfeb90c4a77-16x9-x0y0w1280h720.jpg',
    publishedAt: '2025-05-10T09:45:00Z',
    category: 'finance'
  },
  {
    id: 'f2',
    title: 'Trump vs Chinese: The unexpected victim of the tariff war that will (literally) blow up',
    description: 'International trade tensions escalate as tariff wars continue to impact global markets.',
    content: 'International trade tensions escalate as tariff wars between the U.S. and China continue to impact global markets, creating unexpected victims in various industries.',
    source: {
      id: 'the-australian',
      name: 'The Australian'
    },
    author: 'The Australian',
    url: 'https://www.youtube.com/watch?v=Quz7RFEAikM',
    urlToImage: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
    publishedAt: '2025-05-10T11:30:00Z',
    category: 'finance'
  },
  {
    id: 'f3',
    title: 'Audi cost cutting could see it sell Italdesign - report',
    description: 'The company behind automotive icons, such as the Volkswagen Golf, Fiat Uno, BMW M1 and DMC DeLorean, could be sold by Audi.',
    content: 'The company behind automotive icons, such as the Volkswagen Golf, Fiat Uno, BMW M1 and DMC DeLorean, could be sold by Audi as part of cost-cutting measures.',
    source: {
      id: '7news-business',
      name: '7news.com.au'
    },
    author: 'Derek Fung',
    url: 'https://7news.com.au/motoring/audi-cost-cutting-could-see-it-sell-italdesign-report-c-18650485',
    urlToImage: 'https://images.7news.com.au/publication/C-18650485/def7314ff1a16686242f3180fbfd1aeaeec1c5ed-16x9-x0y207w3973h2235.jpg',
    publishedAt: '2025-05-11T08:15:00Z',
    category: 'finance'
  },
  
  // Politics category
  {
    id: 'p1',
    title: 'Pakistan launches retaliatory strikes against India as conflict intensifies',
    description: 'International tensions rise as Pakistan and India exchange missile strikes.',
    content: 'Pakistan has launched retaliatory strikes against India as the conflict between the two nuclear-armed nations continues to intensify, raising concerns globally.',
    source: {
      id: 'abc-news',
      name: 'ABC News (Australia)'
    },
    author: 'ABC News (Australia)',
    url: 'https://www.youtube.com/watch?v=VxKgxJa2BPA',
    urlToImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
    publishedAt: '2025-05-10T12:00:00Z',
    category: 'politics'
  },
  {
    id: 'p2',
    title: 'Pope Leo XIV delivers first sermon as the Catholic Church\'s new leader',
    description: 'The newly elected pontiff addresses the faithful for the first time.',
    content: 'Pope Leo XIV has delivered his first sermon as the Catholic Church\'s new leader, addressing the faithful from the Sistine Chapel.',
    source: {
      id: '9news-australia',
      name: '9News Australia'
    },
    author: '9 News Australia',
    url: 'https://www.youtube.com/watch?v=228AboXASyA',
    urlToImage: 'https://images.pexels.com/photos/2041879/pexels-photo-2041879.jpeg',
    publishedAt: '2025-05-10T14:30:00Z',
    category: 'politics'
  },
  {
    id: 'p3',
    title: 'If the Coalition sticks with nuclear, the fallout will be toxic',
    description: 'Political analysis suggests nuclear policy could damage Coalition\'s electoral hopes.',
    content: 'Political analysis suggests that if the Coalition continues to advocate for nuclear energy, it could damage their electoral prospects in future elections.',
    source: {
      id: 'smh-national',
      name: 'Sydney Morning Herald - National'
    },
    author: 'Rebecca Huntley',
    url: 'https://www.smh.com.au/national/if-the-coalition-sticks-with-nuclear-the-fallout-will-be-toxic-20250505-p5lwmu.html',
    urlToImage: 'https://static.ffx.io/images/$zoom_0.5174,$multiply_0.7554,$ratio_1.777778,$width_1059,$x_0,$y_0/t_crop_custom/q_86,f_auto/eab4a1e2a0ce26373ede44c7efc5a9ef753dde89',
    publishedAt: '2025-05-10T10:15:00Z',
    category: 'politics'
  },
  
  // Lifestyle category
  {
    id: 'l1',
    title: 'Who stole my recipe? Maehashi and Bellamy must realise they\'re already cooked',
    description: 'Controversy erupts in the culinary world over recipe ownership.',
    content: 'A controversy has erupted in the culinary world over recipe ownership, with accusations flying between prominent chefs Maehashi and Bellamy.',
    source: {
      id: 'smh-lifestyle',
      name: 'Sydney Morning Herald - National'
    },
    author: 'Malcolm Knox',
    url: 'https://www.smh.com.au/national/who-stole-my-recipe-maehashi-and-bellamy-must-realise-they-re-already-cooked-20250508-p5lxoj.html',
    urlToImage: 'https://static.ffx.io/images/$zoom_1,$multiply_0.7554,$ratio_1.777778,$width_1059,$x_0,$y_0/t_crop_custom/q_86,f_auto/9a10df55cf465ee97bcad4d662ede807ce8d7e44',
    publishedAt: '2025-05-10T09:00:00Z',
    category: 'lifestyle'
  },
  {
    id: 'l2',
    title: 'Don\'t bin it, compost it: A beginner\'s guide to smarter food waste',
    description: 'Learn how to reduce food waste with simple composting techniques.',
    content: 'Learn how to reduce food waste and contribute to a more sustainable environment with these simple composting techniques for beginners.',
    source: {
      id: 'guardian-australia',
      name: 'The Guardian Australia'
    },
    author: 'Megan Holbeck',
    url: 'https://www.theguardian.com/australia-news/2025/may/10/dont-bin-it-compost-it-a-beginners-guide-to-smarter-food-waste',
    urlToImage: 'https://i.guim.co.uk/img/media/e164d82462bf1ca3b8cd9ebd4df45c1d8b06c185/0_0_5000_4000/master/5000.jpg?width=460&quality=85&auto=format&fit=max&s=94b74747a1e7c886bf2915de126b635e',
    publishedAt: '2025-05-10T13:20:00Z',
    category: 'lifestyle'
  },
  {
    id: 'l3',
    title: 'These fitness trends did not age well',
    description: 'A look back at fitness fads that didn\'t stand the test of time.',
    content: 'From vibrating belts to ThighMasters, we take a humorous look back at fitness fads and trends that didn\'t quite stand the test of time.',
    source: {
      id: 'abc-lifestyle',
      name: 'ABC News (Australia)'
    },
    author: 'ABC News (Australia)',
    url: 'https://www.youtube.com/watch?v=-RaUE2CJNgo',
    urlToImage: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
    publishedAt: '2025-05-10T16:45:00Z',
    category: 'lifestyle'
  },
  
  // Music category
  {
    id: 'm1',
    title: 'Country music star Johnny Rodriguez has died, aged 73',
    description: 'The star\'s daughter told fans the sad news in an emotional farewell to her father.',
    content: 'Legendary country music star Johnny Rodriguez has died at the age of 73. The star\'s daughter told fans the sad news in an emotional farewell to her father.',
    source: {
      id: '7news-entertainment',
      name: '7news.com.au'
    },
    author: 'Caleb Taylor',
    url: 'https://7news.com.au/sunrise/entertainment/country-music-star-johnny-rodriguez-has-died-aged-73-c-18648423',
    urlToImage: 'https://images.7news.com.au/publication/C-18648423/caf088f899d424732b2a78672770cee84e7eda85-16x9-x0y98w1514h851.jpg',
    publishedAt: '2025-05-10T08:30:00Z',
    category: 'music'
  },
  {
    id: 'm2',
    title: 'Australian radio star Paris Pompor dies aged 58, sparking tributes for the industry legend',
    description: 'A number of prominent identities and organisations have paid tribute to the talented media personality.',
    content: 'Legendary Australian community radio and music scene presenter Paris Pompor has died aged 58. A number of prominent identities and organisations have paid tribute to the talented media personality.',
    source: {
      id: '7news-entertainment',
      name: '7news.com.au'
    },
    author: 'Caleb Taylor',
    url: 'https://7news.com.au/news/australian-radio-star-paris-pompor-dies-aged-58-sparking-tributes-for-the-industry-legend-c-18645976',
    urlToImage: 'https://images.7news.com.au/publication/C-18645976/6f24fb6c27f601e9e969ae74a87aa4e0ad925170-16x9-x0y190w490h276.png',
    publishedAt: '2025-05-10T11:15:00Z',
    category: 'music'
  },
  {
    id: 'm3',
    title: 'Justin Bieber calls himself a \'selfish\' person in cryptic post',
    description: 'The pop star has described his desire to be "free" and "honest" with others.',
    content: 'Pop star Justin Bieber has shared a cryptic post on social media in which he calls himself a "selfish" person and describes his desire to be "free" and "honest" with others.',
    source: {
      id: '7news-entertainment',
      name: '7news.com.au'
    },
    author: 'Digital Staff',
    url: 'https://7news.com.au/news/justin-bieber-calls-himself-a-selfish-person-in-cryptic-post-c-18645024',
    urlToImage: 'https://images.7news.com.au/publication/C-18645024/c7e9bd34208f49066015e6635d7120b0a2c86ff9-16x9-x0y0w1280h720.jpg',
    publishedAt: '2025-05-10T12:45:00Z',
    category: 'music'
  },
  
  // General category (important news that doesn't fit other categories)
  {
    id: 'g1',
    title: 'Melbourne man dies after jumping off boat in Thailand',
    description: 'Tragic accident claims the life of an Australian tourist in Thailand.',
    content: 'A Melbourne man has died after jumping off a boat during a vacation in Thailand. Local authorities are investigating the incident.',
    source: {
      id: 'smh-national',
      name: 'Sydney Morning Herald - National'
    },
    author: 'Staff Writer',
    url: 'https://www.smh.com.au/national/melbourne-man-dies-after-jumping-off-boat-in-thailand-20250510-p5ly52.html',
    urlToImage: 'https://static.ffx.io/images/$width_800,$height_450/t_crop_fill/q_86,f_jpg/6d81f606385967719d65b9e8611b10ff858d6cdf',
    publishedAt: '2025-05-10T10:00:00Z',
    category: 'general'
  },
  {
    id: 'g2',
    title: 'Family demands answers after woman hit by van',
    description: 'Investigation launched into traffic incident that injured pedestrian.',
    content: 'A family is demanding answers after a woman was hit by a van in a traffic incident. Police have launched an investigation into the circumstances.',
    source: {
      id: 'smh-national',
      name: 'Sydney Morning Herald - National'
    },
    author: 'Staff Writer',
    url: 'https://www.smh.com.au/national/family-demands-answers-after-woman-hit-by-van-20250510-p5ly56.html',
    urlToImage: 'https://static.ffx.io/images/$width_800,$height_450/t_crop_fill/q_86,f_jpg/9b19aa0bf062675d553156ef8614bd813fd0bef9',
    publishedAt: '2025-05-10T15:30:00Z',
    category: 'general'
  },
  {
    id: 'g3',
    title: 'Paralysed teenager\'s inspiring path to recovery',
    description: 'Young athlete shows remarkable progress after life-changing injury.',
    content: 'A teenager who was paralyzed in an accident is making remarkable progress on their path to recovery, inspiring many with their determination and resilience.',
    source: {
      id: 'smh-national',
      name: 'Sydney Morning Herald - National'
    },
    author: 'Staff Writer',
    url: 'https://www.smh.com.au/national/paralysed-teenager-s-inspiring-path-to-recovery-20250510-p5ly5f.html',
    urlToImage: 'https://static.ffx.io/images/$width_800,$height_450/t_crop_fill/q_86,f_jpg/d0feb94e759e33168e0936b6e6244e0e0951e79b',
    publishedAt: '2025-05-10T14:00:00Z',
    category: 'general'
  }
];

// Generate more mock articles for testing
const generateMockArticles = (baseArticles: Article[], count: number): Article[] => {
  const result: Article[] = [];
  
  for (let i = 0; i < count; i++) {
    const baseArticle = baseArticles[i % baseArticles.length];
    
    result.push({
      ...baseArticle,
      id: `generated-${baseArticle.id}-${i}`,
      title: `${baseArticle.title} (${i})`,
      publishedAt: new Date(new Date(baseArticle.publishedAt).getTime() - i * 86400000).toISOString() // 1 day earlier per article
    });
  }
  
  return result;
};

const EXTENDED_MOCK_ARTICLES = generateMockArticles(MOCK_ARTICLES, 30);

/**
 * Fetch articles based on search parameters
 * @param params Search parameters
 * @returns Promise with article response
 */
export const getArticles = async (params: SearchParams): Promise<ArticleResponse> => {
  // In a real app, this would be an API call
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const { q, category, page = 1, pageSize = 10 } = params;
  
  // Filter mock articles based on search criteria
  let filtered = [...EXTENDED_MOCK_ARTICLES];
  
  if (q) {
    const searchTerms = q.toLowerCase();
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(searchTerms) || 
      article.description?.toLowerCase().includes(searchTerms)
    );
  }
  
  if (category && category !== 'general') {
    filtered = filtered.filter(article => article.category === category);
  }
  
  // Paginate results
  const startIndex = (page - 1) * pageSize;
  const paginatedResults = filtered.slice(startIndex, startIndex + pageSize);
  
  return {
    articles: paginatedResults,
    totalResults: filtered.length
  };
};

/**
 * Fetch an article by ID
 * @param id Article ID
 * @returns Promise with article or null if not found
 */
export const getArticleById = async (id: string): Promise<Article | null> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const article = EXTENDED_MOCK_ARTICLES.find(article => article.id === id);
  return article || null;
};