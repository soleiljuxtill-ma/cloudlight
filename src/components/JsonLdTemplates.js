import React from 'react';
import './JsonLdTemplates.css';

// JSON-LD Schema Validation Helper
const validateJsonLd = (schema, data) => {
  const errors = [];
  
  // Basic validation for required fields
  if (schema.required) {
    schema.required.forEach(field => {
      if (!data[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });
  }
  
  // Type validation
  if (schema.types) {
    Object.entries(schema.types).forEach(([field, expectedType]) => {
      if (data[field] && typeof data[field] !== expectedType) {
        errors.push(`Field ${field} should be ${expectedType}, got ${typeof data[field]}`);
      }
    });
  }
  
  // URL validation
  if (schema.urls) {
    schema.urls.forEach(field => {
      if (data[field] && !isValidUrl(data[field])) {
        errors.push(`Invalid URL format for field: ${field}`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// JSON-LD Templates for different page types
const JsonLdTemplates = {
  // Hotel/Accommodation Schema
  Hotel: {
    schema: {
      required: ['name', 'description', 'address', 'telephone'],
      types: {
        name: 'string',
        description: 'string',
        telephone: 'string',
        priceRange: 'string',
        starRating: 'number'
      },
      urls: ['url', 'image', 'sameAs']
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": data.name,
        "description": data.description,
        "image": data.image || [],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.address.streetAddress,
          "addressLocality": data.address.addressLocality,
          "addressRegion": data.address.addressRegion,
          "postalCode": data.address.postalCode,
          "addressCountry": data.address.addressCountry
        },
        "telephone": data.telephone,
        "url": data.url,
        "priceRange": data.priceRange,
        "starRating": data.starRating,
        "amenityFeature": data.amenities || [],
        "sameAs": data.sameAs || []
      };
      
      return template;
    }
  },

  // Restaurant Schema
  Restaurant: {
    schema: {
      required: ['name', 'description', 'address', 'telephone'],
      types: {
        name: 'string',
        description: 'string',
        telephone: 'string',
        priceRange: 'string',
        servesCuisine: 'string'
      },
      urls: ['url', 'image', 'menu', 'sameAs']
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": data.name,
        "description": data.description,
        "image": data.image || [],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.address.streetAddress,
          "addressLocality": data.address.addressLocality,
          "addressRegion": data.address.addressRegion,
          "postalCode": data.address.postalCode,
          "addressCountry": data.address.addressCountry
        },
        "telephone": data.telephone,
        "url": data.url,
        "priceRange": data.priceRange,
        "servesCuisine": data.servesCuisine,
        "menu": data.menu,
        "sameAs": data.sameAs || []
      };
      
      return template;
    }
  },

  // Local Business Schema
  LocalBusiness: {
    schema: {
      required: ['name', 'description', 'address', 'telephone'],
      types: {
        name: 'string',
        description: 'string',
        telephone: 'string',
        priceRange: 'string'
      },
      urls: ['url', 'image', 'sameAs']
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": data.name,
        "description": data.description,
        "image": data.image || [],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.address.streetAddress,
          "addressLocality": data.address.addressLocality,
          "addressRegion": data.address.addressRegion,
          "postalCode": data.address.postalCode,
          "addressCountry": data.address.addressCountry
        },
        "telephone": data.telephone,
        "url": data.url,
        "priceRange": data.priceRange,
        "openingHours": data.openingHours || [],
        "sameAs": data.sameAs || []
      };
      
      return template;
    }
  },

  // Article Schema
  Article: {
    schema: {
      required: ['headline', 'author', 'datePublished'],
      types: {
        headline: 'string',
        author: 'string',
        datePublished: 'string',
        articleBody: 'string'
      },
      urls: ['url', 'image', 'publisher']
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.headline,
        "description": data.description,
        "image": data.image || [],
        "author": {
          "@type": "Person",
          "name": data.author
        },
        "publisher": {
          "@type": "Organization",
          "name": data.publisher,
          "logo": {
            "@type": "ImageObject",
            "url": data.publisherLogo
          }
        },
        "datePublished": data.datePublished,
        "dateModified": data.dateModified || data.datePublished,
        "articleBody": data.articleBody,
        "url": data.url
      };
      
      return template;
    }
  },

  // FAQ Schema
  FAQ: {
    schema: {
      required: ['mainEntity'],
      types: {
        mainEntity: 'object'
      }
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.mainEntity.map(qa => ({
          "@type": "Question",
          "name": qa.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": qa.answer
          }
        }))
      };
      
      return template;
    }
  },

  // Organization Schema
  Organization: {
    schema: {
      required: ['name', 'description', 'url'],
      types: {
        name: 'string',
        description: 'string',
        url: 'string'
      },
      urls: ['url', 'logo', 'sameAs']
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": data.name,
        "description": data.description,
        "url": data.url,
        "logo": data.logo,
        "sameAs": data.sameAs || [],
        "contactPoint": data.contactPoint ? {
          "@type": "ContactPoint",
          "telephone": data.contactPoint.telephone,
          "contactType": data.contactPoint.contactType,
          "email": data.contactPoint.email
        } : undefined
      };
      
      return template;
    }
  },

  // Service Schema
  Service: {
    schema: {
      required: ['name', 'description', 'provider'],
      types: {
        name: 'string',
        description: 'string',
        provider: 'string'
      },
      urls: ['url']
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": data.name,
        "description": data.description,
        "provider": {
          "@type": "Organization",
          "name": data.provider
        },
        "offers": data.offers ? {
          "@type": "Offer",
          "price": data.offers.price,
          "priceCurrency": data.offers.priceCurrency,
          "description": data.offers.description
        } : undefined,
        "url": data.url
      };
      
      return template;
    }
  },

  // WebSite Schema
  WebSite: {
    schema: {
      required: ['name', 'url'],
      types: {
        name: 'string',
        url: 'string',
        description: 'string',
        publisher: 'string',
        keywords: 'array',
        inLanguage: 'string',
        copyrightYear: 'string',
        author: 'string',
        mainEntityOfPage: 'string',
        sameAs: 'array'
      },
      urls: ['url', 'mainEntityOfPage'],
      arrays: ['keywords', 'sameAs']
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": data.name,
        "url": data.url,
        "description": data.description,
        "publisher": {
          "@type": "Organization",
          "name": data.publisher
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${data.url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };

      // Add optional fields if provided
      if (data.keywords && Array.isArray(data.keywords)) {
        template.keywords = data.keywords;
      }
      
      if (data.inLanguage) {
        template.inLanguage = data.inLanguage;
      }
      
      if (data.copyrightYear) {
        template.copyrightYear = data.copyrightYear;
      }
      
      if (data.author) {
        template.author = {
          "@type": "Person",
          "name": data.author
        };
      }
      
      if (data.mainEntityOfPage) {
        template.mainEntityOfPage = data.mainEntityOfPage;
      }
      
      if (data.sameAs && Array.isArray(data.sameAs)) {
        template.sameAs = data.sameAs;
      }
      
      return template;
    }
  },

  // BreadcrumbList Schema
  BreadcrumbList: {
    schema: {
      required: ['itemListElement'],
      types: {
        itemListElement: 'object'
      }
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data.itemListElement.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
      
      return template;
    }
  },

  // Review Schema
  Review: {
    schema: {
      required: ['author', 'reviewBody', 'itemReviewed'],
      types: {
        author: 'string',
        reviewBody: 'string',
        itemReviewed: 'string'
      }
    },
    
    generate: (data) => {
      const template = {
        "@context": "https://schema.org",
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": data.author,
          "jobTitle": data.authorJobTitle,
          "worksFor": {
            "@type": "Organization",
            "name": data.authorCompany
          }
        },
        "reviewBody": data.reviewBody,
        "itemReviewed": {
          "@type": "Service",
          "name": data.itemReviewed
        },
        "reviewRating": data.rating ? {
          "@type": "Rating",
          "ratingValue": data.rating,
          "bestRating": 5
        } : undefined,
        "datePublished": data.datePublished
      };
      
      return template;
    }
  }
};

// Main Component for JSON-LD Management
function JsonLdManager({ pageType, pageData, onValidation }) {
  const template = JsonLdTemplates[pageType];
  
  // Always call hooks at the top level
  const jsonLd = template ? template.generate(pageData) : null;
  const validation = template ? validateJsonLd(template.schema, pageData) : { isValid: false, errors: ['Invalid page type'] };

  // Notify parent component of validation results
  React.useEffect(() => {
    if (onValidation) {
      onValidation(validation);
    }
  }, [validation, onValidation]);

  if (!template) {
    return (
      <div className="jsonld-error">
        <h3>❌ Invalid Page Type</h3>
        <p>Available types: {Object.keys(JsonLdTemplates).join(', ')}</p>
      </div>
    );
  }

  return (
    <div className="jsonld-manager">
      <div className="jsonld-header">
        <h3>🔍 JSON-LD Schema for {pageType}</h3>
        <div className={`validation-status ${validation.isValid ? 'valid' : 'invalid'}`}>
          {validation.isValid ? '✅ Valid' : '❌ Invalid'}
        </div>
      </div>

      {!validation.isValid && (
        <div className="validation-errors">
          <h4>Validation Errors:</h4>
          <ul>
            {validation.errors.map((error, index) => (
              <li key={index} className="error-item">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="jsonld-preview">
        <h4>Generated JSON-LD:</h4>
        <pre className="jsonld-code">
          {JSON.stringify(jsonLd, null, 2)}
        </pre>
      </div>

      <div className="jsonld-actions">
        <button 
          className="btn btn-primary"
          onClick={() => navigator.clipboard.writeText(JSON.stringify(jsonLd, null, 2))}
        >
          📋 Copy JSON-LD
        </button>
        <button 
          className="btn btn-outline"
          onClick={() => {
            const blob = new Blob([JSON.stringify(jsonLd, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${pageType.toLowerCase()}-schema.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          💾 Download Schema
        </button>
      </div>

      <div className="jsonld-info">
        <h4>ℹ️ Schema Information:</h4>
        <ul>
          <li><strong>Type:</strong> {pageType}</li>
          <li><strong>Required Fields:</strong> {template.schema.required?.join(', ') || 'None'}</li>
          <li><strong>Validation:</strong> {validation.isValid ? 'Passed' : 'Failed'}</li>
          <li><strong>Generated:</strong> {new Date().toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
}

// Hook for using JSON-LD in components
export const useJsonLd = (pageType, pageData) => {
  const [validation, setValidation] = React.useState({ isValid: false, errors: [], warnings: [] });
  
  React.useEffect(() => {
    const template = JsonLdTemplates[pageType];
    if (template) {
      const result = validateJsonLd(template.schema, pageData);
      setValidation(result);
    }
  }, [pageType, pageData]);

  const generateJsonLd = () => {
    const template = JsonLdTemplates[pageType];
    return template ? template.generate(pageData) : null;
  };

  return {
    validation,
    generateJsonLd,
    isValid: validation.isValid,
    errors: validation.errors
  };
};

// Utility component for simple JSON-LD injection
export const JsonLdScript = ({ pageType, pageData }) => {
  const { generateJsonLd, isValid } = useJsonLd(pageType, pageData);
  
  if (!isValid) {
    console.warn(`JSON-LD validation failed for ${pageType}:`, pageData);
  }
  
  const jsonLd = generateJsonLd();
  
  if (!jsonLd) return null;
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
};

export default JsonLdManager;
export { JsonLdTemplates, validateJsonLd };
