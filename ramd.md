  body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #FFF7F0;
    }

    .speech-bubble {
      position: relative;
      background: #FFD84D;
      border-radius: 20px;
      padding: 20px 40px;
      font-family: 'Arial', sans-serif;
      font-size: 2rem;
      font-weight: bold;
      color: #333;
      animation: bounce 1.5s infinite;
    }

    /* 말풍선 꼬리 */
    .speech-bubble::after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: 40px;
      border-width: 20px 20px 0;
      border-style: solid;
      border-color: #FFD84D transparent transparent transparent;
    }

    /* bounce 효과 */
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-15px);
      }
      60% {
        transform: translateY(-7px);
      }
    }