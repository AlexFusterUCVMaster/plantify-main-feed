import { Sprout, Sparkles, Leaf } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lilac via-background to-peach py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute left-10 top-10 animate-pulse">
        <Leaf className="h-8 w-8 rotate-12 text-tea-green opacity-40" />
      </div>
      <div className="absolute right-16 top-20 animate-pulse delay-300">
        <Sparkles className="h-6 w-6 text-grape opacity-30" />
      </div>
      <div className="absolute bottom-10 left-1/4 animate-pulse delay-500">
        <Sprout className="h-10 w-10 -rotate-12 text-secondary opacity-30" />
      </div>
      <div className="absolute bottom-16 right-1/3 animate-pulse delay-700">
        <Leaf className="h-7 w-7 rotate-45 text-primary opacity-25" />
      </div>

      <div className="container relative mx-auto px-4 text-center md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="font-display text-sm font-semibold text-primary">
              Your botanical sanctuary
            </span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
            Grow your green{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">community</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 5 100 2 198 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-grape opacity-40"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Share your plant journey, discover care tips from fellow plant
            parents, and watch your botanical community bloom 🌿
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group rounded-full bg-gradient-to-r from-primary to-grape px-8 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Start Exploring
              <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-primary/20 bg-white/80 px-8 text-base font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:border-primary/40"
            >
              Learn More
            </Button>
          </div>

          {/* Fun stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm">
              <div className="font-display text-3xl font-bold text-grape">
                12K+
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Plant Parents
              </div>
            </div>
            <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm">
              <div className="font-display text-3xl font-bold text-primary">
                50K+
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Plants Shared
              </div>
            </div>
            <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm">
              <div className="font-display text-3xl font-bold text-tea-green">
                100+
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Plant Species
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
