import React from "react";

const PolicyRow = React.memo(({ policy, onSelect }: any) => {
  console.log("Rendering:", policy.id);

  return (
    <div className="row">
      <span>{policy.name}</span>
      <span>{policy.status}</span>
      <button onClick={() => onSelect(policy.id)}>View</button>
    </div>
  );
});

export default PolicyRow;