class Model{
    constructor(apiObject, questionsArray){
        this.apiObject = apiObject;
        this.questionsArray = questionsArray;
        this.categoriesArray = categoriesArray;
        this.retcount = 0;
    }


    // builds an array of questions of random categorues via calling the API.
    // Also builds a headings array and assigns it to the tableHeadingsObject.
    async apiGetter(apiObject, questionsArray){
            if(questionsArray.length < apiObject.categoryAmt){
                const curl = apiObject.apiLink+this.categoryIdGenerator(apiObject);
                const response = await axios.get(curl);
                questionsArray.push(this.arraySizer(response, apiObject));
                this.apiGetter(apiObject, questionsArray);
            }
        if (questionsArray.length === apiObject.categoryAmt && this.retcount === 0){
            this.retcount = 1;
            Object.assign(tableHeadingsObject, {headingsArray: this.catsBuilder(apiObject, questionsArray, categoriesArray)});
            console.log(tableHeadingsObject);
            return {
                questionsArray
            }
        } 
    }


    // builds an array of categories from the API retrived into the questions array.
    catsBuilder(apiObject, questionsArray, categoriesArray){
        for (let i = 0; i < apiObject.categoryAmt; i++){
            categoriesArray.push(questionsArray[i][0].category.title);
        }
        return categoriesArray;
    }


    // reduces the size of the category questions to 5, per api Object.
    // adds a key value pair to the array object for question values.
    arraySizer(array, apiObject){
        const interimArray = [];
        for(let i = 0; i < apiObject.questionAmt; i++){
            Object.assign(array.data[i], {numberOfClicks: 0});
            Object.assign(array.data[i], {value: (i+1) * 100});
            interimArray.push(array.data[i]);
        }
            return interimArray;
    }

    // creates a random categoryID.
    categoryIdGenerator(object){
       return Math.floor(Math.random() * Math.floor(object.oneAboveMaxCategoryId));
    }
}
// variable declarations used to instantiate classes. 
const apiObject = {
    apiLink:"http://www.jservice.io/api/clues?&category=",
    categoryId: 0,
    oneAboveMaxCategoryId: 18419,
    categoryAmt: 6,
    questionAmt: 5
}

let questionsArray = [];
let categoriesArray = [];

