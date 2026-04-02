// ===============================
// CrownMind Unified Article System
// ===============================

// 🔹 TRACKING PAGES (HTML article viewers)
window.trackingPages = {
  "Joy In Suffering.pdf": "../../assets/articles/html/joy-in-suffering.html",
  "Your Past Will Not Define You.pdf": "../../assets/articles/html/your-past-will-not-define-you.html",
  "You Build Your World.pdf": "../../assets/articles/html/you-build-your-world.html",
  "You Are More Than Life.pdf": "../../assets/articles/html/you-are-more-than-life.html",
  "Why Call Me Lord.pdf": "../../assets/articles/html/why-call-me-lord.html",
  "When You Are Misunderstood.pdf": "../../assets/articles/html/when-you-are-misunderstood.html",
  "When Silence Is Strength.pdf": "../../assets/articles/html/when-silence-is-strength.html",
  "Tuning The Mind.pdf": "../../assets/articles/html/tuning-the-mind.html",
  "Thorn in the Flesh.pdf": "../../assets/articles/html/thorn-in-the-flesh.html",
  "They Look But Not See.pdf": "../../assets/articles/html/they-look-but-not-see.html",
  "There Is Hope.pdf": "../../assets/articles/html/there-is-hope.html",
  "The Tower Of Babel.pdf": "../../assets/articles/html/the-tower-of-babel.html",
  "The Refining Fire.pdf": "../../assets/articles/html/the-refining-fire.html",
  "The Power Of Love.pdf": "../../assets/articles/html/the-power-of-love.html",
  "The Kingdom Within.pdf": "../../assets/articles/html/the-kingdom-within.html",
  "The Inner Sanctuary.pdf": "../../assets/articles/html/the-inner-sanctuary.html",
  "The Importance Of Vigilance.pdf": "../../assets/articles/html/the-importance-of-vigilance.html",
  "The Higher Calling.pdf": "../../assets/articles/html/the-higher-calling.html",
  "The End Justifies The Means.pdf": "../../assets/articles/html/the-end-justifies-the-means.html",
  "The 3 Witnesses.pdf": "../../assets/articles/html/the-3-witnesses.html",
  "Spirit Against Flesh.pdf": "../../assets/articles/html/spirit-against-flesh.html",
  "Setting Boundaries.pdf": "../../assets/articles/html/setting-boundaries.html",
  "Seizing The Kingdom.pdf": "../../assets/articles/html/seizing-the-kingdom.html",
  "Seeds Of Life.pdf": "../../assets/articles/html/seeds-of-life.html",
  "Never Any Shades Of Gray.pdf": "../../assets/articles/html/never-any-shades-of-gray.html",
  "My Sheep Hear My Voice.pdf": "../../assets/articles/html/my-sheep-hear-my-voice.html",
  "Manifesting Wealth and Riches.pdf": "../../assets/articles/html/manifesting-wealth-and-riches.html",
  "I Am Who I Am.pdf": "../../assets/articles/html/i-am-who-i-am.html",
  "God's Hardest Battles.pdf": "../../assets/articles/html/gods-hardest-battles.html",
  "Freedom Syndrome.pdf": "../../assets/articles/html/freedom-syndrome.html",
  "Faithful Without Fandom.pdf": "../../assets/articles/html/faithful-without-fandom.html",
  "Change Your Input Change Your World.pdf": "../../assets/articles/html/change-your-input-change-your-world.html",
  "Cry Of The Watchers.pdf": "../../assets/articles/html/cry-of-the-watchers.html",
  "Children of the Lamb.pdf": "../../assets/articles/html/children-of-the-lamb.html",
  "Brave New World.pdf": "../../assets/articles/html/brave-new-world.html",
  "Because You Live.pdf": "../../assets/articles/html/because-you-live.html"
};

// 🔹 HARDWIRED ARTICLE NUMBERS (FIXED IDs)
window.HARDWIRED_ARTICLE_NUMBERS = {
  "The Inner Sanctuary.pdf": 1,
  "Joy In Suffering.pdf": 1,
  "Your Past Will Not Define You.pdf": 2,
  "You Build Your World.pdf": 3,
  "You Are More Than Life.pdf": 4,
  "Why Call Me Lord.pdf": 5,
  "When You Are Misunderstood.pdf": 6,
  "When Silence Is Strength.pdf": 7,
  "Tuning The Mind.pdf": 8,
  "Thorn in the Flesh.pdf": 9,
  "They Look But Not See.pdf": 10,
  "There Is Hope.pdf": 11,
  "The Tower Of Babel.pdf": 12,
  "The Refining Fire.pdf": 13,
  "The Power Of Love.pdf": 14,
  "The Kingdom Within.pdf": 15,
  "The Inner Sanctuary.pdf": 16,
  "The Importance Of Vigilance.pdf": 17,
  "The Higher Calling.pdf": 18,
  "The End Justifies The Means.pdf": 19,
  "The 3 Witnesses.pdf": 20,
  "Spirit Against Flesh.pdf": 21,
  "Setting Boundaries.pdf": 22,
  "Seizing The Kingdom.pdf": 23,
  "Seeds Of Life.pdf": 24,
  "Never Any Shades Of Gray.pdf": 25,
  "My Sheep Hear My Voice.pdf": 26,
  "Manifesting Wealth and Riches.pdf": 27,
  "I Am Who I Am.pdf": 28,
  "God's Hardest Battles.pdf": 29,
  "Freedom Syndrome.pdf": 30,
  "Faithful Without Fandom.pdf": 31,
  "Change Your Input Change Your World.pdf": 32,
  "Cry Of The Watchers.pdf": 33,
  "Children of the Lamb.pdf": 34,
  "Brave New World.pdf": 35,
  "Because You Live.pdf": 36
};

// 🔹 OPTIONAL: Unified accessor (future-proof)
window.ArticleRegistry = {
  getTrackingPage(file) {
    return window.trackingPages[file] || null;
  },

  getArticleNumber(file) {
    return window.HARDWIRED_ARTICLE_NUMBERS[file] || null;
  }
};





