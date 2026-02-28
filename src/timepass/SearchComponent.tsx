import { useState, useTransition, useEffect, useMemo, useLayoutEffect } from 'react';

function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);

  let now = performance.now()
  while(performance.now() - now < 200){
    // do nothing
  }
  
  useEffect(() =>{
    console.log("test")
    
  },[query])

  useLayoutEffect(()=>{
    console.log("layout")
  },[query])

  const test = useMemo(()=>{
    console.log("useMemo")
    return {data:"test"}
  }, [query])

  const handleChange = (e:any) => {
    // Urgent: Update input field immediately
    setQuery(e.target.value);

    // Non-urgent: Update the list in the background
    startTransition(() => {
      const hugeList:any = Array.from({ length: 100 }, (_, i) => `${e.target.value} ${i}`);
      setList(hugeList);
    });
  };

  return (
    <div>
        {test.data}
      <input type="text" value={query} onChange={handleChange} />
      {isPending && <p>Updating list...</p>}
      {list.map((item, index) => <div key={index}>{item}</div>)}
    </div>
  );
}


export default SearchComponent