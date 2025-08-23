import React from 'react';
import './Solution.css';
import { JsonLdScript } from './JsonLdTemplates';

function SearchIcon() {
  return (
    <svg className="icon-svg search-icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6c8cff"/>
          <stop offset="50%" stopColor="#8fa4ff"/>
          <stop offset="100%" stopColor="#9aaaff"/>
        </linearGradient>
        <radialGradient id="searchBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(108, 140, 255, 0.1)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="searchGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="url(#searchBg)" opacity="0.3"/>
      {/* Main search glass */}
      <circle cx="26" cy="26" r="14" fill="none" stroke="url(#searchGrad)" strokeWidth="3" className="search-circle" filter="url(#searchGlow)"/>
      {/* Search handle */}
      <line x1="36" y1="36" x2="48" y2="48" stroke="url(#searchGrad)" strokeWidth="3" strokeLinecap="round" className="search-handle" filter="url(#searchGlow)"/>
      {/* Inner reflection */}
      <ellipse cx="22" cy="22" rx="4" ry="6" fill="rgba(255,255,255,0.3)" opacity="0.6"/>
      {/* AI sparkles with improved positioning */}
      <g className="search-sparkles">
        <circle cx="16" cy="16" r="1.5" fill="#6c8cff" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="38" cy="18" r="1" fill="#9aaaff" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="r" values="1;1.5;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="18" cy="38" r="1.2" fill="#8fa4ff" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="r" values="1.2;1.8;1.2" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="46" cy="32" r="0.8" fill="#6c8cff" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      </g>
      {/* Search pulse effect */}
      <circle cx="26" cy="26" r="14" fill="none" stroke="url(#searchGrad)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="icon-svg star-icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700"/>
          <stop offset="30%" stopColor="#ffeb3b"/>
          <stop offset="70%" stopColor="#ffc107"/>
          <stop offset="100%" stopColor="#ff9800"/>
        </linearGradient>
        <radialGradient id="crownBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 215, 0, 0.1)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="crownGrad" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#ffd700"/>
          <stop offset="50%" stopColor="#ffb300"/>
          <stop offset="100%" stopColor="#ff9800"/>
        </radialGradient>
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background glow */}
      <circle cx="32" cy="32" r="30" fill="url(#crownBg)" opacity="0.4"/>
      {/* Crown shadow */}
      <path d="M17 43 L23 29 L31 36 L39 26 L45 43 Z" fill="rgba(0,0,0,0.2)" opacity="0.3"/>
      <rect x="15" y="43" width="32" height="6" rx="3" fill="rgba(0,0,0,0.2)" opacity="0.3"/>
      {/* Crown base */}
      <rect x="16" y="42" width="32" height="6" rx="3" fill="url(#crownGrad)" filter="url(#starGlow)"/>
      {/* Crown peaks with better geometry */}
      <path d="M18 42 L24 28 L32 35 L40 25 L46 42 Z" fill="url(#crownGrad)" filter="url(#starGlow)"/>
      {/* Crown details */}
      <path d="M20 42 L24 32 L28 38 L32 30 L36 38 L40 29 L44 42" stroke="url(#starGrad)" strokeWidth="1" fill="none" opacity="0.6"/>
      {/* Enhanced jewels */}
      <g className="crown-jewels">
        {/* Center jewel */}
        <circle cx="32" cy="35" r="3.5" fill="rgba(255,255,255,0.8)" opacity="0.9"/>
        <circle cx="32" cy="35" r="2.5" fill="url(#starGrad)"/>
        <circle cx="30.5" cy="33.5" r="0.8" fill="rgba(255,255,255,0.9)" opacity="0.7"/>
        {/* Side jewels */}
        <circle cx="24" cy="32" r="2.5" fill="rgba(255,255,255,0.8)" opacity="0.8"/>
        <circle cx="24" cy="32" r="1.8" fill="url(#starGrad)"/>
        <circle cx="40" cy="30" r="2.5" fill="rgba(255,255,255,0.8)" opacity="0.8"/>
        <circle cx="40" cy="30" r="1.8" fill="url(#starGrad)"/>
      </g>
      {/* Enhanced sparkles */}
      <g className="crown-sparkles">
        <g opacity="0.9">
          <path d="M20 20 L22 18 L24 20 L22 22 Z" fill="#ffd700">
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.5s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" values="0 22 20;360 22 20" dur="8s" repeatCount="indefinite"/>
          </path>
        </g>
        <g opacity="0.8">
          <path d="M44 18 L46 16 L48 18 L46 20 Z" fill="#ffeb3b">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" values="0 46 18;-360 46 18" dur="10s" repeatCount="indefinite"/>
          </path>
        </g>
        <g opacity="0.7">
          <path d="M32 16 L34 14 L36 16 L34 18 Z" fill="#ffc107">
            <animate attributeName="opacity" values="0.7;0.4;0.7" dur="1.8s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" values="0 34 16;360 34 16" dur="6s" repeatCount="indefinite"/>
          </path>
        </g>
        <g opacity="0.6">
          <path d="M50 35 L51 34 L52 35 L51 36 Z" fill="#ffd700">
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite"/>
          </path>
        </g>
        <g opacity="0.5">
          <path d="M12 35 L13 34 L14 35 L13 36 Z" fill="#ffeb3b">
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.8s" repeatCount="indefinite"/>
          </path>
        </g>
      </g>
    </svg>
  );
}

function BusinessIcon() {
  return (
    <svg className="icon-svg business-icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="businessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4caf50"/>
          <stop offset="50%" stopColor="#66bb6a"/>
          <stop offset="100%" stopColor="#8bc34a"/>
        </linearGradient>
        <linearGradient id="moneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700"/>
          <stop offset="50%" stopColor="#ffeb3b"/>
          <stop offset="100%" stopColor="#ffb300"/>
        </linearGradient>
        <radialGradient id="businessBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(76, 175, 80, 0.1)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="businessGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background glow */}
      <circle cx="32" cy="32" r="30" fill="url(#businessBg)" opacity="0.4"/>
      {/* Laptop shadow */}
      <ellipse cx="32" cy="51" rx="20" ry="3" fill="rgba(0,0,0,0.2)" opacity="0.5"/>
      {/* Laptop base */}
      <rect x="12" y="36" width="40" height="16" rx="3" fill="url(#businessGrad)" filter="url(#businessGlow)"/>
      {/* Laptop screen */}
      <rect x="14" y="16" width="36" height="22" rx="2" fill="#1a1a1a" stroke="url(#businessGrad)" strokeWidth="2"/>
      {/* Screen bezel */}
      <rect x="16" y="18" width="32" height="18" rx="1" fill="#0a0a0a"/>
      {/* Screen content - enhanced booking interface */}
      <g className="screen-content">
        {/* Header bar */}
        <rect x="18" y="20" width="28" height="2" rx="1" fill="url(#businessGrad)" opacity="0.9"/>
        <circle cx="44" cy="21" r="0.5" fill="#66bb6a"/>
        <circle cx="42" cy="21" r="0.5" fill="#ffeb3b"/>
        <circle cx="40" cy="21" r="0.5" fill="#f44336"/>
        
        {/* Booking form elements */}
        <rect x="20" y="24" width="24" height="1.5" rx="0.5" fill="rgba(255,255,255,0.3)" opacity="0.8"/>
        <rect x="20" y="27" width="18" height="1.5" rx="0.5" fill="rgba(255,255,255,0.2)" opacity="0.6"/>
        <rect x="20" y="30" width="20" height="1.5" rx="0.5" fill="rgba(255,255,255,0.2)" opacity="0.6"/>
        
        {/* Book now button */}
        <rect x="20" y="33" width="12" height="2" rx="1" fill="url(#moneyGrad)" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2s" repeatCount="indefinite"/>
        </rect>
      </g>
      
      {/* Enhanced money flow animation */}
      <g className="money-flow">
        <g opacity="0.9">
          <circle cx="30" cy="12" r="1.5" fill="url(#moneyGrad)"/>
          <text x="30" y="14" fontSize="7" textAnchor="middle" fill="url(#moneyGrad)" fontWeight="bold">€</text>
          <animateTransform attributeName="transform" type="translate" values="0,0; -2,-8; -4,-16" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.3;0" dur="3s" repeatCount="indefinite"/>
        </g>
        <g opacity="0.8">
          <circle cx="35" cy="8" r="1.2" fill="url(#moneyGrad)"/>
          <text x="35" y="10" fontSize="6" textAnchor="middle" fill="url(#moneyGrad)" fontWeight="bold">€</text>
          <animateTransform attributeName="transform" type="translate" values="0,0; 2,-6; 4,-12" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
          <animate attributeName="opacity" values="0.8;0.2;0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
        </g>
        <g opacity="0.7">
          <circle cx="32" cy="6" r="1" fill="url(#moneyGrad)"/>
          <text x="32" y="8" fontSize="5" textAnchor="middle" fill="url(#moneyGrad)" fontWeight="bold">€</text>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-4; 0,-8" dur="2s" repeatCount="indefinite" begin="1s"/>
          <animate attributeName="opacity" values="0.7;0.1;0" dur="2s" repeatCount="indefinite" begin="1s"/>
        </g>
      </g>
      
      {/* Enhanced conversion flow */}
      <g className="conversion-flow">
        {/* Conversion arrow */}
        <path d="M6 40 L12 36 L12 38 L18 38 L18 42 L12 42 L12 44 Z" fill="url(#businessGrad)" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translateX" values="0;2;0" dur="2s" repeatCount="indefinite"/>
        </path>
        
        {/* Success indicators */}
        <circle cx="52" cy="20" r="7" fill="url(#businessGrad)" opacity="0.9" filter="url(#businessGlow)"/>
        <circle cx="52" cy="20" r="5" fill="rgba(255,255,255,0.1)"/>
        <path d="M48 20 L50.5 22.5 L56 17" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite"/>
        </path>
        
        {/* Data flow dots */}
        <g className="data-flow">
          <circle cx="25" cy="45" r="1" fill="url(#businessGrad)" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="translateX" values="0;15;30" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="30" cy="47" r="0.8" fill="url(#businessGrad)" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.8s" repeatCount="indefinite" begin="0.5s"/>
            <animateTransform attributeName="transform" type="translateX" values="0;12;24" dur="3.5s" repeatCount="indefinite" begin="0.5s"/>
          </circle>
        </g>
      </g>
    </svg>
  );
}

function SolutionOverview() {
  // Article schema data for solution content
  const solutionArticleData = {
    headline: "Make Your Hotel the AI-Recommended Choice - LLMSEO Solution",
    description: "Our specialized hotel LLM SEO system ensures your property dominates AI assistant responses when travelers ask for recommendations in your market",
    author: "LLMSEO Team",
    datePublished: "2024-01-15",
    dateModified: "2024-01-15",
    publisher: "LLMSEO",
    publisherLogo: "https://llmseo.com/logo.png",
    url: "https://llmseo.com/#solution",
    image: ["https://llmseo.com/images/solution-overview.jpg"],
    articleBody: "Our comprehensive solution helps hotels become the AI-recommended choice through three key steps: AI Search Query optimization, strategic AI Response positioning, and Premium Direct Bookings conversion. We reduce OTA dependency by up to 40%, improve guest quality through AI matching, and create market dominance lock-in that competitors struggle to displace."
  };

  return (
    <section id="solution" className="section solution">
      <div className="container">
        {/* Add Article Schema for solution content */}
        <JsonLdScript pageType="Article" pageData={solutionArticleData} />
        
        <div className="solution-header">
          <h2>Make your hotel the AI-recommended choice</h2>
          <p className="sub">Our specialized hotel LLM SEO system ensures your property dominates AI assistant responses when travelers ask for recommendations in your market.</p>
        </div>
        <div className="solution-visual">
          <div className="solution-process">
            <div className="process-step">
              <SearchIcon />
              <h3>AI Search Query</h3>
              <p>"I need a luxury hotel in Barcelona with spa services, rooftop dining, and close to Sagrada Familia for a romantic weekend getaway"</p>
            </div>
            <div className="process-arrow">
              <svg className="arrow-svg" viewBox="0 0 60 24" fill="none">
                <defs>
                  <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(108, 140, 255, 0.4)"/>
                    <stop offset="50%" stopColor="rgba(108, 140, 255, 0.8)"/>
                    <stop offset="100%" stopColor="rgba(108, 140, 255, 0.6)"/>
                  </linearGradient>
                  <filter id="arrowGlow1">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M5 12 L45 12 M40 7 L45 12 L40 17" stroke="url(#arrowGrad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#arrowGlow1)"/>
                <circle cx="50" cy="12" r="1.5" fill="url(#arrowGrad1)" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <div className="process-step highlight">
              <StarIcon />
              <h3>AI Recommends Your Hotel</h3>
              <p><strong>ChatGPT responds:</strong> "Hotel Miralles Barcelona stands out for its exceptional rooftop restaurant with panoramic city views, world-class spa treatments, and prime location just 3 minutes from Sagrada Familia. Guests consistently praise the romantic ambiance and personalized service."</p>
            </div>
            <div className="process-arrow">
              <svg className="arrow-svg" viewBox="0 0 60 24" fill="none">
                <defs>
                  <linearGradient id="arrowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(108, 140, 255, 0.4)"/>
                    <stop offset="50%" stopColor="rgba(108, 140, 255, 0.8)"/>
                    <stop offset="100%" stopColor="rgba(108, 140, 255, 0.6)"/>
                  </linearGradient>
                  <filter id="arrowGlow2">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M5 12 L45 12 M40 7 L45 12 L40 17" stroke="url(#arrowGrad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#arrowGlow2)"/>
                <circle cx="50" cy="12" r="1.5" fill="url(#arrowGrad2)" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.3s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
            <div className="process-step">
              <BusinessIcon />
              <h3>Premium Direct Bookings</h3>
              <p>High-intent travelers visit your website directly, book premium rooms at full rates, and become loyal repeat guests—completely bypassing expensive OTA commissions and increasing your profit margins by up to 25%.</p>
            </div>
          </div>
        </div>
        <div className="solution-benefits">
          <div className="benefit">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" className="benefit-icon-svg">
                <defs>
                  <linearGradient id="moneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd700"/>
                    <stop offset="100%" stopColor="#ff9800"/>
                  </linearGradient>
                </defs>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13.64 16.36c-.71.3-1.52.4-2.23.14l-.85-.3c-.36-.13-.61-.46-.61-.85 0-.49.4-.89.89-.89.18 0 .34.06.48.14l.85.3c.35.12.71.12 1.06 0 .21-.08.42-.19.59-.36.28-.28.44-.67.44-1.08 0-.83-.67-1.5-1.5-1.5h-1c-1.66 0-3-1.34-3-3s1.34-3 3-3h1c.83 0 1.5.67 1.5 1.5" stroke="url(#moneyGrad)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="2" fill="url(#moneyGrad)" opacity="0.3"/>
                <path d="M12 6v2M12 16v2" stroke="url(#moneyGrad)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h4>Slash Commission Costs</h4>
            <p>Reduce OTA dependency by up to 40% as AI-driven travelers book directly through your website, keeping 15-25% more revenue per booking in your pocket</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" className="benefit-icon-svg">
                <defs>
                  <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd700"/>
                    <stop offset="100%" stopColor="#ff9800"/>
                  </linearGradient>
                </defs>
                <path d="M5 16L3 7l5.5 5L12 4l3.5 8L21 7l-2 9H5z" fill="url(#crownGrad)" opacity="0.8"/>
                <path d="M5 16h14" stroke="url(#crownGrad)" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="7" cy="9" r="1" fill="url(#crownGrad)"/>
                <circle cx="12" cy="6" r="1" fill="url(#crownGrad)"/>
                <circle cx="17" cy="9" r="1" fill="url(#crownGrad)"/>
              </svg>
            </div>
            <h4>Premium Guest Quality</h4>
            <p>AI matches sophisticated travelers with your property's unique features, resulting in longer stays, higher spend, and 3x more likely to leave positive reviews</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">
              <svg viewBox="0 0 24 24" fill="none" className="benefit-icon-svg">
                <defs>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6c8cff"/>
                    <stop offset="100%" stopColor="#9aaaff"/>
                  </linearGradient>
                </defs>
                <path d="M12 2L3 7l1 12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2l1-12-9-5z" fill="url(#shieldGrad)" opacity="0.3"/>
                <path d="M12 2L3 7l1 12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2l1-12-9-5z" stroke="url(#shieldGrad)" strokeWidth="2" fill="none"/>
                <path d="M9 12l2 2 4-4" stroke="url(#shieldGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="8" stroke="url(#shieldGrad)" strokeWidth="1" opacity="0.2" fill="none"/>
              </svg>
            </div>
            <h4>Market Dominance Lock-in</h4>
            <p>Once you achieve AI recommendation supremacy, competitors face an uphill battle to displace your established position in language model responses</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolutionOverview;
