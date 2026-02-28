function StepThree({ ref, prev, handleSubmit }:any) {

//   const handleSubmit = async () => {
//     console.log("Submitting all data to server...", JSON.stringify(ref.current));
//     // await fetch('/api/save', { method: 'POST', body: JSON.stringify(data) });
//     alert("Form Submitted Successfully!");
//   };

  return (
    <div>
      <input
            defaultValue={ref.current['city'] || ''}
            onChange={(e) => ref.current['city'] = e.target.value}
            placeholder="city"
        />
        <input
            defaultValue={ref.current['zip'] || ''}
            onChange={(e) => ref.current['zip'] = e.target.value}
            placeholder="zip"
        />
      <button onClick={prev}>Back</button>
      <button onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white' }}>
        Final Submit
      </button>
    </div>
  );
}

export default StepThree