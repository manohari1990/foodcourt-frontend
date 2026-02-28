import { useReducer, useEffect, useRef } from 'react';

const initialState = {
  isRunning: false,
  time: 0,
};

function reducer(state: any, action:any) {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true };
    case 'STOP':
      return { ...state, isRunning: false };
    case 'RESET':
      return { isRunning: false, time: 0 };
    case 'TICK':
      return { ...state, time: state.time + 1 };
    default:
      return state;
  }
}

export default function Timer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef(undefined);

  useEffect(() => {
    console.log(timerRef)
    // if (state.isRunning) {
    //   timerRef.current = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    // } else {
    //   clearInterval(timerRef.current);
    // }
    // return () => clearInterval(timerRef.current);
  }, [state.isRunning]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{state.time}s</h1>
      <button onClick={() => dispatch({ type: 'START' })}>Start</button>
      <button onClick={() => dispatch({ type: 'STOP' })}>Stop</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}