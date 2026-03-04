import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type Logo = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    logos: Logo[];
};

export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
    return (
        <div className={`relative w-full py-4 bg-background border-b border-border transition-colors duration-300 ${className}`} {...props}>
            <InfiniteSlider gap={60} reverse speed={60} speedOnHover={20}>
                {logos.map((logo) => (
                    <img
                        alt={logo.alt}
                        className="pointer-events-none h-6 select-none md:h-8 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale dark:brightness-0 dark:invert"
                        height="auto"
                        key={`logo-${logo.alt}`}
                        loading="lazy"
                        src={logo.src}
                        width="auto"
                    />
                ))}
            </InfiniteSlider>

            <ProgressiveBlur
                blurIntensity={2}
                className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
                direction="left"
            />
            <ProgressiveBlur
                blurIntensity={2}
                className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
                direction="right"
            />
        </div>
    );
}
