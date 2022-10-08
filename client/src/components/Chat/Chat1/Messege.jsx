import React from 'react'

function LeftMessage(props) {
  const {text, name, time} = props
  return (
    <div className="row no-gutters">
        <div className="col-md-8" style={{position: 'relative'}}>
            <div className="name-left">{name}</div>
            <div className="time-left">{time}</div>
            <div className="chat-bubble chat-bubble--left">
              {text}
            </div>
        </div>
    </div>
  )
}

function RightMessage(props) {
   const {text, name, time} = props
  return (
    <div className="row no-gutters">
        <div className="col-md-8 offset-md-4" style={{position: 'relative'}}>
            <div className="name-right">{name}</div>
        <div className="time-right">{time}</div>
            <div className="chat-bubble chat-bubble--right">
            {text}
            </div>
        </div>
    </div>
  );
}

export  { LeftMessage, RightMessage}