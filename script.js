(function gameStart(){
    let winnerCondition =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ]
    const board = document.querySelector("#board");
    const cell = document.querySelectorAll(".cell__item");
    const button = document.querySelector("button");
    const container = document.getElementById("container");    
    let itemwrite = "";
    let allposition = ["", "", "", "", "", "", "", "", ""];
    function user(sign, point)
    {
        this.symbol = sign;
        this.point = point;

        function plusPoint()
        {
            this.point += 1;
        }
    }
    const player1 = new user("X", 0);
    const player2 = new user("O", 0);

    function checkWinner(){
        let answer = [];
        let stop = false;
        winnerCondition.forEach((item, index) => {
            let newarray = [];
            item.forEach(obj => {
                if(allposition[obj] !== "") newarray.push(allposition[obj]);
            })
            if(newarray[0] === newarray[1] && newarray[1] === newarray[2] && newarray[0] === newarray[2] && !newarray.includes(`""`) && !newarray.includes(undefined) && newarray.length > 2)
            {
                stop = true;
                answer = index;
            }
            newarray = [];
        })

        return {stop, answer};
    }
    function changequery()
    {
        if(itemwrite === "")
        {
            itemwrite = player1.symbol;
        }
        else if(itemwrite === "X")
        {
            itemwrite = player2.symbol;
        }
        else{
            itemwrite = player1.symbol;
        }
    }

    function clearGame()
    {
        cell.forEach(item => {
            item.textContent = "";
            item.classList.remove("winclass");
        })
        itemwrite = "";
        allposition = [];
        cell.forEach(item => addEventListener("click", playGame))
    }
    function playGame(e){
        e.stopImmediatePropagation();
        if(e.target.matches(".cell__item") && e.target.textContent === "")
        {
            changequery();
            e.target.textContent = itemwrite;
            let index = e.target.getAttribute("value");
            allposition[index] = itemwrite;
            let stopcondition = checkWinner();
            if(stopcondition.stop)
            {
                cell[winnerCondition[stopcondition.answer][0]].classList.add("winclass");
                cell[winnerCondition[stopcondition.answer][1]].classList.add("winclass");
                cell[winnerCondition[stopcondition.answer][2]].classList.add("winclass");
                cell.forEach(item => removeEventListener("click", playGame))
            }
        }
    }
    
    button.addEventListener("click", clearGame)
    cell.forEach(item => addEventListener("click", playGame))

})();