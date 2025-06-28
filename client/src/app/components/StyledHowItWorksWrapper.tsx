'use client';
import styled from 'styled-components';

const StyledHowItWorksWrapper = styled.div`
  .container {
    position: relative;
    width: 250px;
    height: 254px;
    margin: auto;
    transition: 200ms;
  }

  .container:active {
    width: 180px;
    height: 245px;
  }

  #card {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    transition: 700ms;
    background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
    padding: 1rem;
    text-align: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  .emoji {
    font-size: 2.5rem;
  }

  .title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 0.5rem;
    color: white;
  }

  .subtitle {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #cbd5e1;
  }

  .canvas {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    z-index: 200;
    perspective: 800px;
  }

  .tracker {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 200;
  }

  ${[...Array(25)].map((_, i) => {
    const n = i + 1;
    const row = Math.floor(i / 5);
    const col = i % 5;

    const rotateX = 20 - row * 10;
    const rotateY = (col - 2) * 5;

    return `
      .tr-${n}:hover ~ #card {
        transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg);
        transition: 125ms ease-in-out;
      }
    `;
  }).join('')}

  .noselect {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export default StyledHowItWorksWrapper;
