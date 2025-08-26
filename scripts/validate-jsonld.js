#!/usr/bin/env node

/**
 * JSON-LD Schema Validation Script for CI/CD
 * 
 * This script validates JSON-LD schemas against Schema.org standards
 * and can be integrated into CI/CD pipelines for automated validation.
 * 
 * Usage:
 *   node scripts/validate-jsonld.js [--file path/to/schema.json] [--type Hotel] [--strict]
 * 
 * Exit codes:
 *   0 - All validations passed
 *   1 - Validation errors found
 *   2 - Invalid arguments or file not found
 */

const fs = require('fs');
const path = require('path');

// Validation schemas for different entity types
const validationSchemas = {
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
  },
  
  Restaurant: {
    required: ['name', 'description', 'address', 'telephone'],
    types: {
      name: 'string',
      description: 'string',
      telephone: 'string',
      priceRange: 'string',
      servesCuisine: 'string'
    },
    urls: ['url', 'image', 'menu', 'sameAs'],
    addressFields: ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode', 'addressCountry']
  },
  
  LocalBusiness: {
    required: ['name', 'description', 'address', 'telephone'],
    types: {
      name: 'string',
      description: 'string',
      telephone: 'string',
      priceRange: 'string'
    },
    urls: ['url', 'image', 'sameAs'],
    addressFields: ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode', 'addressCountry']
  },
  
  Article: {
    required: ['headline', 'author', 'datePublished'],
    types: {
      headline: 'string',
      author: 'string',
      datePublished: 'string',
      articleBody: 'string'
    },
    urls: ['url', 'image', 'publisher'],
    dateFields: ['datePublished', 'dateModified']
  },
  
  FAQ: {
    required: ['mainEntity'],
    types: {
      mainEntity: 'array'
    },
    mainEntityFields: ['question', 'answer']
  },
  
  WebSite: {
    required: ['name', 'url'],
    types: {
      name: 'string',
      url: 'string',
      description: 'string',
      publisher: ['string', 'object'],
      keywords: 'array',
      inLanguage: 'string',
      copyrightYear: 'string',
      author: ['string', 'object'],
      mainEntityOfPage: 'string',
      sameAs: 'array',
      potentialAction: 'object'
    },
    urls: ['url', 'mainEntityOfPage']
  }
};

// Validation functions
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function isValidDate(string) {
  const date = new Date(string);
  return date instanceof Date && !isNaN(date);
}

function validateSchema(schema, data, entityType) {
  const errors = [];
  const warnings = [];
  
  // Check required fields
  if (schema.required) {
    schema.required.forEach(field => {
      if (!data[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });
  }
  
  // Check field types
  if (schema.types) {
    Object.entries(schema.types).forEach(([field, expectedType]) => {
      if (data[field]) {
        const actualType = Array.isArray(data[field]) ? 'array' : typeof data[field];
        
        // Handle multiple allowed types
        if (Array.isArray(expectedType)) {
          if (!expectedType.includes(actualType)) {
            errors.push(`Field ${field} should be ${expectedType.join(' or ')}, got ${actualType}`);
          }
        } else {
          if (actualType !== expectedType) {
            errors.push(`Field ${field} should be ${expectedType}, got ${actualType}`);
          }
        }
      }
    });
  }
  
  // Check URL fields
  if (schema.urls) {
    schema.urls.forEach(field => {
      if (data[field]) {
        if (Array.isArray(data[field])) {
          data[field].forEach((url, index) => {
            if (!isValidUrl(url)) {
              errors.push(`Invalid URL at ${field}[${index}]: ${url}`);
            }
          });
        } else if (!isValidUrl(data[field])) {
          errors.push(`Invalid URL format for field: ${field}`);
        }
      }
    });
  }
  
  // Check address fields
  if (schema.addressFields && data.address) {
    schema.addressFields.forEach(field => {
      if (!data.address[field]) {
        warnings.push(`Missing address field: ${field}`);
      }
    });
  }
  
  // Check date fields
  if (schema.dateFields) {
    schema.dateFields.forEach(field => {
      if (data[field] && !isValidDate(data[field])) {
        errors.push(`Invalid date format for field: ${field}`);
      }
    });
  }
  
  // Check mainEntity for FAQ
  if (entityType === 'FAQ' && data.mainEntity) {
    if (!Array.isArray(data.mainEntity)) {
      errors.push('mainEntity must be an array');
    } else {
      data.mainEntity.forEach((item, index) => {
        if (!item.question || !item.answer) {
          errors.push(`FAQ item ${index} missing question or answer`);
        }
      });
    }
  }
  
  // Check @context and @type
  if (data['@context'] !== 'https://schema.org') {
    errors.push('@context must be "https://schema.org"');
  }
  
  if (!data['@type']) {
    errors.push('Missing @type field');
  } else if (data['@type'] !== entityType) {
    warnings.push(`@type should match entity type: expected ${entityType}, got ${data['@type']}`);
  }
  
  return { errors, warnings };
}

// Main validation function
function validateJsonLdFile(filePath, entityType, strict = false) {
  try {
    // Read and parse JSON file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    
    // Determine entity type if not provided
    if (!entityType) {
      entityType = jsonData['@type'] || 'Unknown';
    }
    
    // Get validation schema
    const schema = validationSchemas[entityType];
    if (!schema) {
      console.error(`❌ Unknown entity type: ${entityType}`);
      console.log(`Available types: ${Object.keys(validationSchemas).join(', ')}`);
      process.exit(2);
    }
    
    // Validate schema
    const { errors, warnings } = validateSchema(schema, jsonData, entityType);
    
    // Report results
    console.log(`\n🔍 Validating ${entityType} schema: ${path.basename(filePath)}`);
    console.log('=' .repeat(50));
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ All validations passed!');
      return true;
    }
    
    if (errors.length > 0) {
      console.log(`❌ Validation errors (${errors.length}):`);
      errors.forEach(error => console.log(`   • ${error}`));
    }
    
    if (warnings.length > 0) {
      console.log(`⚠️  Warnings (${warnings.length}):`);
      warnings.forEach(warning => console.log(`   • ${warning}`));
    }
    
    // Exit with error code if strict mode or errors found
    if (strict || errors.length > 0) {
      console.log('\n❌ Validation failed');
      return false;
    } else {
      console.log('\n⚠️  Validation passed with warnings');
      return true;
    }
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ File not found: ${filePath}`);
      process.exit(2);
    } else if (error instanceof SyntaxError) {
      console.error(`❌ Invalid JSON: ${error.message}`);
      process.exit(1);
    } else {
      console.error(`❌ Unexpected error: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI argument parsing
function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    file: null,
    type: null,
    strict: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--file' && i + 1 < args.length) {
      options.file = args[++i];
    } else if (arg === '--type' && i + 1 < args.length) {
      options.type = args[++i];
    } else if (arg === '--strict') {
      options.strict = true;
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    }
  }
  
  return options;
}

function showHelp() {
  console.log(`
JSON-LD Schema Validator

Usage: node scripts/validate-jsonld.js [options]

Options:
  --file <path>     Path to JSON-LD schema file
  --type <type>     Entity type (Hotel, Restaurant, LocalBusiness, Article, FAQ, WebSite)
  --strict          Treat warnings as errors
  --help, -h        Show this help message

Examples:
  node scripts/validate-jsonld.js --file schemas/hotel.json --type Hotel
  node scripts/validate-jsonld.js --file schemas/restaurant.json --strict

Exit codes:
  0 - All validations passed
  1 - Validation errors found
  2 - Invalid arguments or file not found
`);
}

// Main execution
if (require.main === module) {
  const options = parseArguments();
  
  if (!options.file) {
    console.error('❌ File path is required. Use --help for usage information.');
    process.exit(2);
  }
  
  const isValid = validateJsonLdFile(options.file, options.type, options.strict);
  process.exit(isValid ? 0 : 1);
}

module.exports = {
  validateJsonLdFile,
  validateSchema,
  validationSchemas
};
