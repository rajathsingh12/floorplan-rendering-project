import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Waves, Coffee, Sparkles } from 'lucide-react';

export function NorthDeckSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);

  return (
    <section
      id="north-deck"
      data-chapter="north-deck"
      className="py-24 md:py-32 bg-[#F5F1EB] text-[#1F1D1A] border-b hairline-light"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b hairline-light"
        >
          <div className="lg:col-span-7">
            <span className="font-spec text-[11px] text-[#2F6E73] block mb-3">
              CHAPTER 04 // NORTH STEPPED ART DECO CROWN
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#1F1D1A]">
              Infinity Water, Rattan Light &amp;{' '}
              <span className="italic text-[#2F6E73]">Quiet Luxury.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#6B655C] text-base leading-relaxed">
              Arriving at the northern crown, the stepped white-plaster facade opens onto our most
              photogenic architectural sequence: a turquoise lap pool flowing into a semicircular
              infinity basin, framed symmetrically by open-air Bali Café pergolas and the
              glass-fronted Atelier Salon.
            </p>
          </div>
        </motion.div>

        {/* Full-Bleed Architectural Canvas */}
        <div
          ref={imageWrapRef}
          className="mt-10 relative w-full aspect-video overflow-hidden border hairline-light bg-[#EAE3D9]"
        >
          <motion.img
            style={{ scale: imageScale }}
            src="/renders/north-deck-render.png"
            alt="Eye-level architectural view of the North Stepped Terrace showing the semicircular infinity pool, wrap-around Bali Café pergolas, Luxury Salon on the left, and Recovery Suite on the right"
            className="w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161614]/65 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
            <div>
              <span className="font-spec text-[9.5px] text-[#F5F1EB]/80 block">
                PERSPECTIVE // NORTH TERRACE LOOKING DUE NORTH
              </span>
              <p className="font-editorial text-2xl sm:text-3xl text-[#F5F1EB] mt-0.5">
                Atelier Salon (Left) · Semicircular Infinity Pool &amp; Bali Café · Recovery Suite
                (Right)
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2.5 px-3.5 py-2 bg-[#161614]/70 backdrop-blur-md border border-[#F5F1EB]/18">
              <span className="w-2 h-2 rounded-full bg-[#2F6E73]" />
              <span className="font-spec text-[9.5px] text-[#F5F1EB]">
                FLUSH SEMICIRCLE INFINITY RIM
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Hairline Architectural Monograph */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 border hairline-light divide-y md:divide-y-0 md:divide-x divide-[#1F1D1A]/12 bg-[#F5F1EB]">
          {/* Pool */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-spec text-[10px] text-[#2F6E73]">ZONE P // CENTER CROWN</span>
                <Waves className="w-4 h-4 text-[#2F6E73]" strokeWidth={1.25} />
              </div>
              <h3 className="font-editorial text-3xl font-normal text-[#1F1D1A]">
                Semicircular Infinity Pool
              </h3>
              <p className="mt-3 text-sm text-[#6B655C] leading-relaxed">
                Uses the existing curved northern dome footprint to create an unmistakable
                destination centerpiece—expanding from a travertine-coped lap lane into a flush
                curved vanishing edge floating above the urban canopy.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t hairline-light flex items-center justify-between font-spec text-[9px] text-[#6B655C]">
              <span>TRAVERTINE + BALI STONE</span>
              <span className="text-[#2F6E73]">STRICTLY IN DOME ARC</span>
            </div>
          </motion.article>

          {/* Bali Cafe */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 md:p-8 flex flex-col justify-between bg-[#EAE3D9]/35"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-spec text-[10px] text-[#B8935A]">
                  ZONE C // LEFT &amp; RIGHT WINGS
                </span>
                <Coffee className="w-4 h-4 text-[#B8935A]" strokeWidth={1.25} />
              </div>
              <h3 className="font-editorial text-3xl font-normal text-[#1F1D1A]">
                Wrap-Around Canopy Café
              </h3>
              <p className="mt-3 text-sm text-[#6B655C] leading-relaxed">
                Open-air slatted-teak pergolas step symmetrically with the Art Deco parapet walls.
                Serving specialty coffee, post-workout protein bowls, and botanical dining—acting
                as the club&apos;s daily revenue and community engine.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t hairline-light flex items-center justify-between font-spec text-[9px] text-[#6B655C]">
              <span>TEAK PERGOLAS + RATTAN</span>
              <span className="text-[#B8935A]">SOCIAL THIRD-PLACE</span>
            </div>
          </motion.article>

          {/* Luxury Salon */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-spec text-[10px] text-[#B8935A]">
                  ZONE S // NORTHWEST WING
                </span>
                <Sparkles className="w-4 h-4 text-[#B8935A]" strokeWidth={1.25} />
              </div>
              <h3 className="font-editorial text-3xl font-normal text-[#1F1D1A]">
                The Atelier Luxury Salon
              </h3>
              <p className="mt-3 text-sm text-[#6B655C] leading-relaxed">
                Floor-to-ceiling glass pavilion framed in warm timber with glowing backlit arched
                mirrors and honed limestone styling stations—capturing high-margin grooming rituals
                from both office tenants and destination members.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t hairline-light flex items-center justify-between font-spec text-[9px] text-[#6B655C]">
              <span>ARCHED MIRRORS + LIMESTONE</span>
              <span className="text-[#2F4838]">HIGH-MARGIN YIELD</span>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
