export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'viral-social-proof-for-your-brand',
    title: 'How to Create Viral Social Proof for Your Brand',
    excerpt: 'Learn how social proof influences purchasing decisions and how comment screenshots can elevate your marketing strategy.',
    date: 'Apr 10, 2026',
    readTime: '5 min read',
    category: 'Marketing',
    author: 'Sara Lindqvist',
    content: [
      'Social proof is the silent salesperson on every landing page. When prospects see other people happily using a product, the resistance to trying it themselves drops dramatically.',
      'Comment screenshots are uniquely powerful because they feel native — they look exactly like the platforms your audience already trusts. A pristine reaction from a real-feeling profile reads as more credible than a polished testimonial slide.',
      'The trick is realism. Pair your comment with a believable username, a sensible like count, and a timestamp that matches the campaign moment. Avoid round numbers like 100 or 1,000 — those feel manufactured.',
      'Use the screenshots in three places: above the fold on landing pages, inside paid social creative, and as static slides in email campaigns. Track which framing converts best, then double down.',
    ],
  },
  {
    slug: 'psychology-of-comment-engagement',
    title: 'The Psychology Behind Comment Engagement',
    excerpt: 'Explore why comments drive trust and how realistic mockups help content creators plan their community strategies.',
    date: 'Apr 5, 2026',
    readTime: '4 min read',
    category: 'Psychology',
    author: 'Marcus Devlin',
    content: [
      'Likes are passive; comments are committed. When somebody types a reply they are entering a contract with the content — they read it, processed it, and chose to stake an opinion.',
      'For creators, this means comments are the highest-signal feedback you have. They tell you what hit and what missed. Mocking them up before launch lets you stress-test framing in advance.',
      'Plan five comment scenarios per post: enthusiastic, sceptical, asking-for-more, off-topic, and the niche super-fan. If you can answer all five gracefully, the post is ready.',
    ],
  },
  {
    slug: 'better-presentations-with-screenshots',
    title: 'Designing Better Presentations with Social Media Screenshots',
    excerpt: 'Tips on incorporating authentic-looking comment screenshots into pitch decks, case studies, and client presentations.',
    date: 'Mar 28, 2026',
    readTime: '6 min read',
    category: 'Design',
    author: 'Priya Raman',
    content: [
      'A pitch deck full of bullet points is forgettable. A pitch deck with three screenshots of customers reacting in their own words is the one the room remembers.',
      'Use screenshots sparingly — one per section is plenty. Crop tight, round corners, and let them sit on a clean background so the text inside the comment carries the slide.',
      'For client work, mock up the response you expect to drive, then compare to the actual response after launch. It is the cleanest before/after a strategist can show.',
    ],
  },
  {
    slug: 'tiktok-vs-instagram-engagement',
    title: 'TikTok vs Instagram: Which Platform Drives More Engagement?',
    excerpt: 'A data-driven comparison of comment engagement on TikTok and Instagram — and what it means for your content strategy.',
    date: 'Mar 20, 2026',
    readTime: '7 min read',
    category: 'Analytics',
    author: 'Jules Okafor',
    content: [
      'TikTok comments are conversational and bursty. Instagram comments are slower but tend to be longer and more considered. Same content, different culture.',
      'A creator we worked with reposted the same skit on both platforms. TikTok produced 12x the comment volume in the first 24 hours, but Instagram produced 3x the average word count.',
      'The takeaway is not which platform is better — it is that the same idea needs a different framing per platform if you want to maximise the response style you actually need.',
    ],
  },
  {
    slug: 'mockups-for-ugc-pitches',
    title: 'Why Mockup Screenshots Are Essential for UGC Pitches',
    excerpt: 'UGC creators use comment mockups to demonstrate expected engagement to brands. Here is how to do it right.',
    date: 'Mar 14, 2026',
    readTime: '5 min read',
    category: 'Creator Economy',
    author: 'Tomás Quintero',
    content: [
      'Brands buying UGC want to see imagined outcomes, not just creative concepts. A pitch with three sample comment screenshots showing the kind of reaction the script is engineered to produce is dramatically more convincing.',
      'Keep the comments grounded — quote the product features the brand cares about, mention the use case in plain language, avoid superlatives.',
      'Treat the mockups as part of the deliverable. Brands often want them for internal alignment even before any real content goes live.',
    ],
  },
  {
    slug: 'youtube-thread-anatomy',
    title: 'YouTube Comment Threads: Anatomy of a Viral Conversation',
    excerpt: 'Breaking down what makes YouTube comment threads go viral and how to recreate that energy in mockups.',
    date: 'Mar 8, 2026',
    readTime: '4 min read',
    category: 'YouTube',
    author: 'Hana Voss',
    content: [
      'Viral YouTube threads almost always start with one comment that names the moment everyone was thinking about — the unspoken observation.',
      'Once that anchor lands, replies stack on it because contributing to the thread is easier than starting a new one.',
      'When you mock these up, lead with the anchor comment and add two or three short replies that build on it. That is the visual rhythm of a conversation that took off.',
    ],
  },
  {
    slug: 'screenshot-aesthetics-for-brand-decks',
    title: 'Screenshot Aesthetics That Actually Match Your Brand Deck',
    excerpt: 'Match the comment screenshot style to your deck so it feels native instead of bolted on.',
    date: 'Feb 27, 2026',
    readTime: '4 min read',
    category: 'Design',
    author: 'Priya Raman',
    content: [
      'A jarring screenshot pulls focus in the wrong way. The fix is small: match the corner radius of your slides, sit the screenshot on the same background colour, and add a single soft shadow underneath.',
      'Light vs dark mode matters too. Pick whichever direction your deck leans into and stay consistent across every screenshot in the same talk.',
    ],
  },
  {
    slug: 'what-makes-a-comment-feel-real',
    title: 'What Makes a Mock Comment Actually Feel Real?',
    excerpt: 'A short checklist for comments that pass the squint test.',
    date: 'Feb 18, 2026',
    readTime: '3 min read',
    category: 'Craft',
    author: 'Marcus Devlin',
    content: [
      'Real comments contain typos. Real comments use lowercase. Real comments end mid-thought. Polished comments are the dead giveaway of a fake.',
      'Specifics beat adjectives. "I made this in 12 minutes flat" reads truer than "amazing tool!!!" Use a number, a time, a place — anchor the reader.',
      'Lastly, vary the like count. Posts with 4, 17, and 142 likes side by side feel like a real thread. Three rounded fives in a row do not.',
    ],
  },
  {
    slug: 'instagram-reels-comment-trends',
    title: 'Instagram Reels Comment Trends to Watch in 2026',
    excerpt: 'The comment formats getting amplified by the Reels algorithm right now.',
    date: 'Feb 9, 2026',
    readTime: '5 min read',
    category: 'Trends',
    author: 'Jules Okafor',
    content: [
      'Story-style comments — three or four lines that read like a mini-anecdote — are getting more replies than one-liners.',
      'Question-back comments ("wait, where did you get the second clip?") are surfacing more in the Reels comment ranking than they did last year.',
      'For content planning, this means engineering your captions and hooks so that the natural reaction is a question rather than just an opinion.',
    ],
  },
  {
    slug: 'comment-mockups-for-case-studies',
    title: 'Using Comment Mockups in Case Studies Without Lying',
    excerpt: 'A short ethics guide to mockups in marketing assets.',
    date: 'Jan 30, 2026',
    readTime: '4 min read',
    category: 'Ethics',
    author: 'Sara Lindqvist',
    content: [
      'Mockups are fine for illustration. They are not fine for testimonials. The difference is whether the comment is presented as a real customer quote or as a scenario.',
      'Label illustrative screenshots clearly when the layout could be confused for a real review block. A small "illustrative" tag in the caption is enough.',
      'For real customer comments, screenshot the live thread or get explicit permission. Your audience will eventually find out which was which, and one wrong call ends a brand.',
    ],
  },
  {
    slug: 'x-twitter-reply-formats',
    title: 'The Five X (Twitter) Reply Formats That Always Land',
    excerpt: 'A pattern library of replies that consistently get traction on X.',
    date: 'Jan 21, 2026',
    readTime: '6 min read',
    category: 'X / Twitter',
    author: 'Hana Voss',
    content: [
      'The "but actually" reply: short, contradicts the original gently, ends with a fact.',
      'The "expand the joke" reply: takes the punchline and pushes it one step further.',
      'The "personal story" reply: turns an abstract take into a lived experience.',
      'The "useful resource" reply: adds a link or a tool that resolves the original tension.',
      'The "elegant question" reply: reframes the original take as a curiosity rather than an answer.',
    ],
  },
  {
    slug: 'building-content-rituals',
    title: 'Building a Weekly Comment-Mockup Ritual for Your Team',
    excerpt: 'How content teams use a 30-minute weekly mockup session to plan tone for the week ahead.',
    date: 'Jan 12, 2026',
    readTime: '5 min read',
    category: 'Process',
    author: 'Tomás Quintero',
    content: [
      'Pick one slot per week. The whole team mocks up the imagined comment thread for the next campaign before any creative is locked.',
      'The mockup is the brief. If the comment thread you want is funny, the creative needs to land funny. If it is informative, the creative needs to be denser.',
      'Teams who do this consistently report that revisions on copy drop by 40 percent because everyone is aiming at the same target reaction.',
    ],
  },
];

export const POSTS_PER_PAGE = 6;

export const getPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug);