import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ProductImage {
  alt: string;
  src: string;
  title: string;
}

interface ProductCarouselProps {
  images: ProductImage[];
}

export function ProductCarousel({ images }: ProductCarouselProps) {
  return (
    <div className="w-full px-8">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent
          className={`
            -ml-2
            md:-ml-4
          `}
        >
          {images.map((img, index) => (
            <CarouselItem
              className={`
                basis-full pl-2
                sm:basis-1/2
                md:basis-1/3 md:pl-4
                lg:basis-1/4
              `}
              key={index}
            >
              <div
                className={`
                  relative aspect-square overflow-hidden rounded-lg border
                  bg-muted
                `}
              >
                <Image
                  alt={img.alt}
                  className={`
                    object-cover transition-transform
                    hover:scale-105
                  `}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  src={img.src}
                />
                <div
                  className={`
                    absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60
                    to-transparent p-3
                  `}
                >
                  <p className="text-xs font-medium text-white">{img.title}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={`
            left-2
            md:-left-12
          `}
        />
        <CarouselNext
          className={`
            right-2
            md:-right-12
          `}
        />
      </Carousel>
    </div>
  );
}
