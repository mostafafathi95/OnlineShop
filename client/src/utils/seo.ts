export interface SEOMetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  author?: string;
}

export function setSEOMeta(seo: SEOMetaTags) {
  // Title
  document.title = seo.title;
  
  // Meta description
  updateMetaTag('description', seo.description);
  updateMetaTag('og:title', seo.title);
  updateMetaTag('og:description', seo.description);
  
  // Keywords
  if (seo.keywords) {
    updateMetaTag('keywords', seo.keywords);
  }
  
  // OG tags
  if (seo.ogImage) {
    updateMetaTag('og:image', seo.ogImage);
  }
  updateMetaTag('og:type', seo.ogType || 'website');
  
  // Canonical
  if (seo.canonical) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', seo.canonical);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = seo.canonical;
      document.head.appendChild(link);
    }
  }
  
  // Author
  if (seo.author) {
    updateMetaTag('author', seo.author);
  }
}

function updateMetaTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function addStructuredData(data: any) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
