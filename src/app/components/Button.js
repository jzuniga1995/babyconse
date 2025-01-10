export default function Button({ text, onClick, className }) {
    return (
      <button
        className={`px-6 py-2 text-white font-semibold rounded transition-all ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
  