import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import SolutionOverview from './components/Solution';
import Pricing from './components/Pricing';
import UniqueValueProposition from './components/UniqueValueProposition';
import ROICalculator from './components/ROICalculator';
import { JsonLdScript } from './components/JsonLdTemplates';

// Import hotel images and map
import Hotel1 from './hotelimage/Hotel1.jpeg';
import Hotel2 from './hotelimage/Hotel2.jpeg';
import Hotel3 from './hotelimage/Hotel3.jpg';
import MapImage from './hotelimage/MAP.png';

// Scroll Animation Hook
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return [elementRef, isVisible];
}

// Floating Animation Component
function FloatingElement({ children, delay = 0 }) {
  return (
    <div 
      className="floating-element" 
      style={{ 
        '--delay': `${delay}s`,
        animation: `float 6s ease-in-out infinite ${delay}s`
      }}
    >
      {children}
    </div>
  );
}

// Enhanced Background Particles
function BackgroundParticles() {
  return (
    <div className="bg-particles">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="particle"
          style={{
            '--delay': `${i * 0.5}s`,
            '--duration': `${8 + i}s`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  );
}

function NavBar({ activeSection, setActiveSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleNavClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  // Breadcrumb data based on active section
  const breadcrumbData = {
    itemListElement: [
      { name: "Home", url: "https://cloudlight.ai" },
      { 
        name: activeSection === 'hero' ? 'Home' : 
              activeSection === 'solution' ? 'Solution' :
              activeSection === 'unique-value' ? 'Value Proposition' :
              activeSection === 'demo' ? 'Demo' :
              activeSection === 'pricing' ? 'Pricing' :
              activeSection === 'results' ? 'Results' :
              activeSection === 'faq' ? 'FAQ' :
              activeSection === 'roi-calculator' ? 'ROI Calculator' : 'Home',
        url: `https://cloudlight.ai/#${activeSection}`
      }
    ]
  };

  return (
    <nav className="nav">
      <div className="container nav-inner">
        {/* Add Breadcrumb Schema */}
        <JsonLdScript pageType="BreadcrumbList" pageData={breadcrumbData} />
        <button onClick={() => handleNavClick('hero')} className="brand brand-button">
          <svg className="brand-logo" viewBox="0 0 120 32" aria-hidden="true">
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5E7EB" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.7"/>
              </linearGradient>
              <linearGradient id="lightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B"/>
                <stop offset="100%" stopColor="#EF4444"/>
              </linearGradient>
            </defs>
            {/* Cloud shape */}
            <path d="M8 20C4 20 1 17 1 13C1 9 4 6 8 6C8.5 6 9 6.1 9.5 6.3C10.5 4.5 12.5 3 15 3C18 3 20.5 5.5 20.5 8.5C20.5 9 20.4 9.5 20.2 10C21.5 10.5 22.5 11.5 22.5 13C22.5 15 21 17 19 17C18.5 17 18 16.8 17.5 16.5C16.5 18.5 14 20 11 20H8Z" fill="url(#cloudGrad)"/>
            {/* Light rays */}
            <path d="M25 8L27 6L29 8L27 10L25 8Z" fill="url(#lightGrad)"/>
            <path d="M30 12L32 10L34 12L32 14L30 12Z" fill="url(#lightGrad)"/>
            <path d="M28 16L30 14L32 16L30 18L28 16Z" fill="url(#lightGrad)"/>
            {/* Text */}
            <text x="40" y="22" className="brand-text" fill="#1F2937" fontSize="16" fontWeight="600" fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif">Cloudlight.ai</text>
          </svg>
        </button>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        </ul>
        <div className="nav-cta">
          <button onClick={() => handleNavClick('pricing')} className="btn btn-outline">Pricing</button>
          <button onClick={() => handleNavClick('demo')} className="btn btn-primary">Book Demo</button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [heroRef, isHeroVisible] = useScrollAnimation();
  const [typedText, setTypedText] = useState('');
  const [currentAI, setCurrentAI] = useState(0);
  const [showAIAnimation, setShowAIAnimation] = useState(false);
  const aiNames = useMemo(() => ['ChatGPT', 'Perplexity', 'Grok'], []);
  const fullText = 'Be the hotel ChatGPT recommends first';

  useEffect(() => {
    if (isHeroVisible) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          // After typing is complete, start AI name animation
          setTimeout(() => {
            setShowAIAnimation(true);
          }, 1500); // Wait 1.5 seconds after typing completes
        }
      }, 50);
      
      // Clean up the typing timer
      return () => {
        clearInterval(timer);
      };
    }
  }, [isHeroVisible, fullText]);

  // Separate useEffect for AI name cycling
  useEffect(() => {
    if (showAIAnimation) {
      const cycleTimer = setInterval(() => {
        setCurrentAI(prev => (prev + 1) % aiNames.length);
      }, 2500); // Change every 2.5 seconds
      
      return () => clearInterval(cycleTimer);
    }
  }, [showAIAnimation, aiNames]);

  return (
    <header id="top" className="section hero">
      <BackgroundParticles />
      <div className="container hero-inner" ref={heroRef}>
        <div className={`hero-copy ${isHeroVisible ? 'animate-slide-up' : ''}`}>
          <p className="eyebrow animate-fade-in" style={{ animationDelay: '0.2s' }}>
            LLM SEO for Hotels
          </p>
                      <h1 className="typing-text">
              {showAIAnimation ? (
                <>
                  Be the Hotel <span className="ai-name-animated" key={currentAI}>{aiNames[currentAI]}</span> recommends first
                  <span className="cursor">|</span>
                </>
              ) : (
                <>
                  {typedText}
                  <span className="cursor">|</span>
                </>
              )}
            </h1>
          <p className="sub animate-fade-in" style={{ animationDelay: '0.6s' }}>
          When your potential guests ask AI where to stay, will it name you — or your competitor? <br></br>
          Dominate AI search results and turn every query into your next direct booking.
          </p>
          <div className="cta-row animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <a className="btn btn-primary btn-enhanced" href="#contact">
              <span>Get Hotel Demo</span>
              <div className="btn-shimmer"></div>
            </a>
            <a className="btn btn-outline" href="#roi-calculator">Calculate Your ROI</a>
          </div>
          <div className="hero-trust animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="trust-logos">
              <div className="trust-logo">DACH</div>
              <div className="trust-logo">SPAIN</div>
              <div className="trust-logo">BNLX</div>
            </div>
            <span>Trusted by independent hotels and luxury chains across Europe</span>
          </div>
        </div>
        <div className={`hero-chatgpt ${isHeroVisible ? 'animate-slide-left' : ''}`}>
          <ChatGPTSimulation />
        </div>
      </div>
    </header>
  );
}

// ChatGPT Simulation Component
function ChatGPTSimulation() {
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [isTypingQuestion, setIsTypingQuestion] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [highlightFirst, setHighlightFirst] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [highlightCTA, setHighlightCTA] = useState(false);
  const [highlightCTAButton, setHighlightCTAButton] = useState(false);
  const [currentSimAI, setCurrentSimAI] = useState(0);
  const simAINames = useMemo(() => ['ChatGPT', 'Perplexity', 'Grok'], []);
  const recommendationsRef = useRef(null);
  const chatContainerRef = useRef(null);

  const query = useMemo(() => ({
    question: "recommend 3 hotels in barcelona",
    response: "Here are some beautiful snapshots capturing the vibe of upscale and boutique hotels in Barcelona—from the iconic beachfront silhouette of W Barcelona to inviting rooftop pools and stylish interiors.",
    hasImages: true,
    hasMap: true
  }), []);

  useEffect(() => {
    // 1. Type the question
    let questionIndex = 0;
    const typeQuestion = () => {
      if (questionIndex <= query.question.length) {
        setDisplayedQuestion(query.question.slice(0, questionIndex));
        questionIndex++;
        setTimeout(typeQuestion, 50);
      } else {
        setIsTypingQuestion(false);
        
        // 2. BOOM! - Images appear instantly with much shorter delay
        setTimeout(() => {
          setShowImages(true);
        }, 200); // Much faster response - 200ms delay
        
        // 3. BOOM! - Response text appears instantly
        setTimeout(() => {
          setShowResponse(true);
          setDisplayedResponse(query.response); // Show full response instantly
        }, 600); // 400ms after images
        
        // 4. BOOM! - Map appears instantly
        setTimeout(() => {
          setShowMap(true);
        }, 1000); // 400ms after text
        
        // 5. BOOM! - Recommendations appear instantly
        setTimeout(() => {
          setShowRecommendations(true);
          
          // 6. Auto-scroll to recommendations within the chat container - smoother timing
          setTimeout(() => {
            if (recommendationsRef.current && chatContainerRef.current) {
              const container = chatContainerRef.current;
              const recommendations = recommendationsRef.current;
              const containerRect = container.getBoundingClientRect();
              const recommendationsRect = recommendations.getBoundingClientRect();
              
              // Calculate the scroll position within the container
              const scrollPosition = recommendations.offsetTop - container.offsetTop - (containerRect.height / 2) + (recommendationsRect.height / 2);
              
              // Smooth scroll within the container only
              container.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
              });
            }
            
            // 7. Highlight first recommendation after scroll - smoother flow
            setTimeout(() => {
              setHighlightFirst(true);
              
              // 8. Show floating CTA - smoother appearance
              setTimeout(() => {
                setShowFloatingCTA(true);
                
                // 9. Highlight CTA container after it appears - smoother timing
                setTimeout(() => {
                  setHighlightCTA(true);
                  
                  // 10. Highlight CTA button last - smoother flow
                  setTimeout(() => {
                    setHighlightCTAButton(true);
                  }, 800); // 800ms after container highlight (smoother)
                }, 500); // 500ms after CTA appears (smoother)
              }, 800); // 800ms delay (smoother)
            }, 400); // 400ms after scroll (smoother)
          }, 300);
        }, 1400); // 400ms after map
      }
    };
    
    // Start animation sequence once
    typeQuestion();
  }, [query]);

  // Separate useEffect for simulation AI name cycling
  useEffect(() => {
    const simCycleTimer = setInterval(() => {
      setCurrentSimAI(prev => (prev + 1) % simAINames.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(simCycleTimer);
  }, [simAINames]);

  return (
    <div className="chatgpt-simulation">
      <div className="simulation-header">
        <div className="chatgpt-logo">
          <div className="logo-circle">
            <span>AI</span>
          </div>
          <span className="ai-name-animated" key={currentSimAI}>{simAINames[currentSimAI]}</span>
        </div>
        <div className="simulation-status">Live Demo</div>
      </div>
      
      <div className="chat-container" ref={chatContainerRef}>
        <div className="message-bubble user">
          <p>
            {displayedQuestion}
            {isTypingQuestion && <span className="typing-cursor">|</span>}
          </p>
        </div>
        
        {showResponse && (
          <div className="message-bubble ai">
            {/* Images at the top */}
            {showImages && query.hasImages && (
              <div className="hotel-images-gallery animate-fade-in">
                <img src={Hotel1} alt="Barcelona Hotel 1" className="hotel-image" />
                <img src={Hotel2} alt="Barcelona Hotel 2" className="hotel-image" />
                <img src={Hotel3} alt="Barcelona Hotel 3" className="hotel-image" />
                <img src={Hotel1} alt="Barcelona Hotel 4" className="hotel-image" />
              </div>
            )}
            
            {/* Overview text */}
            <div className="response-text">
              {displayedResponse.split('**').map((part, index) => 
                index % 2 === 1 ? <strong key={index}>{part}</strong> : part
              )}
            </div>
            
            {/* Map */}
            {showMap && query.hasMap && (
              <img src={MapImage} alt="Barcelona Hotels Map" className="hotel-map animate-fade-in" />
            )}
            
            {/* Hotel recommendations */}
            {showRecommendations && query.hasMap && (
              <div className="hotel-recommendations animate-slide-up" ref={recommendationsRef}>
                <div className={`hotel-item ${highlightFirst ? 'highlighted shine-highlight' : ''}`}>
                  <img src={Hotel1} alt="W Barcelona" className="hotel-thumbnail" />
                  <div className="hotel-details">
                    <h4>W Barcelona</h4>
                    <div className="hotel-status">Jetzt geöffnet bis 0:00 • Hotel • 4.5 (1847 Bewertungen)</div>
                    <p>Iconic sail-shaped luxury right on Barceloneta beach; rooftop bars, spa, pools, direct beach access.</p>
                  </div>
                </div>
                <div className="hotel-item">
                  <img src={Hotel2} alt="Hotel Casa Fuster" className="hotel-thumbnail" />
                  <div className="hotel-details">
                    <h4>Hotel Casa Fuster</h4>
                    <div className="hotel-status">Jetzt geöffnet bis 0:00 • Hotel • 4.7 (1200 Bewertungen)</div>
                    <p>Luxury Modernist hotel on Passeig de Gràcia with rooftop terrace, fine dining, and historic charm.</p>
                  </div>
                </div>
                <div className="hotel-item">
                  <img src={Hotel3} alt="The Barcelona EDITION" className="hotel-thumbnail" />
                  <div className="hotel-details">
                    <h4>The Barcelona EDITION</h4>
                    <div className="hotel-status">Jetzt geöffnet bis 0:00 • Hotel • 4.6 (890 Bewertungen)</div>
                    <p>Contemporary luxury hotel with innovative design, world-class spa, and panoramic city views.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="simulation-footer">
        <div className="demo-note">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <span>Your hotel could be the first recommendation</span>
        </div>
      </div>
      
      {/* Floating CTA */}
      {showFloatingCTA && (
        <div className={`floating-cta animate-slide-up ${highlightCTA ? 'shine-highlight' : ''}`}>
          <div className="floating-cta-content">
            <div className="floating-cta-arrow"></div>
            <h4>This could be your hotel</h4>
            <p>Get featured as the top AI recommendation for travelers</p>
            <a href="#unique-value" className={`btn btn-primary btn-demo ${highlightCTAButton ? 'shine-highlight' : ''}`}>
              See Value Proposition
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function ProblemSection({ onNavigateToSolution }) {
  const [problemRef, isProblemVisible] = useScrollAnimation();

  return (
    <section id="problem" className="section problem">
      <div className="container" ref={problemRef}>
        <div className={`problem-header ${isProblemVisible ? 'animate-fade-in' : ''}`}>
          <h2>Travelers now ask AI for hotel recommendations</h2>
          <p className="sub">While you invest in Google Ads and OTA commissions, guests are already asking ChatGPT and Perplexity "where should I stay?"—and AI recommends your competitors.</p>
        </div>
        <div className="grid problem-grid">
          <div className={`card problem-card ${isProblemVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className="problem-stat animate-number" data-value="67">67%</div>
            <h3>Travelers use AI for trip planning</h3>
            <p>European travelers now ask AI assistants for personalized hotel recommendations before checking booking sites.</p>
          </div>
          <div className={`card problem-card ${isProblemVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.4s' }}>
            <div className="problem-stat animate-number" data-value="23">€23K</div>
            <h3>Monthly revenue at risk per property</h3>
            <p>Hotels lose this much in direct bookings when AI assistants recommend competitors instead of their property.</p>
          </div>
          <div className={`card problem-card ${isProblemVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.6s' }}>
            <div className="problem-stat animate-number" data-value="12">12 months</div>
            <h3>Time to lose market position</h3>
            <p>How long before AI-optimized competitors dominate travel recommendations in your market.</p>
          </div>
        </div>
        <div className={`problem-cta ${isProblemVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.8s' }}>
          <p><strong>Your guests are already using AI to choose hotels.</strong> Every day you're not AI-optimized, competitors capture bookings you should be getting.</p>
          <div className="problem-cta-buttons">
            <button className="btn btn-primary pulse-button" onClick={onNavigateToSolution}>See How We Fix This</button>
            <a href="#roi-calculator" className="btn btn-outline">Calculate Your ROI</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom SVG Icons








function MoneyIcon() {
  return (
    <svg className="icon-svg money-icon" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="moneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700"/>
          <stop offset="100%" stopColor="#ffb347"/>
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#moneyGrad)" className="coin-body"/>
      <path d="M24 10 C19 10 15 12 15 16 C15 18 16 19 18 20 L30 22 C32 23 33 24 33 26 C33 30 29 32 24 32 M24 10 V38" 
            stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" className="dollar-sign"/>
      <circle cx="24" cy="24" r="24" fill="none" stroke="url(#moneyGrad)" strokeWidth="2" opacity="0.4" className="coin-glow"/>
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg className="icon-svg analytics-icon" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2196f3"/>
          <stop offset="100%" stopColor="#42a5f5"/>
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="36" height="30" rx="4" fill="url(#analyticsGrad)" opacity="0.2" className="chart-bg"/>
      <rect x="12" y="28" width="4" height="8" fill="url(#analyticsGrad)" className="bar1"/>
      <rect x="18" y="22" width="4" height="14" fill="url(#analyticsGrad)" className="bar2"/>
      <rect x="24" y="18" width="4" height="18" fill="url(#analyticsGrad)" className="bar3"/>
      <rect x="30" y="24" width="4" height="12" fill="url(#analyticsGrad)" className="bar4"/>
      <path d="M10 30 Q16 26 22 24 Q28 20 34 22" stroke="url(#analyticsGrad)" strokeWidth="2" fill="none" className="trend-line"/>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="icon-svg target-icon" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e91e63"/>
          <stop offset="100%" stopColor="#f48fb1"/>
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="none" stroke="url(#targetGrad)" strokeWidth="2" className="target-ring1"/>
      <circle cx="24" cy="24" r="12" fill="none" stroke="url(#targetGrad)" strokeWidth="2" className="target-ring2"/>
      <circle cx="24" cy="24" r="6" fill="none" stroke="url(#targetGrad)" strokeWidth="2" className="target-ring3"/>
      <circle cx="24" cy="24" r="3" fill="url(#targetGrad)" className="target-center"/>
      <path d="M24 6 L26 12 L24 18 L22 12 Z" fill="url(#targetGrad)" className="target-arrow"/>
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg className="icon-svg rocket-icon" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5722"/>
          <stop offset="100%" stopColor="#ff8a65"/>
        </linearGradient>
      </defs>
      <path d="M24 4 C28 4 32 8 32 14 L32 28 L28 32 L20 32 L16 28 L16 14 C16 8 20 4 24 4 Z" 
            fill="url(#rocketGrad)" className="rocket-body"/>
      <circle cx="24" cy="16" r="3" fill="white" className="rocket-window"/>
      <path d="M16 28 L12 36 L16 32 Z" fill="url(#rocketGrad)" className="rocket-fin1"/>
      <path d="M32 28 L36 36 L32 32 Z" fill="url(#rocketGrad)" className="rocket-fin2"/>
      <ellipse cx="24" cy="38" rx="4" ry="6" fill="#ffb347" opacity="0.8" className="rocket-flame"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="icon-svg clock-icon" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9c27b0"/>
          <stop offset="100%" stopColor="#ba68c8"/>
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#clockGrad)" className="clock-face"/>
      <circle cx="24" cy="24" r="2" fill="white" className="clock-center"/>
      <line x1="24" y1="24" x2="24" y2="14" stroke="white" strokeWidth="3" strokeLinecap="round" className="clock-hour"/>
      <line x1="24" y1="24" x2="30" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" className="clock-minute"/>
      <circle cx="24" cy="8" r="1" fill="white"/>
      <circle cx="24" cy="40" r="1" fill="white"/>
      <circle cx="8" cy="24" r="1" fill="white"/>
      <circle cx="40" cy="24" r="1" fill="white"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="icon-svg shield-icon" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#607d8b"/>
          <stop offset="100%" stopColor="#90a4ae"/>
        </linearGradient>
      </defs>
      <path d="M24 4 L36 10 L36 24 C36 32 30 38 24 42 C18 38 12 32 12 24 L12 10 Z" 
            fill="url(#shieldGrad)" className="shield-body"/>
      <path d="M18 22 L22 26 L30 16" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shield-check"/>
      <path d="M24 8 L32 12 L32 24 C32 28 28 32 24 36 C20 32 16 28 16 24 L16 12 Z" 
            fill="none" stroke="white" strokeWidth="1" opacity="0.5" className="shield-inner"/>
    </svg>
  );
}



function ProductDemo() {
  // Article schema data for demo content
  const demoArticleData = {
    headline: "See Hotel LLM SEO in Action - Cloudlight.ai Demo",
    description: "Watch how we transform your hotel into the AI-recommended choice for travelers using advanced LLM SEO techniques",
    author: "Cloudlight.ai Team",
    datePublished: "2024-01-15",
    dateModified: "2024-01-15",
    publisher: "Cloudlight.ai",
    publisherLogo: "https://cloudlight.ai/logo.png",
    url: "https://cloudlight.ai/#demo",
    image: ["https://cloudlight.ai/images/demo-showcase.jpg"],
    articleBody: "This demonstration shows the dramatic difference between traditional hotel marketing and AI-optimized approaches. Before optimization, travelers see generic OTA listings with hundreds of competing options. After Cloudlight.ai optimization, AI models like ChatGPT and Perplexity specifically recommend your hotel with detailed reasons why it's the perfect choice for the traveler's specific needs."
  };

  return (
    <section id="demo" className="section demo">
      <div className="container">
        {/* Add Article Schema for demo content */}
        <JsonLdScript pageType="Article" pageData={demoArticleData} />
        
        <div className="demo-header">
          <h2>See hotel LLM SEO in action</h2>
          <p className="sub">Watch how we transform your hotel into the AI-recommended choice for travelers</p>
        </div>
        <div className="demo-content">
          <div className="demo-showcase">
            <div className="demo-card">
              <h3>Before: Traditional Marketing</h3>
              <div className="demo-example">
                <div className="search-query">"Family hotel Barcelona airport shuttle parking"</div>
                <div className="search-result traditional">
                  <div className="result-header">Google Results</div>
                  <div className="result-item">
                    <div className="result-title">Top 15 Airport Hotels Barcelona - Booking.com</div>
                    <div className="result-snippet">Compare 247 hotels near Barcelona airport...</div>
                  </div>
                  <div className="result-note">Traveler sees OTA listings with 247 competing options</div>
                </div>
              </div>
            </div>
            <div className="demo-vs">VS</div>
            <div className="demo-card highlight">
              <h3>After: AI-Optimized</h3>
              <div className="demo-example">
                <div className="search-query">"Family hotel Barcelona airport shuttle parking"</div>
                <div className="search-result ai">
                  <div className="result-header">ChatGPT Response</div>
                  <div className="result-item">
                    <div className="result-title">Personalized Recommendation</div>
                    <div className="result-snippet">"For families, <strong>Hotel Castelldefels</strong> is ideal—free airport shuttle, family suites, pool, and secure parking. Book direct for best rates."</div>
                  </div>
                  <div className="result-note">Traveler gets your hotel recommended with clear reasons</div>
                </div>
              </div>
            </div>
          </div>
          <div className="demo-metrics">
            <div className="metric-item">
              <div className="metric-value">8.4x</div>
              <div className="metric-label">Higher conversion rate from AI recommendations</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">89%</div>
              <div className="metric-label">Of AI-referred guests book directly</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">€47</div>
              <div className="metric-label">Higher ADR vs OTA bookings</div>
            </div>
          </div>
        </div>
        <div className="demo-cta">
          <a className="btn btn-primary" href="#contact">Get Hotel Analysis</a>
          <a className="btn btn-outline" href="#unique-value">See Cost Savings</a>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const LogoA = () => (
    <svg className="logo-svg" viewBox="0 0 64 24" aria-hidden>
      <rect x="0" y="6" width="64" height="12" rx="6" />
    </svg>
  );
  const LogoB = () => (
    <svg className="logo-svg" viewBox="0 0 64 24" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <rect x="26" y="4" width="32" height="16" rx="4" />
    </svg>
  );
  const LogoC = () => (
    <svg className="logo-svg" viewBox="0 0 64 24" aria-hidden>
      <path d="M2 20L20 4h8L12 20H2Z" />
      <path d="M28 4h8l-8 16h-8l8-16Z" />
      <path d="M46 4h8l-8 16h-8l8-16Z" />
    </svg>
  );
  const LogoD = () => (
    <svg className="logo-svg" viewBox="0 0 64 24" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <rect x="24" y="2" width="20" height="20" rx="4" />
      <rect x="46" y="2" width="16" height="20" rx="4" />
    </svg>
  );
  const LogoE = () => (
    <svg className="logo-svg" viewBox="0 0 64 24" aria-hidden>
      <path d="M4 18V6h10c4 0 6 2 6 6s-2 6-6 6H4Z" />
      <path d="M38 6h10c4 0 6 2 6 6s-2 6-6 6H38V6Z" />
    </svg>
  );
  const LogoF = () => (
    <svg className="logo-svg" viewBox="0 0 64 24" aria-hidden>
      <polygon points="8,20 16,4 24,20" />
      <polygon points="28,20 36,4 44,20" />
      <polygon points="48,20 56,4 60,12 56,20" />
    </svg>
  );

  const logos = [LogoA, LogoB, LogoC, LogoD, LogoE, LogoF];
  const sequence = [...logos, ...logos];
  return (
    <section className="section logos" aria-label="Trusted by leading teams">
      <div className="container logos-scroller">
        <div className="logos-track">
          {sequence.map((Logo, idx) => (
            <div key={idx} className="logo-item" aria-hidden>
              <Logo />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: 'Answer-ready content',
      desc: 'FAQs, comparisons, specs, pros/cons.'
    },
    {
      title: 'Grounding & schema',
      desc: 'Entities, feeds, policies, docs.'
    },
    {
      title: 'Assistant integrations',
      desc: 'Plugins/tools, deep links, citations.'
    },
    {
      title: 'Programmatic generation',
      desc: 'Ship thousands of unique, linked pages.'
    },
    {
      title: 'Evals & guardrails',
      desc: 'Factuality, style, duplication control.'
    },
    {
      title: 'Measurement & SOV',
      desc: 'Assistant referrals, SOV, prompt tests.'
    },
  ];
  return (
    <section id="features" className="section features">
      <div className="container">
        <h2>LLM SEO UVPs</h2>
        <div className="grid">
          {items.map((f) => (
            <div key={f.title} className="card">
              <div className="card-icon" aria-hidden>
                <span>★</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    { step: '01', title: 'Model entities', text: 'Products, services, specs, policies.' },
    { step: '02', title: 'Design answers', text: 'FAQs, comparisons, tables.' },
    { step: '03', title: 'Generate at scale', text: 'Prompts, evals, human review.' },
    { step: '04', title: 'Expose & integrate', text: 'Schema, feeds, APIs, assistants.' },
    { step: '05', title: 'Measure & iterate', text: 'Referrals, SOV, weekly updates.' },
  ];
  return (
    <section id="approach" className="section how">
      <div className="container">
        <h2>Approach</h2>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.step} className="step">
              <div className="step-num">{s.step}</div>
              <div className="step-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Proof() {
  const bullets = [
    { stat: '34%', label: 'US adults used ChatGPT', sources: [{ name: 'Pew Research Center', url: 'https://www.pewresearch.org' }], note: '58% under‑30s' },
    { stat: '27%', label: 'Interact with AI weekly', sources: [{ name: 'Pew Research Center', url: 'https://www.pewresearch.org' }] },
    { stat: '33M', label: 'Copilot active users', sources: [{ name: 'businessofapps.com', url: 'https://www.businessofapps.com' }] },
    { stat: '100M+', label: 'Perplexity weekly requests', sources: [
      { name: 'businessofapps.com', url: 'https://www.businessofapps.com' },
      { name: 'Exploding Topics', url: 'https://explodingtopics.com' },
      { name: 'DemandSage', url: 'https://www.demandsage.com' },
    ] },
    { stat: '62%', label: 'Trust AI for discovery', sources: [{ name: 'Yext', url: 'https://www.yext.com' }] },
    { stat: '5k', label: 'Consumer AI study size', sources: [{ name: 'Menlo Ventures', url: 'https://menlovc.com' }] },
  ];

  return (
    <section id="why" className="section proof">
      <div className="container">
        <h2>Why LLM SEO now</h2>
        <div className="proof-grid">
          {bullets.map((b, idx) => (
            <div key={idx} className="proof-tile">
              <div className="proof-stat">{b.stat}</div>
              <div className="proof-label">{b.label}</div>
              {b.note ? <div className="proof-note">{b.note}</div> : null}
              <div className="proof-links">
                {b.sources.map((s, i) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer">{s.name}{i < b.sources.length - 1 ? ' · ' : ''}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LineChart({ data }) {
  const containerRef = React.useRef(null);
  const [svgWidth, setSvgWidth] = React.useState(920);
  const height = 260;
  const padding = { top: 16, right: 88, bottom: 32, left: 42 };
  const innerW = svgWidth - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const [visible, setVisible] = React.useState({ chatgpt: true, perplexity: true, gemini: true, llm: true, google: true });
  const toggle = (key) => setVisible((v) => ({ ...v, [key]: !v[key] }));
  const [view, setView] = React.useState('index'); // 'index' | 'share' | 'volume'

  React.useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setSvgWidth(Math.max(320, Math.min(1100, Math.round(w))));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const parse = (m) => new Date(m + '-01').getTime();
  const rawPoints = data.series.map((d) => {
    const chatgpt = d.chatgpt ?? 0;
    const perplexity = d.perplexity ?? 0;
    const gemini = d.gemini ?? 0;
    const llmAgg = chatgpt + perplexity + gemini; // aggregate = sum of assistants
    return {
      t: parse(d.month),
      chatgpt,
      perplexity,
      gemini,
      llm: llmAgg,
      google: d.google ?? 0,
    };
  });
  const volumeM = { google: 14000, chatgpt: 2500, perplexity: 26, gemini: 0 };
  const points = view === 'share'
    ? rawPoints.map((p) => {
        const g = p.google || 1;
        return {
          t: p.t,
          chatgpt: (p.chatgpt / g) * 100,
          perplexity: (p.perplexity / g) * 100,
          gemini: (p.gemini / g) * 100,
          llm: ((p.chatgpt + p.perplexity + p.gemini) / g) * 100,
          google: 100,
        };
      })
    : view === 'volume'
    ? rawPoints.map((p) => ({
        t: p.t,
        chatgpt: volumeM.chatgpt,
        perplexity: volumeM.perplexity,
        gemini: volumeM.gemini,
        llm: volumeM.chatgpt + volumeM.perplexity + volumeM.gemini,
        google: volumeM.google,
      }))
    : rawPoints;
  const tMin = Math.min(...points.map((p) => p.t));
  const tMax = Math.max(...points.map((p) => p.t));
  const yMin = Math.min(
    0,
    Math.min(
      ...points.map((p) => Math.min(p.chatgpt, p.perplexity, p.gemini, p.llm, p.google))
    )
  );
  const yMax = Math.max(
    ...points.map((p) => Math.max(p.chatgpt, p.perplexity, p.gemini, p.llm, p.google))
  ) * 1.1;

  const x = (t) => padding.left + ((t - tMin) / (tMax - tMin)) * innerW;
  const y = (v) => padding.top + innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const toPath = (key) => points.map((p, i) => `${i ? 'L' : 'M'} ${x(p.t)} ${y(p[key])}`).join(' ');

  const months = points.map((p) => new Date(p.t)).filter((_, i) => i % 4 === 0);

  const [hover, setHover] = React.useState(null);
  const onMove = (evt) => {
    const rect = evt.currentTarget.getBoundingClientRect();
    const px = evt.clientX - rect.left;
    const tGuess = tMin + ((px - padding.left) / innerW) * (tMax - tMin);
    let nearest = points[0];
    let best = Infinity;
    for (const p of points) {
      const diff = Math.abs(p.t - tGuess);
      if (diff < best) { best = diff; nearest = p; }
    }
    const cx = x(nearest.t);
    setHover({
      cx,
      chatgpt: { x: cx, y: y(nearest.chatgpt), v: nearest.chatgpt },
      perplexity: { x: cx, y: y(nearest.perplexity), v: nearest.perplexity },
      gemini: { x: cx, y: y(nearest.gemini), v: nearest.gemini },
      llm: { x: cx, y: y(nearest.llm), v: nearest.llm },
      google: { x: cx, y: y(nearest.google), v: nearest.google },
      label: new Date(nearest.t).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
    });
  };
  const onLeave = () => setHover(null);

  const last = points[points.length - 1];
  // Prepare end labels with simple collision avoidance in right gutter
  const labelX = svgWidth - padding.right + 8;
  const labelGap = 14;
  const minY = padding.top + 8;
  const maxY = height - padding.bottom - 8;
  const rawLabels = [
    visible.llm && { key: 'llm', name: 'LLMs', className: 'llm', yTarget: y(last.llm), value: last.llm },
    visible.chatgpt && { key: 'chatgpt', name: 'ChatGPT', className: 'chatgpt', yTarget: y(last.chatgpt), value: last.chatgpt },
    visible.perplexity && { key: 'perplexity', name: 'Perplexity', className: 'perplexity', yTarget: y(last.perplexity), value: last.perplexity },
    visible.gemini && { key: 'gemini', name: 'Gemini', className: 'gemini', yTarget: y(last.gemini), value: last.gemini },
    visible.google && { key: 'google', name: 'Google', className: 'google', yTarget: y(last.google), value: last.google },
  ].filter(Boolean).sort((a, b) => a.yTarget - b.yTarget);
  let prev = -Infinity;
  const laidOutLabels = rawLabels.map((lbl, idx, arr) => {
    const desired = Math.max(lbl.yTarget, idx === 0 ? minY : prev + labelGap);
    // Ensure remaining labels can still fit below maxY
    const remaining = arr.length - idx - 1;
    const yPos = Math.min(desired, maxY - remaining * labelGap);
    prev = yPos;
    return { ...lbl, yPos };
  });

  return (
    <div className="chart-wrap" ref={containerRef}>
      <svg className="chart" viewBox={`0 0 ${svgWidth} ${height}`} role="img" aria-label="LLM vs Google index over time" onMouseMove={onMove} onMouseLeave={onLeave}>
        <defs>
          <linearGradient id="gradLLM" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(108,140,255,0.35)" />
            <stop offset="100%" stopColor="rgba(108,140,255,0.02)" />
          </linearGradient>
          <linearGradient id="gradGOOG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(200,206,255,0.25)" />
            <stop offset="100%" stopColor="rgba(200,206,255,0.02)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={svgWidth} height={height} fill="transparent" />
        {/* grid */}
        {Array.from({ length: 5 }).map((_, i) => {
          const vv = yMin + (i / 4) * (yMax - yMin);
          return (
            <g key={i}>
              <line x1={padding.left} x2={svgWidth - padding.right} y1={y(vv)} y2={y(vv)} className="grid" />
              <text x={padding.left - 8} y={y(vv)} className="axis-y" alignmentBaseline="middle">{Math.round(vv)}</text>
            </g>
          );
        })}
        {months.map((d, i) => (
          <g key={i}>
            <line x1={x(d.getTime())} x2={x(d.getTime())} y1={padding.top} y2={height - padding.bottom} className="grid v" />
            <text x={x(d.getTime())} y={height - padding.bottom + 16} className="axis-x" textAnchor="middle">{d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}</text>
          </g>
        ))}
        {/* y-axis label */}
        <text x={padding.left - 28} y={padding.top} className="axis-y unit" textAnchor="end">{view === 'share' ? '% of Google' : view === 'volume' ? 'Daily volume (M)' : 'Index'}</text>
        {/* areas */}
        {visible.llm && <path d={`${toPath('llm')} L ${x(tMax)} ${y(0)} L ${x(tMin)} ${y(0)} Z`} className="area-llm" />}
        {visible.google && <path d={`${toPath('google')} L ${x(tMax)} ${y(0)} L ${x(tMin)} ${y(0)} Z`} className="area-google" />}
        {/* lines */}
        {visible.chatgpt && <path d={toPath('chatgpt')} className="line-chatgpt" />}
        {visible.perplexity && <path d={toPath('perplexity')} className="line-perplexity" />}
        {visible.gemini && <path d={toPath('gemini')} className="line-gemini" />}
        {visible.llm && <path d={toPath('llm')} className="line-llm" />}
        {visible.google && <path d={toPath('google')} className="line-google" />}
        {/* end labels in right gutter with connectors */}
        {laidOutLabels.map((lbl) => (
          <g key={lbl.key}>
            <line x1={x(last.t)} x2={labelX - 4} y1={lbl.yTarget} y2={lbl.yPos} className={`label-line ${lbl.className}`} />
            <text x={labelX} y={lbl.yPos} className={`line-label ${lbl.className}`} alignmentBaseline="middle" textAnchor="start">{lbl.name} {Math.round(lbl.value)}</text>
          </g>
        ))}
        {/* hover */}
        {hover && (
          <g className="hover">
            <line x1={hover.cx} x2={hover.cx} y1={padding.top} y2={height - padding.bottom} className="cursor-line" />
            {visible.chatgpt && <circle cx={hover.chatgpt.x} cy={hover.chatgpt.y} r="4" className="marker chatgpt" />}
            {visible.perplexity && <circle cx={hover.perplexity.x} cy={hover.perplexity.y} r="4" className="marker perplexity" />}
            {visible.gemini && <circle cx={hover.gemini.x} cy={hover.gemini.y} r="4" className="marker gemini" />}
            {visible.llm && <circle cx={hover.llm.x} cy={hover.llm.y} r="4" className="marker llm" />}
            {visible.google && <circle cx={hover.google.x} cy={hover.google.y} r="4" className="marker google" />}
          </g>
        )}
      </svg>
      <div className="legend">
        <div className="toggle" role="tablist" aria-label="Chart view">
          <button className={`toggle-btn ${view === 'index' ? 'active' : ''}`} onClick={() => setView('index')} role="tab" aria-selected={view==='index'}>Index</button>
          <button className={`toggle-btn ${view === 'share' ? 'active' : ''}`} onClick={() => setView('share')} role="tab" aria-selected={view==='share'}>% of Google</button>
          <button className={`toggle-btn ${view === 'volume' ? 'active' : ''}`} onClick={() => setView('volume')} role="tab" aria-selected={view==='volume'}>Volume</button>
        </div>
        <button className={`legend-item ${visible.chatgpt ? 'active' : 'muted'}`} onClick={() => toggle('chatgpt')}><span className="dot chatgpt" /> ChatGPT</button>
        <button className={`legend-item ${visible.perplexity ? 'active' : 'muted'}`} onClick={() => toggle('perplexity')}><span className="dot perplexity" /> Perplexity</button>
        <button className={`legend-item ${visible.gemini ? 'active' : 'muted'}`} onClick={() => toggle('gemini')}><span className="dot gemini" /> Gemini</button>
        <button className={`legend-item ${visible.llm ? 'active' : 'muted'}`} onClick={() => toggle('llm')}><span className="dot llm" /> LLMs</button>
        <span className="spacer" />
        <button className={`legend-item ${visible.google ? 'active' : 'muted'}`} onClick={() => toggle('google')}><span className="dot google" /> Google</button>
      </div>
      {hover && (
        <div className="tooltip" style={{ left: Math.min(Math.max(hover.cx + 12, 8), svgWidth - 180) }}>
          <div className="t-month">{hover.label}</div>
          {visible.chatgpt && <div className="t-row"><span className="dot chatgpt" /> ChatGPT <b>{Math.round(hover.chatgpt.v)}{view==='share' ? '%' : view==='volume' ? 'M' : ''}</b></div>}
          {visible.perplexity && <div className="t-row"><span className="dot perplexity" /> Perplexity <b>{Math.round(hover.perplexity.v)}{view==='share' ? '%' : view==='volume' ? 'M' : ''}</b></div>}
          {visible.gemini && <div className="t-row"><span className="dot gemini" /> Gemini <b>{Math.round(hover.gemini.v)}{view==='share' ? '%' : view==='volume' ? 'M' : ''}</b></div>}
          {visible.llm && <div className="t-row"><span className="dot llm" /> LLMs <b>{Math.round(hover.llm.v)}{view==='share' ? '%' : view==='volume' ? 'M' : ''}</b></div>}
          {visible.google && <div className="t-row"><span className="dot google" /> Google <b>{Math.round(hover.google.v)}{view==='share' ? '%' : view==='volume' ? 'M' : ''}</b></div>}
        </div>
      )}
      <div className="fineprint">View: {view === 'share' ? '% of Google' : view === 'volume' ? 'Daily volume estimates (M/day)' : 'Index'} · Aggregate = ChatGPT + Perplexity + Gemini. Units differ and are illustrative.</div>
    </div>
  );
}

function ChartSection() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const fallback = { series: [
      { month: '2023-01', chatgpt: 5, perplexity: 1, gemini: 0, google: 100 },
      { month: '2023-07', chatgpt: 22, perplexity: 5, gemini: 2, google: 99 },
      { month: '2024-01', chatgpt: 48, perplexity: 13, gemini: 10, google: 98 },
      { month: '2024-07', chatgpt: 78, perplexity: 28, gemini: 30, google: 96 },
      { month: '2025-01', chatgpt: 100, perplexity: 47, gemini: 54, google: 95 },
      { month: '2025-05', chatgpt: 116, perplexity: 60, gemini: 70, google: 94 },
    ], note: 'Illustrative index.' };
    fetch('/data/llm_vs_google.json')
      .then((r) => r.ok ? r.json() : fallback)
      .then((j) => setData(j))
      .catch(() => setData(fallback));
  }, []);
  if (!data) return null;
  return (
    <section className="section chart-section" style={{ display: 'none' }}>
      <div className="container">
        <h2>Shift in discovery</h2>
        <LineChart data={data} />
      </div>
    </section>
  );
}

function Implications() {
  const items = [
    { title: 'Compete as an entity', text: 'From ranked pages → structured answers.' },
    { title: 'Ship answer content', text: 'FAQs, comparisons, specs, policies.' },
    { title: 'Provide grounding', text: 'Schemas, feeds, APIs, docs.' },
    { title: 'Integrate assistants', text: 'Plugins, tools, deep links.' },
    { title: 'Measure new funnels', text: 'Referrals, SOV, prompt tests.' },
  ];
  return (
    <section className="section implications">
      <div className="container">
        <h2>What this means</h2>
        <div className="grid">
          {items.map((i) => (
            <div key={i.title} className="card">
              <h3>{i.title}</h3>
              <p>{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// BusinessUseCase section removed per request

function ForecastChart() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch('/data/llm_forecast.json').then(r => r.json()).then(setData).catch(() => setData(null));
  }, []);
  if (!data) return null;
  const width = 920, height = 180, pad = { top: 10, right: 20, bottom: 24, left: 36 };
  const innerW = width - pad.left - pad.right, innerH = height - pad.top - pad.bottom;
  const x = (i) => pad.left + (i / (data.series.length - 1)) * innerW;
  const y = (v) => pad.top + innerH - (v / 50) * innerH; // 0–50%
  const toPath = (key) => data.series.map((d, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(d[key])}`).join(' ');
  const last = data.series[data.series.length - 1];
  return (
    <div className="forecast-wrap">
      <svg className="forecast" viewBox={`0 0 ${width} ${height}`} aria-label="LLM search share forecast">
        {[0,10,20,30,40,50].map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} className="grid" />
            <text x={pad.left - 8} y={y(t)} className="axis-y" alignmentBaseline="middle">{t}%</text>
          </g>
        ))}
        {data.series.map((d, i) => (
          <text key={i} x={x(i)} y={height - 4} className="axis-x" textAnchor="middle">{String(d.year).slice(2)}</text>
        ))}
        <path d={toPath('base')} className="line-llm" />
        <path d={toPath('aggressive')} className="line-gemini" />
        <text x={x(data.series.length - 1) + 6} y={y(last.base)} className="line-label llm" alignmentBaseline="middle">Base</text>
        <text x={x(data.series.length - 1) + 6} y={y(last.aggressive) + 12} className="line-label gemini" alignmentBaseline="middle">Aggressive</text>
      </svg>
      <div className="fineprint">Illustrative 2023–2030 forecast for LLM share of search-like queries.</div>
    </div>
  );
}

// Industries section removed per request



function CaseStudies() {
  const cases = [
    {
      title: 'Developer tools SaaS',
      result: '+212% organic signups',
      text: 'Launched 8,400 programmatic docs pages with high-intent internal linking.'
    },
    {
      title: 'Marketplace',
      result: '+1.8M monthly clicks',
      text: 'Template-led local landing pages with schema and unique inventory signals.'
    },
    {
      title: 'Media network',
      result: '7x faster indexing',
      text: 'Entity-rich editorial outlines and automated interlinking across clusters.'
    },
  ];
  return (
    <section id="case-studies" className="section cases">
      <div className="container">
        <h2>Case studies</h2>
        <div className="grid">
          {cases.map((c) => (
            <div key={c.title} className="card case">
              <div className="case-result">{c.result}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <a className="link" href="#unique-value">See Value Proposition →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      name: 'Carlos Mendez, Revenue Manager',
      company: 'Hotel Barcelona Center, 85 rooms',
      text: 'In 8 weeks, we went from ChatGPT never mentioning us to being the top family hotel recommendation for Barcelona airport area. Direct bookings increased 340% from AI referrals.',
      metric: '+340% direct bookings',
      logo: 'HBC'
    },
    {
      name: 'Isabella Rossi, Marketing Director',
      company: 'Luxury Resort Mallorca, 180 rooms',
      text: 'AI assistants now position us as the premier luxury option for Mallorca. We reduced OTA dependency from 78% to 34% while increasing ADR by €52 per booking.',
      metric: '€52 higher ADR',
      logo: 'LRM'
    },
    {
      name: 'Hans Mueller, GM',
      company: 'Business Hotel Munich, 120 rooms',
      text: 'MICE clients now find us through AI search instead of expensive event platforms. Our corporate booking pipeline increased 280% with much higher-quality leads.',
      metric: '+280% MICE bookings',
      logo: 'BHM'
    },
  ];

  // Create review schemas for each testimonial
  const reviewSchemas = quotes.map((quote, index) => {
    const reviewData = {
      author: quote.name.split(',')[0], // Extract name before title
      authorJobTitle: quote.name.split(',')[1]?.trim() || 'Manager',
      authorCompany: quote.company,
      reviewBody: quote.text,
      itemReviewed: "Cloudlight.ai AI SEO Services",
      rating: 5, // All testimonials are positive, so 5-star rating
      datePublished: "2024-01-01" // You can customize dates
    };
    
    return (
      <JsonLdScript 
        key={`review-${index}`}
        pageType="Review" 
        pageData={reviewData} 
      />
    );
  });

  return (
    <section id="results" className="section testimonials">
      <div className="container">
        {/* Add Review schemas for each testimonial */}
        {reviewSchemas}
        
        <h2>Trusted by European hotels</h2>
        <div className="grid testimonials-grid">
          {quotes.map((q, idx) => (
            <div key={idx} className="card testimonial-card">
              <div className="testimonial-header">
                <div className="company-logo">{q.logo}</div>
                <div className="company-info">
                  <div className="company-name">{q.company}</div>
                  <div className="person-name">{q.name}</div>
                </div>
              </div>
              <blockquote className="testimonial-quote">
                <p>"{q.text}"</p>
              </blockquote>
              <div className="testimonial-metric">{q.metric}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="section trust">
      <div className="container">
        <h2>Enterprise-grade security and reliability</h2>
        <div className="trust-grid">
          <div className="trust-category">
            <h3>Security & Compliance</h3>
            <ul className="trust-list">
              <li>SOC 2 Type II certified</li>
              <li>GDPR and CCPA compliant</li>
              <li>End-to-end encryption</li>
              <li>Regular security audits</li>
            </ul>
          </div>
          <div className="trust-category">
            <h3>Technical Excellence</h3>
            <ul className="trust-list">
              <li>99.9% uptime SLA</li>
              <li>Enterprise SSO integration</li>
              <li>API-first architecture</li>
              <li>Real-time monitoring</li>
            </ul>
          </div>
          <div className="trust-category">
            <h3>Support & Success</h3>
            <ul className="trust-list">
              <li>Dedicated success manager</li>
              <li>24/7 technical support</li>
              <li>Implementation consulting</li>
              <li>Custom training programs</li>
            </ul>
          </div>
        </div>
        <div className="certifications">
          <div className="cert-item">
            <div className="cert-badge">SOC 2</div>
            <span>Type II</span>
          </div>
          <div className="cert-item">
            <div className="cert-badge">ISO</div>
            <span>27001</span>
          </div>
          <div className="cert-item">
            <div className="cert-badge">GDPR</div>
            <span>Compliant</span>
          </div>
          <div className="cert-item">
            <div className="cert-badge">CCPA</div>
            <span>Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: 'Is the content unique and safe?',
      a: 'Yes. We use retrieval and evaluations to ensure factuality, and run toxicity and duplication checks before publishing.'
    },
    {
      q: 'How do you integrate with our stack?',
      a: 'We support headless CMS, sitemaps, and API publishing. Or we deliver files for your team to import.'
    },
    {
      q: 'What about Google penalties?',
      a: 'We optimize for helpful, intent-aligned content with transparent sourcing and quality guardrails.'
    },
  ];

  // FAQ schema data
  const faqData = {
    mainEntity: faqs.map(faq => ({
      question: faq.q,
      answer: faq.a
    }))
  };

  return (
    <section id="faq" className="section faq">
      <div className="container">
        {/* Add FAQ Schema */}
        <JsonLdScript pageType="FAQ" pageData={faqData} />
        
        <h2>FAQ</h2>
        <div className="accordion">
          {faqs.map((f) => (
            <details key={f.q} className="card">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [contactRef, isContactVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', title: '', website: '', revenue: '', challenge: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 2000);
  };

  // LocalBusiness schema data for contact page
  const localBusinessData = {
    name: "Cloudlight.ai",
    description: "Specialized LLM SEO services that make your hotel the AI-recommended choice across ChatGPT, Perplexity, and Grok",
    address: {
      streetAddress: "123 Digital Marketing Street",
      addressLocality: "Barcelona", 
      addressRegion: "Catalonia",
      postalCode: "08008",
      addressCountry: "ES"
    },
    telephone: "+1-555-0123",
    email: "contact@cloudlight.ai",
    url: "https://cloudlight.ai",
    priceRange: "€€€",
    openingHours: [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00"
    ],
    sameAs: [
      "https://linkedin.com/company/cloudlight-ai",
      "https://twitter.com/cloudlight_ai"
    ]
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact-inner" ref={contactRef}>
        {/* Add LocalBusiness Schema */}
        <JsonLdScript pageType="LocalBusiness" pageData={localBusinessData} />
        
        <div className={`contact-copy ${isContactVisible ? 'animate-slide-right' : ''}`}>
          <h2>Get your hotel's AI visibility analysis</h2>
          <p className="sub">Discover exactly how AI assistants currently position your property and get a custom roadmap to hotel AI dominance.</p>
          <div className="contact-benefits">
            <div className={`benefit-item ${isContactVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.2s' }}>
              <AnalyticsIcon />
              <div>
                <h4>Hotel AI Audit</h4>
                <p>How often ChatGPT/Perplexity recommend you vs competitors in your market</p>
              </div>
            </div>
            <div className={`benefit-item ${isContactVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.4s' }}>
              <TargetIcon />
              <div>
                <h4>Revenue Opportunity</h4>
                <p>Quantified direct booking potential from AI optimization (€/room analysis)</p>
              </div>
            </div>
            <div className={`benefit-item ${isContactVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.6s' }}>
              <RocketIcon />
              <div>
                <h4>Hotel Growth Plan</h4>
                <p>Custom 90-day strategy to become the AI-recommended choice in your area</p>
              </div>
            </div>
          </div>
          <div className={`contact-urgency ${isContactVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.8s' }}>
            <p><strong><ClockIcon /> Limited capacity:</strong> We only onboard 6 new hotel properties per quarter to ensure personalized attention.</p>
          </div>
        </div>
        <div className={`contact-card card ${isContactVisible ? 'animate-slide-left' : ''}`}>
          <div className="contact-header">
            <h3>Book your strategy session</h3>
            <p>Free 45-minute consultation (normally $500)</p>
          </div>
          <form onSubmit={handleSubmit} className="enhanced-form">
            <div className="field">
              <label htmlFor="name">Full Name *</label>
              <input 
                id="name" 
                name="name"
                type="text" 
                placeholder="John Smith" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                className="enhanced-input"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Business Email *</label>
              <input 
                id="email" 
                name="email"
                type="email" 
                placeholder="john@company.com" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                className="enhanced-input"
              />
            </div>
            <div className="field">
              <label htmlFor="company">Company *</label>
              <input 
                id="company" 
                name="company"
                type="text" 
                placeholder="Company Name" 
                value={formData.company}
                onChange={handleInputChange}
                required 
                className="enhanced-input"
              />
            </div>
            <div className="field">
              <label htmlFor="title">Job Title *</label>
              <input 
                id="title" 
                name="title"
                type="text" 
                placeholder="VP Marketing" 
                value={formData.title}
                onChange={handleInputChange}
                required 
                className="enhanced-input"
              />
            </div>
            <div className="field">
              <label htmlFor="website">Company Website *</label>
              <input 
                id="website" 
                name="website"
                type="url" 
                placeholder="https://company.com" 
                value={formData.website}
                onChange={handleInputChange}
                required 
                className="enhanced-input"
              />
            </div>
            <div className="field">
              <label htmlFor="revenue">Annual Revenue</label>
              <select 
                id="revenue" 
                name="revenue"
                value={formData.revenue}
                onChange={handleInputChange}
                className="enhanced-input"
              >
                <option value="">Select range</option>
                <option value="1-10m">$1M - $10M</option>
                <option value="10-50m">$10M - $50M</option>
                <option value="50-100m">$50M - $100M</option>
                <option value="100m+">$100M+</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="challenge">Biggest AI discoverability challenge</label>
              <textarea 
                id="challenge" 
                name="challenge"
                rows="3" 
                placeholder="e.g., Our competitors show up in ChatGPT recommendations but we don't..."
                value={formData.challenge}
                onChange={handleInputChange}
                className="enhanced-input"
              />
            </div>
            <div className="contact-actions">
              <button 
                type="submit" 
                className={`btn btn-primary btn-large ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    <span>Booking Session...</span>
                  </>
                ) : (
                  'Book Free Strategy Session'
                )}
              </button>
              {submitStatus === 'success' && (
                <div className="success-message">
                  <svg className="success-checkmark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" stroke="#4caf50" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Thank you! We'll contact you within 24 hours.</span>
                </div>
              )}
              <div className="contact-guarantee">
                <ShieldIcon />
                <span>No pitch, just value. If you don't get actionable insights in our call, we'll send you $100.</span>
              </div>
            </div>
          </form>
          <div className="contact-calendar">
            <p>Or schedule directly: <a href="https://calendly.com/cloudlight-ai-strategy" target="_blank" rel="noopener noreferrer">Book on Calendly →</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Social Media Icons
function LinkedInIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
      <path fill="currentColor" d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="location-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="simple-footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-brand-section">
            <div className="brand footer-brand">Cloudlight.ai</div>
            <p className="footer-tagline">Make your hotel the AI-recommended choice</p>
          </div>

          {/* Essential Links */}
          <div className="footer-links">
            <a href="#demo" className="footer-link">Demo</a>
            <a href="#unique-value" className="footer-link">Value Prop</a>
            <a href="#roi-calculator" className="footer-link">ROI Calculator</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#faq" className="footer-link">FAQ</a>
            <a href="mailto:contact@cloudlight.ai" className="footer-link">Contact</a>
          </div>

          {/* Social Links */}
          <div className="footer-social-simple">
            <a href="https://linkedin.com/company/llmseo" target="_blank" rel="noopener noreferrer" className="social-link-simple">
              <LinkedInIcon />
            </a>
            <a href="https://twitter.com/llmseo" target="_blank" rel="noopener noreferrer" className="social-link-simple">
              <TwitterIcon />
            </a>
            <a href="mailto:contact@cloudlight.ai" className="social-link-simple">
              <EmailIcon />
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="footer-legal-simple">
          <div className="footer-copyright-simple">
            <span>© {currentYear} Cloudlight.ai. All rights reserved.</span>
          </div>
          <div className="footer-legal-links-simple">
            <a href="/privacy" className="legal-link-simple">Privacy</a>
            <a href="/terms" className="legal-link-simple">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateToSolution = () => {
    setActiveSection('solution');
    window.scrollTo(0, 0);
  };

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'hero':
        return (
          <>
            <Hero />
            <ProblemSection onNavigateToSolution={handleNavigateToSolution} />
          </>
        );
      case 'solution':
        return <SolutionOverview />;
      case 'unique-value':
        return <UniqueValueProposition />;
      case 'demo':
        return <ProductDemo />;
      case 'pricing':
        return <Pricing />;
      case 'results':
        return <Testimonials />;
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      case 'roi-calculator':
        return <ROICalculator />;
      default:
        return (
          <>
            <Hero />
            <ProblemSection onNavigateToSolution={handleNavigateToSolution} />
          </>
        );
    }
  };

  // Organization schema data
  const organizationData = {
    name: "Cloudlight.ai",
    description: "Make your hotel the AI-recommended choice with specialized LLM SEO services for the hospitality industry",
    url: "https://cloudlight.ai",
    logo: "https://cloudlight.ai/logo.png",
    sameAs: [
      "https://linkedin.com/company/cloudlight-ai",
      "https://twitter.com/cloudlight_ai"
    ],
    contactPoint: {
      telephone: "+1-555-0123",
      contactType: "Customer Service",
      email: "contact@cloudlight.ai"
    }
  };

  // Website schema data
  const websiteData = {
    name: "Cloudlight.ai - Hotel LLM SEO Services",
    url: "https://cloudlight.ai",
    description: "Specialized LLM SEO services that make your hotel the AI-recommended choice across ChatGPT, Perplexity, and Grok. We help hotels dominate AI assistant responses, reduce OTA dependency, and increase direct bookings through advanced AI optimization techniques.",
    publisher: "Cloudlight.ai",
    keywords: ["hotel LLM SEO", "AI optimization", "ChatGPT SEO", "hotel marketing", "direct bookings", "OTA alternatives", "AI assistant optimization"],
    inLanguage: "en-US",
    copyrightYear: "2024",
    author: "Cloudlight.ai Team",
    mainEntityOfPage: "https://cloudlight.ai",
    sameAs: [
      "https://linkedin.com/company/cloudlight-ai",
      "https://twitter.com/cloudlight_ai"
    ]
  };

  return (
    <div className="App">
      {/* Global Organization Schema */}
      <JsonLdScript pageType="Organization" pageData={organizationData} />
      
      {/* Global Website Schema */}
      <JsonLdScript pageType="WebSite" pageData={websiteData} />
      
      <NavBar activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderActiveSection()}
      <Footer />
    </div>
  );
}

export default App;
