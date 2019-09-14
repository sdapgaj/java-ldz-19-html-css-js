
let quizId;

function startQuiz() {

    const options = { method: "POST" };
    const requestPromise =
        fetch("http://it-pokemon.webappcraft.com/quiz", options);
    requestPromise.then((response) => {
        response.json().then((json) => {
            const quiz = {
                id: json.id,
                questionCount: json.questionCount
            };
            quizId = json.id;
            getQuestion();
        });
    });
}

function getQuestion() {
    //const requestPromise = fetch("http://it-pokemon.webappcraft.com//quiz/"+quizId + "/question");
    const requestPromise = fetch(`http://it-pokemon.webappcraft.com/quiz/${quizId}/question`);
    requestPromise.then((response) => {
        response.json().then((json) => {
            const question = {
                name: json.name,
                done: json.done
            };
            if (json.done) {
                getScore();
            }
            document
                .getElementsByTagName("h1")[0]
                .textContent = question.name;
        });
    });
}

function answer(id) {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "answer": id
        })
    };
    const requestPromise = fetch(`http://it-pokemon.webappcraft.com/quiz/${quizId}/answer`, options);
    requestPromise.then((response) => {
        response.json().then((answer) => {
            const str = answer.details.url;
            const name = answer.details.name;
            const links = document.getElementsByClassName("linkToWiki");
            Array.from(links).forEach((x)=>{
                x.href = str;
                x.textContent = name;
            });
            if (answer.correct) {
                //alert("You are right!");
                $('#modalRight').modal({});
            } else {
                //alert("You are wrong!");
                $('#modalWrong').modal({});
            }
            getQuestion();
        });

    });
}

function getScore() {
    const requestPromise = fetch(`http://it-pokemon.webappcraft.com/quiz/${quizId}/score`);
    requestPromise.then((responce) => {
        responce.json().then((score) => {
            alert("No more questions! Your score is: " + score.score + "/10");
        });
    });
}

