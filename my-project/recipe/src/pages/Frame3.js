import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Frame.css";
import img from "../img/hot-pot.png";

const Frame3 = ({ ingredients, setIngredients, fetchRecipeFromAPI }) => {
  const [customIngredients, setCustomIngredients] = useState([]); // 직접 입력한 음식 목록
  const [selectedFoods, setSelectedFoods] = useState([]); // 선택한 음식 목록
  const [customFood, setCustomFood] = useState(""); // 사용자 지정 입력을 저장할 상태
  const history = useNavigate(); // React Router의 history 객체를 가져옴

  const handleCustomFoodChange = (event) => {
    const value = event.target.value.trim();
    setCustomFood(value); // 사용자 지정 입력을 업데이트
  };

  const handleAddClick = () => {
    if (customFood !== "") {
      if (customIngredients.length >= 4) {
        alert("4개 이상 추가할 수 없습니다.");
      } else {
        setCustomIngredients([...customIngredients, customFood]);
        setCustomFood(""); // 사용자 지정 입력을 추가하고 초기화
      }
    }
  };
  const handleNextClick = async () => {
    if (selectedFoods.length === 0 && customIngredients.length === 0) {
      alert("최소한 하나의 음식을 선택하거나 직접 입력해야 합니다.");
    } else {
      try {
        console.log("레시피 생성 요청 전이에용");

        // frame1 및 frame2에서 선택한 ingredients와 frame3에서 선택한 재료(selectedFoods)를 합침
        const allIngredients = [...ingredients, ...selectedFoods];

        // 레시피 생성 요청을 보냄
        await fetchRecipeFromAPI(allIngredients);

        console.log("레시피 생성 요청 완료");

        // 다음 페이지로 이동
        history("/frame4");
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }
  };

  const toggleFoodSelection = (food) => {
    if (selectedFoods.includes(food)) {
      // 이미 선택된 음식인 경우, 선택 해제
      setSelectedFoods(selectedFoods.filter((selected) => selected !== food));
    } else {
      // 선택한 음식을 선택
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const allIngredients = [
    "소금",
    "후추",
    "치즈",
    "간장",
    "된장",
    "버터",
    "쯔유",
    "레몬즙",
    "고추장",
    "참기름",
    "라면스프",
    "고춧가루",
    ...customIngredients,
  ]; // 사용자 정의 입력을 기존 목록과 함께 표시

  return (
    <div className="frame-parent">
      <div className="parent">
        <div className="div">자취생 레시피</div>
        <div className="frame">
          <img className="hot-pot-3-1" alt="" src={img} />
        </div>
      </div>
      <div className="frame1">
        <div className="frame-group">
          <div className="frame2">
            <b className="b">{`보조재료`}</b>
            <div className="frame3">
              <div className="frame-container">
                {allIngredients.map((ingredient, index) => (
                  <div
                    className={`wrapper ${
                      selectedFoods.includes(ingredient) ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => toggleFoodSelection(ingredient)}
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
              <div className="frame4">
                <div className="frame-child">
                  <input
                    type="text"
                    className="frame-input4"
                    placeholder="추가할 음식 입력"
                    onChange={handleCustomFoodChange}
                    value={customFood}
                  />
                  <div className="input-button" onClick={handleAddClick}>
                    Add
                  </div>
                  <div className="next-page generate" onClick={handleNextClick}>
                    레시피 생성
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frame3;
