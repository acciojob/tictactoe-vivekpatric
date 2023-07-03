//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function () {
            var player1 = document.getElementById("player-1").value;
            var player2 = document.getElementById("player-2").value;
            if (player1 && player2) {
                document.getElementById("player-1").disabled = true;
                document.getElementById("player-2").disabled = true;
                document.getElementById("submit").disabled = true;

                document.querySelector(".message").textContent = player1 + ", you're up!";
                createBoard();
            } else {
                alert("Please enter names for both players!");
            }
        });

        function createBoard() {
            var board = document.querySelector(".board");

            for (var i = 1; i <= 9; i++) {
                var cell = document.createElement("div");
                cell.className = "cell";
                cell.id = i;
                cell.addEventListener("click", handleClick);
                board.appendChild(cell);
            }
        }

        var currentPlayer = "X";
        var moves = 0;

        function handleClick() {
            if (!this.textContent) {
                this.textContent = currentPlayer;
                moves++;

                if (checkWin(currentPlayer)) {
                    var message = document.querySelector(".message");
                    message.textContent = currentPlayer + " congratulations, you won!";
                    disableBoard();
                } else if (moves === 9) {
                    var message = document.querySelector(".message");
                    message.textContent = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    var message = document.querySelector(".message");
                    message.textContent = currentPlayer === "X" ? player1 + ", you're up!" : player2 + ", you're up!";
                }
            }
        }

        function checkWin(player) {
            var cells = document.querySelectorAll(".cell");

            // Winning combinations
            var combinations = [
                [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
                [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
                [1, 5, 9], [3, 5, 7] // Diagonals
            ];

            for (var i = 0; i < combinations.length; i++) {
                var combination = combinations[i];
                if (
                    cells[combination[0] - 1].textContent === player &&
                    cells[combination[1] - 1].textContent === player &&
                    cells[combination[2] - 1].textContent === player
                ) {
                    return true;
                }
            }

            return false;
        }

        function disableBoard() {
            var cells = document.querySelectorAll(".cell");
            for (var i = 0; i < cells.length; i++) {
                cells[i].removeEventListener("click", handleClick);
            }
        }