import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
  console.log("PLAYER COMPONENT");

  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((prevEditingValue) => !prevEditingValue);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
    // console.log(event.target.value);
  }
  let editPlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editPlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}