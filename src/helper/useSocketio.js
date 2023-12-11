import { useState, useEffect } from "react";
import MySocketFactory from "./socketio";

export function useSocketIO(onChange) {
  const [hasError, setHasError] = useState(false);
  const [hasConnect, setHasConnect] = useState(false);
  useEffect(() => {
    let socket = null;
    const _onChangeSockerIO = (data) => {
      // console.log("_onchange");
      const result = MySocketFactory.preprocessData(data);
      try {
        onChange(result);
      } catch (error) {
        alert(error);
        setHasError(true);
      }
    };
    try {
      socket = MySocketFactory.getSocket();
      console.log("socket connect");
      if (socket.connected) setHasConnect(true);
      socket.on("change", _onChangeSockerIO);
    } catch (error) {
      alert(error);
      setHasError(true);
    }

    return () => {
      console.log("socket clear");
      if (socket) {
        socket.off("change", _onChangeSockerIO);
        // MySocketFactory.clearSocket();
      }
    };
  }, []);
  return [hasError, hasConnect];
}
