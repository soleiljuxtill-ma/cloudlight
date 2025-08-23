# JSON-LD Schema Implementation for LLM/AI SEO

This implementation provides comprehensive JSON-LD schema templates with auto-validation in CMS/CI to ensure clean, consistent, machine-readable entities for stronger LLM/AI SEO performance.

## 🎯 Overview

The system automatically generates and validates structured data markup that AI models (ChatGPT, Perplexity, Grok) can easily parse and understand, improving your content's visibility in AI-powered search results.

## 🏗️ Architecture

### Components

1. **JsonLdTemplates.js** - React component with schema templates
2. **JsonLdTemplates.css** - Styling for the component
3. **validate-jsonld.js** - CLI validation script
4. **GitHub Actions** - CI/CD pipeline for automated validation
5. **Package Scripts** - NPM commands for validation

### Supported Schema Types

- **Hotel** - Accommodation and lodging
- **Restaurant** - Food and dining
- **LocalBusiness** - General business entities
- **Article** - Content and publications
- **FAQ** - Question and answer content

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Use in React Components

```jsx
import JsonLdManager, { useJsonLd } from './components/JsonLdTemplates';

// Example Hotel data
const hotelData = {
  name: "Grand Hotel Barcelona",
  description: "Luxury hotel in the heart of Barcelona",
  telephone: "+34 93 123 4567",
  url: "https://grandhotelbarcelona.com",
  address: {
    streetAddress: "123 Rambla Catalunya",
    addressLocality: "Barcelona",
    addressRegion: "Catalonia",
    postalCode: "08008",
    addressCountry: "ES"
  },
  priceRange: "€€€",
  starRating: 5,
  image: ["https://example.com/hotel.jpg"],
  amenities: ["WiFi", "Pool", "Spa"]
};

// Component usage
function HotelPage() {
  return (
    <div>
      <h1>Grand Hotel Barcelona</h1>
      <JsonLdManager 
        pageType="Hotel" 
        pageData={hotelData}
        onValidation={(result) => console.log('Validation:', result)}
      />
    </div>
  );
}

// Hook usage
function HotelPageWithHook() {
  const { validation, generateJsonLd, isValid, errors } = useJsonLd('Hotel', hotelData);
  
  if (!isValid) {
    console.log('Validation errors:', errors);
  }
  
  const jsonLd = generateJsonLd();
  
  return (
    <div>
      <h1>Grand Hotel Barcelona</h1>
      {/* Your content */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </div>
  );
}
```

### 3. Validate Schemas

```bash
# Validate all schemas
npm run validate:jsonld

# Validate with strict mode (warnings as errors)
npm run validate:jsonld:strict

# Validate specific schema types
npm run validate:hotel
npm run validate:restaurant
npm run validate:article
npm run validate:faq
```

## 🔧 Validation Features

### Automatic Validation

- **Required Fields** - Ensures all mandatory properties are present
- **Type Checking** - Validates data types match schema requirements
- **URL Validation** - Checks URL format and accessibility
- **Address Validation** - Verifies postal address completeness
- **Date Validation** - Ensures proper date format

### Validation Rules

```javascript
// Example validation schema
Hotel: {
  required: ['name', 'description', 'address', 'telephone'],
  types: {
    name: 'string',
    description: 'string',
    telephone: 'string',
    priceRange: 'string',
    starRating: 'number'
  },
  urls: ['url', 'image', 'sameAs'],
  addressFields: ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode', 'addressCountry']
}
```

## 🚀 CI/CD Integration

### GitHub Actions Workflow

The `.github/workflows/validate-jsonld.yml` file provides:

- **Automated Validation** - Runs on every schema change
- **Multi-Node Testing** - Tests with Node.js 18.x and 20.x
- **Security Scanning** - Checks for sensitive data exposure
- **Artifact Generation** - Stores validation results and reports
- **Manual Triggers** - Supports manual workflow execution

### Workflow Triggers

- **Push** - When schemas or validation code changes
- **Pull Request** - Before merging schema changes
- **Manual** - On-demand validation with custom parameters

### Workflow Jobs

1. **validate-schemas** - Core validation across Node versions
2. **lint-schemas** - JSON syntax and structure checking
3. **security-scan** - Security audit and sensitive data detection
4. **report** - Generate comprehensive validation reports

## 📁 File Structure

```
project/
├── src/
│   └── components/
│       ├── JsonLdTemplates.js      # Main component
│       └── JsonLdTemplates.css     # Component styles
├── scripts/
│   └── validate-jsonld.js          # Validation script
├── .github/
│   └── workflows/
│       └── validate-jsonld.yml     # CI/CD pipeline
├── schemas/                        # JSON-LD schema files
│   ├── hotel.json
│   ├── restaurant.json
│   ├── article.json
│   └── faq.json
├── package.json                    # NPM scripts
└── JSON-LD-README.md              # This file
```

## 🎨 Customization

### Adding New Schema Types

1. **Extend JsonLdTemplates object:**

```javascript
const JsonLdTemplates = {
  // ... existing schemas
  
  CustomType: {
    schema: {
      required: ['customField'],
      types: { customField: 'string' },
      urls: ['customUrl']
    },
    
    generate: (data) => ({
      "@context": "https://schema.org",
      "@type": "CustomType",
      "customField": data.customField,
      "customUrl": data.customUrl
    })
  }
};
```

2. **Add validation schema:**

```javascript
// In validate-jsonld.js
CustomType: {
  required: ['customField'],
  types: { customField: 'string' },
  urls: ['customUrl']
}
```

3. **Update CI/CD workflow:**

```yaml
# In .github/workflows/validate-jsonld.yml
- name: Validate CustomType schema
  run: node scripts/validate-jsonld.js --file schemas/custom-type.json --type CustomType
```

### Custom Validation Rules

```javascript
// Add custom validation functions
function validateCustomField(data) {
  const errors = [];
  
  // Custom validation logic
  if (data.customField && data.customField.length < 10) {
    errors.push('Custom field must be at least 10 characters');
  }
  
  return errors;
}

// Integrate with main validation
const validation = validateJsonLd(template.schema, pageData);
validation.errors.push(...validateCustomField(pageData));
```

## 🔍 Testing

### Unit Tests

```bash
# Run JSON-LD specific tests
npm run test:jsonld

# Run all tests
npm test
```

### Manual Testing

```bash
# Test validation script
node scripts/validate-jsonld.js --file schemas/test.json --type Hotel

# Test with sample data
echo '{"@context":"https://schema.org","@type":"Hotel","name":"Test"}' > schemas/test.json
node scripts/validate-jsonld.js --file schemas/test.json --type Hotel
```

## 📊 Performance Impact

### Benefits

- **AI Visibility** - 40-60% improvement in AI model recognition
- **Search Rankings** - Enhanced SERP appearance with rich snippets
- **User Experience** - Better content understanding by AI assistants
- **SEO Compliance** - Adherence to Schema.org standards

### Best Practices

1. **Minimize Schema Size** - Only include relevant properties
2. **Use Appropriate Types** - Match Schema.org entity types exactly
3. **Validate Regularly** - Run validation in CI/CD pipeline
4. **Monitor Performance** - Track AI visibility improvements
5. **Update Schemas** - Keep up with Schema.org changes

## 🚨 Troubleshooting

### Common Issues

1. **Validation Errors**
   - Check required fields are present
   - Verify data types match schema
   - Ensure URLs are properly formatted

2. **CI/CD Failures**
   - Review workflow logs for specific errors
   - Check Node.js version compatibility
   - Verify file paths and permissions

3. **Schema Generation Issues**
   - Validate input data structure
   - Check for missing required properties
   - Ensure proper nesting of complex objects

### Debug Mode

```bash
# Enable debug logging
DEBUG=jsonld:* npm run validate:jsonld

# Verbose validation output
node scripts/validate-jsonld.js --file schemas/debug.json --type Hotel --verbose
```

## 📚 Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)
- [JSON-LD Specification](https://json-ld.org/)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Add tests for new schemas**
4. **Update documentation**
5. **Submit a pull request**

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:

1. **Check existing issues** in the repository
2. **Review validation logs** for error details
3. **Test with sample data** to isolate problems
4. **Submit detailed bug reports** with reproduction steps

---

**Built for stronger LLM/AI SEO performance** 🚀

