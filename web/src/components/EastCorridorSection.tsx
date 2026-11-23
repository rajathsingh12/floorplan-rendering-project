import { motion } from 'framer-motion';
import { ShieldCheck, Trees, ThermometerSnowflake, Compass } from 'lucide-react';

export function EastCorridorSection() {
  return (
    <section
      id="east-corridor"
      data-chapter="east-corridor"
      className="py-24 md:py-32 bg-[#EAE3D9] text-[#1F1D1A] border-b hairline-light"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl pb-12 border-b hairline-light"
        >
          <span className="font-spec text-[11px] text-[#2F4838] block mb-3">
            CHAPTER 03 // ARCHITECTURAL BRIDGE &amp; OPERATIONAL REALISM
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-[#1F1D1A]">
            From Sweat to Stillness—{' '}
            <span className="italic text-[#2F4838]">Honoring the Real Rooftop.</span>
          </h2>
          <p className="mt-4 text-[#6B655C] text-base leading-relaxed">
            Real buildings have real constraints. Rather than hiding them in fictional floorplans,
            our spatial choreography turns the eastern promenade into a lush recovery journey while
            cleanly screening the existing central-left mechanical core.
          </p>
        </motion.div>

        {/* Two-Column Architectural Split */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: East Promenade, Curved Balcony & Recovery Suite */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 border hairline-light bg-[#F5F1EB] flex flex-col justify-between"
          >
            {/* Focused Cropped Architectural View of East Wing & Curved Balcony */}
            <div className="relative aspect-[16/10] overflow-hidden border-b hairline-light bg-[#161614]">
              <img
                src="/renders/isometric-approved.png"
                alt="Architectural detail showing the East Promenade boardwalk, curved eastern projecting balcony, and northeast Recovery Suite"
                className="w-full h-full object-cover object-[76%_38%] scale-[1.55] origin-[76%_38%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161614]/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#2F4838]/90 text-[#F5F1EB] font-spec text-[9px] backdrop-blur-sm">
                EAST SPINE // RECOVERY + CURVED BALCONY
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#F5F1EB]">
                <div>
                  <span className="font-spec text-[9px] text-[#B8935A] block">
                    DETAIL CROP FROM APPROVED 3D CUTAWAY
                  </span>
                  <span className="font-editorial text-2xl">
                    Palm Boardwalk, Semicircular Balcony &amp; Sauna Suite
                  </span>
                </div>
              </div>
            </div>

            <div className="p-7 md:p-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-t hairline-light pt-4">
                  <div className="flex items-center gap-2 text-[#2F4838] mb-2">
                    <ThermometerSnowflake className="w-4 h-4" strokeWidth={1.25} />
                    <span className="font-spec text-[10px]">ZONE R // RECOVERY SUITE</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-[#1F1D1A]">
                    Contrast Therapy Sanctuary
                  </h3>
                  <p className="mt-2 text-sm text-[#6B655C] leading-relaxed">
                    Timber-slatted sauna and cold plunge pavilion tucked directly south of the
                    east café wing—positioned on the exact path members walk after leaving the Gym
                    and Track.
                  </p>
                </div>

                <div className="border-t hairline-light pt-4">
                  <div className="flex items-center gap-2 text-[#2F4838] mb-2">
                    <Compass className="w-4 h-4" strokeWidth={1.25} />
                    <span className="font-spec text-[10px]">EAST PROMENADE &amp; BALCONY</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-[#1F1D1A]">
                    Iconic Semicircular Lounge
                  </h3>
                  <p className="mt-2 text-sm text-[#6B655C] leading-relaxed">
                    Stepping-stone and teak boardwalk bordered by tropical palms opens directly
                    onto the building&apos;s projecting curved eastern balcony overlooking the tree
                    canopy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mechanical Core Screening Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 border hairline-light bg-[#F5F1EB] p-7 md:p-9 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#1F1D1A]/18 bg-[#EAE3D9]/65 font-spec text-[9.5px] text-[#6B655C]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2F4838]" strokeWidth={1.25} />
                EXCLUDED UTILITY FOOTPRINT // ZERO RELOCATION COST
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[#1F1D1A] mt-5">
                How We Make the Central Mechanical Core{' '}
                <span className="italic text-[#2F4838]">Disappear.</span>
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#6B655C] leading-relaxed">
                The real satellite rooftop contains an active central-left HVAC &amp; utility core.
                Relocating rooftop chillers burns capital and delays timelines. Instead, we lock
                zero guest amenities inside that footprint and wrap all four edges in an
                architectural botanical enclosure.
              </p>

              {/* Architectural Screening Spec List */}
              <div className="mt-7 divide-y divide-[#1F1D1A]/12 border-y hairline-light">
                <div className="py-4 flex items-start gap-3.5">
                  <span className="font-spec text-[10px] text-[#B8935A] mt-0.5">01</span>
                  <div>
                    <h4 className="text-sm font-medium text-[#1F1D1A]">
                      Tall Dark-Teak Vertical Louver Screens
                    </h4>
                    <p className="text-xs text-[#6B655C] mt-1 leading-relaxed">
                      Continuous slatted privacy perimeter engineered for acoustic baffling and
                      free airflow to existing HVAC condensers.
                    </p>
                  </div>
                </div>

                <div className="py-4 flex items-start gap-3.5">
                  <span className="font-spec text-[10px] text-[#B8935A] mt-0.5">02</span>
                  <div>
                    <h4 className="text-sm font-medium text-[#1F1D1A]">
                      Lush Vertical Tropical Living Walls
                    </h4>
                    <p className="text-xs text-[#6B655C] mt-1 leading-relaxed">
                      Cascading ferns, pothos, and tropical foliage turn the south, east, and north
                      enclosure faces into a resort-grade green backdrop visible from the Gym and
                      Promenade.
                    </p>
                  </div>
                </div>

                <div className="py-4 flex items-start gap-3.5">
                  <span className="font-spec text-[10px] text-[#B8935A] mt-0.5">03</span>
                  <div>
                    <h4 className="text-sm font-medium text-[#1F1D1A]">
                      100% Uninterrupted Maintenance Access
                    </h4>
                    <p className="text-xs text-[#6B655C] mt-1 leading-relaxed">
                      Concealed louver service gate preserves full engineering access along the
                      western setback without technicians ever crossing guest decks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 p-4 bg-[#2F4838] text-[#F5F1EB] flex items-center gap-3.5">
              <Trees className="w-5 h-5 text-[#B8935A] shrink-0" strokeWidth={1.25} />
              <p className="text-xs leading-relaxed text-[#F5F1EB]/90">
                <strong className="font-medium text-[#F5F1EB]">Investor Takeaway:</strong>{' '}
                Architectural discipline over cosmetic fantasy—saving tens of lakhs in unnecessary
                MEP relocation while preserving seamless resort sightlines.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
