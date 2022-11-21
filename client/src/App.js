import "./App.css";
import io from "socket.io-client";
import { useRef, useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");
  const messageRef = useRef();

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [personal, setPersonal] = useState([]);
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

 
    
  const scrollToBottom = () => {
    if(messageRef.current){
    messageRef.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
    });
  }
};

useEffect(() => {
  scrollToBottom()
  
}, [message])
    

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    setPersonal((prevM) => [
      ...prevM,message]);
      scrollToBottom()
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prevM) => [
        data.message]);
       
    });
    console.log("Received message")
  }, [socket]);
  return (
    <div className="App">
      <header>

<div className="header">
    Hey
</div>

      </header>

      <div className="room">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      </div>
      <div className="room">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      </div>
      
<div className="box">
      {
      
      messageReceived.map((message) =>{

        
        return <div ref={messageRef} id="r1" class="bubbleWrapper">
        <div class="inlineContainer">
          
          <div class="otherBubble other">
            {message}
          </div>
        </div>
        <span class="other">08:41</span>
      </div>;
      
      })
    }
    {
      
      personal.map((message) =>{

        
        return 	<div ref={messageRef} id="r2" class="bubbleWrapper">
        <div class="inlineContainer own">
          
          <div class="ownBubble own">
          {message}
          </div>
        </div><span class="own">11:07</span>
      </div>
      ;
      
      })
    }
    </div>
    <div className="footer">
<input type="text" placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}/>
<button onClick={sendMessage}>Send</button>

    </div>
    </div>
  );
}

export default App;