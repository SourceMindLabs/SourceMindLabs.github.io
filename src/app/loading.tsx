export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-main mb-4"></div>
        <p className="text-body font-body text-neutral-medium">Loading...</p>
      </div>
    </div>
  )
} 