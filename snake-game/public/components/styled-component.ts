import styled from "styled-components";

export const GameContainer = styled.div`
  .heading {
    font-size: 2em;
    animation: pulse 2s infinite, colorChange 5s infinite; 
    padding: 20px;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1); 
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes colorChange {
    0% {
      color: red;
    }
    25% {
      color: blue;
    }
    50% {
      color: green;
    }
    75% {
      color: yellow;
    }
    100% {
      color: red;
    }
  }


  #snakeBoard {
    border-radius: 15px;
  }
`;


