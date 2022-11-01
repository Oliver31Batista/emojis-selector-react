import { forwardRef, useState } from "react";
import { data as emojiList } from "./data";

export function EmojiPicker(props, inputRef) {
  const [isOPen, setIsOpen] = useState(true);
  const [emojis, setemojis] = useState(emojiList);

  function EmojiPickerContainer() {
    return (
      <div>
        <input />
        <div>
          {emojiList.map((emoji) => (
            <div>{emoji.symbol}</div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <button>🦦 </button>
      {isOPen ? <EmojiPickerContainer /> : ""}
    </div>
  );
}

export default forwardRef(EmojiPicker);
