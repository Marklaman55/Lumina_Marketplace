import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  twitterHandle?: string;
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noIndex?: boolean;
  noFollow?: boolean;
}

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  siteName,
  twitterHandle,
  twitterCardType = 'summary_large_image',
  noIndex = false,
  noFollow = false,
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      <meta name="twitter:card" content={twitterCardType} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
      {noIndex && <meta name="robots" content="noindex" />}
      {noFollow && <meta name="robots" content="nofollow" />}
    </Helmet>
  );
}