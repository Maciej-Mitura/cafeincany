import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import Bestsellers from '@/components/Bestsellers';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { getEvents } from '@/lib/sanity/events';
import { getGalleryItems } from '@/lib/sanity/gallery';

export default async function Home() {
  const [events, galleryItems] = await Promise.all([getEvents(), getGalleryItems()]);
  return (
    <>
      <StructuredData />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        <Highlights />
        <Bestsellers />
        <About />
        <Menu />
        <Events events={events} />
        <Gallery items={galleryItems} />
        <Location />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
