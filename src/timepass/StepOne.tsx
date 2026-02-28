
function StepOne({ ref, next }:any) {
    return (
        <div>
            <input
                defaultValue={ref.current['firstName'] || ''}
                onChange={(e) => ref.current['firstName'] = e.target.value}
                placeholder="First Name"
            />
            <input
                defaultValue={ref.current['lastName'] || ''}
                onChange={(e) => ref.current['lastName'] = e.target.value}
                placeholder="Last Name"
            />
            <button onClick={next}>Next</button>
        </div>
    );
}

export default StepOne