export const Loader = () => {
  return (
    <div
      className="flex w-full justify-center items-center bg-white px-3 py-1 text-sm text-neutral-950 transition-colors"
      disabled=""
    >
      <div className="h-3 w-3 animate-spin rounded-full border-2 border-solid border-neutral-950 border-t-transparent text-3xl"></div>
      <span className="ml-1">Loading...</span>
    </div>
  );
};
