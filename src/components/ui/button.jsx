export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
        props.disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-[#61a183] hover:bg-[#51996f]"
      } ${className}`}
    >
      {children}
    </button>
  );
}
