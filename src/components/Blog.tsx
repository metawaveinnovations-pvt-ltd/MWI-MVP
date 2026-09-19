import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Award, 
  Copy, 
  Check, 
  Share2, 
  ThumbsUp, 
  Sparkles, 
  Code, 
  Bookmark, 
  CheckCircle2, 
  List, 
  X, 
  HelpCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { blogPosts, BlogPost, BlogPostSection, sortPostsByDateDesc, parsePostDate } from '../data/blogData';
import { playSound } from '../utils/audio';
import { AdvertisementSection } from './AdvertisementSection';
import { AD_SLOTS } from './ads/adsense';
import { 
  SmsHeroIllustration, 
  AttendanceWorkflowIllustration, 
  FinancialWorkflowIllustration 
} from './SmsBlogIllustrations';

interface BlogProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const POSTS_PER_PAGE = 6;

export function Blog({ activeSection, onNavigate }: BlogProps) {
  // Search, filter, sorting, and pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'quick'>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // Directly selected post ID (enables instant reading mode without route latency)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Dynamic list of posts state initialized with localStorage
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('metawave_blog_posts_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as BlogPost[];
        const missingDefaultPosts = blogPosts.filter(
          defaultPost => !parsed.some(savedPost => savedPost.id === defaultPost.id)
        );
        return sortPostsByDateDesc([...parsed, ...missingDefaultPosts]);
      }
      return sortPostsByDateDesc(blogPosts);
    } catch (e) {
      console.error('Failed to load posts from localStorage', e);
      return sortPostsByDateDesc(blogPosts);
    }
  });

  // Persist posts
  useEffect(() => {
    localStorage.setItem('metawave_blog_posts_v1', JSON.stringify(posts));
  }, [posts]);

  // Composer Form management states
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form input states
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCategory, setFormCategory] = useState<BlogPost['category']>('Cloud Architecture');
  const [formDifficulty, setFormDifficulty] = useState<BlogPost['difficulty']>('Intermediate');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formAuthorName, setFormAuthorName] = useState('Ali Hassan Chand');
  const [formAuthorRole, setFormAuthorRole] = useState('Founder & CEO');
  const [formAuthorAvatarUrl, setFormAuthorAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
  const [formFeaturedImg, setFormFeaturedImg] = useState('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80');
  const [formTags, setFormTags] = useState('Cloud, Architecture, DevOps');
  const [formSections, setFormSections] = useState<BlogPostSection[]>([
    { type: 'paragraph', text: 'This is the introduction paragraph of your technical publication.' },
    { type: 'heading', text: 'Key Architectural Insights' },
    { type: 'paragraph', text: 'Detail the core engineering principles, performance metrics, and implementation approach.' }
  ]);

  // Bookmarks & likes states
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // Micro feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [sharedPostTitle, setSharedPostTitle] = useState('');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [activeHeadingIndex, setActiveHeadingIndex] = useState<number>(0);

  const articleContentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Available categories and difficulties
  const categories = ['All', 'Cloud Architecture', 'Artificial Intelligence', 'Frontend Design', 'Cybersecurity', 'Enterprise Strategy'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Deep-link route resolver
  const getSelectedPostFromRoute = () => {
    const path = window.location.pathname;
    let slug = '';

    if (path.startsWith('/blog/') && path !== '/blog' && path !== '/blog/') {
      slug = path.replace('/blog/', '').replace(/\/$/, '');
    } else if (activeSection.startsWith('/blog/')) {
      slug = activeSection.replace('/blog/', '').replace(/\/$/, '');
    } else if (activeSection.startsWith('blog-post-')) {
      slug = activeSection.replace('blog-post-', '');
    }

    if (!slug) return null;

    return posts.find(p => 
      p.id === slug || 
      p.id.toLowerCase() === slug.toLowerCase()
    ) || null;
  };

  // Sync route slug with selectedPostId
  useEffect(() => {
    const routePost = getSelectedPostFromRoute();
    if (routePost) {
      setSelectedPostId(routePost.id);
    } else if (activeSection === 'blog' || activeSection === '/blog') {
      setSelectedPostId(null);
    }
  }, [activeSection]);

  // Current active post
  const routePost = getSelectedPostFromRoute();
  const selectedPost = selectedPostId 
    ? (posts.find(p => p.id === selectedPostId || p.id.toLowerCase() === selectedPostId.toLowerCase()) || routePost)
    : routePost;

  // Hydrate bookmarks and likes
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('metawave_blog_bookmarks_v1');
      if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));
      const savedLikes = localStorage.getItem('metawave_blog_likes_v1');
      if (savedLikes) setLikes(JSON.parse(savedLikes));
      const savedLiked = localStorage.getItem('metawave_blog_liked_v1');
      if (savedLiked) setLiked(JSON.parse(savedLiked));
    } catch (e) {
      console.error('Failed to parse blog interactions', e);
    }
  }, []);

  const saveBookmarks = (ids: string[]) => {
    setBookmarkedIds(ids);
    localStorage.setItem('metawave_blog_bookmarks_v1', JSON.stringify(ids));
  };

  const saveLikesAndLiked = (newLikes: Record<string, number>, newLiked: Record<string, boolean>) => {
    setLikes(newLikes);
    setLiked(newLiked);
    localStorage.setItem('metawave_blog_likes_v1', JSON.stringify(newLikes));
    localStorage.setItem('metawave_blog_liked_v1', JSON.stringify(newLiked));
  };

  // Reading scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!selectedPost) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercentage((window.scrollY / totalHeight) * 100);
      }

      if (articleContentRef.current) {
        const headings = articleContentRef.current.querySelectorAll('[data-heading-anchor]');
        let currentActive = 0;
        headings.forEach((elem, index) => {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= 140) {
            currentActive = index;
          }
        });
        setActiveHeadingIndex(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setScrollPercentage(0);
      setActiveHeadingIndex(0);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPost]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedDifficulty, showBookmarksOnly, sortBy]);

  // Filtered & sorted posts calculation
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sortBy === 'popular') {
        const likesA = likes[a.id] || 0;
        const likesB = likes[b.id] || 0;
        if (likesB !== likesA) return likesB - likesA;
      }
      if (sortBy === 'quick') {
        const timeA = parseInt(a.readTime, 10) || 5;
        const timeB = parseInt(b.readTime, 10) || 5;
        if (timeA !== timeB) return timeA - timeB;
      }
      return parsePostDate(b.date) - parsePostDate(a.date);
    });
  }, [posts, sortBy, likes]);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sortedPosts.filter(post => {
      const matchesSearch = !query || 
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || post.difficulty === selectedDifficulty;
      const matchesBookmarks = !showBookmarksOnly || bookmarkedIds.includes(post.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmarks;
    });
  }, [sortedPosts, searchQuery, selectedCategory, selectedDifficulty, showBookmarksOnly, bookmarkedIds]);

  // Featured Spotlight Post (Top publication when on initial unfiltered view)
  const isDefaultView = !searchQuery && selectedCategory === 'All' && selectedDifficulty === 'All' && !showBookmarksOnly;
  const featuredPost = isDefaultView ? sortedPosts[0] : null;

  // Grid posts: if featured post is shown in spotlight, omit it from the subsequent grid on page 1
  const gridCandidates = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter(p => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const totalPages = Math.ceil(gridCandidates.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    return gridCandidates.slice(startIdx, startIdx + POSTS_PER_PAGE);
  }, [gridCandidates, currentPage]);

  // Related publications for the currently open article
  const relatedPosts = useMemo(() => {
    if (!selectedPost) return [];
    return posts
      .filter(p => p.id !== selectedPost.id)
      .sort((a, b) => {
        if (a.category === selectedPost.category && b.category !== selectedPost.category) return -1;
        if (b.category === selectedPost.category && a.category !== selectedPost.category) return 1;
        return parsePostDate(b.date) - parsePostDate(a.date);
      })
      .slice(0, 3);
  }, [posts, selectedPost]);

  // Actions
  const handleOpenPost = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSelectedPostId(post.id);
    onNavigate(`/blog/${post.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    onNavigate('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isBookmarked = bookmarkedIds.includes(postId);
    const updated = isBookmarked
      ? bookmarkedIds.filter(id => id !== postId)
      : [...bookmarkedIds, postId];
    saveBookmarks(updated);
    playSound('click');
  };

  const handleLike = (postId: string) => {
    const prevLikes = { ...likes };
    const prevLiked = { ...liked };
    
    if (prevLiked[postId]) {
      prevLikes[postId] = Math.max(0, (prevLikes[postId] || 0) - 1);
      prevLiked[postId] = false;
    } else {
      prevLikes[postId] = (prevLikes[postId] || 0) + 1;
      prevLiked[postId] = true;
      playSound('success');
    }
    saveLikesAndLiked(prevLikes, prevLiked);
  };

  const handleShare = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}/blog/${post.id}`;
    navigator.clipboard.writeText(shareUrl);
    setSharedPostTitle(post.title);
    setShowShareToast(true);
    playSound('success');
    setTimeout(() => setShowShareToast(false), 3500);
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setShowBookmarksOnly(false);
    setSortBy('latest');
    setCurrentPage(1);
    playSound('click');
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      playSound('success');
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    }, 900);
  };

  const scrollToAnchor = (anchorId: string) => {
    const targetElement = document.getElementById(anchorId);
    if (targetElement) {
      const offsetPos = targetElement.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    }
  };

  // Helper styles
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Cloud Architecture':
        return 'bg-emerald-50 text-[#326E45] border-emerald-200/90';
      case 'Artificial Intelligence':
        return 'bg-purple-50 text-purple-700 border-purple-200/90';
      case 'Frontend Design':
        return 'bg-teal-50 text-teal-700 border-teal-200/90';
      case 'Cybersecurity':
        return 'bg-rose-50 text-rose-700 border-rose-200/90';
      case 'Enterprise Strategy':
        return 'bg-amber-50 text-amber-800 border-amber-200/90';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getDifficultyBadgeClass = (diff: BlogPost['difficulty']) => {
    switch (diff) {
      case 'Expert':
        return 'text-rose-700 bg-rose-50 border-rose-200/80';
      case 'Advanced':
        return 'text-amber-700 bg-amber-50 border-amber-200/80';
      case 'Intermediate':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200/80';
      default:
        return 'text-sky-700 bg-sky-50 border-sky-200/80';
    }
  };

  /**
   * Academic Lab Title Formatter:
   * Emphasizes technical and domain keywords in bold, high-contrast academic lab weight,
   * while rendering grammatical connectives/prepositions in refined, scholarly italics.
   */
  const renderAcademicLabTitle = (title: string) => {
    if (!title) return null;

    const connectives = new Set([
      'in', 'for', 'the', 'a', 'an', 'and', 'with', 'from', 'to', 'of', 'on', 'by', 'via',
      'at', 'into', 'through', 'over', 'between', 'under', 'as', 'across', 'versus', 'vs', 'per', 'or'
    ]);

    const words = title.split(' ');

    return (
      <>
        {words.map((rawWord, idx) => {
          const hasColon = rawWord.endsWith(':');
          const hasComma = rawWord.endsWith(',');
          const word = hasColon || hasComma ? rawWord.slice(0, -1) : rawWord;
          const cleanLower = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
          const isConnective = connectives.has(cleanLower) || word === '&';

          return (
            <React.Fragment key={idx}>
              {isConnective ? (
                <span className="font-['Newsreader',Georgia,serif] italic font-normal text-slate-500 text-[0.93em] tracking-normal px-[0.12em] inline-block">
                  {word}
                </span>
              ) : (
                <span className="font-black text-slate-950 font-['Bricolage_Grotesque',system-ui,sans-serif] tracking-[-0.025em] inline-block">
                  {word}
                </span>
              )}
              {hasColon && (
                <span className="text-[#326E45] font-bold pl-0.5 pr-2 select-none">:</span>
              )}
              {hasComma && (
                <span className="text-slate-500 font-semibold pr-1.5">,</span>
              )}
              {' '}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  // Composer Form Handlers
  const openAddForm = () => {
    setFormId('');
    setFormTitle('');
    setFormSummary('');
    setFormCategory('Cloud Architecture');
    setFormDifficulty('Intermediate');
    setFormReadTime('5 min read');
    setFormAuthorName('Ali Hassan Chand');
    setFormAuthorRole('Founder & CEO');
    setFormAuthorAvatarUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
    setFormFeaturedImg('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80');
    setFormTags('Cloud, Architecture, Performance');
    setFormSections([
      { type: 'paragraph', text: 'This is the introduction paragraph of your technical publication.' },
      { type: 'heading', text: 'Core Architecture Overview' },
      { type: 'paragraph', text: 'Explain the deployment setup, engineering considerations, or benchmark findings.' }
    ]);
    setIsAdding(true);
    setIsEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEditForm = (post: BlogPost) => {
    setFormId(post.id);
    setFormTitle(post.title);
    setFormSummary(post.summary);
    setFormCategory(post.category);
    setFormDifficulty(post.difficulty);
    setFormReadTime(post.readTime);
    setFormAuthorName(post.author.name);
    setFormAuthorRole(post.author.role);
    setFormAuthorAvatarUrl(post.author.avatarUrl);
    setFormFeaturedImg(post.featuredImg);
    setFormTags(post.tags.join(', '));
    setFormSections(JSON.parse(JSON.stringify(post.sections)));
    setIsEditing(true);
    setIsAdding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formSummary) return;

    const postTags = formTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const postData: BlogPost = {
      id: formId || `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: formTitle,
      summary: formSummary,
      category: formCategory,
      difficulty: formDifficulty,
      readTime: formReadTime,
      date: isEditing ? (posts.find(p => p.id === formId)?.date || formattedDate) : formattedDate,
      author: {
        name: formAuthorName,
        role: formAuthorRole,
        avatarUrl: formAuthorAvatarUrl
      },
      featuredImg: formFeaturedImg,
      tags: postTags.length > 0 ? postTags : ['Technology'],
      sections: formSections
    };

    if (isEditing) {
      setPosts(prev => prev.map(p => p.id === postData.id ? postData : p));
    } else {
      setPosts(prev => [postData, ...prev]);
    }

    setIsAdding(false);
    setIsEditing(false);
    handleOpenPost(postData);
    playSound('success');
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
      handleBackToList();
      playSound('click');
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-slate-50/40 text-slate-900">
      {/* Reading Progress Line (when viewing single post) */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollPercentage / 100 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.08 }}
            className="fixed top-0 left-0 right-0 h-1 bg-[#326E45] origin-left z-50 shadow-xs"
          />
        )}
      </AnimatePresence>

      {/* Share Toast Notification */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-xl p-3.5 shadow-lg border border-slate-800 flex items-center gap-3 max-w-sm"
          >
            <div className="w-7 h-7 rounded-lg bg-[#326E45]/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div className="text-left min-w-0 flex-1">
              <p className="text-xs font-bold text-white">Link Copied</p>
              <p className="text-[11px] text-slate-300 truncate">"{sharedPostTitle}" link copied to clipboard.</p>
            </div>
            <button 
              onClick={() => setShowShareToast(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* ========================================================================= */}
        {/*                           1. COMPOSER / EDITOR VIEW                       */}
        {/* ========================================================================= */}
        {isAdding || isEditing ? (
          <motion.div
            key="composer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-left"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-[#326E45] uppercase tracking-wider">
                    {isEditing ? 'Edit Article' : 'New Article'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    {isEditing ? 'Update Publication' : 'Compose Publication'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => { setIsAdding(false); setIsEditing(false); }}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSavePost} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Modernizing School Management Systems for the Next Decade"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Executive Summary / Abstract *</label>
                  <textarea
                    required
                    rows={3}
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="Brief 2-line summary explaining key insights..."
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Technical Level</label>
                    <select
                      value={formDifficulty}
                      onChange={(e) => setFormDifficulty(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                    >
                      {difficulties.filter(d => d !== 'All').map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Estimated Read Time</label>
                    <input
                      type="text"
                      value={formReadTime}
                      onChange={(e) => setFormReadTime(e.target.value)}
                      placeholder="e.g. 7 min read"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Author Name</label>
                    <input
                      type="text"
                      value={formAuthorName}
                      onChange={(e) => setFormAuthorName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Author Role</label>
                    <input
                      type="text"
                      value={formAuthorRole}
                      onChange={(e) => setFormAuthorRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Featured Image URL</label>
                  <input
                    type="url"
                    value={formFeaturedImg}
                    onChange={(e) => setFormFeaturedImg(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="Cloud, Architecture, DevOps"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#326E45]"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsAdding(false); setIsEditing(false); }}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#326E45] hover:bg-[#275736] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    {isEditing ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : !selectedPost ? (
          /* ========================================================================= */
          /*                       2. CLEAN BLOG LISTING VIEW (NO HERO)                */
          /* ========================================================================= */
          <motion.div
            key="listing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-left"
          >
            {/* COMPACT CLEAN HEADER (NO HERO) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-[#326E45] text-[11px] font-semibold tracking-wide uppercase mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#326E45]" />
                  MWI Engineering Journal
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Technical Publications & Case Studies
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Deep-dive architectures, cloud blueprints, and engineering solutions from MetaWave Innovations.
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
                <button
                  onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    showBookmarksOnly 
                      ? 'bg-[#326E45] text-white border-[#326E45] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Show bookmarked articles"
                >
                  <Bookmark size={13} className={showBookmarksOnly ? 'fill-white text-white' : 'text-slate-400'} />
                  <span>Reading List ({bookmarkedIds.length})</span>
                </button>

                <button
                  onClick={openAddForm}
                  className="px-3.5 py-2 bg-[#326E45] hover:bg-[#275736] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Plus size={14} />
                  <span>Write Article</span>
                </button>
              </div>
            </div>

            {/* SEARCH & FILTER CONTROLS */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-8 space-y-3.5">
              {/* Row 1: Search & Sort */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    id="blog-search-input"
                    aria-label="Search articles by title, topic, or keyword"
                    placeholder="Search articles by title, topic, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-[#326E45] rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Sort Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
                  <button
                    onClick={() => setSortBy('latest')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      sortBy === 'latest'
                        ? 'bg-white text-[#326E45] shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Latest
                  </button>
                  <button
                    onClick={() => setSortBy('popular')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      sortBy === 'popular'
                        ? 'bg-white text-[#326E45] shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Popular
                  </button>
                  <button
                    onClick={() => setSortBy('quick')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      sortBy === 'quick'
                        ? 'bg-white text-[#326E45] shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Quick Reads
                  </button>
                </div>
              </div>

              {/* Row 2: Category Pills & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#326E45] text-white border-[#326E45] shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Filter status counter */}
                <div className="flex items-center gap-3 text-xs shrink-0 self-end sm:self-center">
                  <span className="text-slate-500">
                    Showing <strong className="text-slate-900">{filteredPosts.length}</strong> of {posts.length} articles
                  </span>
                  {(!isDefaultView || sortBy !== 'latest') && (
                    <button
                      onClick={handleResetFilters}
                      className="text-[#326E45] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <X size={12} />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SPOTLIGHT FEATURED ARTICLE (Shown cleanly on initial unfiltered view) */}
            {featuredPost && (
              <div className="mb-8">
                <div
                  onClick={(e) => handleOpenPost(featuredPost, e)}
                  className="bg-white border border-slate-200/90 hover:border-[#326E45]/50 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-5 group"
                >
                  <div className="md:col-span-5 rounded-xl overflow-hidden relative aspect-[16/10] md:aspect-auto min-h-[190px] md:min-h-[210px] bg-slate-100">
                    <img 
                      src={featuredPost.featuredImg}
                      alt={featuredPost.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/school_management_hero.png';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#326E45] text-white shadow-xs">
                      Featured
                    </div>
                  </div>

                  <div className="md:col-span-7 flex flex-col justify-between py-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getCategoryBadgeClass(featuredPost.category)}`}>
                          {featuredPost.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          {featuredPost.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#326E45] transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {featuredPost.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={featuredPost.author.avatarUrl}
                          alt={featuredPost.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                        <div className="text-left">
                          <p className="text-xs font-semibold text-slate-900 leading-tight">{featuredPost.author.name}</p>
                          <p className="text-[10px] text-slate-400 leading-none mt-0.5">{featuredPost.author.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleToggleBookmark(featuredPost.id, e)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-[#326E45] hover:bg-slate-50 transition-colors"
                          title="Bookmark"
                        >
                          <Bookmark size={13} className={bookmarkedIds.includes(featuredPost.id) ? 'fill-[#326E45] text-[#326E45]' : ''} />
                        </button>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#326E45] group-hover:bg-[#275736] text-white rounded-lg text-xs font-semibold transition-colors">
                          <span>Read Article</span>
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ARTICLES GRID */}
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    layout
                    onClick={(e) => handleOpenPost(post, e)}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#326E45]/40 p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Card Thumbnail */}
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-3.5">
                        <img 
                          src={post.featuredImg} 
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/school_management_hero.png';
                          }}
                        />
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase border bg-white/95 backdrop-blur-sm ${getCategoryBadgeClass(post.category)}`}>
                            {post.category}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleToggleBookmark(post.id, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-slate-200 text-slate-500 hover:text-[#326E45] shadow-xs cursor-pointer"
                          title="Bookmark article"
                        >
                          <Bookmark size={12} className={bookmarkedIds.includes(post.id) ? 'fill-[#326E45] text-[#326E45]' : ''} />
                        </button>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                        <span>•</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${getDifficultyBadgeClass(post.difficulty)}`}>
                          {post.difficulty}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#326E45] transition-colors leading-snug line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchQuery(tag);
                            }}
                            className="text-[10px] font-mono text-slate-500 bg-slate-100 hover:bg-emerald-50 hover:text-[#326E45] px-2 py-0.5 rounded-md transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={post.author.avatarUrl}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                        <span className="text-xs font-medium text-slate-700">{post.author.name}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#326E45] group-hover:translate-x-0.5 transition-transform">
                        <span>Read</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto my-8 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#326E45] flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                  <Search size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">No Matching Articles</h3>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  No publications matched your search query or active filter combination.
                </p>
                <button 
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#326E45] hover:bg-[#275736] text-white rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* PAGINATION CONTROLS (Keeps page length tidy and not too long) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-slate-200/80">
                <button
                  onClick={() => {
                    setCurrentPage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={13} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#326E45] text-white shadow-2xs font-bold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            )}

            {/* COMPACT NEWSLETTER SUBSCRIPTION BAR (Slim, concise, not bloated) */}
            <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Stay Updated with Technical Insights</h3>
                <p className="text-xs text-slate-500 mt-0.5">Architecture breakdowns, cloud blueprints, and engineering practices.</p>
              </div>

              <form onSubmit={handleSubscribeNewsletter} className="flex items-center gap-2 w-full sm:w-auto">
                {newsletterStatus === 'success' ? (
                  <div className="bg-emerald-50 text-[#326E45] border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>Subscribed successfully</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      required
                      placeholder="Enter work email..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="px-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#326E45] text-slate-800 placeholder-slate-400 w-full sm:w-64"
                    />
                    <button
                      type="submit"
                      disabled={newsletterStatus === 'loading'}
                      className="px-4 py-2 bg-[#326E45] hover:bg-[#275736] text-white text-xs font-semibold rounded-xl shrink-0 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /*                         3. CLEAN ARTICLE READING VIEW                     */
          /* ========================================================================= */
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full text-left"
          >
            {/* STICKY TOP NAVIGATION BAR (USER PURPOSE: BACK, TAGLINE, FAVORITE, LIKE, SHARE) */}
            <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-16 z-30 py-2.5 sm:py-3 transition-shadow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
                {/* Back Link */}
                <button
                  onClick={handleBackToList}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#326E45] transition-colors cursor-pointer group shrink-0"
                >
                  <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform text-[#326E45]" />
                  <span>Back to Articles</span>
                </button>

                {/* Center Tagline & Article Indicator */}
                <div className="hidden md:flex items-center gap-2.5 min-w-0 mx-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border shrink-0 ${getCategoryBadgeClass(selectedPost.category)}`}>
                    {selectedPost.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 truncate max-w-xs lg:max-w-md">
                    {selectedPost.title}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] text-slate-500 font-medium shrink-0 flex items-center gap-1">
                    <Clock size={11} className="text-slate-400" />
                    {selectedPost.readTime}
                  </span>
                </div>

                {/* User Engagement Actions (Favorite, Like, Share) */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Favorite / Bookmark Button */}
                  <button
                    onClick={() => handleToggleBookmark(selectedPost.id)}
                    className={`h-8.5 px-3 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                      bookmarkedIds.includes(selectedPost.id)
                        ? 'bg-emerald-50 border-emerald-300 text-[#326E45] shadow-2xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                    }`}
                    title={bookmarkedIds.includes(selectedPost.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Bookmark 
                      size={13} 
                      className={bookmarkedIds.includes(selectedPost.id) ? 'fill-[#326E45] text-[#326E45]' : 'text-slate-500'} 
                    />
                    <span className="hidden sm:inline">
                      {bookmarkedIds.includes(selectedPost.id) ? 'Favorited' : 'Favorite'}
                    </span>
                  </button>

                  {/* Like Button */}
                  <button 
                    onClick={() => handleLike(selectedPost.id)}
                    className={`h-8.5 px-3 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                      liked[selectedPost.id]
                        ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-2xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                    }`}
                    title="Like publication"
                  >
                    <ThumbsUp 
                      size={13} 
                      className={liked[selectedPost.id] ? 'fill-rose-500 text-rose-600' : 'text-slate-500'} 
                    />
                    <span>{12 + (likes[selectedPost.id] || 0)}</span>
                    <span className="hidden sm:inline font-normal text-[11px] text-slate-500">
                      {liked[selectedPost.id] ? 'Liked' : 'Likes'}
                    </span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={(e) => handleShare(selectedPost, e)}
                    className="h-8.5 px-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer transition-all shadow-2xs"
                    title="Share publication link"
                  >
                    <Share2 size={13} className="text-slate-500" />
                    <span className="hidden sm:inline">{showShareToast ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ARTICLE CONTENT CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
              
              {/* ARTICLE HEADER (Clean & Full Width) */}
              <div className="w-full max-w-full mb-8 space-y-4">
                {/* Meta Ribbon */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border ${getCategoryBadgeClass(selectedPost.category)}`}>
                    {selectedPost.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getDifficultyBadgeClass(selectedPost.difficulty)}`}>
                    {selectedPost.difficulty}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar size={12} className="text-slate-400" />
                    {selectedPost.date}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" />
                    {selectedPost.readTime}
                  </span>
                </div>

                {/* Title (Academic Lab Headline with Smart Keyword Bolding) */}
                <h1 className="font-['Bricolage_Grotesque',system-ui,sans-serif] text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3.05rem] leading-[1.24] sm:leading-[1.18] tracking-[-0.025em] text-slate-950 antialiased py-1 select-text transition-colors duration-200 selection:bg-emerald-100 selection:text-[#183a23]">
                  {renderAcademicLabTitle(selectedPost.title)}
                </h1>

                {/* Excerpt */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-l-3 border-[#326E45] pl-4 py-0.5 max-w-4xl">
                  {selectedPost.summary}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-2">
                  <img 
                    src={selectedPost.author.avatarUrl} 
                    alt={selectedPost.author.name}
                    className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{selectedPost.author.name}</h4>
                    <p className="text-[11px] text-slate-500">{selectedPost.author.role} • MetaWave Innovations</p>
                  </div>
                </div>
              </div>

              {/* ARTICLE BANNER IMAGE (Full Width Cinematic Presentation) */}
              <div className="w-full max-w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xs mb-8 bg-slate-100 aspect-[21/9] sm:aspect-[16/7] md:aspect-[2.4/1] max-h-[500px]">
                <img 
                  src={selectedPost.featuredImg} 
                  alt={selectedPost.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full max-w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/school_management_hero.png';
                  }}
                />
              </div>

              {/* TWO COLUMN CONTENT: FIXED SIDEBAR + SCROLLABLE PROSE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
                
                {/* STICKY TABLE OF CONTENTS & RELATED PUBLICATIONS SIDEBAR (FIXED ON LEFT - NO INNER SCROLLER) */}
                <aside className="hidden lg:block lg:col-span-4 xl:col-span-3.5 self-start shrink-0">
                  <div className="sticky top-28 space-y-4 select-text">
                    {/* Table of Contents */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <List size={13} className="text-[#326E45]" />
                          <span>Table of Contents</span>
                        </h3>
                        <span className="text-[10px] font-bold text-[#326E45] bg-emerald-50 px-2 py-0.5 rounded-full">
                          {Math.round(scrollPercentage)}% read
                        </span>
                      </div>

                      {/* Reading Progress Line */}
                      <div className="w-full bg-slate-100 h-1 rounded-full mb-3 overflow-hidden">
                        <div 
                          className="bg-[#326E45] h-full transition-all duration-150 rounded-full"
                          style={{ width: `${Math.min(100, Math.max(0, scrollPercentage))}%` }}
                        />
                      </div>

                      <nav className="space-y-1">
                        {selectedPost.sections
                          .filter((sec) => sec.type === 'heading')
                          .map((sec, idx) => {
                            const headingAnchor = `heading-anchor-${idx}`;
                            const isCurrent = activeHeadingIndex === idx;

                            return (
                              <button
                                key={idx}
                                onClick={() => scrollToAnchor(headingAnchor)}
                                className={`block text-xs text-left w-full py-1.5 px-2.5 rounded-lg leading-snug transition-all cursor-pointer ${
                                  isCurrent 
                                    ? 'bg-emerald-50 text-[#326E45] font-bold border-l-2 border-[#326E45] shadow-2xs' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                                }`}
                              >
                                {sec.text}
                              </button>
                            );
                          })}
                      </nav>
                    </div>

                    {/* RELATED PUBLICATIONS (On left in sidebar of blog below Table of Contents) */}
                    {relatedPosts.length > 0 && (
                      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <BookOpen size={13} className="text-[#326E45]" />
                            <span>Related Publications</span>
                          </h3>
                          <button
                            onClick={handleBackToList}
                            className="text-[10.5px] font-bold text-[#326E45] hover:underline cursor-pointer"
                          >
                            All
                          </button>
                        </div>

                        <div className="space-y-2.5 divide-y divide-slate-100">
                          {relatedPosts.map((post, rIdx) => (
                            <div
                              key={post.id}
                              onClick={(e) => handleOpenPost(post, e)}
                              className={`group/rel block cursor-pointer transition-all hover:bg-slate-50/80 -mx-1.5 px-2 py-2 rounded-xl ${rIdx > 0 ? 'pt-2.5' : ''}`}
                            >
                              <div className="flex items-center gap-1.5 text-[9.5px] text-slate-400 mb-1">
                                <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase border ${getCategoryBadgeClass(post.category)}`}>
                                  {post.category}
                                </span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover/rel:text-[#326E45] transition-colors leading-snug line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {post.summary}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Share & Engagement Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Share & Engagement
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock size={10} />
                          {selectedPost.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleShare(selectedPost, e)}
                          className="flex-1 py-2 px-3 bg-slate-50 hover:bg-emerald-50 hover:text-[#326E45] text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Share2 size={12} />
                          <span>{showShareToast ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                        <button
                          onClick={() => handleLike(selectedPost.id)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                            liked[selectedPost.id]
                              ? 'bg-rose-50 border-rose-200 text-rose-600'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                          title="Like article"
                        >
                          <ThumbsUp size={13} className={liked[selectedPost.id] ? 'fill-rose-500' : ''} />
                          <span>{12 + (likes[selectedPost.id] || 0)}</span>
                        </button>
                        <button
                          onClick={() => handleToggleBookmark(selectedPost.id)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer text-xs font-semibold ${
                            bookmarkedIds.includes(selectedPost.id)
                              ? 'bg-emerald-50 border-emerald-300 text-[#326E45]'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                          title="Save article"
                        >
                          <Bookmark size={13} className={bookmarkedIds.includes(selectedPost.id) ? 'fill-[#326E45]' : ''} />
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* PRIMARY ARTICLE BODY (SMOOTHLY SCROLLABLE ON RIGHT) */}
                <div ref={articleContentRef} className="lg:col-span-8 xl:col-span-8.5 min-w-0 max-w-3xl space-y-6">
                  
                  {/* MOBILE TABLE OF CONTENTS (Visible on screens < lg where sidebar is hidden) */}
                  <div className="lg:hidden bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2.5">
                      <span className="flex items-center gap-1.5">
                        <List size={13} className="text-[#326E45]" />
                        <span>Quick Navigation</span>
                      </span>
                      <span className="text-[10px] text-[#326E45] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        {Math.round(scrollPercentage)}% read
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPost.sections
                        .filter((sec) => sec.type === 'heading')
                        .map((sec, idx) => {
                          const headingAnchor = `heading-anchor-${idx}`;
                          const isCurrent = activeHeadingIndex === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => scrollToAnchor(headingAnchor)}
                              className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer truncate max-w-[220px] ${
                                isCurrent
                                  ? 'bg-[#326E45] text-white font-bold'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {sec.text}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Render Sections */}
                  {selectedPost.sections.map((sec, idx) => {
                    switch (sec.type) {
                      case 'paragraph':
                        return (
                          <p key={idx} className="text-slate-700 text-sm sm:text-base leading-relaxed">
                            {sec.text}
                          </p>
                        );

                      case 'heading': {
                        const headingIdx = selectedPost.sections.filter((s, i) => s.type === 'heading' && i <= idx).length - 1;
                        const anchorId = `heading-anchor-${headingIdx}`;
                        return (
                          <h2 
                            key={idx} 
                            id={anchorId}
                            data-heading-anchor
                            className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 pt-5 pb-1 flex items-center gap-2 border-b border-slate-100 scroll-mt-36"
                          >
                            <span className="w-1.5 h-4 bg-[#326E45] rounded-full shrink-0" />
                            <span>{sec.text}</span>
                          </h2>
                        );
                      }

                      case 'subheading':
                        return (
                          <h3 key={idx} className="text-base sm:text-lg font-bold text-slate-800 pt-2">
                            {sec.text}
                          </h3>
                        );

                      case 'quote':
                        return (
                          <blockquote key={idx} className="bg-emerald-50/50 rounded-xl border-l-4 border-[#326E45] p-4 sm:p-5 my-4">
                            <p className="text-xs sm:text-sm font-semibold italic text-emerald-950 leading-relaxed">
                              "{sec.text}"
                            </p>
                          </blockquote>
                        );

                      case 'code': {
                        const codeId = `code-block-${idx}`;
                        return (
                          <div key={idx} className="my-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-left font-mono shadow-sm">
                            <div className="bg-slate-900 border-b border-slate-800 px-3.5 py-2 flex items-center justify-between">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                {sec.codeLanguage || 'code'}
                              </span>
                              <button
                                onClick={() => handleCopyCode(sec.text || '', codeId)}
                                className="px-2 py-1 rounded text-[10px] font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {copiedId === codeId ? (
                                  <>
                                    <Check size={11} className="text-emerald-400" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="p-4 overflow-x-auto text-xs text-emerald-400 leading-relaxed">
                              <pre><code>{sec.text}</code></pre>
                            </div>
                          </div>
                        );
                      }

                      case 'list':
                        return (
                          <ul key={idx} className="space-y-2.5 my-4">
                            {sec.items?.map((item, lIdx) => (
                              <li key={lIdx} className="flex gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                                <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-[#326E45] flex items-center justify-center text-[9px] font-bold mt-0.5">
                                  ✓
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );

                      case 'callout': {
                        const calloutIcon = {
                          'did-you-know': Sparkles,
                          'best-practice': CheckCircle2,
                          'why-it-matters': BookOpen,
                          'key-benefits': Award,
                          'quick-summary': BookOpen,
                          'important-note': HelpCircle,
                          'expert-insight': Sparkles
                        }[(sec.calloutType || 'did-you-know')] || Sparkles;

                        const CIcon = calloutIcon;

                        return (
                          <div key={idx} className="my-5 p-4 sm:p-5 rounded-xl border border-emerald-200/80 bg-emerald-50/60 space-y-1.5">
                            <div className="flex items-center gap-2 text-[#326E45]">
                              <CIcon size={15} className="shrink-0" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">
                                {sec.title || 'Key Takeaway'}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                              {sec.text}
                            </p>
                          </div>
                        );
                      }

                      case 'stats':
                        return (
                          <div key={idx} className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {sec.statsData?.map((stat, sIdx) => (
                              <div key={sIdx} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
                                <div className="text-xl sm:text-2xl font-bold text-[#326E45] tracking-tight">
                                  {stat.value}
                                </div>
                                <div className="text-xs font-semibold text-slate-800 mt-0.5">
                                  {stat.label}
                                </div>
                                {stat.description && (
                                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                                    {stat.description}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        );

                      case 'illustration':
                        return (
                          <div key={idx} className="my-6">
                            {sec.illustrationType === 'dashboard' && <SmsHeroIllustration />}
                            {sec.illustrationType === 'attendance' && <AttendanceWorkflowIllustration />}
                            {sec.illustrationType === 'finance' && <FinancialWorkflowIllustration />}
                          </div>
                        );

                      case 'comparison':
                        return (
                          <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
                              <thead>
                                <tr className="bg-slate-900 text-white font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
                                  <th className="p-3 pl-4">Operational Aspect</th>
                                  <th className="p-3 text-slate-400">{sec.comparisonData?.legacyTitle || 'Traditional Manual'}</th>
                                  <th className="p-3 pr-4 text-emerald-400">{sec.comparisonData?.modernTitle || 'MetaWave Platform'}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {sec.comparisonData?.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                    <td className="p-3 pl-4 font-semibold text-slate-900">{row.feature}</td>
                                    <td className="p-3 text-slate-500">{row.legacy}</td>
                                    <td className="p-3 pr-4 text-[#326E45] font-semibold bg-emerald-50/20">{row.modern}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );

                      default:
                        return null;
                    }
                  })}

                  {/* CONSULTING ADVISORY CALLOUT AT END OF ARTICLE */}
                  <div className="p-5 bg-gradient-to-r from-emerald-50/80 to-slate-50 border border-emerald-200/90 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 shadow-2xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#326E45] tracking-wider block">
                        MetaWave Engineering Solutions
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        Need architectural advisory or custom software development?
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        Partner with our engineering teams to accelerate production deliverables and scale your systems.
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('contact')}
                      className="shrink-0 px-4 py-2.5 bg-[#326E45] hover:bg-[#275736] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Contact Engineering Team
                    </button>
                  </div>

                  {/* BOTTOM OF ARTICLE FEEDBACK & BACK BUTTON */}
                  <div className="pt-8 mt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handleBackToList}
                      className="text-xs font-semibold text-slate-600 hover:text-[#326E45] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft size={13} />
                      <span>Back to all publications</span>
                    </button>

                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-slate-500">Find this article useful?</span>
                      <button
                        onClick={() => handleLike(selectedPost.id)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                          liked[selectedPost.id]
                            ? 'bg-rose-50 border-rose-200 text-rose-600'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <ThumbsUp size={12} className={liked[selectedPost.id] ? 'fill-rose-500' : ''} />
                        <span>{liked[selectedPost.id] ? 'Liked' : 'Leave a Like'}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* MOBILE ONLY: RELATED PUBLICATIONS (On desktop, this is located on the left in the sidebar below Table of Contents) */}
              {relatedPosts.length > 0 && (
                <div className="lg:hidden mt-10 pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen size={16} className="text-[#326E45]" />
                      <span>Related Publications</span>
                    </h3>
                    <button
                      onClick={handleBackToList}
                      className="text-xs font-semibold text-[#326E45] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View all</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={(e) => handleOpenPost(post, e)}
                        className="bg-white rounded-xl border border-slate-200/90 hover:border-[#326E45]/40 p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-2 uppercase">
                            <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-bold uppercase border ${getCategoryBadgeClass(post.category)}`}>
                              {post.category}
                            </span>
                            <span>{post.readTime}</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#326E45] transition-colors leading-snug line-clamp-2 mb-1.5">
                            {post.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {post.summary}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500 text-[11px]">{post.author.name}</span>
                          <span className="text-[#326E45] font-semibold flex items-center gap-1">
                            <span>Read</span>
                            <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
