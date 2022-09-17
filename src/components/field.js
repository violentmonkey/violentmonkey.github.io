import React from 'react';

export function Field({ name, type, defaultValue, isDefault, comment }) {
  return (
    <span>
      <strong>{name}</strong>: <span className="italic text-gray-500">{type}</span>
      {defaultValue && <span className="text-green-600"> = {defaultValue}</span>}
      {isDefault && <span className="ml-2 text-green-600">:point-left: default</span>}
      {!!comment && <span className="ml-2">- {comment}</span>}
    </span>
  )
}
