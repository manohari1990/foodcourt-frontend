// Create a form and explain controlled component

import {useState} from 'react'

function  ControlledAndUncontrolled(){
    const [count,setCount] = useState(0)
    const [print,setPrint] = useState(0)
    const handleSubmit = (e:any) =>{
        e.preventDefault()
        setPrint(count)
    }

    return (
        <>
            <p>{print}</p>
            <form onSubmit={handleSubmit}>
                <input type='text' name='counter' value={count} onChange={(e)=>setCount(Number(e.target.value))} />
                <button key={'button'} onClick={()=>setCount(c=>c+1)}>Increment</button>
            </form>
        </>
    )
}

export default ControlledAndUncontrolled

