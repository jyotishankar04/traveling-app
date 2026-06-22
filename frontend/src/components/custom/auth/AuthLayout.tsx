const images: Record<string, string> = {
  login: "https://images.pexels.com/photos/2507016/pexels-photo-2507016.jpeg",
  register: "https://images.pexels.com/photos/12652920/pexels-photo-12652920.jpeg",
  verify: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  forgot: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
  reset: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
}

export function AuthLayout({ imageKey = "login", headline = "", children }: { imageKey?: string; headline?: string; children: React.ReactNode }) {
  const img = images[imageKey] || images.login
  return (
    <div className="flex min-h-screen bg-background">
      <div className="relative hidden w-1/2 lg:block">
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        {headline && (
          <div className="absolute bottom-16 left-12 right-12">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">{headline}</h2>
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-6 py-12">{children}</div>
      </div>
    </div>
  )
}
