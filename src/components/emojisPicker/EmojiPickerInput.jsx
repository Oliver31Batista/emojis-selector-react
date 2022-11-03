
import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";

import styles from "./emojiPicker.module.scss";

export default function EmojiPickerInput() {
  const inputRef = useRef(null);
  return (
    <div className={styles.inputContainer}>
      <input ref={inputRef} />
      <EmojiPicker ref={inputRef} />
    </div>
  );
}
