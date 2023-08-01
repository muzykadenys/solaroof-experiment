import { MessageHandlerType } from "../../redux/reduxTypes";
import { StoreState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import "./messageHandler.scss";
import React, { useEffect, useRef, useState } from "react";
import { MESSAGEHANDLER_REMOVE_BY_ID } from "../../redux/redux_consts";

function MessageHandler() {
  const dispatch = useDispatch();
  const dispatchMessageHandlerRemoveById = (id: string) => {
    dispatch({ type: MESSAGEHANDLER_REMOVE_BY_ID, payload: id });
  };

  const state = useSelector((state: StoreState) => state);
  const messageHandler = state.messageHandler;

  const MessageElement = (el: MessageHandlerType) => {
    const onTimeOut = () => {
      dispatchMessageHandlerRemoveById(el.id);
    };

    useEffect(() => {
      setTimeout(onTimeOut, messageHandler.time);
    }, [el]);

    return (
      <>
        <div className="MessageHandlerSection_El" key={`MHE_${el.id}`}>
          {el.id}
        </div>
      </>
    );
  };

  return (
    <div className="MessageHandlerSection">
      {messageHandler.data.map((el: MessageHandlerType, index: number) => (
        <MessageElement {...el} key={`MH${index}`} />
      ))}
    </div>
  );
}

export default React.memo(MessageHandler);
