class View{
    constructor(tableHeadingsObject, questionsArray, arrayObject){
        this.tableHeadingsObject = tableHeadingsObject;
        this.questionsArray = questionsArray;
        this,arrayObject = arrayObject;

    }


    // makes html elements based on input object's keys and values.
    viewMaker(element){
            const valueAdd = $(document.createElement(element.type));
            valueAdd.attr('src', element.src);
            valueAdd.attr('id',element.id);
            valueAdd.text(element.text);
            valueAdd.attr('placeholder', element.placeholder);
            valueAdd.attr('aria-label', element.ariaLabel);
            valueAdd.attr('aria-describedby', element.ariaDescribedby);
            valueAdd.addClass(element.class);
        return valueAdd;
        }


    // builds the headings section of a bootstrap bordered table.
    headingsMaker(tableHeadingsObject){
        let tableHeadings = $(`
        <table id = "table" class="table table-bordered">
            <thead id="head">
                <tr id="category">
                </tr>
            </thead>
        </table>
            `);
        $('body').append(tableHeadings);
        for (let element = 0; element < tableHeadingsObject.headingsArray.length; element++){
            let tableHeading = $(`
                <th class="text-center text-uppercase text-white p-3" scope="col">${tableHeadingsObject.headingsArray[element]}</th>
            `);
        $("#category").append(tableHeading);
        }
        return tableHeadings;
    }


    // bulds the rows from the questionsArray.
    rowsMaker(questionsArray){
        let tableBody = $(`
            <tbody id="table-body">
            </tbody>
        `);
        $('#table').append(tableBody);
        for (let rowFill = 0; rowFill < questionsArray[0].length; rowFill++){
            let tableRow = $(`<tr id=${rowFill}></tr>`);
          for(let element = 0; element < questionsArray.length; element++){
                console.log(questionsArray[element][rowFill]);
                let tableCell = $(`<td class="cell text-white p-3">${questionsArray[element][rowFill].value}</td>`);
                tableCell.attr('id', rowFill);
                $(tableRow).append(tableCell);
          }  
            $("#table-body").append(tableRow);
 
        }

    }


    // creates an HTML element from the passed in elementObject, and appends it to passed in object.
    // And appends both to the body.
    viewAppender(object, elementObject){
        console.log(object)
        console.log(elementObject)
        const appendedSubElement = object;
        const parentElement = $(document.createElement(elementObject.htmlElement));
        parentElement.attr('id',elementObject.elementId);
        parentElement.addClass(elementObject.class);
        parentElement.append(appendedSubElement);
        return $('body').append(parentElement);
    }
}


// reusable variable declareations that are passed in to make HTML elements. 
const tableHeadingsObject = {
    type: "table",
    class: "table table-bordered",
}

const div ={
    htmlElement: "div",
    elementId: "gameView",
    class: "m-3 container-fluid text-center",
    display: "none"
}

const buttonDiv ={
    htmlElement: "div",
    elementId: "buttonView",
    class: "m-3 container",
}
const button = {
    type: "button",
    id: "table-toggle",
    class: "btn btn-primary btn-sm",
    text: "Start Game"
}






