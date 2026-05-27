import { useEffect, useRef, useState } from "react"

export default function App(){
  const [socket,setSocket] = useState();
  //@ts-ignore
  const inputRef = useRef();
  function sendMessage(){
    if(!socket){
      return;
    }
    //@ts-ignore
    const message = inputRef.current.value;
    //@ts-ignore
    socket.send(message);
  }
   
//we are using use effect here
// Because:
// You usually want the socket connection to start when the component mounts.
// You want to avoid creating a new connection on every render.
// You need cleanup when the component unmounts.
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    //@ts-ignore
    setSocket(ws);
    ws.onmessage = (ev) => {
      alert(ev.data);
    }
  },[])
  return(
    <div>
      {/* @ts-ignore */}
      <input ref={inputRef} type="text" placeholder="message...."></input>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}