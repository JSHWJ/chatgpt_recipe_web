import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frame from "./pages/Frame";
import Frame2 from "./pages/Frame2";
import Frame3 from "./pages/Frame3";
import Frame4 from "./pages/Frame4";

function App() {
  // 사용자가 선택한 음식 정보를 상태로 관리
  const [ingredients, setIngredients] = useState([]); // 이름 변경
  const [recipe, setRecipe] = useState(""); // recipe 상태 추가

  const fetchRecipeFromAPI = async (selectedIngredients) => {
    try {
      console.log("일단 여기까지 1");
      const response = await fetch("http://localhost:5000/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });
      console.log("일단 여기까지 2");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const recipeData = await response.json();
      console.log("일단 여기까지 3");
      console.log("한번 해보자", recipeData);
      // 레시피 데이터를 사용하거나, Frame4로 전달
      setRecipe(recipeData); // 레시피 데이터를 상태로 업데이트
    } catch (error) {
      console.error("Error fetching recipe:", error); // 에러 메시지를 콘솔에 출력
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Frame ingredients={ingredients} setIngredients={setIngredients} />
          } // ingredients로 변경
        />
        <Route
          path="/frame2"
          element={
            <Frame2 ingredients={ingredients} setIngredients={setIngredients} />
          } // ingredients로 변경
        />
        <Route
          path="/frame3"
          element={
            <Frame3
              ingredients={ingredients}
              setIngredients={setIngredients}
              fetchRecipeFromAPI={fetchRecipeFromAPI}
            />
          }
        />
        <Route path="/frame4" element={<Frame4 recipe={recipe} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
