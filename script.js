let myBacklog = [];


//Left buttons
const allGamesButton = document.getElementById("all-games");
allGamesButton.addEventListener("click", () => {
    addGameToBacklog("all");
});
const unplayedGames = document.getElementById("unplayed-games");
unplayedGames.addEventListener("click", () => {
    addGameToBacklog("unplayed");
});
const playedGames = document.getElementById("played-games");
playedGames.addEventListener("click", () => {
    addGameToBacklog("played");
});
const completedGames = document.getElementById("completed-games");
completedGames.addEventListener("click", () => {
    addGameToBacklog("completed");
});

const createButton = document.getElementById("create-game");
createButton.addEventListener("click", () => {
    let popUp = document.getElementById("pop-up");
    popUp.style.display = "flex";
    console.log(myBacklog)
});

const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", () => {
    clearForm();
});

const hoursForm = document.getElementById("hours");
const completedButton = document.getElementById("completed");

document.getElementsByName("hours")[0].addEventListener('change', () =>{
    if (hoursForm.value > 0){
        completedButton.innerHTML = "Played";
        completedButton.value = "Played";
        completedButton.classList.remove(completedButton.classList.item(1));
        completedButton.classList.add("played"); 
    }
    else{
        completedButton.innerHTML = "Unplayed"
        completedButton.value = "Unplayed"; 
        completedButton.classList.remove(completedButton.classList.item(1));
        completedButton.classList.add("unplayed");      
    }
});

completedButton.innerHTML = completedButton.value;
completedButton.addEventListener("click", () => {
    console.log(hoursForm.value);
    if (hoursForm.value > 0){
        switch (completedButton.innerHTML){
            case "Played":
            completedButton.innerHTML = "Completed";
            completedButton.value = "Completed";
            completedButton.classList.remove(completedButton.classList.item(1));
            completedButton.classList.add("completed");
            break;

            case "Completed":
            completedButton.innerHTML = "Played";
            completedButton.value = "Played";
            completedButton.classList.remove(completedButton.classList.item(1));
            completedButton.classList.add("played");
            break;
        } 
    }
    else{
        completedButton.innerHTML = "Unplayed"
        completedButton.value = "Unplayed";  
        completedButton.classList.remove(completedButton.classList.item(1));
        completedButton.classList.add("unplayed");     
    }
});

function completedButtonListener(){
    const completedButtonGames = document.querySelectorAll(".button-completed-games");
    completedButtonGames.forEach(function(btn){
        btn.addEventListener("click", () => {
                let classItem = btn.classList.item(1);
                console.log(classItem);
                switch (classItem){
                    case "unplayed":
                    btn.innerHTML = "Played";
                    btn.value = "Played";
                    btn.classList.remove(btn.classList.item(1));
                    btn.classList.add("played");
                    break;
    
                    case "played":
                    btn.innerHTML = "Completed";
                    btn.value = "Completed";
                    btn.classList.remove(btn.classList.item(1));
                    btn.classList.add("completed");
                    break;
    
                    case "completed":
                    btn.innerHTML = "Unplayed";
                    btn.value = "Unplayed";
                    btn.classList.remove(btn.classList.item(1));
                    btn.classList.add("unplayed");  
                    break;
                }
                let parentsId = btn.parentElement.id;
                for (let i = 0; i < myBacklog.length; i++) {
                    if (i == parentsId){
                        myBacklog[i].completed = btn.value;
                        console.log(myBacklog);
                    }
                    
                }
        });
    });
}


function clearForm(){
    document.getElementById("form").elements[0].value = "";
    document.getElementById("form").elements[1].value = "";
    document.getElementById("form").elements[2].value = "0";
    document.getElementById("form").elements[3].value = "Unplayed";

    let popUp = document.getElementById("pop-up");
    popUp.style.display = "none";
}

class Game {
    constructor(identificator, title, genre, hours, completed) {
        this.identificator = identificator;
        this.title = title;
        this.genre = genre;
        this.hours = hours;
        this.completed = completed;
    }
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("form").elements[0].value;
    const genre = document.getElementById("form").elements[1].value;
    const hours = document.getElementById("form").elements[2].value;
    const completed = document.getElementById("form").elements[3].value;
    console.log(completed)

    if (title != "" && hours != "" && genre != ""){
        const game = new Game(0, title, genre, hours, completed);
        myBacklog.push(game);
        console.log(myBacklog)
        addGameToBacklog("all");
        completedButtonListener();
        clearForm();
    }
});


function domManipulator(identificator, title, genre, hours, completed){
    const parent = document.getElementById("library");
    const container = document.createElement("div");
    container.classList.add("game");
    container.id = identificator;
    container.style.backgroundImage = `url(img/${genre}.png)`;

    const parTitle = document.createElement("h3");
    const nodeTitle = document.createTextNode(title);

    const spanHours = document.createElement("span");
    const parHours = document.createElement("p");
    const nodeHours = document.createTextNode("Hours played : ");
    const inputHours = document.createElement("input");
    inputHours.type = "number";
    inputHours.value = hours;
    inputHours.style.width = "25%";

    const btnCompleted = document.createElement("button");
    btnCompleted.classList.add("button-completed-games");
    console.log(completed);
    const nodeCompleted = document.createTextNode(completed);

    switch (completed){
        case "Unplayed":
        btnCompleted.classList.add("unplayed");
        break;

        case "Played":
        btnCompleted.classList.add("played");
        break;

        case "Completed":
        btnCompleted.classList.add("completed");
        break;
    }

    parTitle.appendChild(nodeTitle);

    btnCompleted.appendChild(nodeCompleted);

    parHours.appendChild(nodeHours);
    spanHours.appendChild(parHours);
    spanHours.appendChild(inputHours);

    container.appendChild(parTitle);
    container.appendChild(btnCompleted);
    container.appendChild(spanHours);

    parent.appendChild(container);

}

function removeClass(){
    allGamesButton.classList.remove("selected");
    unplayedGames.classList.remove("selected");
    playedGames.classList.remove("selected");
    completedGames.classList.remove("selected");    
}


function addGameToBacklog(whichGames) {
    const games = document.querySelectorAll(".game");
    for (let i = 0; i< games.length; i++) {
        games[i].remove();    
    }
    switch (whichGames){
        case "all":
        for (let i = 0; i < myBacklog.length; i++) {
            domManipulator(i, myBacklog[i].title, myBacklog[i].genre, myBacklog[i].hours, myBacklog[i].completed);
        }     
        removeClass();
        allGamesButton.classList.add("selected");
        break;  

        case "unplayed":
        for (let i = 0; i < myBacklog.length; i++) {
            if (myBacklog[i].completed == "Unplayed"){
                domManipulator(i, myBacklog[i].title, myBacklog[i].genre, myBacklog[i].hours, myBacklog[i].completed);                
            }
        }     
        removeClass();
        unplayedGames.classList.add("selected");
        break;  
        case "played":
        for (let i = 0; i < myBacklog.length; i++) {
            if (myBacklog[i].completed == "Played"){
                domManipulator(i, myBacklog[i].title, myBacklog[i].genre, myBacklog[i].hours, myBacklog[i].completed);                
            }
        }    
        removeClass();
        playedGames.classList.add("selected"); 
        break;  
        case "completed":
        for (let i = 0; i < myBacklog.length; i++) {
            if (myBacklog[i].completed == "Completed"){
                domManipulator(i, myBacklog[i].title, myBacklog[i].genre, myBacklog[i].hours, myBacklog[i].completed);                
            }
        }    
        removeClass();
        completedGames.classList.add("selected");  
        break;  
    }
    completedButtonListener();
}