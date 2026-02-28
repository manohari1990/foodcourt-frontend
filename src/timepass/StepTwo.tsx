function StepTwo({ ref, next, prev }:any) {
  return (
    <div>
        <input
            defaultValue={ref.current['email'] || ''}
            onChange={(e) => ref.current['email'] = e.target.value}
            placeholder="Email"
        />
        <input
            defaultValue={ref.current['phone'] || ''}
            onChange={(e) => ref.current['phone'] = e.target.value}
            placeholder="Phone"
        />
      <button onClick={prev}>Back</button>
      <button onClick={next}>Next</button>
    </div>
  );
}

export default StepTwo