import { forwardRef, useEffect, useRef, useState } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./EmojiButton";

import styles from "./emojiPicker.module.scss";
import EmojiSearch from "./EmojiSearch";
import EmojiList from "./emojiList";

export default forwardRef((props, inputRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [emojis, setEmojis] = useState([...emojiList]);

  const containerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      //here we are validating that if we click on an element and it turns out to be the parent of our emoji layer, we are going to execute something,
      //and we will deny it because clicking on an emoji button will be true
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setEmojis([...emojiList]);
      }
    });
  }, []);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleOnClickEmoji(emoji) {
    const cursorPos = inputRef.current.selectionStart; //this will tell me the position of the cursor, and if I am selecting elements it will also bring me that position
    const text = inputRef.current.value;
    //Now, I need to know waht is before and after the cursor
    const prev = text.slice(0, cursorPos);
    const next = text.slice(cursorPos);

    inputRef.current.value = prev + emoji.symbol + next;
    inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
    inputRef.current.selectionEnd = cursorPos + emoji.symbol.length;
    inputRef.current.focus();
  }

  function handleSearch(e) {
    const query = e.target.value;

    if (!!query) {
      //if is not a empty string or something like this
      const search = emojiList.filter((emoji) => {
        return (
          emoji.name.toLowerCase().includes(query) ||
          emoji.keywords.toLowerCase().includes(query)
        );
      });

      setEmojis([...search]);
    } else {
      //If search is empty, with EMOJILIST which is an array that never changes, we will keep all emojis
      setEmojis([...emojiList]);
    }
  }
  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline" }}>
      <button className={styles.emojiPickerButton} onClick={handleClick}>
        😊
      </button>
      {isOpen ? (
        <div className={styles.emojiPickerContainer}>
          <EmojiSearch onSearch={handleSearch} />
          <EmojiList>
            {emojis.map((emoji) => (
              <EmojiButton
                key={emoji.symbol}
                emoji={emoji}
                onClick={handleOnClickEmoji}
              />
            ))}
          </EmojiList>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});