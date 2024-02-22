import React from "react";
import "./RybyForm.css";

function RybyForm({ data, onChange, validation, onAdd }) {
  return (
    <div className="Ryby-form">
      <input
        type="text"
        placeholder="jméno ryby"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <select
        placeholder="velikost ryby"
        name="size"
        value={data.size}
        onChange={onChange}
      >
        <option value="malá">malá</option>
        <option value="velká">velká</option>
      </select>

      <button disabled={!validation} onClick={onAdd}>
        Přidat
      </button>
    </div>
  );
}

export default RybyForm;
