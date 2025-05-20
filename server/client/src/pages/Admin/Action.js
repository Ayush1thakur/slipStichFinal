import React, { useState, useEffect } from 'react';
import { ImCross } from "react-icons/im";

const Action = ({ type, category, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (type === "edit" && category) {
      setInputValue(category.name);
    }
  }, [type, category]);

  return (
    <div className="acCont">
      <div className="act">
        <ImCross onClick={onClose} className="close-icon" />
        <div className="actDataCont">
          {type === "edit" ? (
            <>
              <h3>Edit Category</h3>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="form-control"
              />
              <button className='catBtn tone-down' onClick={() => onConfirm(inputValue)}>Update</button>
            </>
          ) : (
            <>
              <h3>Delete Category</h3>
              <p>Are you sure you want to delete <strong>{category.name}</strong>?</p>
              <button className='catBtn tone-down' onClick={onConfirm}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Action;
