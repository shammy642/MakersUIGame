import Copied from "./Copied";
import Clipboard from "./Clipboard";

export const CopyToClipboardButton = ({ content, isCopied, setIsCopied }) => {
  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      console.log("Copied to clipboard:", content);
    } catch (error) {
      setIsCopied(false);
      console.error("Unable to copy to clipboard:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center bg-black text-white shadow-md p-3 rounded-md">
        <div data-testid="game-link" className="mr-3">{content}</div>
        <button
          onClick={() => copyToClipboard(content)}
          className="text-white focus:outline-none"
        >
          {isCopied ? <Copied /> : <Clipboard />}
        </button>
      </div>
    </div>
  );
};

