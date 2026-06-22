interface GalleryGridProps {
  images: string[]
  alt: string
}

export function GalleryGrid({ images, alt }: GalleryGridProps) {
  const [main, ...thumbs] = images

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:grid-rows-2">
      <div className="md:col-span-2 md:row-span-2">
        <img
          src={main}
          alt={alt}
          className="size-full min-h-[300px] rounded-2xl object-cover md:min-h-[400px]"
        />
      </div>
      {thumbs.slice(0, 3).map((img, i) => (
        <div key={i} className="hidden overflow-hidden rounded-2xl md:block">
          <img
            src={img}
            alt={`${alt} ${i + 2}`}
            className="size-full min-h-[192px] object-cover"
          />
        </div>
      ))}
    </div>
  )
}
