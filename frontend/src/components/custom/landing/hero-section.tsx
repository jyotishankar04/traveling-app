import HeroSearch from "./hero-search";

const HERO_IMAGE =
  "https://images.pexels.com/photos/12652920/pexels-photo-12652920.jpeg"

const HeroSection = () => {
  return (
    <section className="pt-28 pb-14">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="relative overflow-hidden rounded-[2rem] min-h-[540px] lg:min-h-[600px]">
          <img
            src={HERO_IMAGE}
            alt="Luxury hotel pool at sunset"
            className="absolute inset-0 size-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          <div className="relative z-10 flex h-full min-h-[540px] lg:min-h-[600px] flex-col justify-between px-8 py-10 lg:px-14 lg:py-14">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/90 backdrop-blur-sm uppercase">
                Luxury stays around the world
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Find Your Perfect Stay
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Curated stays. Unforgettable experiences. Handpicked hotels, villas, apartments, resorts and cottages.
              </p>
            </div>

            <div className="mt-8 lg:mt-0">
              <HeroSearch />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
