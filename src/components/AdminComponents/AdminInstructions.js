import React from "react";

function AdminInstructions() {
  return (
    <div className="instructions-page-container">
      <div className="admin-title">INSTRUCTIONS</div>
      <div className="instructions-content-container">
        <div className="instructions-content">
          <div className="instructions-title">How do I remove an animal?</div>
          <div className="instructions-text">
            Click edit animal, locate the animal you want to remove click the
            <span className="iconify-inline" data-icon="akar-icons:circle-x-fill" data-width="30"></span>
            icon beside the animal
          </div>
          <div className="instructions-title">What do I put for the breed of cat?</div>
          <div className="instructions-text">NA - which stands for Non Applicable</div>
        </div>
      </div>
    </div>
  );
}

export default AdminInstructions;
