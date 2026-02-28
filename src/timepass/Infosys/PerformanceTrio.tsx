// Prevent Unnecessary Re-renders
// Optimize component performance


import React, {useState, useMemo, useCallback} from 'react'
const ExpensiveList = React.memo(({data, itemClicked}:any) => {
    console.log("Child Rendering...")
    return (
        <ul>
        {data.map((item:any) => (
            <li key={item.id} onClick={() => itemClicked(item.id)}>{item.name}</li>
        ))}
        </ul>
    )
})

function PerformanceTrio(){
    const [count, setCount] = useState(0)
    const [itemValue, setItemValue] = useState('')
    const [items, setItems] = useState([{ id: 1, name: 'Apple' }, { id: 2, name: 'Orange' }]);

    const processedData = useMemo(()=>{
        return items.map(item=>({...item, name: item.name.toUpperCase()}))
    },[items])

    const handleItemClick = useCallback((id:number)=>{
        console.log(id)
    },[])



    return (
        <>
        <h1>Count: {count}</h1>
        <button onClick={()=>setCount(c=>c+1)}>Incre</button>

        <input type='text' name='item_name' value={itemValue} onChange={(e)=>setItemValue(e.target.value)} />
        <button onClick={()=> setItems(prev=> { return [...prev, {id: (items.length+1), name: itemValue}] })}>Add Item</button>

        <ExpensiveList data={processedData} itemClicked = {handleItemClick} />
        </>
    )

}


export default PerformanceTrio