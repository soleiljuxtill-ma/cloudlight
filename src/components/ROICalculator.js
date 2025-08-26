import React, { useState } from 'react';
import './ROICalculator.css';

function ROICalculator() {
  const [formData, setFormData] = useState({
    businessType: 'b2b',
    currentMonthlyLeads: 100,
    currentConversionRate: 2.5,
    averageLeadValue: 5000,
    currentMarketingBudget: 10000,
    industry: 'technology'
  });

  const [selectedPlan, setSelectedPlan] = useState('growth');
  const [selectedServices, setSelectedServices] = useState([]);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // AI Service Plans
  const aiPlans = {
    starter: {
      name: 'Starter Plan',
      monthlyCost: 1500,
      leadIncrease: 25,
      description: 'Basic AI optimization for small businesses'
    },
    growth: {
      name: 'Growth Plan',
      monthlyCost: 2250,
      leadIncrease: 40,
      description: 'Advanced AI optimization for growing businesses'
    },
    enterprise: {
      name: 'Enterprise Plan',
      monthlyCost: 3500,
      leadIncrease: 60,
      description: 'Full AI suite for large organizations'
    }
  };

  // Additional AI Services
  const additionalServices = [
    {
      id: 'custom-ai-training',
      name: 'Custom AI Training',
      monthlyCost: 1500,
      description: 'Tailored AI models for your industry',
      leadBonus: 15
    },
    {
      id: 'voice-search',
      name: 'Voice Search Optimization',
      monthlyCost: 800,
      description: 'Optimize for voice assistants and smart speakers',
      leadBonus: 10
    },
    {
      id: 'chatbot',
      name: 'AI Chatbot Integration',
      monthlyCost: 1200,
      description: 'Intelligent customer service automation',
      leadBonus: 20
    },
    {
      id: 'multi-language',
      name: 'Multi-language AI SEO',
      monthlyCost: 1800,
      description: 'Global market expansion with AI',
      leadBonus: 25
    }
  ];

  // Industry multipliers
  const industryMultipliers = {
    technology: { aiAdoption: 1.3, competition: 1.2, marketSize: 1.1 },
    healthcare: { aiAdoption: 1.1, competition: 1.0, marketSize: 1.0 },
    finance: { aiAdoption: 1.4, competition: 1.3, marketSize: 1.2 },
    retail: { aiAdoption: 1.0, competition: 1.1, marketSize: 0.9 },
    manufacturing: { aiAdoption: 1.2, competition: 1.0, marketSize: 1.0 },
    consulting: { aiAdoption: 1.1, competition: 1.1, marketSize: 1.0 }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateROI = () => {
    const {
      currentMonthlyLeads,
      currentConversionRate,
      averageLeadValue,
      currentMarketingBudget,
      industry
    } = formData;

    const plan = aiPlans[selectedPlan];
    const industryMultiplier = industryMultipliers[industry];

    // Current metrics
    const currentMonthlyRevenue = currentMonthlyLeads * (currentConversionRate / 100) * averageLeadValue;
    const currentAnnualRevenue = currentMonthlyRevenue * 12;

    // AI optimization impact
    const baseLeadIncrease = plan.leadIncrease / 100;
    const additionalLeadBonus = selectedServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service.leadBonus / 100);
    }, 0);

    const totalLeadIncrease = baseLeadIncrease + additionalLeadBonus;
    const newMonthlyLeads = currentMonthlyLeads * (1 + totalLeadIncrease);
    const newConversionRate = currentConversionRate * 1.2; // 20% improvement in conversion

    // Revenue projections
    const newMonthlyRevenue = newMonthlyLeads * (newConversionRate / 100) * averageLeadValue;
    const newAnnualRevenue = newMonthlyRevenue * 12;

    // Cost calculations
    const totalMonthlyCost = plan.monthlyCost + selectedServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + service.monthlyCost;
    }, 0);

    const totalAnnualCost = totalMonthlyCost * 12;
    const setupCost = 1000; // One-time setup cost
    const totalFirstYearCost = totalAnnualCost + setupCost;

    // ROI calculations
    const annualRevenueIncrease = newAnnualRevenue - currentAnnualRevenue;
    const netAnnualBenefit = annualRevenueIncrease - totalAnnualCost;
    const roiPercentage = ((netAnnualBenefit / totalFirstYearCost) * 100);
    const paybackPeriod = totalFirstYearCost / netAnnualBenefit;

    // 3-year projection
    const threeYearRevenue = annualRevenueIncrease * 3;
    const threeYearCosts = totalAnnualCost * 3 + setupCost;
    const threeYearROI = ((threeYearRevenue - threeYearCosts) / threeYearCosts) * 100;

    setResults({
      current: {
        monthlyLeads: currentMonthlyLeads,
        conversionRate: currentConversionRate,
        monthlyRevenue: currentMonthlyRevenue,
        annualRevenue: currentAnnualRevenue
      },
      projected: {
        monthlyLeads: Math.round(newMonthlyLeads),
        conversionRate: newConversionRate,
        monthlyRevenue: newMonthlyRevenue,
        annualRevenue: newAnnualRevenue
      },
      improvements: {
        leadIncrease: Math.round(totalLeadIncrease * 100),
        revenueIncrease: newMonthlyRevenue - currentMonthlyRevenue,
        conversionImprovement: 20
      },
      financial: {
        annualRevenueIncrease: annualRevenueIncrease,
        netAnnualBenefit: netAnnualBenefit,
        monthlyCost: totalMonthlyCost,
        annualCost: totalAnnualCost,
        setupCost: setupCost,
        totalFirstYearCost: totalFirstYearCost,
        roiPercentage: roiPercentage,
        paybackPeriod: paybackPeriod,
        threeYearROI: threeYearROI
      },
      plan: plan,
      selectedServices: selectedServices.map(id => additionalServices.find(s => s.id === id))
    });

    setShowResults(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(Math.round(value));
  };

  return (
    <section id="roi-calculator" className="section roi-calculator">
      <div className="container">
        <div className="roi-header">
          <h2>ROI Calculator</h2>
          <p className="sub">Calculate the return on investment for AI-powered lead generation and optimization</p>
        </div>

        <div className="roi-content">
          <div className="roi-form-container">
            <div className="roi-form">
              <h3>Your Business Profile</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="businessType">Business Type</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                  >
                    <option value="b2b">B2B</option>
                    <option value="b2c">B2C</option>
                    <option value="saas">SaaS</option>
                    <option value="agency">Agency</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                  >
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="currentMonthlyLeads">Current Monthly Leads</label>
                  <input
                    type="number"
                    id="currentMonthlyLeads"
                    name="currentMonthlyLeads"
                    value={formData.currentMonthlyLeads}
                    onChange={handleInputChange}
                    min="10"
                    max="10000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="currentConversionRate">Current Conversion Rate (%)</label>
                  <input
                    type="number"
                    id="currentConversionRate"
                    name="currentConversionRate"
                    value={formData.currentConversionRate}
                    onChange={handleInputChange}
                    min="0.5"
                    max="20"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="averageLeadValue">Average Lead Value ($)</label>
                  <input
                    type="number"
                    id="averageLeadValue"
                    name="averageLeadValue"
                    value={formData.averageLeadValue}
                    onChange={handleInputChange}
                    min="100"
                    max="100000"
                    step="100"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="currentMarketingBudget">Current Monthly Marketing Budget ($)</label>
                  <input
                    type="number"
                    id="currentMarketingBudget"
                    name="currentMarketingBudget"
                    value={formData.currentMarketingBudget}
                    onChange={handleInputChange}
                    min="1000"
                    max="100000"
                    step="1000"
                  />
                </div>
              </div>

              <div className="plan-selection">
                <h4>Select AI Plan</h4>
                <div className="plan-options">
                  {Object.entries(aiPlans).map(([key, plan]) => (
                    <div 
                      key={key}
                      className={`plan-option ${selectedPlan === key ? 'selected' : ''}`}
                      onClick={() => setSelectedPlan(key)}
                    >
                      <div className="plan-header">
                        <h5>{plan.name}</h5>
                        <div className="plan-price">${plan.monthlyCost}/month</div>
                      </div>
                      <p>{plan.description}</p>
                      <div className="plan-benefit">+{plan.leadIncrease}% lead generation</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="services-selection">
                <h4>Additional AI Services (Optional)</h4>
                <div className="services-grid">
                  {additionalServices.map((service) => (
                    <div 
                      key={service.id}
                      className={`service-option ${selectedServices.includes(service.id) ? 'selected' : ''}`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className="service-header">
                        <h5>{service.name}</h5>
                        <div className="service-price">${service.monthlyCost}/month</div>
                      </div>
                      <p>{service.description}</p>
                      <div className="service-benefit">+{service.leadBonus}% lead bonus</div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="btn btn-primary btn-large calculate-btn"
                onClick={calculateROI}
              >
                Calculate ROI
              </button>
            </div>
          </div>

          {showResults && results && (
            <div className="roi-results">
              <h3>Your AI ROI Projection</h3>
              
              <div className="results-grid">
                <div className="result-card current">
                  <h4>Current State</h4>
                  <div className="metric">
                    <span className="label">Monthly Leads:</span>
                    <span className="value">{formatNumber(results.current.monthlyLeads)}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Conversion Rate:</span>
                    <span className="value">{formatPercentage(results.current.conversionRate)}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Monthly Revenue:</span>
                    <span className="value">{formatCurrency(results.current.monthlyRevenue)}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Annual Revenue:</span>
                    <span className="value">{formatCurrency(results.current.annualRevenue)}</span>
                  </div>
                </div>

                <div className="result-card projected">
                  <h4>With {results.plan.name}</h4>
                  <div className="metric">
                    <span className="label">Monthly Leads:</span>
                    <span className="value">{formatNumber(results.projected.monthlyLeads)}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Conversion Rate:</span>
                    <span className="value">{formatPercentage(results.projected.conversionRate)}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Monthly Revenue:</span>
                    <span className="value">{formatCurrency(results.projected.monthlyRevenue)}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Annual Revenue:</span>
                    <span className="value">{formatCurrency(results.projected.annualRevenue)}</span>
                  </div>
                </div>
              </div>

              <div className="improvements-section">
                <h4>Key Improvements</h4>
                <div className="improvements-grid">
                  <div className="improvement-item">
                    <div className="improvement-icon">📈</div>
                    <div className="improvement-details">
                      <span className="improvement-label">Lead Generation</span>
                      <span className="improvement-value">+{results.improvements.leadIncrease}%</span>
                    </div>
                  </div>
                  <div className="improvement-item">
                    <div className="improvement-icon">💳</div>
                    <div className="improvement-details">
                      <span className="improvement-label">Revenue Increase</span>
                      <span className="improvement-value">+{formatCurrency(results.improvements.revenueIncrease)}/month</span>
                    </div>
                  </div>
                  <div className="improvement-item">
                    <div className="improvement-icon">🎯</div>
                    <div className="improvement-details">
                      <span className="improvement-label">Conversion Improvement</span>
                      <span className="improvement-value">+{results.improvements.conversionImprovement}%</span>
                    </div>
                  </div>
                  <div className="improvement-item">
                    <div className="improvement-icon">🤖</div>
                    <div className="improvement-details">
                      <span className="improvement-label">AI Services</span>
                      <span className="improvement-value">{results.selectedServices.length + 1}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="roi-summary">
                <h4>Financial Impact</h4>
                <div className="roi-metrics">
                  <div className="roi-metric">
                    <span className="metric-label">Annual Revenue Increase</span>
                    <span className="metric-value positive">{formatCurrency(results.financial.annualRevenueIncrease)}</span>
                  </div>
                  <div className="roi-metric">
                    <span className="metric-label">AI Services Annual Cost</span>
                    <span className="metric-value negative">{formatCurrency(results.financial.annualCost)}</span>
                  </div>
                  <div className="roi-metric">
                    <span className="metric-label">Setup Cost</span>
                    <span className="metric-value negative">{formatCurrency(results.financial.setupCost)}</span>
                  </div>
                  <div className="roi-metric highlight">
                    <span className="metric-label">Net Annual Benefit</span>
                    <span className="metric-value positive">{formatCurrency(results.financial.netAnnualBenefit)}</span>
                  </div>
                </div>

                <div className="roi-highlights">
                  <div className="highlight-item">
                    <div className="highlight-icon">🎯</div>
                    <div className="highlight-content">
                      <span className="highlight-label">ROI</span>
                      <span className="highlight-value">{formatPercentage(results.financial.roiPercentage)}</span>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">⏱️</div>
                    <div className="highlight-content">
                      <span className="highlight-label">Payback Period</span>
                      <span className="highlight-value">{results.financial.paybackPeriod.toFixed(1)} months</span>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">📊</div>
                    <div className="highlight-content">
                      <span className="highlight-label">3-Year ROI</span>
                      <span className="highlight-value">{formatPercentage(results.financial.threeYearROI)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="roi-cta">
                <div className="roi-actions">
                  <a href="#contact" className="btn btn-primary">Get Custom Analysis</a>
                  <a href="#demo" className="btn btn-outline">See Demo</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ROICalculator;
