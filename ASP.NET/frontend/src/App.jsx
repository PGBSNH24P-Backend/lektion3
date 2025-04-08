import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const [chatInput, setChatInput] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const lastMessageId = useRef(0);

  useEffect(() => {
    lastMessageId.current = messages.length;
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(lastMessageId.current);
      fetch('http://localhost:5285/chat/' + lastMessageId.current)
        .then(res => res.json())
        .then(res => {
          //let newMessages = [...messages, ...res];
          setMessages(old => [...old, ...res]);

          // [message, ...res] => [[], {}, {}, {}]
          // [...messages, ...res] => [{}, {}, {}, {}]
        });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const sendMessage = () => {
    fetch('http://localhost:5285/chat', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        content: chatInput,
        userName: userName,
      })
    }).then(() => {
      setChatInput("");
    });
  };

  return (
    <>
      <div>
        {messages.map(message => {
          return <div>
            <span>{message.sentDateTime.toLocaleString()}</span>
            <p>{message.content}</p>
            <span>{message.userName}</span>
          </div>
        })}
      </div>

      <div>
        <label>Username</label>
        <input value={userName} onChange={event => setUserName(event.target.value)} />
      </div>
      <div>
        <label>Message</label>
        <input value={chatInput} onChange={event => setChatInput(event.target.value)} />
      </div>
      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default App
