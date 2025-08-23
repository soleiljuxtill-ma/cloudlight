import React from 'react';
import './Pricing.css';
import { JsonLdScript } from './JsonLdTemplates';

function CheckmarkIcon() {
  return (
    <svg className="icon-svg checkmark-icon" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4caf50"/>
          <stop offset="100%" stopColor="#66bb6a"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#checkGrad)" className="check-circle"/>
      <path d="M8 12.5 L11 15.5 L16 8.5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="check-mark"/>
    </svg>
  );
}

function Pricing() {
  const plans = [
    {
      name: 'Starter',
      subtitle: 'LLM SEO Optimization',
      price: '€500',
      period: '/mo',
      
      note: 'Onboarding cost: €300',
      provider: 'LLMSEO',
      bullets: [
        'LLM SEO optimization of client website for better LLM search visibility',
        'Enhanced website text and JSON structure for LLM parsing',
        'Improved content discoverability in AI-powered search engines',
        'Structured data optimization for better LLM understanding',
        'Content optimization for LLM search algorithms',
        'Support incl. phone; 3 user accounts; +1h agency service/month'
      ],
      cta: 'Get Started',
      highlight: false
    },
    {
      name: 'Growth',
      subtitle: 'LLM SEO + GEO Optimization',
      price: '€800',
      period: '/mo',
      badges: [{ text: 'Most Popular', type: 'popular' }],
      provider: 'LLMSEO',
      bullets: [
        'Everything in Starter plan, plus:',
        'GEO-targeted LLM SEO optimization',
        'Local search engine optimization for specific regions',
        'Location-based content optimization',
        'GEO-specific keyword targeting and content',
        'Local business directory optimization',
        'Regional language and cultural adaptation',
        'Content generation and publishing on 3 top LLM-referenced websites for hotel industry queries',
        'Support incl. phone; 5 user accounts; +2h agency service/month'
      ],
      cta: 'Scale Growth',
      highlight: true
    },
    {
      name: 'Advanced',
      subtitle: 'Enterprise LLM SEO + GEO',
      price: '€1,200',
      period: '/mo',
      badges: [{ text: 'Enterprise', type: 'enterprise' }],
      provider: 'LLMSEO',
      bullets: [
        'Everything in Growth plan, plus:',
        'Multi-region GEO optimization (up to 10 regions)',
        'Advanced analytics and reporting dashboard',
        'Custom LLM training for industry-specific terms',
        'Priority support with dedicated account manager',
        'Advanced structured data implementation',
        'Competitive analysis and market research',
        'Content generation and publishing on 5 top LLM-referenced websites for hotel industry queries',
        'Support incl. phone; unlimited user accounts; +5h agency service/month'
      ],
      cta: 'Go Advanced',
      highlight: false
    }
  ];
  
  // Create service schemas for each plan
  const serviceSchemas = plans.map((plan, index) => {
    const serviceData = {
      name: `${plan.name} AI SEO Plan`,
      description: plan.subtitle,
      provider: "LLMSEO",
      url: "https://llmseo.com/pricing",
      offers: {
        price: plan.price.replace(/[€$,]/g, ''),
        priceCurrency: plan.price.includes('€') ? 'EUR' : 'USD',
        description: `${plan.name} plan includes: ${plan.bullets.slice(0, 3).join(', ')}`
      }
    };
    
    return (
      <JsonLdScript 
        key={`service-${index}`}
        pageType="Service" 
        pageData={serviceData} 
      />
    );
  });

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        {/* Add Service schemas for each pricing plan */}
        {serviceSchemas}
        
        <div className="pricing-header">
          <h2>AI SEO Pricing Plans</h2>
          <p className="sub">Choose the right plan for your business growth and AI visibility needs.</p>
        </div>
        <div className="pricing-cards hotel-pricing">
          {plans.map((p) => (
            <div key={p.name} className={`pricing-card ${p.highlight ? 'highlight' : ''}`}>
              {p.badges && (
                <div className="pricing-badges">
                  {p.badges.map(badge => (
                    <span 
                      key={badge.text} 
                      className="badge" 
                      data-type={badge.type}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              )}
              <div className="pricing-header-card">
                <h3>{p.name}</h3>
                <div className="pricing-subtitle">{p.subtitle}</div>
                {p.provider && (
                  <div className="pricing-provider">Powered by Cloudlight.ai</div>
                )}
              </div>
              <div className="pricing-price">
                <div className="price">
                  {p.price}<span className="period">{p.period}</span>
                  {p.originalPrice && (
                    <span className="original-price">{p.originalPrice}</span>
                  )}
                </div>
              </div>
              {p.note && (
                <div className="pricing-note">{p.note}</div>
              )}
              <ul className="pricing-features">
                {p.bullets.map((b) => (
                  <li key={b}><CheckmarkIcon />{b}</li>
                ))}
              </ul>
              <a className={`btn ${p.highlight ? 'btn-primary' : 'btn-outline'} btn-large`} href="#contact">{p.cta}</a>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
}

export default Pricing;
