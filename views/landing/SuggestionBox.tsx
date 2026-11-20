
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export const SuggestionBox = () => {
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1700);
    setSuggestion("");
  };

  return (
    <div className="w-full max-w-md mx-auto mb-10 mt-8 relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-white dark:bg-[#181829] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 shadow-md"
        style={{minHeight: "48px"}}
      >
        <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-300 mr-1 shrink-0" />
        <input
          type="text"
          className="flex-1 bg-transparent focus:outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 text-sm"
          placeholder="Suggest a feature or workflow…"
          value={suggestion}
          onChange={e => setSuggestion(e.target.value)}
          maxLength={120}
          disabled={submitted}
          required
        />
        <button
          type="submit"
          disabled={submitted}
          className="ml-1 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-xs text-white font-bold shadow transition"
          style={{minWidth: 70}}
        >
          {submitted ? "Thanks!" : "Send"}
        </button>
      </form>
    </div>
  );
};
