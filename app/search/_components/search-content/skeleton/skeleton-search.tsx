
/**
 * Skeleton component for search list
 * Independent because data array is possible to be empty
 */
export function SkeletonSearch() {
    return Array.from({ length: 10 }).map((_, index) => (
      <div key={index} role="status" className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 animate-pulse">
        <div className="bg-gray-200 h-10 w-10 rounded" />
        <div className="bg-gray-200 rounded-full h-4 w-20" />
        <div className="bg-gray-200 rounded-full h-4 w-40" />
      </div>
    ))  
  }