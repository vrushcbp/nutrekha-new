import { useState, useRef, useEffect, useCallback } from 'react';
import {
  BookOpen,
  Clock,
  User,
  Tag,
  ArrowRight,
  Sparkles,
  Share2,
  X,
  CheckCircle2,
  Calendar,
  Send,
  TrendingUp,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blogData';
import BookingConsultationModal from './BookingConsultationModal';

export default function BlogHub() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('Personalized Nutrition');

  const sectionRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    },
    [isVisible]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersect]);

  const featuredPost = BLOG_POSTS[0]; // First article as Featured
  const regularPosts = BLOG_POSTS.slice(1);

  const filteredPosts =
    selectedCategory === 'All'
      ? regularPosts
      : regularPosts.filter((post) => post.category === selectedCategory);

  const handleOpenArticle = (post) => {
    setActiveArticle(post);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    document.body.style.overflow = 'unset';
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
  };

  const handleOpenBooking = (service) => {
    if (activeArticle) handleCloseArticle();
    setBookingService(service);
    setIsBookingOpen(true);
  };

  return (
    <section className="blog-section" id="blog" ref={sectionRef}>
      {/* Background ambient accents */}
      <div className="blog-bg-pattern" />
      <div className="blog-ambient-orb-1" />
      <div className="blog-ambient-orb-2" />

      <div className="blog-container">
        {/* Section Header */}
        <div className={`blog-header ${isVisible ? 'blog-visible' : ''}`}>
          <div className="blog-badge">
            <BookOpen className="w-3.5 h-3.5 text-[#D4627A]" />
            <span>Health &amp; Nutrition Insights</span>
          </div>

          <h2 className="blog-title">
            Expert Guidance for{' '}
            <span className="italic-pink">Everyday Wellness</span>
          </h2>

          <p className="blog-subtitle">
            Explore evidence-based articles, nutrition tips, healthy recipes, and practical wellness strategies designed to help you make informed choices.
          </p>
        </div>

        {/* Featured Article Card (Full-Width Top Section) */}
        {featuredPost && (
          <div
            className={`blog-featured-card ${isVisible ? 'blog-visible-up' : ''}`}
            onClick={() => handleOpenArticle(featuredPost)}
          >
            <div className="blog-featured-image-wrap">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="blog-featured-image"
                loading="lazy"
              />
              <div className="blog-featured-overlay" />
              <span className="blog-featured-badge">Featured Article</span>
            </div>

            <div className="blog-featured-body">
              <div className="blog-featured-meta">
                <span className="blog-cat-tag">{featuredPost.category}</span>
                <span className="blog-meta-dot">•</span>
                <span className="blog-meta-item">
                  <Clock size={13} />
                  <span>{featuredPost.readTime}</span>
                </span>
                <span className="blog-meta-dot">•</span>
                <span>{featuredPost.date}</span>
              </div>

              <h3 className="blog-featured-title">{featuredPost.title}</h3>
              <p className="blog-featured-desc">{featuredPost.excerpt}</p>

              <div className="blog-featured-takeaway">
                <Sparkles size={16} className="text-[#D4627A] flex-shrink-0" />
                <span><strong>Key Insight:</strong> {featuredPost.takeaway}</span>
              </div>

              <div className="blog-featured-footer">
                <div className="blog-author-mini">
                  <div className="blog-author-avatar">
                    <User size={14} className="text-[#3A5A2E]" />
                  </div>
                  <div>
                    <div className="blog-author-name">{featuredPost.author}</div>
                    <div className="blog-author-role">{featuredPost.authorRole}</div>
                  </div>
                </div>

                <button className="btn-primary text-xs py-2.5 px-5">
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className={`blog-categories-wrap ${isVisible ? 'blog-visible-up' : ''}`} role="tablist">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`blog-cat-pill ${selectedCategory === cat ? 'blog-cat-pill-active' : ''}`}
              role="tab"
              aria-selected={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Content Layout: Blog Grid (Left) + Sidebar (Right Desktop) */}
        <div className="blog-main-layout">
          {/* Main Articles Grid */}
          <div className={`blog-articles-grid ${isVisible ? 'blog-visible-up' : ''}`}>
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-card"
                onClick={() => handleOpenArticle(post)}
              >
                {/* Image */}
                <div className="blog-card-image-frame">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-card-img"
                    loading="lazy"
                  />
                  <span className="blog-card-pill">{post.category}</span>
                </div>

                {/* Content */}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-meta-item">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-desc">{post.excerpt}</p>

                  <div className="blog-card-footer">
                    <span className="blog-card-author">{post.author}</span>
                    <span className="blog-card-btn">
                      <span>Read Article</span>
                      <ArrowRight size={13} className="blog-card-arrow" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar (Desktop Popular Articles, Categories, Mini CTA) */}
          <aside className={`blog-sidebar ${isVisible ? 'blog-visible-up' : ''}`}>
            {/* Popular Articles Widget */}
            <div className="blog-widget">
              <div className="blog-widget-header">
                <TrendingUp size={18} className="text-[#D4627A]" />
                <h4 className="blog-widget-title">Popular Articles</h4>
              </div>
              <div className="blog-popular-list">
                {BLOG_POSTS.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="blog-popular-item"
                    onClick={() => handleOpenArticle(item)}
                  >
                    <img src={item.image} alt={item.title} className="blog-popular-img" />
                    <div>
                      <h5 className="blog-popular-item-title">{item.title}</h5>
                      <span className="blog-popular-item-time">{item.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Categories Widget */}
            <div className="blog-widget">
              <h4 className="blog-widget-title mb-3">Explore Categories</h4>
              <div className="blog-widget-categories">
                {BLOG_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="blog-widget-cat-item"
                  >
                    <span>{cat}</span>
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Consultation Callout Widget */}
            <div className="blog-widget blog-widget-cta">
              <Sparkles size={24} className="text-[#D4627A] mb-2 animate-pulse" />
              <h4 className="text-base font-bold text-[#2D4A2D] mb-1">Personalized Nutrition Plan</h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Want a custom diet roadmap tailored to your body and blood reports?
              </p>
              <button
                onClick={() => handleOpenBooking('Personalized Nutrition')}
                className="btn-primary text-xs py-2.5 px-4 w-full justify-center"
              >
                <Calendar size={14} />
                <span>Book 1-on-1 Session</span>
              </button>
            </div>
          </aside>
        </div>

        {/* Newsletter CTA Section */}
        <div className={`blog-newsletter-card ${isVisible ? 'blog-visible-up' : ''}`}>
          <div className="blog-newsletter-content">
            <div className="blog-newsletter-icon">
              <Mail size={24} className="text-[#D4627A]" />
            </div>

            <h3 className="blog-newsletter-title">Get Weekly Nutrition Tips</h3>
            <p className="blog-newsletter-desc">
              Join our community and receive expert, evidence-based nutrition guidance directly in your inbox.
            </p>

            {newsletterSubscribed ? (
              <div className="blog-newsletter-success">
                <CheckCircle2 size={20} className="text-[#3A5A2E]" />
                <span>Thank you for subscribing! Check your inbox for your first nutrition tip.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="blog-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="blog-newsletter-input"
                  required
                />
                <button type="submit" className="btn-primary py-3 px-6 text-sm">
                  <span>Subscribe</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Article Detail Reader Overlay */}
      {activeArticle && (
        <div className="blog-modal-overlay" onClick={handleCloseArticle}>
          <div
            className="blog-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Reading Progress Indicator */}
            <div className="blog-reader-progress-bar" />

            <button
              onClick={handleCloseArticle}
              className="blog-modal-close"
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="blog-breadcrumb">
              <span>Home</span>
              <ChevronRight size={12} />
              <span>Blog</span>
              <ChevronRight size={12} />
              <span className="text-[#D4627A]">{activeArticle.category}</span>
            </div>

            {/* Article Header */}
            <span className="blog-modal-cat">{activeArticle.category}</span>
            <h1 className="blog-modal-heading">{activeArticle.title}</h1>

            <div className="blog-modal-author-bar">
              <div className="blog-modal-author-info">
                <div className="blog-modal-author-avatar">
                  <User size={18} className="text-[#3A5A2E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D4A2D] text-sm">{activeArticle.author}</h4>
                  <span className="text-xs text-slate-500">{activeArticle.authorRole}</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-3">
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="blog-modal-cover">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-[280px] sm:h-[340px] object-cover rounded-2xl" />
            </div>

            {/* Body */}
            <div
              className="blog-modal-body prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }}
            />

            {/* Takeaway Box */}
            <div className="blog-takeaway-box">
              <div className="flex items-center gap-2 text-[#D4627A] font-bold text-sm mb-2">
                <Sparkles size={16} />
                <span>Nutritionist’s Key Takeaway</span>
              </div>
              <p className="text-sm font-medium text-[#2D4A2D]">{activeArticle.takeaway}</p>
            </div>

            {/* Social Share Buttons */}
            <div className="blog-share-bar">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Share2 size={14} />
                <span>Share Article</span>
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(activeArticle.title + ' - https://nutrekha.com/#blog')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="blog-share-btn"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="blog-share-btn"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="blog-related-section">
              <h4 className="font-bold text-[#2D4A2D] text-base mb-4">Related Health Reads</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BLOG_POSTS.filter((p) => p.id !== activeArticle.id).slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    className="blog-related-item"
                    onClick={() => setActiveArticle(rel)}
                  >
                    <img src={rel.image} alt={rel.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h5 className="text-xs font-bold text-[#2D4A2D] line-clamp-2">{rel.title}</h5>
                      <span className="text-[11px] text-slate-500">{rel.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="blog-modal-cta-box">
              <div>
                <h3 className="font-bold text-[#2D4A2D] text-base mb-1">Ready for a custom nutrition plan tailored to your health?</h3>
                <p className="text-xs text-slate-600">Consult 1-on-1 with our clinical diet team.</p>
              </div>
              <button
                onClick={() => handleOpenBooking(activeArticle.category)}
                className="btn-primary text-xs py-3 px-6 whitespace-nowrap"
              >
                <Calendar size={15} />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Consultation Modal */}
      <BookingConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={bookingService}
      />
    </section>
  );
}
