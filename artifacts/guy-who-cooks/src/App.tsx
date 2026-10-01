import { useEffect } from 'react';
import { Loader } from '@/components/gwc/Loader';
import { Navbar } from '@/components/gwc/Navbar';
import { ContactSection, Footer, GallerySection, Hero, Marquee, MenuSection, ReviewsSection, SignatureSection, SocialStrip, StorySection } from '@/components/gwc/RestaurantSections';
import { restaurantData } from '@/data/restaurantData';
import './index.css';

function App() {
  useEffect(() => {
    document.title = `${restaurantData.name} — ${restaurantData.phrase}`;
    const description = 'Bold burgers, chicken, fries and chef specials in Islamabad. The Guy Who Cooks serves street-food energy with chef-level presentation.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const setOg = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    };
    setOg('og:title', `${restaurantData.name} — ${restaurantData.phrase}`);
    setOg('og:description', description);
    setOg('og:type', 'restaurant');
    const existing = document.getElementById('restaurant-jsonld');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'restaurant-jsonld'; script.type = 'application/ld+json';
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Restaurant', name: restaurantData.name, slogan: restaurantData.phrase, telephone: restaurantData.phone, address: { '@type': 'PostalAddress', streetAddress: restaurantData.location.address, addressLocality: 'Islamabad', addressCountry: 'PK' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: restaurantData.rating.value, bestRating: '5', reviewCount: restaurantData.rating.reviewCountNumeric }, servesCuisine: ['Burgers', 'Chicken', 'Street food'] });
      document.head.appendChild(script);
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--progress', `${max ? (window.scrollY / max) * 100 : 0}%`);
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="grain min-h-[100dvh] overflow-hidden"><Loader /><div className="scroll-progress" aria-hidden="true" /><Navbar /><main><Hero /><Marquee /><MenuSection /><SignatureSection /><GallerySection /><StorySection /><SocialStrip /><ReviewsSection /><ContactSection /></main><Footer /></div>;
}

export default App;
