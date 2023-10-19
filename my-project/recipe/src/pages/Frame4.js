import React from "react";
import "./Frame.css";

const Frame4 = ({ recipe }) => {
  return (
    <>
      <div className="frame4_div">
        <h2>레시피 생성 결과</h2>
      </div>

      <div className="frame4_div_content">
        <div className="pre-container">
          <pre className="pre">{recipe.recipe}</pre>
        </div>
      </div>
    </>
  );
};

export default Frame4;
