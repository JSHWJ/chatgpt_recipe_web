// app.js

require("dotenv").config();
const { API_KEY } = process.env;
const OpenAI = require("openai");
// 나머지 코드는 그대로 둡니다.

const openai = new OpenAI({
  apiKey: API_KEY,
});

const express = require("express");
const app = express();


const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000", // 허용할 프론트엔드 도메인
};

app.use(cors(corsOptions));

app.use(express.json());

app.post("/api/recipe", async (req, res) => {
  try {
   
    const { ingredients } = req.body;

    const ingredientsString = ingredients.join(", ");

   
    console.log(
      "Request to OpenAI: Create a recipe using ingredients: ",
      ingredientsString
    );


    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
          음식 요리 레시피를 찾아주시는데 다음 재료 '${ingredientsString}' 중에서 선택하여 만들 수 있는 레시피를 하나 알려주세요. 제외한 재료 외에 3가지 이하의 가격이 2만원을 넘지 않는 재료를 추가로 사용하고, 레시피북에 흔히 포함된 요리 레시피여야 합니다. 엉뚱한 재료나 사람이 먹을 수 없는 재료를 사용하지 않도록 주의해주세요. 만약 엉뚱한 재료가 사용되었다면, 그 재료를 알려주시면서 '이 재료는 음식으로 사용되지 않는 재료 입니다'라고 알려주세요. 또한, 제시한 재료를 모두 사용할 필요가 없으며, 레시피에 사용된 재료의 계량을 포함하여 부연 설명 없이 레시피 제목과 구체적인 재료 계량과 구체적인 요리 레시피만을 제공해주세요! 꼭 구체적으로 설명해주세요`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(response.choices[0]);

    const recipe = response.choices[0].message.content;

    //const recipe = response.completion.choices[0].message.content;

    console.log("Response from OpenAI: Recipe created: ", recipe);

   
  } catch (error) {
    console.error("Error fetching recipe from OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
