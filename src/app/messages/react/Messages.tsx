import React, { FC, useEffect, useState } from 'react'
import { ReplaySubject } from 'rxjs';

export const Messages: FC<{ clear: () => void, messages: ReplaySubject<string> }> = ({ clear, messages }) => {
  const [allMessages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;
    messages.subscribe(message => {
      if (!ignore) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => { ignore = true }
  }, []);

  const handleClick = () => {
    clear();
    setMessages([]);
  }

  return allMessages.length > 0 && <div><h2>Messages</h2>
    <button type="button"
      className="clear"
      onClick={handleClick}>
      Clear messages</button>
    {allMessages.map((message, index) => {
      return <div key={index}>{message}</div>;
    })}
  </div>;
}
