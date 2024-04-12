"use client"
import Swal from 'sweetalert2';
import {GameContainer} from "@/public/components/styled-component";

const SnakeGame = () => {
    let blockSize: number = 30;
    let rows: number = 25;
    let columns: number = 25;
    let board;
    let context;

    // Snake head
    let snakeX: number = blockSize * 5;
    let snakeY: number = blockSize * 5;

    // Snake food
    let foodX;
    let foodY;

    let velocityOfSnakeX: number = 0;
    let velocityOfSnakeY: number = 0;

    let snakeBody = [];

    let gameOver: boolean = false;

    window.onload = () => {
        board = document.getElementById("snakeBoard");
        board.width = rows * blockSize;
        board.height = columns * blockSize;
        context = board.getContext("2d")

        placeFoodForSnake();
        document.addEventListener("keyup", changeDirectionOfSnake);
        setInterval(updateOnSnakeBoard, 1000 / 10); // every 100 milliseconds will update
    }

    const updateOnSnakeBoard = () => {
        if (gameOver) {
            return;
        }

        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);

        context.fillStyle = "lime";
        context.fillRect(foodX, foodY, blockSize, blockSize);

        if (snakeX == foodX && snakeY == foodY) {
            snakeBody.push([foodX, foodY]);
            placeFoodForSnake()
        }

        for (let r = snakeBody.length - 1; r > 0; r--) {
            snakeBody[r] = snakeBody[r - 1];
        }

        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }

        context.fillStyle = "red";
        snakeX += velocityOfSnakeX * blockSize;
        snakeY += velocityOfSnakeY * blockSize;
        context.fillRect(snakeX, snakeY, blockSize, blockSize);
        for (let r = 0; r < snakeBody.length; r++) {
            context.fillRect(snakeBody[r][0], snakeBody[r][1], blockSize, blockSize)
        }

        // For game over conditions
        if (snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
            gameOver = true;
            Swal.fire({
                title: 'Game Over',
                text: 'You hit the wall!',
                icon: 'error',
                confirmButtonText: 'Try Again'
            }).then(() => {
                window.location.reload();
            });
        }

        for (let r = 0; r < snakeBody.length; r++) {
            if (snakeX === snakeBody[r][0] && snakeY === snakeBody[r][1]) {
                gameOver = true;
                Swal.fire({
                    title: 'Game Over',
                    text: 'You hit yourself!',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                }).then(() => {
                    window.location.reload();
                });
            }
        }

    }

    const changeDirectionOfSnake = (event) => {
        if (event.code == "ArrowUp" && velocityOfSnakeY != 1) {
            velocityOfSnakeX = 0;
            velocityOfSnakeY = -1;
        } else if (event.code == "ArrowDown" && velocityOfSnakeY != -1) {
            velocityOfSnakeX = 0;
            velocityOfSnakeY = 1;
        } else if (event.code == "ArrowLeft" && velocityOfSnakeX != 1) {
            velocityOfSnakeX = -1;
            velocityOfSnakeY = 0;
        } else if (event.code == "ArrowRight" && velocityOfSnakeX != -1) {
            velocityOfSnakeX = 1;
            velocityOfSnakeY = 0;
        }
    }

    const placeFoodForSnake = () => {
        foodX = Math.floor(Math.random() * columns) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }
    return (
        <GameContainer>
            <h1 className="heading">Snake Game</h1>
            <canvas id="snakeBoard">
            </canvas>
        </GameContainer>

    )
};

export default SnakeGame;
