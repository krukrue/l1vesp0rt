interface SearchErrorProps {
  error: Error;
  onRetry: () => void;
}

export function SearchError({ error, onRetry }: SearchErrorProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <p className="text-center text-red-600">
        {error instanceof Error ? error.message : "Something went wrong"}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        Try again
      </button>
    </div>
  );
}
