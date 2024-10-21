import React, { useState } from "react";

const RecipeGenerator = () => {

  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("any");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [loading, setLoading] = useState(false); 
  const [recipe, setRecipe] = useState("");
  const [copySuccess, setCopySuccess] = useState('');

  const createRecipe = async () => {
    try {
      setLoading(true); 
      setRecipe('');
      const response = await fetch(
        `http://localhost:8080/api/recipe-creator?ingredients=${ingredients}&cuisine=${cuisine}&dietaryrestrictions=${dietaryRestrictions}`
      );

      const data = await response.text();
      console.log(data);
      setRecipe(data);
      setCopySuccess('');
    } 
    catch (error) {
      console.error("Error in Generating Recipe : ", error);
      setRecipe('Error in fetching response');
    }
    finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (recipe) {
      navigator.clipboard.writeText(recipe);
      setCopySuccess('Response copied!');
    }
  };


  return (
    <div className="tab-content">
      <h2>Create Recipe</h2>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (comma Seperated)"
      />

      <input
        type="text"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        placeholder="Enter Cuisine Type"
      />

      <input
        type="text"
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        placeholder="Enter Dietary restrictions"
      />

      <button onClick={createRecipe}>Create Recipe</button>


      <div className='output'>
        {loading ? (
          <div className='loading-message'>Loading response, please wait...</div>
        ) : (
          <>
            {recipe}
            {recipe && (
              <div className='copy-section'>
                <button onClick={copyToClipboard} className="copy-button">
                  Copy
                </button>
                {copySuccess && <span className="copy-success">{copySuccess}</span>}
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default RecipeGenerator;
