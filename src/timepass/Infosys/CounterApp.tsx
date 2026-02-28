// Counter App
// Create a counter with Increment, Decrement, Reset
// Disable Decrement if count is 0

// Time took to write this: 5 minutes

import {useState} from 'react'

const CounterApp = () =>{
    const [count, setCount] = useState(0)
    return (
        <>
            <button onClick={() => setCount(c=>c+1)}>Increment</button>
            <p>{count} <button onClick={() => setCount(0)}>Reset</button></p>
            <button onClick={() => setCount(c=>c-1)} disabled={count == 0}>Decrement</button>
        </>
    )
}

export default CounterApp

