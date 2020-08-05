class Controller{
    constructor(questionsArray, button, div){
        this.questionsArray = questionsArray;
        this.button = button;
        this.div = div;
    }

    // makes the start game button and hands over control to startToggle.
    startControl(){
        const startView = new View();
        startView.viewAppender(startView.viewMaker(button), buttonDiv);
        this.startToggle();
    }

    
    // sets up the first instance of the game, before it has been restarted.
    defaultControl(){
        const jeopardyModel = new Model();
        $("#table-toggle").attr('disabled','');
        jeopardyModel.apiGetter(apiObject, questionsArray);
        document.querySelector("#table-toggle").innerText="Restart Game";
        let i = 0;
        while(!tableHeadingsObject.headingsArray){
            setInterval(()=>{
                if(tableHeadingsObject.headingsArray && i === 0){
                    const pageView = new View();
                    pageView.viewAppender(pageView.headingsMaker(tableHeadingsObject), div);
                    pageView.rowsMaker(questionsArray);
                    this.clickInteraction(questionsArray);
                    i = 1;
                    return 1;
                }
            },10);
            break;
        }
    }


    // check to see if there is a previous instance of the game in memory, if so
    // clears those variables, and the view and refreshes the API. If not, calls 
    // defaultControl via the else condition to set up the view.
    startToggle(){
        document.getElementById("table-toggle").addEventListener("click", ()=>{
            if (questionsArray.length > 0){
                questionsArray = [];
                categoriesArray = [];
                tableHeadingsObject.headingsArray = [];
                const b = document.querySelector('body');
                b.innerHTML='';
                const startView = new View();
                startView.viewAppender(startView.viewMaker(button), buttonDiv);
                const jeopardyModel = new Model();
                jeopardyModel.apiGetter(apiObject, questionsArray);
                let i = 0;
                while(tableHeadingsObject.headingsArray){
                    $("#table-toggle").attr('disabled','');
                    setInterval(()=>{
                        if(tableHeadingsObject.headingsArray.length > 0 && i === 0){
                            const pageView = new View();
                            console.log(pageView.viewAppender(pageView.headingsMaker(tableHeadingsObject), div));
                            pageView.rowsMaker(questionsArray);
                            this.clickInteraction(questionsArray);
                            i = 1;
                            return 1;
                        }
                    },10);
                    break;
                }
                if (questionsArray.length > 0){
                    $("#table-toggle").removeAttr('disabled');
                }
                document.querySelector("#table-toggle").innerText="Restart Game";
                this.startToggle();
            }
            else {
                this.defaultControl();
            }
        });
    }


    // creates the click interactions; uses a key numberOfClicks and updates the view based
    // on chnages to its value.
    clickInteraction(questionsArray){
        $("#table-toggle").removeAttr('disabled');
        document.getElementById("gameView").addEventListener("click",
            (e)=>{
                if(e.target.classList.contains("cell")){
                    const n = parseInt(e.target.id);
                    const clickedQuestion = questionsArray[e.target.cellIndex][n];
                    clickedQuestion.numberOfClicks++;
                    if (clickedQuestion.numberOfClicks === 1){
                        e.target.innerText = clickedQuestion.question;
                    }
                    if (clickedQuestion.numberOfClicks === 2){
                        e.target.innerHTML = clickedQuestion.answer;
                    }
                }
            });
        }
    }


// creates an instance of the game.
const control = new Controller();
control.startControl();
