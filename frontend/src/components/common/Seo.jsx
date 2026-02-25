import { Helmet } from 'react-helmet-async';
import i18n from '../../i18n';

/**
 * Composant SEO réutilisable pour toutes les pages - inspec
 * @param {string} title - Titre de la page
 * @param {string} description - Description méta de la page
 * @param {string} image - Image pour Open Graph
 * @param {string} type - Type de contenu (website, article)
 * @param {string} url - URL canonique de la page
 * @param {string} siteName - Nom du site
 * @param {object} article - Objet article pour les balises schema.org (optionnel)
 */
export default function Seo({
  title = 'inspec - Bureau d\'inspection maritime au Maroc',
  description = 'inspec est votre bureau d\'inspection maritime agréé au Maroc. Expertise en draft survey, inspection on/offhire, pointage sous-palon et expertise de cargaison pour les navires commerciaux.',
  image = '/og-image.jpg',
  type = 'website',
  url = '',
  siteName = 'inspec',
  article = null
}) {
  const fullUrl = url ? `${import.meta.env.VITE_APP_URL || 'https://inspec.ma'}${url}` : '';
  const canonicalUrl = url ? fullUrl : undefined;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {fullUrl && <meta property="og:url" content={fullUrl} />}
      <meta property="og:locale" content={i18n.language === 'ar' ? 'ar_MA' : i18n.language === 'fr' ? 'fr_FR' : 'en_EN'} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}

      {/* Article specific meta tags */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="inspec" />
      
      {/* Schema.org JSON-LD */}
      {type === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteName,
            "url": fullUrl || import.meta.env.VITE_APP_URL || 'https://inspec.ma',
            "description": description,
            "areaServed": {
              "@type": "Country",
              "name": "Morocco"
            },
            "serviceType": "Maritime Inspection",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+212-XXX-XXXXXX",
              "contactType": "Customer Service",
              "areaServed": "MA"
            }
          })}
        </script>
      )}
      
      {type === 'article' && article && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": image,
            "datePublished": article.publishedTime,
            "dateModified": article.modifiedTime || article.publishedTime,
            "author": {
              "@type": "Person",
              "name": article.author || 'inspec'
            },
            "publisher": {
              "@type": "Organization",
              "name": siteName,
              "logo": {
                "@type": "ImageObject",
                "url": `${import.meta.env.VITE_APP_URL || 'https://inspec.ma'}/logo.png`
              }
            }
          })}
        </script>
      )}
    </Helmet>
  );
}
