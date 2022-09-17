import React from 'react';

export function Label({ name }) {
  return <span className="label">{name}</span>;
}

export function LabelGroup({ names }) {
  return (
    <p>
      {names.map((name, i) => (
        <Label key={i} name={name} />
      ))}
    </p>
  );
}
