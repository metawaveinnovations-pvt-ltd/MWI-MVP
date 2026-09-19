import React, { useEffect } from 'react';
import { getRouteMetadata, SITE_DOMAIN, DEFAULT_OG_IMAGE, RouteMetadata } from '../data/routesData';

interface SEOManagerProps {
  currentPath?: string;
}

export const SEOManager: React.FC<SEOManagerProps> = ({ currentPath }) => {
  useEffect(() => {
    const path = currentPath || window.location.pathname;
    const meta = getRouteMetadata(path);

    // 1. Update Document Title
    document.title = meta.title;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string, hreflang?: string) => {
      let selector = `link[rel="${rel}"]`;
      if (hreflang) {
        selector = `link[rel="${rel}"][hreflang="${hreflang}"]`;
      }
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (hreflang) el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Core Meta Directives
    setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('meta[name="author"]', 'name', 'author', 'MetaWave Innovations Pvt Ltd');
    setMetaTag('meta[name="publisher"]', 'name', 'publisher', 'MetaWave Innovations Pvt Ltd');
    setMetaTag('meta[name="theme-color"]', 'name', 'theme-color', '#FAFBFD');
    setMetaTag('meta[name="referrer"]', 'name', 'referrer', 'strict-origin-when-cross-origin');

    // 3. Canonical & International Hreflang Tags
    setLinkTag('canonical', meta.canonical);
    setLinkTag('alternate', `${SITE_DOMAIN}/`, 'x-default');
    setLinkTag('alternate', `${SITE_DOMAIN}/software-development-company-usa`, 'en-us');
    setLinkTag('alternate', `${SITE_DOMAIN}/software-development-company-uk`, 'en-gb');
    setLinkTag('alternate', `${SITE_DOMAIN}/software-development-company-uae`, 'en-ae');
    setLinkTag('alternate', `${SITE_DOMAIN}/software-development-company-saudi-arabia`, 'en-sa');
    setLinkTag('alternate', `${SITE_DOMAIN}/software-development-company-pakistan`, 'en-pk');

    // 4. Open Graph Meta
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', meta.canonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.ogImage || DEFAULT_OG_IMAGE);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'MetaWave Innovations');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 5. Twitter Card Meta
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@MetaWaveTech');
    setMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@MetaWaveTech');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.ogImage || DEFAULT_OG_IMAGE);

    // 6. JSON-LD Schema Construction
    let primarySchema: any = null;

    if (meta.schemaType === 'Organization' || meta.path === '/') {
      primarySchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_DOMAIN}/#organization`,
            'name': 'MetaWave Innovations (Private) Limited',
            'legalName': 'MetaWave Innovations (Private) Limited',
            'url': SITE_DOMAIN,
            'logo': {
              '@type': 'ImageObject',
              'url': `${SITE_DOMAIN}/Meta_Logo.webp`,
              'width': '512',
              'height': '512'
            },
            'description': 'MetaWave Innovations is a global enterprise software development, AI engineering, and digital transformation company.',
            'slogan': 'Engineering Next-Generation Enterprise Systems & Intelligence',
            'foundingDate': '2024',
            'knowsAbout': [
              'Custom Enterprise Software Development',
              'Artificial Intelligence & Machine Learning',
              'Generative AI & LLM Systems (Gemini, OpenAI, Claude)',
              'Cloud Architecture & DevOps (AWS, GCP, Azure)',
              'Enterprise Resource Planning (ERP) Systems',
              'Customer Relationship Management (CRM) Platforms',
              'Full-Stack Web Engineering (React, Next.js, Node.js)',
              'Mobile App Development (iOS, Android, Flutter)',
              'Business Process Automation & Intelligent RPA',
              'Technical SEO & Generative Engine Optimization (GEO)'
            ],
            'sameAs': [
              'https://github.com/metawaveinnovations',
              'https://linkedin.com/company/metawaveinnovations',
              'https://twitter.com/metawavetech'
            ],
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Islamabad R&D Hub, SECP Registered Company',
              'addressLocality': 'Islamabad',
              'addressRegion': 'Federal Capital',
              'postalCode': '44000',
              'addressCountry': 'PK'
            },
            'contactPoint': [
              {
                '@type': 'ContactPoint',
                'telephone': '+92-51-0000000',
                'contactType': 'customer support',
                'email': 'contact@metawaveinnovations.com',
                'areaServed': ['Global', 'PK', 'UK', 'UAE', 'SA', 'US'],
                'availableLanguage': ['English', 'Urdu', 'Arabic']
              }
            ]
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_DOMAIN}/#website`,
            'url': SITE_DOMAIN,
            'name': 'MetaWave Innovations',
            'description': meta.description,
            'publisher': { '@id': `${SITE_DOMAIN}/#organization` },
            'inLanguage': 'en-US',
            'potentialAction': {
              '@type': 'SearchAction',
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${SITE_DOMAIN}/blog?q={search_term_string}`
              },
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@type': 'SoftwareApplication',
            '@id': `${SITE_DOMAIN}/#software`,
            'name': 'MetaWave Enterprise Intelligence Suite',
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'Cloud-Native / Web / Mobile',
            'image': `${SITE_DOMAIN}/Meta_Logo.webp`,
            'description': 'Enterprise AI, Custom Software Engineering, and Workflow Automation Solutions powered by MetaWave Innovations.',
            'author': { '@id': `${SITE_DOMAIN}/#organization` },
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
              'description': 'Free Technical Architectural Consultation & AI Discovery Session'
            }
          },
          {
            '@type': 'FAQPage',
            '@id': `${SITE_DOMAIN}/#faq`,
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'What services does MetaWave Innovations offer in Pakistan and globally?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'MetaWave Innovations provides custom enterprise software development, AI & Machine Learning automation, full-stack web application development, mobile app engineering (iOS/Android), cloud architecture, and startup branding packages.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Where is MetaWave Innovations located?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'MetaWave Innovations (Private) Limited is an SECP-registered company headquartered in Islamabad, Pakistan, serving enterprise clients globally across the UK, UAE, Saudi Arabia, and USA.'
                }
              },
              {
                '@type': 'Question',
                'name': 'How does MetaWave Innovations guarantee source code IP security?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'All custom software, algorithms, and digital products engineered by MetaWave are transferred 100% to clients via legal IP assignment agreements under strict NDAs.'
                }
              }
            ]
          }
        ]
      };
    } else if (meta.schemaType === 'Service') {
      primarySchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': meta.h1Heading || meta.title,
        'serviceType': meta.h1Heading || meta.title,
        'description': meta.description,
        'provider': {
          '@type': 'Organization',
          'name': 'MetaWave Innovations (Private) Limited',
          'url': SITE_DOMAIN,
          'logo': `${SITE_DOMAIN}/Meta_Logo.webp`
        },
        'areaServed': ['Global', 'PK', 'UK', 'UAE', 'SA', 'US'],
        'url': meta.canonical,
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Enterprise Software Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': meta.title
              }
            }
          ]
        }
      };
    } else if (meta.schemaType === 'BlogPosting') {
      primarySchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': meta.h1Heading || meta.title,
        'description': meta.description,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': meta.canonical
        },
        'url': meta.canonical,
        'datePublished': meta.lastmod,
        'dateModified': meta.lastmod,
        'inLanguage': 'en-US',
        'author': {
          '@type': 'Organization',
          'name': 'MetaWave Engineering Team',
          'url': `${SITE_DOMAIN}/about`
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'MetaWave Innovations',
          'logo': {
            '@type': 'ImageObject',
            'url': `${SITE_DOMAIN}/Meta_Logo.webp`,
            'width': '512',
            'height': '512'
          }
        },
        'image': meta.ogImage || DEFAULT_OG_IMAGE
      };
    } else if (meta.schemaType === 'FAQPage') {
      primarySchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What services does MetaWave Innovations provide?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'MetaWave Innovations provides enterprise custom software development, web application engineering, mobile app development (iOS/Android), AI & Machine Learning solutions, cloud DevOps, CRM/ERP development, and technical consulting.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Where is MetaWave Innovations headquartered?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'MetaWave Innovations (Private) Limited is headquartered in Islamabad, Pakistan, serving enterprise clients across the United Kingdom, United Arab Emirates, Saudi Arabia, and North America.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does MetaWave ensure software security and compliance?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We enforce enterprise-grade security protocols, complete non-disclosure agreements (NDAs), full IP assignments to clients, sandboxed dependencies, and rigorous vulnerability scanning.'
            }
          }
        ]
      };
    } else if (meta.schemaType === 'LocalBusiness') {
      primarySchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': meta.title,
        'image': meta.ogImage || DEFAULT_OG_IMAGE,
        '@id': meta.canonical,
        'url': meta.canonical,
        'telephone': '+92-51-0000000',
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'MetaWave R&D Center',
          'addressLocality': 'Islamabad',
          'addressRegion': 'Federal Capital',
          'postalCode': '44000',
          'addressCountry': 'PK'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 33.6844,
          'longitude': 73.0479
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '09:00',
          'closes': '18:00'
        }
      };
    } else {
      primarySchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': meta.title,
        'description': meta.description,
        'url': meta.canonical
      };
    }

    // 7. BreadcrumbList Schema Generation
    let breadcrumbSchema: any = null;
    if (meta.path !== '/') {
      const breadcrumbItems: any[] = [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `${SITE_DOMAIN}/`
        }
      ];

      let categoryName = '';
      let categoryUrl = '';

      if (meta.category === 'service') {
        categoryName = 'Services';
        categoryUrl = `${SITE_DOMAIN}/services`;
      } else if (meta.category === 'solution') {
        categoryName = 'Solutions';
        categoryUrl = `${SITE_DOMAIN}/solutions`;
      } else if (meta.category === 'blog') {
        categoryName = 'Blog';
        categoryUrl = `${SITE_DOMAIN}/blog`;
      } else if (meta.category === 'case-study') {
        categoryName = 'Portfolio';
        categoryUrl = `${SITE_DOMAIN}/portfolio`;
      } else if (meta.category === 'location') {
        categoryName = 'Global Presence';
        categoryUrl = `${SITE_DOMAIN}/about`;
      } else if (meta.category === 'legal') {
        categoryName = 'Legal Policies';
        categoryUrl = `${SITE_DOMAIN}/privacy-policy`;
      }

      if (categoryName && categoryUrl) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': 2,
          'name': categoryName,
          'item': categoryUrl
        });
      }

      const leafTitle = meta.h1Heading?.split('—')[0]?.split('|')[0]?.trim() || meta.title.split('|')[0].trim();
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': breadcrumbItems.length + 1,
        'name': leafTitle,
        'item': meta.canonical
      });

      breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems
      };
    }

    // Inject Primary JSON-LD Script tag
    let primaryScriptTag = document.getElementById('json-ld-primary');
    if (!primaryScriptTag) {
      primaryScriptTag = document.createElement('script');
      primaryScriptTag.id = 'json-ld-primary';
      primaryScriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(primaryScriptTag);
    }
    primaryScriptTag.textContent = JSON.stringify(primarySchema, null, 2);

    // Inject Breadcrumb JSON-LD Script tag
    let breadcrumbScriptTag = document.getElementById('json-ld-breadcrumb');
    if (breadcrumbSchema) {
      if (!breadcrumbScriptTag) {
        breadcrumbScriptTag = document.createElement('script');
        breadcrumbScriptTag.id = 'json-ld-breadcrumb';
        breadcrumbScriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbScriptTag);
      }
      breadcrumbScriptTag.textContent = JSON.stringify(breadcrumbSchema, null, 2);
    } else if (breadcrumbScriptTag) {
      breadcrumbScriptTag.remove();
    }

  }, [currentPath]);

  return null;
};

