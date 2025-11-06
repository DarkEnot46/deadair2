(() => {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      color-scheme: dark;
      --bg-color: #03040a;
      --neon: #39ff14;
      --scanline-color: rgba(57, 255, 20, 0.12);
      --glitch-magenta: #ff2fff;
      --glitch-cyan: #2fffe4;
      --pixel-size: 2px;
    }

    @font-face {
      font-family: 'OCRAsset';
      src: url('./assets/ocr-a-std.ttf') format('truetype');
      font-display: swap;
    }

    html,
    body {
      height: 100%;
    }

    body.crt-body {
      margin: 0;
      min-height: 100%;
      background: radial-gradient(circle at top, rgba(57, 255, 20, 0.05), transparent 55%), var(--bg-color);
      color: var(--neon);
      font-family: 'OCRAsset', 'OCR A Std', 'Courier New', monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      image-rendering: pixelated;
      perspective: 1600px;
    }

    body.crt-body *,
    body.crt-body *::before,
    body.crt-body *::after {
      image-rendering: pixelated;
      font-family: inherit;
    }

    .crt-container {
      position: relative;
      width: min(100%, 1200px);
      min-height: min(100vh, 900px);
      padding: clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem);
      display: grid;
      place-items: center;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      overflow: hidden;
      isolation: isolate;
      transform-style: preserve-3d;
      animation: crt-drift 9s ease-in-out infinite;
    }

    .crt-container::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.55) 0px,
          rgba(0, 0, 0, 0.55) 1px,
          transparent 1px,
          transparent 3px
        );
      mix-blend-mode: screen;
      opacity: 0.6;
      animation: crt-flicker 4.8s infinite;
    }

    .crt-container::after {
      content: '';
      position: absolute;
      inset: -5%;
      pointer-events: none;
      background:
        radial-gradient(circle at center, rgba(57, 255, 20, 0.25) 0%, rgba(57, 255, 20, 0.075) 45%, transparent 65%),
        linear-gradient(90deg, rgba(57, 255, 20, 0.08) 0%, transparent 60%),
        linear-gradient(180deg, transparent 65%, rgba(0, 0, 0, 0.35) 100%);
      filter: blur(0.45px);
      mix-blend-mode: screen;
      opacity: 0.6;
      animation: crt-warp 5.6s ease-in-out infinite;
    }

    .scene {
      position: relative;
      z-index: 1;
      grid-area: 1 / 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: clamp(2rem, 5vw, 3rem);
      padding: clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 10vw, 8rem);
      backdrop-filter: blur(0.15px);
      transform-style: preserve-3d;
      transform: translateZ(60px) scale(0.92) rotateX(3deg);
      animation: crt-breathe 7s ease-in-out infinite alternate;
    }

    .scene {
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    .scene::before {
      content: '';
      position: absolute;
      inset: -18%;
      background:
        radial-gradient(circle at center, rgba(57, 255, 20, 0.18) 0%, transparent 65%);
      opacity: 0.45;
      mix-blend-mode: screen;
      filter: blur(1.2px);
      pointer-events: none;
      animation: crt-lens 8s ease-in-out infinite;
      transform: translateZ(-20px);
    }

    .scene.is-hidden {
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
      animation-play-state: paused;
    }

    .crt-container.is-transitioning .scene {
      animation-play-state: paused;
    }

    .pixel-text {
      text-transform: uppercase;
      letter-spacing: clamp(0.15rem, 0.6vw, 0.45rem);
      -webkit-font-smoothing: none;
      -moz-osx-font-smoothing: grayscale;
      text-shadow:
        calc(var(--pixel-size) * -1) 0 0 rgba(0, 0, 0, 0.6),
        calc(var(--pixel-size)) 0 0 rgba(0, 0, 0, 0.6),
        0 calc(var(--pixel-size) * -1) 0 rgba(0, 0, 0, 0.6),
        0 calc(var(--pixel-size)) 0 rgba(0, 0, 0, 0.6),
        calc(var(--pixel-size) * 0.5) calc(var(--pixel-size) * 0.5) 0 rgba(57, 255, 20, 0.75),
        calc(var(--pixel-size) * -0.5) calc(var(--pixel-size) * 0.5) 0 rgba(57, 255, 20, 0.55),
        0 0 calc(var(--pixel-size) * 4) rgba(57, 255, 20, 0.35);
      filter: contrast(1.25) saturate(1.15);
      image-rendering: pixelated;
      text-rendering: optimizeSpeed;
      font-smooth: never;
    }

    .question {
      font-size: clamp(1.5rem, 6vw, 3.5rem);
      max-width: 18ch;
      line-height: 1.05;
    }

    .button-row {
      display: flex;
      gap: clamp(1.25rem, 5vw, 2.5rem);
      flex-wrap: wrap;
      justify-content: center;
    }

    .glitch-button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: clamp(0.55rem, 1.8vw, 0.95rem) clamp(1.1rem, 3.4vw, 2rem);
      border: 1.5px solid var(--neon);
      border-radius: 6px;
      background: transparent;
      color: var(--neon);
      font-size: clamp(0.75rem, 2.5vw, 1.1rem);
      cursor: pointer;
      overflow: hidden;
      transition: filter 0.25s ease, transform 0.25s ease;
      clip-path: polygon(0 10%, 5% 0, 95% 0, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0 90%);
    }

    .glitch-button::before,
    .glitch-button::after {
      content: attr(data-label);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
    }

    .glitch-button::before {
      color: var(--glitch-cyan);
      mix-blend-mode: screen;
    }

    .glitch-button::after {
      color: var(--glitch-magenta);
      mix-blend-mode: lighten;
    }

    .glitch-button:hover,
    .glitch-button:focus-visible {
      transform: scale(1.02);
      filter: drop-shadow(0 0 10px rgba(57, 255, 20, 0.4));
      animation: glitch-shake 380ms steps(2, end) infinite;
    }

    .glitch-button:hover::before,
    .glitch-button:hover::after,
    .glitch-button:focus-visible::before,
    .glitch-button:focus-visible::after {
      opacity: 0.65;
      animation: glitch-slice 250ms steps(2, end) infinite;
    }

    .glitch-overlay {
      position: absolute;
      inset: -12%;
      background:
        repeating-linear-gradient(
          90deg,
          rgba(57, 255, 20, 0.1) 0px,
          rgba(57, 255, 20, 0.1) 4px,
          transparent 4px,
          transparent 9px
        ),
        repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.75) 0px,
          rgba(0, 0, 0, 0.75) 1px,
          transparent 1px,
          transparent 4px
        ),
        radial-gradient(circle at 30% 40%, rgba(57, 255, 20, 0.35), transparent 55%);
      mix-blend-mode: screen;
      pointer-events: none;
      z-index: 6;
      animation: overlay-fault 0.75s steps(2, end) forwards;
    }

    .glitch-overlay::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(
          180deg,
          rgba(57, 255, 20, 0.16) 0px,
          rgba(57, 255, 20, 0.16) 2px,
          transparent 2px,
          transparent 6px
        );
      opacity: 0.9;
      mix-blend-mode: screen;
      animation: overlay-shudder 0.75s steps(3, end) forwards;
    }

    .triangle-scene {
      gap: clamp(1.5rem, 4vw, 2.5rem);
      min-height: clamp(24rem, 65vh, 34rem);
      padding-top: clamp(2.5rem, 6vw, 4.5rem);
    }

    .triangle-space {
      position: relative;
      width: min(70vw, 26rem);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      perspective: 1400px;
      isolation: isolate;
    }

    .triangle-space::before {
      content: '';
      position: absolute;
      inset: -12%;
      background:
        radial-gradient(circle at center, rgba(57, 255, 20, 0.15) 0%, transparent 65%);
      opacity: 0.45;
      pointer-events: none;
      mix-blend-mode: screen;
      animation: triangle-space-glow 6s ease-in-out infinite;
    }

    .triangle-space::after {
      content: '';
      position: absolute;
      inset: -8%;
      border: 1px solid rgba(57, 255, 20, 0.1);
      border-radius: 14px;
      opacity: 0.5;
      pointer-events: none;
      mix-blend-mode: screen;
    }

    .triangle-shell {
      position: relative;
      width: 80%;
      height: 80%;
      transform-style: preserve-3d;
      transition: transform 0.22s ease;
    }

    .triangle {
      position: absolute;
      inset: 0;
      filter: drop-shadow(0 0 16px rgba(57, 255, 20, 0.4));
      transform-style: preserve-3d;
    }

    .scene-control {
      position: absolute;
      top: clamp(1rem, 4vw, 2rem);
      left: clamp(1rem, 4vw, 2rem);
      display: inline-flex;
      align-items: center;
      gap: clamp(0.35rem, 1vw, 0.6rem);
      padding: clamp(0.45rem, 1.5vw, 0.75rem) clamp(0.8rem, 2vw, 1.3rem);
      border: 1.5px solid rgba(57, 255, 20, 0.4);
      border-radius: 6px;
      background: rgba(2, 6, 12, 0.55);
      color: var(--neon);
      font-size: clamp(0.55rem, 1.6vw, 0.85rem);
      letter-spacing: clamp(0.1rem, 0.8vw, 0.25rem);
      text-transform: uppercase;
      cursor: pointer;
      overflow: hidden;
      box-shadow:
        0 0 12px rgba(57, 255, 20, 0.25),
        inset 0 0 8px rgba(57, 255, 20, 0.15);
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .scene-control::before,
    .scene-control::after {
      content: attr(data-label);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
    }

    .scene-control::before {
      color: var(--glitch-cyan);
      mix-blend-mode: screen;
    }

    .scene-control::after {
      color: var(--glitch-magenta);
      mix-blend-mode: lighten;
    }

    .scene-control:focus-visible,
    .scene-control:hover {
      transform: translateY(-1px);
      border-color: rgba(57, 255, 20, 0.65);
      box-shadow:
        0 0 18px rgba(57, 255, 20, 0.35),
        inset 0 0 12px rgba(57, 255, 20, 0.2);
      animation: glitch-shake 360ms steps(2, end) infinite;
    }

    .scene-control:focus-visible::before,
    .scene-control:focus-visible::after,
    .scene-control:hover::before,
    .scene-control:hover::after {
      opacity: 0.6;
      animation: glitch-slice 220ms steps(2, end) infinite;
    }

    .triangle-svg {
      width: 100%;
      height: 100%;
      display: block;
      shape-rendering: optimizeSpeed;
      image-rendering: pixelated;
    }

    .triangle-shadow {
      fill: rgba(57, 255, 20, 0.06);
      stroke: rgba(57, 255, 20, 0.22);
      stroke-width: 1.1;
      vector-effect: non-scaling-stroke;
    }

    .triangle-outline {
      fill: transparent;
      stroke: rgba(57, 255, 20, 0.85);
      stroke-width: 1.6;
      vector-effect: non-scaling-stroke;
      filter: contrast(1.4);
    }

    .triangle-outline--highlight {
      stroke: rgba(255, 255, 255, 0.22);
      stroke-width: 0.9;
      mix-blend-mode: screen;
    }

    .triangle-scene.glitching .triangle {
      animation: triangle-glitch 200ms steps(2, end) 4;
      filter: drop-shadow(0 0 24px rgba(255, 0, 60, 0.6))
        drop-shadow(0 0 18px rgba(57, 255, 20, 0.65));
    }

    .triangle-scene.glitching .triangle-space::before {
      animation-duration: 1.2s;
      opacity: 0.75;
    }

    .rights-scene {
      gap: clamp(1.25rem, 4vw, 2rem);
      min-height: clamp(20rem, 60vh, 32rem);
    }

    .rights-scene::before {
      content: '';
      position: absolute;
      inset: -15%;
      background:
        radial-gradient(circle at center, rgba(57, 255, 20, 0.12) 0%, transparent 70%),
        repeating-linear-gradient(
          0deg,
          rgba(57, 255, 20, 0.08) 0,
          rgba(57, 255, 20, 0.08) 2px,
          transparent 2px,
          transparent 6px
        );
      opacity: 0.45;
      mix-blend-mode: screen;
      pointer-events: none;
      animation: rights-hum 5.5s ease-in-out infinite;
    }

    .rights-text-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: clamp(0.85rem, 2.5vw, 1.3rem) clamp(1.25rem, 4vw, 2.75rem);
      border: 1.5px solid rgba(57, 255, 20, 0.35);
      border-radius: 6px;
      background: rgba(3, 5, 12, 0.45);
      box-shadow:
        0 0 18px rgba(57, 255, 20, 0.18),
        inset 0 0 12px rgba(57, 255, 20, 0.12);
      overflow: hidden;
    }

    .rights-text {
      position: relative;
      display: inline-block;
      font-size: clamp(1.2rem, 5vw, 3.25rem);
      letter-spacing: clamp(0.22rem, 0.9vw, 0.55rem);
      text-transform: uppercase;
      text-align: center;
      z-index: 2;
    }

    .rights-text::before,
    .rights-text::after {
      content: attr(data-content);
      position: absolute;
      inset: 0;
      color: inherit;
      opacity: 0;
      pointer-events: none;
      mix-blend-mode: screen;
    }

    .rights-text::before {
      color: var(--glitch-cyan);
      clip-path: inset(12% 0 42% 0);
      transform: translate(0, 0);
    }

    .rights-text::after {
      color: var(--glitch-magenta);
      clip-path: inset(64% 0 0 0);
      transform: translate(0, 0);
    }

    .rights-scene.is-playing .rights-text::before,
    .rights-scene.is-playing .rights-text::after {
      opacity: 0.75;
      animation: rights-text-glitch 480ms steps(2, end) infinite;
    }

    .rights-scene.is-playing .rights-text {
      animation: rights-text-flicker 2.4s ease-in-out infinite;
    }

    .rights-noise {
      position: absolute;
      inset: -10%;
      background:
        repeating-linear-gradient(
          90deg,
          rgba(57, 255, 20, 0.08) 0,
          rgba(57, 255, 20, 0.08) 3px,
          transparent 3px,
          transparent 6px
        );
      opacity: 0;
      mix-blend-mode: screen;
      pointer-events: none;
      z-index: 1;
    }

    .rights-scene.is-playing .rights-noise {
      animation: rights-noise 1s steps(3, end) infinite;
      opacity: 0.45;
    }

    .password-scene {
      gap: clamp(1.5rem, 4vw, 2.5rem);
      min-height: clamp(22rem, 62vh, 32rem);
    }

    .password-stack {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(1rem, 3vw, 1.75rem);
      padding: clamp(1.25rem, 4vw, 2.5rem) clamp(1.75rem, 4.5vw, 3.5rem);
      border: 1.5px solid rgba(57, 255, 20, 0.3);
      border-radius: 10px;
      background: rgba(4, 8, 14, 0.6);
      box-shadow:
        0 0 20px rgba(57, 255, 20, 0.2),
        inset 0 0 12px rgba(57, 255, 20, 0.18);
      position: relative;
      overflow: hidden;
    }

    .password-stack::before {
      content: '';
      position: absolute;
      inset: -20%;
      pointer-events: none;
      background:
        radial-gradient(circle at center, rgba(57, 255, 20, 0.2) 0%, transparent 75%),
        repeating-linear-gradient(
          0deg,
          rgba(57, 255, 20, 0.08) 0,
          rgba(57, 255, 20, 0.08) 2px,
          transparent 2px,
          transparent 6px
        );
      opacity: 0.55;
      mix-blend-mode: screen;
      animation: rights-hum 6s ease-in-out infinite;
    }

    .password-prompt {
      font-size: clamp(1.1rem, 4.5vw, 3rem);
      letter-spacing: clamp(0.18rem, 0.9vw, 0.5rem);
      text-transform: uppercase;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .password-input {
      position: relative;
      z-index: 1;
      width: clamp(12rem, 45vw, 18rem);
      padding: clamp(0.55rem, 1.8vw, 0.9rem) clamp(0.75rem, 2vw, 1.35rem);
      border: 2px solid rgba(57, 255, 20, 0.45);
      border-radius: 6px;
      background: rgba(3, 6, 10, 0.8);
      color: var(--neon);
      font-family: inherit;
      font-size: clamp(0.75rem, 2.5vw, 1.1rem);
      letter-spacing: clamp(0.16rem, 0.6vw, 0.3rem);
      text-transform: uppercase;
      caret-color: var(--neon);
      outline: none;
      box-shadow:
        0 0 14px rgba(57, 255, 20, 0.25),
        inset 0 0 12px rgba(57, 255, 20, 0.12);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .password-input:focus {
      border-color: rgba(57, 255, 20, 0.75);
      box-shadow:
        0 0 22px rgba(57, 255, 20, 0.35),
        inset 0 0 14px rgba(57, 255, 20, 0.2);
    }

    .password-button {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: clamp(0.35rem, 1vw, 0.6rem);
      padding: clamp(0.55rem, 1.8vw, 0.9rem) clamp(1.4rem, 4vw, 2.2rem);
      border: 1.5px solid rgba(57, 255, 20, 0.4);
      border-radius: 6px;
      background: rgba(2, 6, 12, 0.55);
      color: var(--neon);
      font-size: clamp(0.65rem, 2vw, 1rem);
      letter-spacing: clamp(0.18rem, 0.7vw, 0.35rem);
      text-transform: uppercase;
      cursor: pointer;
      overflow: hidden;
      box-shadow:
        0 0 16px rgba(57, 255, 20, 0.25),
        inset 0 0 12px rgba(57, 255, 20, 0.15);
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .password-button::before,
    .password-button::after {
      content: attr(data-label);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
    }

    .password-button::before {
      color: var(--glitch-cyan);
      mix-blend-mode: screen;
    }

    .password-button::after {
      color: var(--glitch-magenta);
      mix-blend-mode: lighten;
    }

    .password-button:focus-visible,
    .password-button:hover {
      transform: translateY(-1px);
      border-color: rgba(57, 255, 20, 0.65);
      box-shadow:
        0 0 22px rgba(57, 255, 20, 0.35),
        inset 0 0 14px rgba(57, 255, 20, 0.2);
      animation: glitch-shake 360ms steps(2, end) infinite;
    }

    .password-button:focus-visible::before,
    .password-button:focus-visible::after,
    .password-button:hover::before,
    .password-button:hover::after {
      opacity: 0.6;
      animation: glitch-slice 220ms steps(2, end) infinite;
    }

    .password-error {
      position: absolute;
      inset: -15%;
      pointer-events: none;
      opacity: 0;
      background:
        repeating-linear-gradient(
          90deg,
          rgba(255, 0, 60, 0.25) 0,
          rgba(255, 0, 60, 0.25) 5px,
          transparent 5px,
          transparent 9px
        ),
        repeating-linear-gradient(
          0deg,
          rgba(255, 0, 60, 0.3) 0,
          rgba(255, 0, 60, 0.3) 3px,
          transparent 3px,
          transparent 6px
        );
      mix-blend-mode: screen;
      backdrop-filter: blur(0.5px);
      z-index: 2;
    }

    .password-error.is-active {
      animation: password-error 2s steps(2, end) forwards;
    }

    .despair-scene {
      gap: clamp(1.5rem, 4.5vw, 2.85rem);
      min-height: clamp(24rem, 65vh, 35rem);
    }

    .despair-scene::before {
      content: '';
      position: absolute;
      inset: -20%;
      background:
        radial-gradient(circle at center, rgba(255, 0, 80, 0.25) 0%, transparent 70%),
        repeating-linear-gradient(
          0deg,
          rgba(57, 255, 20, 0.08) 0,
          rgba(57, 255, 20, 0.08) 2px,
          transparent 2px,
          transparent 5px
        );
      opacity: 0.35;
      mix-blend-mode: screen;
      pointer-events: none;
      filter: blur(0.4px);
      animation: despair-field 7s ease-in-out infinite;
    }

    .despair-wrap {
      position: relative;
      display: inline-flex;
      padding: clamp(1.2rem, 3.5vw, 2.1rem) clamp(1.5rem, 4vw, 3.5rem);
      border: 1.5px solid rgba(57, 255, 20, 0.4);
      border-radius: 10px;
      background: rgba(3, 6, 12, 0.65);
      box-shadow:
        0 0 28px rgba(57, 255, 20, 0.28),
        inset 0 0 18px rgba(57, 255, 20, 0.2);
      overflow: hidden;
      isolation: isolate;
    }

    .despair-text {
      position: relative;
      font-size: clamp(1.35rem, 5.5vw, 3.65rem);
      letter-spacing: clamp(0.22rem, 1.05vw, 0.6rem);
      text-transform: uppercase;
      text-align: center;
      max-width: 24ch;
      z-index: 2;
    }

    .despair-text::before,
    .despair-text::after {
      content: attr(data-content);
      position: absolute;
      inset: 0;
      opacity: 0;
      mix-blend-mode: screen;
      pointer-events: none;
    }

    .despair-text::before {
      color: rgba(57, 255, 20, 0.9);
      clip-path: inset(18% 0 52% 0);
    }

    .despair-text::after {
      color: rgba(255, 0, 90, 0.9);
      clip-path: inset(58% 0 0 0);
    }

    .despair-noise {
      position: absolute;
      inset: -12%;
      opacity: 0;
      background:
        repeating-linear-gradient(
          90deg,
          rgba(57, 255, 20, 0.2) 0,
          rgba(57, 255, 20, 0.2) 3px,
          transparent 3px,
          transparent 6px
        );
      mix-blend-mode: screen;
      pointer-events: none;
      z-index: 1;
    }

    .despair-scene.is-playing .despair-text::before,
    .despair-scene.is-playing .despair-text::after {
      opacity: 0.75;
      animation: despair-glitch 420ms steps(2, end) infinite;
    }

    .despair-scene.is-playing .despair-text {
      animation: despair-flicker 2.6s ease-in-out infinite;
    }

    .despair-scene.is-playing .despair-noise {
      animation: despair-noise 1s steps(3, end) infinite;
      opacity: 0.5;
    }

    .specter-scene {
      position: relative;
      background: radial-gradient(circle at center, rgba(2, 10, 6, 0.65) 0%, rgba(0, 0, 0, 0.95) 68%), #000;
      gap: 0;
      overflow: hidden;
      color: var(--neon);
      min-height: clamp(24rem, 70vh, 38rem);
      width: min(100%, 1120px);
      padding: clamp(2rem, 4vw, 3rem);
      align-items: stretch;
      justify-content: stretch;
      transform-style: preserve-3d;
      transform: translateZ(45px) scale(0.97) rotateX(2deg);
      animation: specter-breathe 6.4s ease-in-out infinite alternate;
      box-shadow:
        inset 0 0 60px rgba(0, 0, 0, 0.75),
        inset 0 0 140px rgba(57, 255, 20, 0.12);
    }

    .specter-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 2;
    }

    .specter-scene::before {
      content: '';
      position: absolute;
      inset: -12%;
      background:
        radial-gradient(circle at center, rgba(57, 255, 20, 0.12) 0%, transparent 65%),
        repeating-linear-gradient(
          0deg,
          rgba(57, 255, 20, 0.08) 0,
          rgba(57, 255, 20, 0.08) 2px,
          transparent 2px,
          transparent 6px
        );
      opacity: 0.45;
      mix-blend-mode: screen;
      pointer-events: none;
      animation: rights-hum 5s ease-in-out infinite;
      z-index: 1;
    }

    .specter-scene::after {
      content: '';
      position: absolute;
      inset: -6%;
      pointer-events: none;
      background:
        repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.6) 0px,
          rgba(0, 0, 0, 0.6) 2px,
          transparent 2px,
          transparent 5px
        ),
        linear-gradient(90deg, rgba(57, 255, 20, 0.05) 0%, transparent 70%);
      mix-blend-mode: screen;
      opacity: 0.5;
      filter: blur(0.35px);
      animation: specter-overlay 5.8s ease-in-out infinite;
      z-index: 1;
    }

    .specter-sprite {
      position: absolute;
      width: clamp(96px, 12vw, 180px);
      height: clamp(96px, 12vw, 180px);
      transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) scale(var(--scale, 1));
      filter:
        hue-rotate(90deg)
        saturate(2.75)
        contrast(1.9)
        drop-shadow(0 0 8px rgba(57, 255, 20, 0.65));
      mix-blend-mode: screen;
      image-rendering: pixelated;
      opacity: 0;
      animation: specter-fade 1s ease-out forwards;
      pointer-events: none;
    }

    .specter-sprite--fallback {
      background:
        radial-gradient(circle at center, rgba(57, 255, 20, 0.65) 0%, rgba(57, 255, 20, 0.1) 60%, transparent 75%);
      border: 1px solid rgba(57, 255, 20, 0.35);
    }

    .specter-layer::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        repeating-linear-gradient(
          90deg,
          rgba(57, 255, 20, 0.08) 0,
          rgba(57, 255, 20, 0.08) 3px,
          transparent 3px,
          transparent 6px
        );
      opacity: 0.18;
      mix-blend-mode: screen;
      animation: despair-noise 1.2s steps(3, end) infinite;
    }

    .player-scene {
      position: relative;
      gap: clamp(1.5rem, 4vw, 2.5rem);
      min-height: clamp(24rem, 70vh, 38rem);
      width: min(100%, 1120px);
      padding: clamp(2rem, 6vw, 4rem);
      justify-content: center;
      align-items: center;
      transform-style: preserve-3d;
      transform: translateZ(50px) scale(0.95) rotateX(2.5deg);
      animation: player-drift 7.2s ease-in-out infinite alternate;
    }

    .player-scene::before {
      content: '';
      position: absolute;
      inset: -12%;
      pointer-events: none;
      background:
        radial-gradient(circle at center, rgba(57, 255, 20, 0.18) 0%, transparent 70%),
        repeating-linear-gradient(
          90deg,
          rgba(57, 255, 20, 0.08) 0,
          rgba(57, 255, 20, 0.08) 2px,
          transparent 2px,
          transparent 5px
        );
      opacity: 0.45;
      mix-blend-mode: screen;
      animation: player-overlay 5.5s ease-in-out infinite;
      z-index: 0;
    }

    .player-wrap {
      position: relative;
      display: grid;
      grid-template-columns: minmax(160px, 240px) minmax(320px, 1fr);
      gap: clamp(1.5rem, 4vw, 3.5rem);
      width: min(92vw, 1080px);
      padding: clamp(1.5rem, 4vw, 3rem);
      border: 1.5px solid rgba(57, 255, 20, 0.35);
      border-radius: 14px;
      background: rgba(5, 12, 18, 0.65);
      box-shadow:
        0 0 32px rgba(57, 255, 20, 0.25),
        inset 0 0 24px rgba(57, 255, 20, 0.18);
      backdrop-filter: blur(2px);
      z-index: 1;
    }

    .player-tracklist {
      display: flex;
      flex-direction: column;
      gap: clamp(0.35rem, 1vw, 0.75rem);
      letter-spacing: clamp(0.12rem, 0.45vw, 0.22rem);
      font-size: clamp(0.6rem, 1.15vw, 0.85rem);
    }

    .player-track {
      position: relative;
      padding: clamp(0.35rem, 1vw, 0.6rem) clamp(0.45rem, 1.2vw, 0.85rem);
      border: 1px solid rgba(57, 255, 20, 0.25);
      border-radius: 6px;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      background: rgba(3, 8, 12, 0.55);
      color: rgba(57, 255, 20, 0.85);
    }

    .player-track::before,
    .player-track::after {
      content: attr(data-label);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: 0;
    }

    .player-track::before {
      color: var(--glitch-cyan);
      mix-blend-mode: screen;
    }

    .player-track::after {
      color: var(--glitch-magenta);
      mix-blend-mode: lighten;
    }

    .player-track:hover,
    .player-track:focus-visible {
      transform: translateX(clamp(0.2rem, 1vw, 0.6rem));
      border-color: rgba(57, 255, 20, 0.55);
      box-shadow:
        0 0 16px rgba(57, 255, 20, 0.32),
        inset 0 0 14px rgba(57, 255, 20, 0.24);
      animation: glitch-shake 340ms steps(2, end) infinite;
    }

    .player-track:hover::before,
    .player-track:hover::after,
    .player-track:focus-visible::before,
    .player-track:focus-visible::after {
      opacity: 0.6;
      animation: glitch-slice 210ms steps(2, end) infinite;
    }

    .player-track.is-active {
      border-color: rgba(57, 255, 20, 0.85);
      box-shadow:
        0 0 20px rgba(57, 255, 20, 0.4),
        inset 0 0 18px rgba(57, 255, 20, 0.28);
      color: var(--neon);
    }

    .player-visual {
      display: grid;
      grid-template-rows: auto minmax(180px, 1fr) auto auto;
      gap: clamp(0.75rem, 2.5vw, 1.5rem);
      position: relative;
    }

    .player-current {
      text-transform: uppercase;
      letter-spacing: clamp(0.18rem, 0.6vw, 0.3rem);
      font-size: clamp(0.75rem, 1.6vw, 1.05rem);
      color: rgba(57, 255, 20, 0.8);
      line-height: 1.4;
    }

    .player-canvas-wrap {
      position: relative;
      border: 1.5px solid rgba(57, 255, 20, 0.4);
      border-radius: 8px;
      background: rgba(1, 6, 10, 0.7);
      overflow: hidden;
      box-shadow:
        inset 0 0 18px rgba(57, 255, 20, 0.15),
        0 0 24px rgba(57, 255, 20, 0.18);
    }

    .player-canvas {
      width: 100%;
      height: clamp(160px, 28vh, 240px);
      display: block;
      image-rendering: pixelated;
    }

    .player-progress {
      display: flex;
      flex-direction: column;
      gap: clamp(0.35rem, 1vw, 0.6rem);
    }

    .player-progress__track {
      position: relative;
      height: clamp(8px, 1.2vw, 12px);
      border: 1px solid rgba(57, 255, 20, 0.4);
      border-radius: 999px;
      background: rgba(2, 6, 10, 0.7);
      overflow: hidden;
      cursor: pointer;
      touch-action: none;
    }

    .player-progress__fill {
      position: absolute;
      inset: 0;
      width: 0%;
      background: linear-gradient(90deg, rgba(57, 255, 20, 0.25) 0%, rgba(57, 255, 20, 0.85) 100%);
      pointer-events: none;
    }

    .player-timecodes {
      display: flex;
      justify-content: space-between;
      letter-spacing: clamp(0.12rem, 0.45vw, 0.24rem);
      font-size: clamp(0.6rem, 1.2vw, 0.85rem);
      opacity: 0.75;
    }

    .player-controls {
      display: flex;
      gap: clamp(0.75rem, 2vw, 1.5rem);
      align-items: center;
    }

    .player-button {
      position: relative;
      padding: clamp(0.5rem, 1.4vw, 0.9rem) clamp(1.35rem, 3vw, 2.1rem);
      border: 1.5px solid rgba(57, 255, 20, 0.45);
      border-radius: 8px;
      background: rgba(3, 8, 12, 0.6);
      color: var(--neon);
      text-transform: uppercase;
      letter-spacing: clamp(0.16rem, 0.6vw, 0.3rem);
      cursor: pointer;
      overflow: hidden;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      touch-action: manipulation;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
    }

    .player-button::before,
    .player-button::after {
      content: attr(data-label);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
    }

    .player-button::before {
      color: var(--glitch-cyan);
      mix-blend-mode: screen;
    }

    .player-button::after {
      color: var(--glitch-magenta);
      mix-blend-mode: lighten;
    }

    .player-button:hover,
    .player-button:focus-visible {
      transform: translateY(-1px);
      border-color: rgba(57, 255, 20, 0.75);
      box-shadow:
        0 0 22px rgba(57, 255, 20, 0.35),
        inset 0 0 18px rgba(57, 255, 20, 0.24);
      animation: glitch-shake 320ms steps(2, end) infinite;
    }

    .player-button:hover::before,
    .player-button:hover::after,
    .player-button:focus-visible::before,
    .player-button:focus-visible::after {
      opacity: 0.6;
      animation: glitch-slice 220ms steps(2, end) infinite;
    }

    .player-button[disabled] {
      cursor: not-allowed;
      opacity: 0.55;
      animation: none;
    }

    .scene-control--top {
      top: clamp(0.75rem, 3.5vw, 1.5rem);
      left: clamp(0.75rem, 3.5vw, 1.5rem);
      z-index: 4;
    }

    .whisper-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      font-size: clamp(0.5rem, 1.2vw, 0.85rem);
    }

    .whisper {
      position: absolute;
      color: var(--neon);
      letter-spacing: clamp(0.18rem, 0.45vw, 0.28rem);
      opacity: 0;
      animation: whisper-fade 1s linear forwards;
      white-space: nowrap;
      text-transform: uppercase;
      pointer-events: auto;
    }

    .whisper--follow {
      color: #ff3131;
      text-shadow:
        calc(var(--pixel-size) * -1) 0 0 rgba(0, 0, 0, 0.65),
        calc(var(--pixel-size)) 0 0 rgba(0, 0, 0, 0.65),
        0 calc(var(--pixel-size) * -1) 0 rgba(0, 0, 0, 0.65),
        0 calc(var(--pixel-size)) 0 rgba(0, 0, 0, 0.65),
        0 0 calc(var(--pixel-size) * 4) rgba(255, 49, 49, 0.45);
      cursor: pointer;
    }

    .footer-text {
      align-self: center;
      margin-top: clamp(1.5rem, 4vw, 2.75rem);
      font-size: clamp(0.75rem, 2vw, 1.15rem);
      letter-spacing: clamp(0.35rem, 1vw, 0.6rem);
      text-transform: uppercase;
    }

    @keyframes glitch-shake {
      0% { transform: scale(1.02) translate(0, 0); }
      20% { transform: scale(1.02) translate(-1px, 1px); }
      40% { transform: scale(1.02) translate(2px, -1px); }
      60% { transform: scale(1.02) translate(-2px, -2px); }
      80% { transform: scale(1.02) translate(1px, 2px); }
      100% { transform: scale(1.02) translate(0, 0); }
    }

    @keyframes glitch-slice {
      0% {
        clip-path: inset(15% 0 70% 0);
        transform: translate(-2px, 0);
      }
      33% {
        clip-path: inset(45% 0 35% 0);
        transform: translate(2px, 1px);
      }
      66% {
        clip-path: inset(75% 0 5% 0);
        transform: translate(-1px, -1px);
      }
      100% {
        clip-path: inset(5% 0 75% 0);
        transform: translate(1px, -2px);
      }
    }

    @keyframes rights-hum {
      0%,
      100% {
        transform: scale(0.97);
        opacity: 0.35;
      }
      45% {
        transform: scale(1.02);
        opacity: 0.55;
      }
      70% {
        transform: scale(0.99);
        opacity: 0.4;
      }
    }

    @keyframes rights-text-glitch {
      0% {
        transform: translate(0, 0);
        opacity: 0.6;
      }
      25% {
        transform: translate(-2px, 1px);
        opacity: 0.9;
      }
      50% {
        transform: translate(2px, -2px);
        opacity: 0.75;
      }
      75% {
        transform: translate(-3px, -1px);
        opacity: 0.85;
      }
      100% {
        transform: translate(0, 0);
        opacity: 0.7;
      }
    }

    @keyframes rights-text-flicker {
      0%,
      100% {
        text-shadow:
          calc(var(--pixel-size) * -1) 0 0 rgba(0, 0, 0, 0.6),
          calc(var(--pixel-size)) 0 0 rgba(0, 0, 0, 0.6),
          0 calc(var(--pixel-size) * -1) 0 rgba(0, 0, 0, 0.6),
          0 calc(var(--pixel-size)) 0 rgba(0, 0, 0, 0.6),
          0 0 calc(var(--pixel-size) * 4) rgba(57, 255, 20, 0.45);
      }
      50% {
        text-shadow:
          calc(var(--pixel-size) * -1.5) 0 0 rgba(0, 0, 0, 0.7),
          calc(var(--pixel-size) * 1.5) 0 0 rgba(0, 0, 0, 0.7),
          0 calc(var(--pixel-size) * -1.5) 0 rgba(0, 0, 0, 0.7),
          0 calc(var(--pixel-size) * 1.5) 0 rgba(0, 0, 0, 0.7),
          0 0 calc(var(--pixel-size) * 6) rgba(57, 255, 20, 0.65);
      }
    }

    @keyframes rights-noise {
      0% {
        opacity: 0.1;
        transform: translate3d(0, 0, 0);
      }
      50% {
        opacity: 0.5;
        transform: translate3d(2%, -3%, 0);
      }
      100% {
        opacity: 0.1;
        transform: translate3d(-2%, 2%, 0);
      }
    }

    @keyframes overlay-fault {
      0% {
        opacity: 0;
        transform: translate3d(0, 0, 0) scale(1);
      }
      30% {
        opacity: 1;
        transform: translate3d(-2%, 1%, 0) scale(1.03);
      }
      60% {
        opacity: 1;
        transform: translate3d(2%, -1%, 0) scale(1.04);
      }
      100% {
        opacity: 0;
        transform: translate3d(0, 0, 0) scale(1);
      }
    }

    @keyframes overlay-shudder {
      0% {
        opacity: 0.2;
        transform: translate3d(0, 0, 0);
      }
      50% {
        opacity: 0.75;
        transform: translate3d(4%, -3%, 0);
      }
      100% {
        opacity: 0;
        transform: translate3d(-4%, 2%, 0);
      }
    }

    @keyframes password-error {
      0% {
        opacity: 0;
        transform: translate3d(0, 0, 0) scale(1);
      }
      10% {
        opacity: 0.85;
        transform: translate3d(3%, -2%, 0) scale(1.04);
      }
      35% {
        opacity: 1;
        transform: translate3d(-4%, 1%, 0) scale(1.06);
      }
      60% {
        opacity: 0.8;
        transform: translate3d(2%, 2%, 0) scale(1.02);
      }
      100% {
        opacity: 0;
        transform: translate3d(0, 0, 0) scale(1);
      }
    }

    @keyframes despair-field {
      0%,
      100% {
        opacity: 0.3;
        transform: scale(0.95);
      }
      45% {
        opacity: 0.55;
        transform: scale(1.05);
      }
      70% {
        opacity: 0.4;
        transform: scale(1);
      }
    }

    @keyframes despair-glitch {
      0% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(-3px, 2px);
      }
      50% {
        transform: translate(2px, -2px);
      }
      75% {
        transform: translate(-2px, -1px);
      }
      100% {
        transform: translate(0, 0);
      }
    }

    @keyframes despair-flicker {
      0%,
      100% {
        text-shadow:
          calc(var(--pixel-size) * -1) 0 0 rgba(0, 0, 0, 0.6),
          calc(var(--pixel-size)) 0 0 rgba(0, 0, 0, 0.6),
          0 calc(var(--pixel-size) * -1) 0 rgba(0, 0, 0, 0.6),
          0 calc(var(--pixel-size)) 0 rgba(0, 0, 0, 0.6),
          0 0 calc(var(--pixel-size) * 5) rgba(57, 255, 20, 0.5);
      }
      50% {
        text-shadow:
          calc(var(--pixel-size) * -1.6) 0 0 rgba(0, 0, 0, 0.75),
          calc(var(--pixel-size) * 1.6) 0 0 rgba(0, 0, 0, 0.75),
          0 calc(var(--pixel-size) * -1.6) 0 rgba(0, 0, 0, 0.75),
          0 calc(var(--pixel-size) * 1.6) 0 rgba(0, 0, 0, 0.75),
          0 0 calc(var(--pixel-size) * 7) rgba(57, 255, 20, 0.65);
      }
    }

    @keyframes despair-noise {
      0% {
        opacity: 0.1;
        transform: translate3d(0, 0, 0);
      }
      50% {
        opacity: 0.55;
        transform: translate3d(-3%, 2%, 0);
      }
      100% {
        opacity: 0.2;
        transform: translate3d(3%, -2%, 0);
      }
    }

    @keyframes specter-fade {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.92) rotate(var(--rotation, 0deg));
      }
      18% {
        opacity: 1;
      }
      70% {
        opacity: 0.85;
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.05) rotate(var(--rotation, 0deg));
      }
    }

    @keyframes specter-breathe {
      0% {
        transform: translateZ(45px) scale(0.97) rotateX(2deg);
        box-shadow:
          inset 0 0 30px rgba(0, 0, 0, 0.6),
          inset 0 0 90px rgba(57, 255, 20, 0.1);
      }
      50% {
        transform: translateZ(60px) scale(0.99) rotateX(0.8deg);
        box-shadow:
          inset 0 0 60px rgba(0, 0, 0, 0.55),
          inset 0 0 140px rgba(57, 255, 20, 0.15);
      }
      100% {
        transform: translateZ(75px) scale(1) rotateX(-0.6deg);
        box-shadow:
          inset 0 0 50px rgba(0, 0, 0, 0.5),
          inset 0 0 110px rgba(57, 255, 20, 0.12);
      }
    }

    @keyframes specter-overlay {
      0%,
      100% {
        opacity: 0.35;
        transform: translate3d(0, 0, 0);
      }
      40% {
        opacity: 0.6;
        transform: translate3d(-1.5%, 1.5%, 0);
      }
      70% {
        opacity: 0.45;
        transform: translate3d(1.2%, -1.2%, 0);
      }
    }

    @keyframes player-drift {
      0% {
        transform: translateZ(50px) scale(0.95) rotateX(2.5deg);
      }
      45% {
        transform: translateZ(65px) scale(0.97) rotateX(1.2deg);
      }
      100% {
        transform: translateZ(80px) scale(0.99) rotateX(-0.5deg);
      }
    }

    @keyframes player-overlay {
      0%,
      100% {
        opacity: 0.35;
        transform: translate3d(0, 0, 0);
      }
      40% {
        opacity: 0.55;
        transform: translate3d(-2%, 2%, 0);
      }
      70% {
        opacity: 0.45;
        transform: translate3d(1.5%, -1.5%, 0);
      }
    }

    @keyframes triangle-space-glow {
      0%,
      100% {
        transform: scale(0.96);
        opacity: 0.4;
      }
      40% {
        transform: scale(1.05);
        opacity: 0.65;
      }
      70% {
        transform: scale(0.99);
        opacity: 0.5;
      }
    }

    @keyframes crt-flicker {
      0%, 100% { opacity: 0.6; }
      7% { opacity: 0.8; }
      12% { opacity: 0.5; }
      28% { opacity: 0.7; }
      35% { opacity: 0.4; }
      50% { opacity: 0.75; }
      68% { opacity: 0.45; }
      73% { opacity: 0.7; }
      87% { opacity: 0.5; }
    }

    @keyframes crt-warp {
      0%,
      100% {
        transform: skewX(0deg) skewY(0deg) scale(1.01);
        background-position: 0% 0%;
      }
      20% {
        transform: skewX(-1.25deg) skewY(0.45deg) scale(1.03);
        background-position: 25% 10%;
      }
      50% {
        transform: skewX(0.95deg) skewY(-0.65deg) scale(1.015);
        background-position: 50% 0%;
      }
      75% {
        transform: skewX(-0.75deg) skewY(0.75deg) scale(1.025);
        background-position: 75% 12%;
      }
    }

    @keyframes triangle-glitch {
      0% {
        transform: translate3d(0, 0, 0);
      }
      25% {
        transform: translate3d(3px, -2px, 0) skewX(2deg);
      }
      50% {
        transform: translate3d(-2px, 3px, 0) skewY(-2deg);
      }
      75% {
        transform: translate3d(1px, -3px, 0) scale(1.02);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes crt-lens {
      0% {
        transform: translateZ(-20px) scale(0.95);
        opacity: 0.4;
      }
      40% {
        transform: translateZ(-30px) scale(1.05);
        opacity: 0.55;
      }
      70% {
        transform: translateZ(-25px) scale(1);
        opacity: 0.5;
      }
      100% {
        transform: translateZ(-20px) scale(0.95);
        opacity: 0.4;
      }
    }

    @keyframes crt-drift {
      0% {
        transform: rotateX(3deg) rotateY(-2deg) scale3d(1.01, 1.01, 1);
      }
      25% {
        transform: rotateX(-1.5deg) rotateY(1.75deg) translate3d(0, -6px, 0) scale3d(1.02, 1.02, 1);
      }
      50% {
        transform: rotateX(2deg) rotateY(2.5deg) translate3d(0, 4px, 0) scale3d(1.015, 1.015, 1);
      }
      75% {
        transform: rotateX(-2.5deg) rotateY(-1deg) translate3d(0, -3px, 0) scale3d(1.025, 1.025, 1);
      }
      100% {
        transform: rotateX(3deg) rotateY(-2deg) scale3d(1.01, 1.01, 1);
      }
    }

    @keyframes crt-breathe {
      0% {
        transform: translateZ(60px) scale(0.92) rotateX(3deg);
        filter: drop-shadow(0 0 14px rgba(57, 255, 20, 0.25));
      }
      50% {
        transform: translateZ(90px) scale(0.95) rotateX(1deg);
        filter: drop-shadow(0 0 18px rgba(57, 255, 20, 0.45));
      }
      100% {
        transform: translateZ(120px) scale(0.98) rotateX(-1deg);
        filter: drop-shadow(0 0 28px rgba(57, 255, 20, 0.55));
      }
    }

    @keyframes whisper-fade {
      0% {
        opacity: 0;
        transform: translate3d(0, 4px, 0);
      }
      10%,
      70% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      100% {
        opacity: 0;
        transform: translate3d(0, -3px, 0);
      }
    }

    @media (max-width: 640px), (pointer: coarse) and (orientation: portrait) {
      :root {
        --pixel-size: 1px;
      }

      body.crt-body {
        perspective: 560px;
        align-items: flex-start;
        justify-content: flex-start;
        padding: clamp(0.5rem, 4vh, 1rem) 0;
        overflow-y: auto;
      }

      .crt-container {
        width: min(100%, 360px);
        min-height: auto;
        padding: clamp(0.9rem, 4vw, 1.6rem) clamp(0.75rem, 4vw, 1.2rem);
        animation: none;
      }

      .scene {
        padding: clamp(1rem, 4.5vw, 1.75rem) clamp(0.75rem, 5vw, 1.35rem);
        transform: translateZ(12px) scale(0.8) rotateX(0.4deg);
        gap: clamp(0.65rem, 4vw, 1.15rem);
      }

      .pixel-text {
        letter-spacing: clamp(0.08rem, 0.5vw, 0.18rem);
      }

      .scene-control {
        font-size: clamp(0.55rem, 2.2vw, 0.8rem);
        padding: clamp(0.35rem, 3vw, 0.6rem) clamp(0.6rem, 4vw, 0.95rem);
        top: clamp(0.6rem, 3vw, 1rem);
        left: clamp(0.6rem, 3vw, 1rem);
      }

      .question {
        font-size: clamp(1rem, 4.6vw, 1.8rem);
        letter-spacing: clamp(0.05rem, 0.8vw, 0.12rem);
        max-width: 20ch;
      }

      .button-row {
        gap: clamp(0.55rem, 3.5vw, 0.9rem);
        flex-direction: column;
      }

      .glitch-button {
        width: min(13rem, 100%);
        font-size: clamp(0.6rem, 2.6vw, 0.85rem);
        padding: clamp(0.38rem, 3vw, 0.65rem) clamp(0.75rem, 4.6vw, 1.1rem);
      }

      .triangle-scene,
      .rights-scene,
      .despair-scene,
      .specter-scene,
      .password-scene,
      .player-scene {
        min-height: clamp(16rem, 65vh, 24rem);
        gap: clamp(0.75rem, 4vw, 1.2rem);
        padding: clamp(1rem, 5vw, 2rem);
        transform: translateZ(12px) scale(0.85) rotateX(0.35deg);
      }

      .triangle-space {
        width: min(78vw, 17rem);
      }

      .password-stack,
      .rights-text-wrap,
      .despair-wrap,
      .player-wrap {
        padding: clamp(0.85rem, 4vw, 1.6rem);
      }

      .password-prompt,
      .password-button,
      .rights-text,
      .despair-text,
      .player-current,
      .player-button {
        font-size: clamp(0.7rem, 2.8vw, 1.05rem);
        letter-spacing: clamp(0.1rem, 0.7vw, 0.22rem);
      }

      .password-input {
        font-size: clamp(0.65rem, 2.6vw, 0.95rem);
        padding: clamp(0.45rem, 3vw, 0.6rem) clamp(0.6rem, 5vw, 0.9rem);
      }

      .player-wrap {
        grid-template-columns: 1fr;
        gap: clamp(0.9rem, 3.5vw, 1.4rem);
      }

      .player-tracklist {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.35rem;
        justify-content: center;
        font-size: clamp(0.5rem, 2.4vw, 0.7rem);
        letter-spacing: clamp(0.08rem, 0.55vw, 0.16rem);
      }

      .player-track {
        flex: 1 1 calc(45% - 0.3rem);
        font-size: inherit;
        padding: clamp(0.28rem, 3vw, 0.48rem) clamp(0.42rem, 4vw, 0.7rem);
      }

      .player-visual {
        gap: clamp(0.6rem, 3vw, 1.1rem);
      }

      .player-canvas {
        height: clamp(110px, 26vh, 160px);
      }

      .player-progress {
        gap: clamp(0.3rem, 3vw, 0.5rem);
      }

      .player-progress__track {
        height: clamp(6px, 1vw, 10px);
      }

      .player-timecodes {
        font-size: clamp(0.5rem, 2.4vw, 0.75rem);
        letter-spacing: clamp(0.08rem, 0.55vw, 0.16rem);
      }

      .player-controls {
        justify-content: center;
        gap: clamp(0.45rem, 3vw, 0.8rem);
      }

      .player-button {
        padding: clamp(0.45rem, 3vw, 0.65rem) clamp(1rem, 5vw, 1.4rem);
      }

      .footer-text {
        font-size: clamp(0.6rem, 2.2vw, 0.9rem);
        letter-spacing: clamp(0.22rem, 0.8vw, 0.38rem);
        margin-top: clamp(1rem, 4vw, 1.6rem);
      }

      .whisper-layer {
        font-size: clamp(0.45rem, 2.5vw, 0.65rem);
      }
    }

    @media (max-width: 420px), (pointer: coarse) and (max-width: 540px) and (orientation: portrait) {
      .scene {
        gap: clamp(0.5rem, 4vw, 0.8rem);
        transform: translateZ(8px) scale(0.75) rotateX(0.2deg);
      }

      .question {
        font-size: clamp(0.95rem, 5.2vw, 1.5rem);
        max-width: 22ch;
      }

      .button-row {
        gap: clamp(0.45rem, 4vw, 0.7rem);
      }

      .glitch-button {
        width: 100%;
        font-size: clamp(0.55rem, 2.8vw, 0.75rem);
        padding: clamp(0.32rem, 3vw, 0.5rem) clamp(0.65rem, 6vw, 0.95rem);
      }

      .scene-control {
        font-size: clamp(0.5rem, 2.5vw, 0.7rem);
        top: clamp(0.45rem, 4vw, 0.8rem);
        left: clamp(0.45rem, 4vw, 0.8rem);
      }

      .player-tracklist {
        flex-direction: column;
        align-items: stretch;
        gap: 0.3rem;
      }

      .player-track {
        flex: 1 1 auto;
        width: 100%;
        font-size: clamp(0.48rem, 2.2vw, 0.62rem);
        padding: clamp(0.26rem, 3vw, 0.42rem) clamp(0.38rem, 4.5vw, 0.6rem);
      }

      .player-controls {
        flex-direction: column;
        gap: clamp(0.35rem, 4vw, 0.6rem);
      }

      .player-button {
        width: 100%;
      }

      .player-canvas {
        height: clamp(90px, 24vh, 130px);
      }
    }
  `;

  document.head.appendChild(style);

  const body = document.body;
  body.classList.add('crt-body');

  const triangleState = {
    scene: null,
    space: null,
    shell: null,
    triangle: null,
    whispers: null,
    activeWhispers: [],
    lastWordTime: 0,
    sideCooldowns: [0, 0, 0],
    wordCooldown: 260,
    wordLifetime: 1000,
    triggerRadius: 42,
    wordOffset: 54,
    wasInside: false,
    lastGlitch: 0,
    glitchCooldown: 1200,
    glitchTimer: null,
    audio: null,
    interactionsBound: false,
    followListenerAttached: false,
  };

  const rightsState = {
    scene: null,
    text: null,
    noise: null,
    audio: null,
    isPlaying: false,
    pendingTransition: false,
  };

  const passwordState = {
    scene: null,
    stack: null,
    input: null,
    button: null,
    errorOverlay: null,
    errorTimer: null,
    errorAudio: null,
    isSubmitting: false,
  };

  const despairState = {
    scene: null,
    text: null,
    noise: null,
    audio: null,
    timer: null,
    isPlaying: false,
    pendingTransition: false,
  };

  const specterState = {
    scene: null,
    layer: null,
    imageSources: [],
    useFallback: true,
    preloadedSources: new Set(),
    activeSprites: [],
    durationTimer: null,
    pointerListenerBound: false,
    lastSpawnTime: 0,
    spawnInterval: 110,
    spriteLifetime: 1000,
    duration: 7000,
    pendingTransition: false,
  };

  const playerState = {
    scene: null,
    wrap: null,
    trackList: null,
    visual: null,
    currentLabel: null,
    canvas: null,
    canvasCtx: null,
    progressTrack: null,
    progressFill: null,
    currentTimeEl: null,
    durationEl: null,
    playButton: null,
    pauseButton: null,
    tracks: [],
    activeIndex: 0,
    audio: null,
    audioContext: null,
    analyser: null,
    sourceNode: null,
    dataArray: null,
    animationFrame: null,
    isPlaying: false,
    isScrubbing: false,
  };

  const container = document.createElement('div');
  container.className = 'crt-container';

  const scenes = {};
  const introScene = createIntroScene();
  const triangleScene = createTriangleScene();
  const rightsScene = createRightsScene();
  const passwordScene = createPasswordScene();
  const despairScene = createDespairScene();
  const specterScene = createSpecterScene();
  const playerScene = createPlayerScene();

  scenes.intro = introScene;
  scenes.triangle = triangleScene;
  scenes.rights = rightsScene;
  scenes.password = passwordScene;
  scenes.despair = despairScene;
  scenes.specter = specterScene;
  scenes.player = playerScene;

  container.append(introScene, triangleScene, rightsScene, passwordScene, despairScene, specterScene, playerScene);
  body.replaceChildren(container);

  let currentScene = null;
  activateScene('intro');

  function activateScene(target) {
    if (currentScene === target) {
      return;
    }
    const previousScene = currentScene;
    currentScene = target;
    Object.entries(scenes).forEach(([key, scene]) => {
      if (key === target) {
        scene.classList.remove('is-hidden');
        scene.setAttribute('aria-hidden', 'false');
      } else {
        scene.classList.add('is-hidden');
        scene.setAttribute('aria-hidden', 'true');
      }
    });
    switch (target) {
      case 'triangle':
        prepareTriangleScene();
        break;
      case 'rights':
        prepareRightsScene();
        break;
      case 'password':
        preparePasswordScene();
        break;
      case 'despair':
        prepareDespairScene();
        break;
      case 'specter':
        prepareSpecterScene();
        break;
      case 'player':
        preparePlayerScene();
        break;
      default:
        break;
    }

    if (previousScene && previousScene !== target) {
      if (previousScene === 'rights') {
        cleanupRightsScene();
      } else if (previousScene === 'password') {
        cleanupPasswordScene();
      } else if (previousScene === 'despair') {
        cleanupDespairScene();
      } else if (previousScene === 'specter') {
        cleanupSpecterScene();
      } else if (previousScene === 'player') {
        cleanupPlayerScene();
      }
    }
  }

  function performGlitchTransition(nextSceneKey) {
    if (container.classList.contains('is-transitioning')) {
      return;
    }

    container.classList.add('is-transitioning');

    const overlay = document.createElement('div');
    overlay.className = 'glitch-overlay';
    container.appendChild(overlay);

    const switchDelay = 260;
    const totalDuration = 760;

    setTimeout(() => {
      activateScene(nextSceneKey);
    }, switchDelay);

    setTimeout(() => {
      overlay.remove();
      container.classList.remove('is-transitioning');
    }, totalDuration);
  }

  function createIntroScene() {
    const scene = document.createElement('div');
    scene.className = 'scene intro-scene';
    scene.dataset.scene = 'intro';
    scene.setAttribute('aria-hidden', 'false');

    const question = document.createElement('h1');
    question.className = 'question pixel-text';
    question.textContent = 'Who are you?';

    const buttonRow = document.createElement('div');
    buttonRow.className = 'button-row';

    const buttonDead = createGlitchButton('I am already dead');
    const buttonAlive = createGlitchButton('I am still alive');

    buttonDead.addEventListener('click', () => performGlitchTransition('triangle'));
    buttonAlive.addEventListener('click', () => performGlitchTransition('rights'));

    buttonRow.append(buttonDead, buttonAlive);

    const footer = createFooter();

    scene.append(question, buttonRow, footer);

    return scene;
  }

  function createTriangleScene() {
    const scene = document.createElement('div');
    scene.className = 'scene triangle-scene is-hidden';
    scene.dataset.scene = 'triangle';
    scene.setAttribute('aria-hidden', 'true');

    const backControl = document.createElement('button');
    backControl.type = 'button';
    backControl.className = 'scene-control scene-control--top pixel-text';
    backControl.dataset.label = 'Back';
    backControl.textContent = 'Back';
    backControl.addEventListener('click', () => performGlitchTransition('intro'));
    scene.append(backControl);

    const triangleSpace = document.createElement('div');
    triangleSpace.className = 'triangle-space';

    const triangleShell = document.createElement('div');
    triangleShell.className = 'triangle-shell';

    const triangle = document.createElement('div');
    triangle.className = 'triangle';
    triangle.innerHTML = `
      <svg class="triangle-svg" viewBox="0 0 120 110" aria-hidden="true" focusable="false">
        <polygon class="triangle-shadow" points="60 6 8 104 112 104"></polygon>
        <polygon class="triangle-outline" points="60 6 8 104 112 104"></polygon>
        <polygon class="triangle-outline triangle-outline--highlight" points="60 6 8 104 112 104"></polygon>
      </svg>
    `;

    triangleShell.appendChild(triangle);
    triangleSpace.appendChild(triangleShell);

    const whisperLayer = document.createElement('div');
    whisperLayer.className = 'whisper-layer';
    triangleSpace.appendChild(whisperLayer);

    scene.append(triangleSpace);

    triangleState.scene = scene;
    triangleState.space = triangleSpace;
    triangleState.shell = triangleShell;
    triangleState.triangle = triangle;
    triangleState.whispers = whisperLayer;

    if (typeof Audio !== 'undefined' && !triangleState.audio) {
      const glitchAudio = new Audio('./assets/glitch%201.wav');
      glitchAudio.preload = 'auto';
      glitchAudio.volume = 0.55;
      triangleState.audio = glitchAudio;
    }

    setupTriangleInteractions();

    return scene;
  }

  function createPasswordScene() {
    const scene = document.createElement('div');
    scene.className = 'scene password-scene is-hidden';
    scene.dataset.scene = 'password';
    scene.setAttribute('aria-hidden', 'true');

    const backControl = document.createElement('button');
    backControl.type = 'button';
    backControl.className = 'scene-control scene-control--top pixel-text';
    backControl.dataset.label = 'Back';
    backControl.textContent = 'Back';
    backControl.addEventListener('click', () => performGlitchTransition('intro'));
    scene.append(backControl);

    const stack = document.createElement('div');
    stack.className = 'password-stack';

    const prompt = document.createElement('div');
    prompt.className = 'password-prompt pixel-text';
    prompt.textContent = 'Enter password';

    const input = document.createElement('input');
    input.type = 'password';
    input.className = 'password-input pixel-text';
    input.autocomplete = 'off';
    input.autocapitalize = 'none';
    input.spellcheck = false;
    input.maxLength = 32;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'password-button pixel-text';
    button.dataset.label = 'Enter the void';
    button.textContent = 'Enter the void';

    stack.append(prompt, input, button);

    const errorOverlay = document.createElement('div');
    errorOverlay.className = 'password-error';

    scene.append(stack, errorOverlay);

    passwordState.scene = scene;
    passwordState.stack = stack;
    passwordState.input = input;
    passwordState.button = button;
    passwordState.errorOverlay = errorOverlay;

    button.addEventListener('click', handlePasswordSubmit);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handlePasswordSubmit(event);
      }
    });

    if (typeof Audio !== 'undefined' && !passwordState.errorAudio) {
      const audio = new Audio('./assets/glitch%203.wav');
      audio.preload = 'auto';
      audio.volume = 0.6;
      passwordState.errorAudio = audio;
    }

    return scene;
  }

  function createRightsScene() {
    const scene = document.createElement('div');
    scene.className = 'scene rights-scene is-hidden';
    scene.dataset.scene = 'rights';
    scene.setAttribute('aria-hidden', 'true');

    const wrapper = document.createElement('div');
    wrapper.className = 'rights-text-wrap';

    const rightsText = document.createElement('div');
    rightsText.className = 'rights-text pixel-text';
    const message = 'You have no rights here';
    rightsText.textContent = message;
    rightsText.dataset.content = message;

    const noise = document.createElement('div');
    noise.className = 'rights-noise';

    wrapper.append(rightsText, noise);
    scene.append(wrapper);

    rightsState.scene = scene;
    rightsState.text = rightsText;
    rightsState.noise = noise;

    if (typeof Audio !== 'undefined' && !rightsState.audio) {
      const audio = new Audio('./assets/rights.wav');
      audio.preload = 'auto';
      audio.volume = 0.6;
      audio.addEventListener('ended', handleRightsAudioEnded);
      rightsState.audio = audio;
    }

    return scene;
  }

  function createDespairScene() {
    const scene = document.createElement('div');
    scene.className = 'scene despair-scene is-hidden';
    scene.dataset.scene = 'despair';
    scene.setAttribute('aria-hidden', 'true');

    const backControl = document.createElement('button');
    backControl.type = 'button';
    backControl.className = 'scene-control scene-control--top pixel-text';
    backControl.dataset.label = 'Back';
    backControl.textContent = 'Back';
    backControl.addEventListener('click', () => performGlitchTransition('intro'));
    scene.append(backControl);

    const wrap = document.createElement('div');
    wrap.className = 'despair-wrap';

    const message = 'Welcome to the frequency of despair';
    const text = document.createElement('div');
    text.className = 'despair-text pixel-text';
    text.textContent = message;
    text.dataset.content = message;

    const noise = document.createElement('div');
    noise.className = 'despair-noise';

    wrap.append(text, noise);
    scene.append(wrap);

    despairState.scene = scene;
    despairState.text = text;
    despairState.noise = noise;

    if (typeof Audio !== 'undefined' && !despairState.audio) {
      const audio = new Audio('./assets/despair.wav');
      audio.preload = 'auto';
      audio.volume = 0.6;
      audio.addEventListener('ended', handleDespairAudioEnded);
      despairState.audio = audio;
    }

    return scene;
  }

  function createSpecterScene() {
    const scene = document.createElement('div');
    scene.className = 'scene specter-scene is-hidden';
    scene.dataset.scene = 'specter';
    scene.setAttribute('aria-hidden', 'true');

    const backControl = document.createElement('button');
    backControl.type = 'button';
    backControl.className = 'scene-control scene-control--top pixel-text';
    backControl.dataset.label = 'Back';
    backControl.textContent = 'Back';
    backControl.addEventListener('click', () => performGlitchTransition('intro'));
    scene.append(backControl);

    const layer = document.createElement('div');
    layer.className = 'specter-layer';
    scene.append(layer);

    specterState.scene = scene;
    specterState.layer = layer;

    return scene;
  }

  function createPlayerScene() {
    const scene = document.createElement('div');
    scene.className = 'scene player-scene is-hidden';
    scene.dataset.scene = 'player';
    scene.setAttribute('aria-hidden', 'true');

    const backControl = document.createElement('button');
    backControl.type = 'button';
    backControl.className = 'scene-control scene-control--top pixel-text';
    backControl.dataset.label = 'Back';
    backControl.textContent = 'Back';
    backControl.addEventListener('click', () => performGlitchTransition('intro'));
    scene.append(backControl);

    const wrap = document.createElement('div');
    wrap.className = 'player-wrap';

    const trackList = document.createElement('div');
    trackList.className = 'player-tracklist';

    const visual = document.createElement('div');
    visual.className = 'player-visual';

    const currentLabel = document.createElement('div');
    currentLabel.className = 'player-current pixel-text';
    currentLabel.textContent = 'Select a track';

    const canvasWrap = document.createElement('div');
    canvasWrap.className = 'player-canvas-wrap';
    const canvas = document.createElement('canvas');
    canvas.className = 'player-canvas';
    canvasWrap.append(canvas);

    const progress = document.createElement('div');
    progress.className = 'player-progress';
    const progressTrack = document.createElement('div');
    progressTrack.className = 'player-progress__track';
    const progressFill = document.createElement('div');
    progressFill.className = 'player-progress__fill';
    progressTrack.append(progressFill);
    const timecodes = document.createElement('div');
    timecodes.className = 'player-timecodes pixel-text';
    const currentTime = document.createElement('span');
    currentTime.className = 'player-time player-time--current';
    currentTime.textContent = '0:00';
    const durationTime = document.createElement('span');
    durationTime.className = 'player-time player-time--duration';
    durationTime.textContent = '0:00';
    timecodes.append(currentTime, durationTime);
    progress.append(progressTrack, timecodes);

    const controls = document.createElement('div');
    controls.className = 'player-controls';
    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'player-button pixel-text';
    playButton.dataset.action = 'play';
    playButton.dataset.label = 'Play';
    playButton.textContent = 'Play';
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'player-button pixel-text';
    pauseButton.dataset.action = 'pause';
    pauseButton.dataset.label = 'Pause';
    pauseButton.textContent = 'Pause';
    controls.append(playButton, pauseButton);

    visual.append(currentLabel, canvasWrap, progress, controls);
    wrap.append(trackList, visual);
    scene.append(wrap);

    playerState.scene = scene;
    playerState.wrap = wrap;
    playerState.trackList = trackList;
    playerState.visual = visual;
    playerState.currentLabel = currentLabel;
    playerState.canvas = canvas;
    playerState.canvasCtx = canvas.getContext('2d', { alpha: true });
    playerState.progressTrack = progressTrack;
    playerState.progressFill = progressFill;
    playerState.currentTimeEl = currentTime;
    playerState.durationEl = durationTime;
    playerState.playButton = playButton;
    playerState.pauseButton = pauseButton;

    const audio = new Audio();
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';
    playerState.audio = audio;

    audio.addEventListener('timeupdate', updatePlayerProgress);
    audio.addEventListener('loadedmetadata', updatePlayerDuration);
    audio.addEventListener('ended', handlePlayerEnded);
    audio.addEventListener('play', handlePlayerPlay);
    audio.addEventListener('pause', handlePlayerPause);

    playButton.addEventListener('click', handlePlayButton);
    pauseButton.addEventListener('click', handlePauseButton);
    progressTrack.addEventListener('pointerdown', handleProgressPointerDown);
    window.addEventListener('pointerup', handleProgressPointerUp);
    window.addEventListener('pointermove', handleProgressPointerMove);
    window.addEventListener('resize', resizePlayerCanvas, { passive: true });

    return scene;
  }

  function createFooter() {
    const footerElement = document.createElement('div');
    footerElement.className = 'footer-text pixel-text';
    footerElement.textContent = 'overnow';
    return footerElement;
  }

  function prepareTriangleScene() {
    if (!triangleState.shell) {
      return;
    }
    triangleState.shell.style.transform = 'rotateX(0deg) rotateY(0deg)';
    triangleState.wasInside = false;
    triangleState.lastWordTime = 0;
    triangleState.sideCooldowns.fill(0);
    triangleState.scene?.classList.remove('glitching');
    if (triangleState.glitchTimer) {
      clearTimeout(triangleState.glitchTimer);
      triangleState.glitchTimer = null;
    }
    triangleState.activeWhispers.slice().forEach(destroyWhisper);
    attachFollowListener();
  }

  function prepareRightsScene() {
    if (!rightsState.scene) {
      return;
    }
    rightsState.pendingTransition = false;
    rightsState.scene.classList.add('is-playing');
    rightsState.isPlaying = true;

    if (rightsState.audio) {
      rightsState.audio.currentTime = 0;
      const playback = rightsState.audio.play();
      if (playback && typeof playback.catch === 'function') {
        playback.catch(() => {
          /* ignore autoplay restrictions */
        });
      }
    }
  }

  function cleanupRightsScene() {
    rightsState.scene?.classList.remove('is-playing');

    if (rightsState.audio) {
      rightsState.audio.pause();
      rightsState.audio.currentTime = 0;
    }

    rightsState.isPlaying = false;
    rightsState.pendingTransition = false;
  }

  function preparePasswordScene() {
    if (!passwordState.scene) {
      return;
    }
    passwordState.isSubmitting = false;
    if (passwordState.errorTimer) {
      clearTimeout(passwordState.errorTimer);
      passwordState.errorTimer = null;
    }
    passwordState.errorOverlay?.classList.remove('is-active');
    if (passwordState.input) {
      passwordState.input.value = '';
    }
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        passwordState.input?.focus();
      });
    });
  }

  function cleanupPasswordScene() {
    if (passwordState.errorTimer) {
      clearTimeout(passwordState.errorTimer);
      passwordState.errorTimer = null;
    }
    passwordState.errorOverlay?.classList.remove('is-active');
    passwordState.isSubmitting = false;

    if (passwordState.errorAudio) {
      passwordState.errorAudio.pause();
      passwordState.errorAudio.currentTime = 0;
    }
  }

  function handlePasswordSubmit(event) {
    event?.preventDefault();
    if (
      passwordState.isSubmitting ||
      !passwordState.input ||
      container.classList.contains('is-transitioning')
    ) {
      return;
    }
    const attempt = passwordState.input.value.trim().toLowerCase();
    if (attempt === 'overnow') {
      passwordState.isSubmitting = true;
      performGlitchTransition('despair');
    } else {
      triggerPasswordError();
    }
  }

  function triggerPasswordError() {
    if (passwordState.errorTimer) {
      clearTimeout(passwordState.errorTimer);
    }

    passwordState.errorOverlay?.classList.remove('is-active');
    void passwordState.errorOverlay?.offsetWidth;
    passwordState.errorOverlay?.classList.add('is-active');

    if (passwordState.errorAudio) {
      try {
        passwordState.errorAudio.currentTime = 0;
        passwordState.errorAudio.play();
      } catch (error) {
        /* ignore autoplay restrictions */
      }
    }

    passwordState.errorTimer = window.setTimeout(() => {
      passwordState.errorOverlay?.classList.remove('is-active');
      passwordState.errorTimer = null;
      passwordState.isSubmitting = false;
    }, 2000);
  }

  function prepareDespairScene() {
    if (!despairState.scene) {
      return;
    }
    despairState.scene.classList.add('is-playing');
    despairState.isPlaying = true;
    despairState.pendingTransition = false;

    if (despairState.audio) {
      despairState.audio.currentTime = 0;
      const playback = despairState.audio.play();
      if (playback && typeof playback.catch === 'function') {
        playback.catch(() => {
          /* ignore autoplay restrictions */
        });
      }
    }

    if (despairState.timer) {
      clearTimeout(despairState.timer);
    }

    despairState.timer = window.setTimeout(() => {
      handleDespairCompletion();
    }, 7000);
  }

  function cleanupDespairScene() {
    despairState.scene?.classList.remove('is-playing');
    despairState.isPlaying = false;
    despairState.pendingTransition = false;
    if (despairState.timer) {
      clearTimeout(despairState.timer);
      despairState.timer = null;
    }
    if (despairState.audio) {
      despairState.audio.pause();
      despairState.audio.currentTime = 0;
    }
  }

  function handleDespairCompletion() {
    if (despairState.pendingTransition) {
      return;
    }
    despairState.pendingTransition = true;
    if (despairState.timer) {
      clearTimeout(despairState.timer);
      despairState.timer = null;
    }
    despairState.isPlaying = false;
    if (despairState.audio) {
      despairState.audio.pause();
      despairState.audio.currentTime = 0;
    }
    const attempt = () => {
      if (container.classList.contains('is-transitioning')) {
        window.setTimeout(attempt, 140);
        return;
      }
      despairState.pendingTransition = false;
      performGlitchTransition('specter');
    };
    attempt();
  }

  function handleDespairAudioEnded() {
    if (!despairState.isPlaying) {
      return;
    }
    handleDespairCompletion();
  }

  function handleRightsAudioEnded() {
    if (!rightsState.isPlaying) {
      return;
    }
    rightsState.isPlaying = false;
    rightsState.scene?.classList.remove('is-playing');
    if (rightsState.pendingTransition) {
      return;
    }
    rightsState.pendingTransition = true;
    const attempt = () => {
      if (container.classList.contains('is-transitioning')) {
        window.setTimeout(attempt, 140);
        return;
      }
      rightsState.pendingTransition = false;
      performGlitchTransition('intro');
    };
    attempt();
  }

  function prepareSpecterScene() {
    if (!specterState.scene || !specterState.layer) {
      return;
    }
    specterState.imageSources = resolveSpecterImages();
    specterState.useFallback = specterState.imageSources.length === 0;
    specterState.activeSprites.forEach((sprite) => {
      if (sprite.timeoutId) {
        clearTimeout(sprite.timeoutId);
      }
      sprite.el.remove();
    });
    specterState.activeSprites = [];
    specterState.lastSpawnTime = 0;
    specterState.pendingTransition = false;
    preloadSpecterImages();

    if (!specterState.pointerListenerBound) {
      specterState.scene.addEventListener('pointermove', handleSpecterPointerMove);
      specterState.scene.addEventListener('pointerdown', handleSpecterPointerMove);
      specterState.pointerListenerBound = true;
    }

    if (specterState.durationTimer) {
      clearTimeout(specterState.durationTimer);
    }
    specterState.durationTimer = window.setTimeout(() => {
      scheduleSpecterExit();
    }, specterState.duration);
  }

  function cleanupSpecterScene() {
    if (specterState.durationTimer) {
      clearTimeout(specterState.durationTimer);
      specterState.durationTimer = null;
    }
    specterState.pendingTransition = false;
    specterState.activeSprites.forEach((record) => {
      if (record.timeoutId) {
        clearTimeout(record.timeoutId);
      }
      record.el.remove();
    });
    specterState.activeSprites = [];
    if (specterState.pointerListenerBound && specterState.scene) {
      specterState.scene.removeEventListener('pointermove', handleSpecterPointerMove);
      specterState.scene.removeEventListener('pointerdown', handleSpecterPointerMove);
      specterState.pointerListenerBound = false;
    }
  }

  function scheduleSpecterExit() {
    if (specterState.pendingTransition) {
      return;
    }
    specterState.pendingTransition = true;
    if (specterState.durationTimer) {
      clearTimeout(specterState.durationTimer);
      specterState.durationTimer = null;
    }
    const attempt = () => {
      if (container.classList.contains('is-transitioning')) {
        window.setTimeout(attempt, 140);
        return;
      }
      specterState.pendingTransition = false;
      performGlitchTransition('player');
    };
    attempt();
  }

  function handleSpecterPointerMove(event) {
    if (!specterState.scene || !specterState.layer || specterState.scene.classList.contains('is-hidden')) {
      return;
    }
    const now = performance.now();
    if (now - specterState.lastSpawnTime < specterState.spawnInterval) {
      return;
    }
    specterState.lastSpawnTime = now;

    const rect = specterState.layer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      return;
    }

    spawnSpecterSprite(x, y);
  }

  function spawnSpecterSprite(x, y) {
    if (!specterState.layer) {
      return;
    }

    const sprite = specterState.useFallback ? document.createElement('div') : document.createElement('img');
    sprite.className = 'specter-sprite';
    sprite.style.left = `${x}px`;
    sprite.style.top = `${y}px`;
    sprite.style.setProperty('--rotation', `${randomInRange(-9, 9)}deg`);
    sprite.style.setProperty('--scale', `${randomInRange(0.9, 1.1).toFixed(2)}`);
    sprite.draggable = false;

    if (specterState.useFallback) {
      sprite.classList.add('specter-sprite--fallback');
    } else {
      const source = pickSpecterImage();
      sprite.setAttribute('alt', '');
      sprite.setAttribute('decoding', 'async');
      sprite.setAttribute('loading', 'eager');
      sprite.src = source;
    }

    specterState.layer.appendChild(sprite);

    const record = {
      el: sprite,
      timeoutId: window.setTimeout(() => {
        sprite.remove();
        const index = specterState.activeSprites.indexOf(record);
        if (index !== -1) {
          specterState.activeSprites.splice(index, 1);
        }
      }, specterState.spriteLifetime),
    };

    specterState.activeSprites.push(record);
  }

  function resolveSpecterImages() {
    const globalList = Array.isArray(globalThis.OVERNOW_IMAGE_SOURCES)
      ? globalThis.OVERNOW_IMAGE_SOURCES
      : [];
    return globalList
      .filter((src) => typeof src === 'string' && src.trim().length > 0)
      .map((src) => encodeURI(src.trim()));
  }

  function pickSpecterImage() {
    if (!specterState.imageSources.length) {
      return '';
    }
    const index = Math.floor(Math.random() * specterState.imageSources.length);
    return specterState.imageSources[index];
  }

  function preloadSpecterImages() {
    if (!specterState.imageSources.length) {
      return;
    }
    specterState.imageSources.forEach((src) => {
      if (specterState.preloadedSources.has(src)) {
        return;
      }
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = src;
      specterState.preloadedSources.add(src);
    });
  }

  function preparePlayerScene() {
    if (!playerState.scene) {
      return;
    }
    playerState.tracks = resolvePlayerTracks();
    buildPlayerTrackList();
    if (playerState.tracks.length) {
      playerState.activeIndex = clamp(playerState.activeIndex ?? 0, 0, playerState.tracks.length - 1);
    } else {
      playerState.activeIndex = 0;
    }
    playerState.isPlaying = false;
    playerState.isScrubbing = false;
    playerState.animationFrame && cancelAnimationFrame(playerState.animationFrame);
    playerState.animationFrame = null;
    playerState.progressFill && (playerState.progressFill.style.width = '0%');
    if (playerState.currentTimeEl) {
      playerState.currentTimeEl.textContent = '0:00';
    }
    if (playerState.durationEl) {
      playerState.durationEl.textContent = '0:00';
    }
    resizePlayerCanvas();
    if (playerState.tracks.length > 0) {
      selectPlayerTrack(playerState.activeIndex, false);
    }
  }

  function cleanupPlayerScene() {
    stopWaveformAnimation();
    if (playerState.audio) {
      playerState.audio.pause();
      playerState.audio.currentTime = 0;
    }
    if (playerState.progressFill) {
      playerState.progressFill.style.width = '0%';
    }
    if (playerState.currentTimeEl) {
      playerState.currentTimeEl.textContent = '0:00';
    }
    playerState.isPlaying = false;
    playerState.isScrubbing = false;
  }

  function resolvePlayerTracks() {
    const configured = Array.isArray(globalThis.OVERNOW_TRACK_SOURCES)
      ? globalThis.OVERNOW_TRACK_SOURCES
      : [
          'assets/player mp3/0.1.mp3',
          'assets/player mp3/I deserve it.mp3',
          'assets/player mp3/I don\'t believe you anymore.mp3',
          'assets/player mp3/body.mp3',
          'assets/player mp3/bring sad here.mp3',
          'assets/player mp3/end.mp3',
          'assets/player mp3/eye.mp3',
          'assets/player mp3/hill.mp3',
          'assets/player mp3/hope.mp3',
          'assets/player mp3/kill me.mp3',
          'assets/player mp3/tremor.mp3',
        ];

    return configured
      .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
      .filter(Boolean)
      .map((src) => {
        const encodedSrc = encodeURI(src);
        return {
          src: encodedSrc,
          label: formatTrackLabel(src),
        };
      });
  }

  function buildPlayerTrackList() {
    if (!playerState.trackList) {
      return;
    }
    playerState.trackList.replaceChildren();

    if (!playerState.tracks.length) {
      const empty = document.createElement('div');
      empty.className = 'player-track pixel-text';
      empty.textContent = 'No tracks available';
      empty.style.opacity = '0.6';
      empty.style.cursor = 'default';
      playerState.trackList.append(empty);
      playerState.currentLabel && (playerState.currentLabel.textContent = 'No audio loaded');
      playerState.playButton && (playerState.playButton.disabled = true);
      playerState.pauseButton && (playerState.pauseButton.disabled = true);
      return;
    }

    playerState.playButton && (playerState.playButton.disabled = false);
    playerState.pauseButton && (playerState.pauseButton.disabled = false);

    playerState.tracks.forEach((track, index) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'player-track pixel-text';
      item.dataset.index = String(index);
      item.dataset.label = track.label;
      item.textContent = track.label;
      item.addEventListener('click', () => {
        selectPlayerTrack(index, true);
      });
      playerState.trackList.append(item);
    });
  }

  function selectPlayerTrack(index, autoplay) {
    if (!playerState.tracks.length || !playerState.audio) {
      return;
    }
    const clampedIndex = clamp(index, 0, playerState.tracks.length - 1);
    playerState.activeIndex = clampedIndex;
    const track = playerState.tracks[clampedIndex];
    if (!track) {
      return;
    }

    playerState.audio.pause();
    playerState.isPlaying = false;
    stopWaveformAnimation();

    const previousActive = playerState.trackList?.querySelector('.player-track.is-active');
    previousActive?.classList.remove('is-active');
    const nextActive = playerState.trackList?.querySelector(`[data-index="${clampedIndex}"]`);
    nextActive?.classList.add('is-active');

    if (playerState.currentLabel) {
      playerState.currentLabel.textContent = track.label;
    }

    playerState.audio.src = track.src;
    playerState.audio.load();
    playerState.progressFill && (playerState.progressFill.style.width = '0%');
    playerState.currentTimeEl && (playerState.currentTimeEl.textContent = '0:00');
    playerState.durationEl && (playerState.durationEl.textContent = '0:00');

    if (autoplay) {
      playCurrentTrack();
    }
  }

  function playCurrentTrack() {
    if (!playerState.audio) {
      return;
    }
    ensurePlayerAudioGraph();
    if (playerState.audioContext && playerState.audioContext.state === 'suspended') {
      playerState.audioContext.resume().catch(() => {});
    }
    playerState.audio.play().catch(() => {});
  }

  function ensurePlayerAudioGraph() {
    if (!playerState.audio) {
      return;
    }
    if (!playerState.audioContext) {
      const AudioContextCtor = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!AudioContextCtor) {
        return;
      }
      const context = new AudioContextCtor();
      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.85;
      const source = context.createMediaElementSource(playerState.audio);
      source.connect(analyser);
      analyser.connect(context.destination);
      playerState.audioContext = context;
      playerState.analyser = analyser;
      playerState.sourceNode = source;
      playerState.dataArray = new Uint8Array(analyser.frequencyBinCount);
    }
  }

  function handlePlayButton() {
    if (!playerState.audio) {
      return;
    }
    if (!playerState.tracks.length) {
      return;
    }
    if (!playerState.audio.src) {
      selectPlayerTrack(playerState.activeIndex ?? 0, false);
    }
    playCurrentTrack();
  }

  function handlePauseButton() {
    if (!playerState.audio) {
      return;
    }
    playerState.audio.pause();
  }

  function handlePlayerPlay() {
    playerState.isPlaying = true;
    startWaveformAnimation();
  }

  function handlePlayerPause() {
    playerState.isPlaying = false;
    stopWaveformAnimation();
  }

  function handlePlayerEnded() {
    playerState.isPlaying = false;
    stopWaveformAnimation();
    if (playerState.progressFill) {
      playerState.progressFill.style.width = '0%';
    }
    if (playerState.currentTimeEl) {
      playerState.currentTimeEl.textContent = '0:00';
    }
  }

  function updatePlayerProgress() {
    if (!playerState.audio || playerState.isScrubbing) {
      return;
    }
    const { currentTime, duration } = playerState.audio;
    const ratio = duration ? currentTime / duration : 0;
    setPlayerProgress(ratio);
  }

  function updatePlayerDuration() {
    if (!playerState.audio || !playerState.durationEl) {
      return;
    }
    if (Number.isFinite(playerState.audio.duration)) {
      playerState.durationEl.textContent = formatTime(playerState.audio.duration);
    }
  }

  function setPlayerProgress(ratio) {
    const clamped = clamp(ratio || 0, 0, 1);
    if (playerState.progressFill) {
      playerState.progressFill.style.width = `${clamped * 100}%`;
    }
    if (playerState.audio && playerState.currentTimeEl && !playerState.isScrubbing) {
      playerState.currentTimeEl.textContent = formatTime(playerState.audio.currentTime);
    }
  }

  function handleProgressPointerDown(event) {
    if (!playerState.progressTrack || !playerState.audio || !Number.isFinite(playerState.audio.duration)) {
      return;
    }
    playerState.isScrubbing = true;
    playerState.progressTrack.setPointerCapture(event.pointerId);
    seekPlayerAudio(event);
  }

  function handleProgressPointerMove(event) {
    if (!playerState.isScrubbing || !playerState.progressTrack || !playerState.audio) {
      return;
    }
    seekPlayerAudio(event);
  }

  function handleProgressPointerUp(event) {
    if (!playerState.isScrubbing) {
      return;
    }
    playerState.isScrubbing = false;
    if (playerState.progressTrack?.hasPointerCapture(event.pointerId)) {
      playerState.progressTrack.releasePointerCapture(event.pointerId);
    }
    if (playerState.audio) {
      playerState.audio.currentTime = clamp(
        playerState.audio.currentTime,
        0,
        Number.isFinite(playerState.audio.duration) ? playerState.audio.duration : playerState.audio.currentTime
      );
    }
  }

  function seekPlayerAudio(event) {
    if (
      !playerState.progressTrack ||
      !playerState.audio ||
      !Number.isFinite(playerState.audio.duration)
    ) {
      return;
    }
    const rect = playerState.progressTrack.getBoundingClientRect();
    const x = event.clientX ?? (event.touches && event.touches[0]?.clientX);
    if (typeof x !== 'number') {
      return;
    }
    const ratio = clamp((x - rect.left) / rect.width, 0, 1);
    if (playerState.progressFill) {
      playerState.progressFill.style.width = `${ratio * 100}%`;
    }
    const newTime = ratio * playerState.audio.duration;
    if (!Number.isNaN(newTime)) {
      playerState.audio.currentTime = newTime;
      if (playerState.currentTimeEl) {
        playerState.currentTimeEl.textContent = formatTime(newTime);
      }
    }
  }

  function resizePlayerCanvas() {
    if (!playerState.canvas || !playerState.canvasCtx) {
      return;
    }
    const ratio = globalThis.devicePixelRatio || 1;
    const width = playerState.canvas.clientWidth || 640;
    const height = playerState.canvas.clientHeight || 200;
    playerState.canvas.width = width * ratio;
    playerState.canvas.height = height * ratio;
    playerState.canvasCtx.setTransform(1, 0, 0, 1, 0, 0);
    playerState.canvasCtx.scale(ratio, ratio);
    playerState.canvasCtx.clearRect(0, 0, width, height);
    playerState.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    playerState.canvasCtx.fillRect(0, 0, width, height);
  }

  function startWaveformAnimation() {
    if (!playerState.analyser || !playerState.dataArray || !playerState.canvas || !playerState.canvasCtx) {
      return;
    }
    stopWaveformAnimation();
    const draw = () => {
      if (!playerState.analyser || !playerState.dataArray || !playerState.canvasCtx || !playerState.canvas) {
        return;
      }
      const ctx = playerState.canvasCtx;
      const width = playerState.canvas.clientWidth;
      const height = playerState.canvas.clientHeight;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      playerState.analyser.getByteFrequencyData(playerState.dataArray);

      const barCount = Math.min(playerState.dataArray.length, 256);
      const barWidth = (width / barCount) * 1.4;
      let x = 0;

      for (let i = 0; i < barCount; i += 1) {
        const value = playerState.dataArray[i] / 255;
        const barHeight = Math.max(6, value * height * 0.9);
        ctx.fillStyle = `rgba(57, 255, 20, ${0.35 + value * 0.65})`;
        ctx.fillRect(x, height - barHeight, barWidth * 0.75, barHeight);
        x += barWidth;
      }

      playerState.animationFrame = requestAnimationFrame(draw);
    };
    draw();
  }

  function stopWaveformAnimation() {
    if (playerState.animationFrame) {
      cancelAnimationFrame(playerState.animationFrame);
      playerState.animationFrame = null;
    }
  }

  function createGlitchButton(label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'glitch-button pixel-text';
    button.dataset.label = label;
    button.textContent = label;
    return button;
  }

  const wordsPool = ['dead', 'hush', 'end', 'now', 'follow'];

  function setupTriangleInteractions() {
    if (!triangleState.space || triangleState.interactionsBound) {
      return;
    }
    triangleState.space.addEventListener('pointermove', handleTrianglePointerMove);
    triangleState.space.addEventListener('pointerleave', handleTrianglePointerLeave);
    triangleState.interactionsBound = true;
  }

  function handleTrianglePointerMove(event) {
    if (!triangleState.space || triangleState.scene?.classList.contains('is-hidden')) {
      return;
    }

    const rect = triangleState.space.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const normX = x / rect.width - 0.5;
    const normY = 0.5 - y / rect.height;

    const rotateY = normX * 24;
    const rotateX = normY * 24;

    triangleState.shell.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const points = getTrianglePoints(rect);
    const inside = pointInTriangle({ x, y }, points);

    if (inside) {
      if (!triangleState.wasInside) {
        triangleState.wasInside = true;
        triggerTriangleGlitch();
      }
      return;
    }

    if (triangleState.wasInside) {
      triangleState.wasInside = false;
    }

    maybeSpawnWhisper({ x, y }, points, rect);
  }

  function handleTrianglePointerLeave() {
    if (!triangleState.shell) {
      return;
    }
    triangleState.shell.style.transform = 'rotateX(0deg) rotateY(0deg)';
    triangleState.wasInside = false;
  }

  function maybeSpawnWhisper(point, points, rect) {
    const now = performance.now();
    if (now - triangleState.lastWordTime < triangleState.wordCooldown) {
      return;
    }

    const sides = [
      [points[0], points[1]],
      [points[1], points[2]],
      [points[2], points[0]],
    ];

    let closest = null;
    let minDistance = Infinity;

    sides.forEach((side, index) => {
      const distance = distanceToSegment(point, side[0], side[1]);
      if (distance < minDistance) {
        minDistance = distance;
        closest = { side, index };
      }
    });

    if (!closest || minDistance > triangleState.triggerRadius) {
      return;
    }

    if (now - triangleState.sideCooldowns[closest.index] < triangleState.wordCooldown * 1.4) {
      return;
    }

    const centroid = getCentroid(points);
    const normal = outwardNormal(closest.side[0], closest.side[1], centroid);

    spawnWhisper(point, normal, closest.side, points, rect);
    triangleState.sideCooldowns[closest.index] = now;
    triangleState.lastWordTime = now;
  }

  function spawnWhisper(point, normal, side, trianglePoints, rect) {
    if (!triangleState.whispers) {
      return;
    }

    const word = pickWord();
    const whisper = document.createElement('span');
    whisper.className = 'whisper pixel-text';
    if (word === 'follow') {
      whisper.classList.add('whisper--follow');
    }
    whisper.textContent = word;

    triangleState.whispers.appendChild(whisper);
    whisper.style.left = '0px';
    whisper.style.top = '0px';

    const width = whisper.offsetWidth;
    const height = whisper.offsetHeight;

    const tangent = normalize({
      x: side[1].x - side[0].x,
      y: side[1].y - side[0].y,
    });
    const jitter = randomInRange(-18, 18);

    let position = {
      x: point.x + normal.x * triangleState.wordOffset + tangent.x * jitter,
      y: point.y + normal.y * triangleState.wordOffset + tangent.y * jitter,
    };

    let attempts = 0;
    while (
      (pointInTriangle(
        { x: position.x + width / 2, y: position.y + height / 2 },
        trianglePoints
      ) ||
        overlapsExisting(position.x, position.y, width, height)) &&
      attempts < 6
    ) {
      position.x += normal.x * 14;
      position.y += normal.y * 14;
      attempts += 1;
    }

    position.x = clamp(position.x, 0, rect.width - width);
    position.y = clamp(position.y, 0, rect.height - height);

    whisper.style.left = `${position.x}px`;
    whisper.style.top = `${position.y}px`;

    const record = {
      el: whisper,
      x: position.x,
      y: position.y,
      width,
      height,
      timeoutId: null,
    };

    record.timeoutId = window.setTimeout(() => {
      destroyWhisper(record);
    }, triangleState.wordLifetime);

    triangleState.activeWhispers.push(record);
  }

  function destroyWhisper(record) {
    if (!record) {
      return;
    }
    if (record.timeoutId) {
      clearTimeout(record.timeoutId);
    }
    if (record.el && record.el.isConnected) {
      record.el.remove();
    }
    const index = triangleState.activeWhispers.indexOf(record);
    if (index !== -1) {
      triangleState.activeWhispers.splice(index, 1);
    }
  }

  function overlapsExisting(x, y, width, height) {
    return triangleState.activeWhispers.some((record) =>
      rectanglesIntersect(x, y, width, height, record)
    );
  }

  function attachFollowListener() {
    if (triangleState.followListenerAttached || !triangleState.scene) {
      return;
    }
    triangleState.scene.addEventListener('click', handleFollowClick, true);
    triangleState.followListenerAttached = true;
  }

  function handleFollowClick(event) {
    const target = event.target;
    if (!target || !(target instanceof HTMLElement)) {
      return;
    }
    if (!target.classList.contains('whisper--follow')) {
      return;
    }
    if (
      container.classList.contains('is-transitioning') ||
      triangleState.scene?.classList.contains('is-hidden')
    ) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    performGlitchTransition('password');
  }

  function triggerTriangleGlitch() {
    const now = performance.now();
    if (now - triangleState.lastGlitch < triangleState.glitchCooldown) {
      return;
    }
    triangleState.lastGlitch = now;

    triangleState.scene?.classList.add('glitching');

    if (triangleState.audio) {
      try {
        triangleState.audio.currentTime = 0;
        triangleState.audio.play();
      } catch (error) {
        // Autoplay restrictions can be ignored silently.
      }
    }

    if (triangleState.glitchTimer) {
      clearTimeout(triangleState.glitchTimer);
    }

    triangleState.glitchTimer = window.setTimeout(() => {
      triangleState.scene?.classList.remove('glitching');
      triangleState.glitchTimer = null;
    }, 720);
  }

  function pickWord() {
    const index = Math.floor(Math.random() * wordsPool.length);
    return wordsPool[index];
  }

  function getTrianglePoints(rect) {
    const top = { x: rect.width * 0.5, y: rect.height * 0.08 };
    const left = { x: rect.width * 0.12, y: rect.height * 0.9 };
    const right = { x: rect.width * 0.88, y: rect.height * 0.9 };
    return [top, left, right];
  }

  function getCentroid(points) {
    const sum = points.reduce(
      (acc, point) => {
        acc.x += point.x;
        acc.y += point.y;
        return acc;
      },
      { x: 0, y: 0 }
    );
    return {
      x: sum.x / points.length,
      y: sum.y / points.length,
    };
  }

  function outwardNormal(a, b, centroid) {
    const mid = {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    };
    const toCentroid = {
      x: centroid.x - mid.x,
      y: centroid.y - mid.y,
    };
    const normal = normalize(toCentroid);
    return { x: -normal.x, y: -normal.y };
  }

  function normalize(vector) {
    const length = Math.hypot(vector.x, vector.y) || 1;
    return {
      x: vector.x / length,
      y: vector.y / length,
    };
  }

  function pointInTriangle(point, triangle) {
    const [a, b, c] = triangle;
    const v0 = { x: c.x - a.x, y: c.y - a.y };
    const v1 = { x: b.x - a.x, y: b.y - a.y };
    const v2 = { x: point.x - a.x, y: point.y - a.y };
    const dot00 = v0.x * v0.x + v0.y * v0.y;
    const dot01 = v0.x * v1.x + v0.y * v1.y;
    const dot02 = v0.x * v2.x + v0.y * v2.y;
    const dot11 = v1.x * v1.x + v1.y * v1.y;
    const dot12 = v1.x * v2.x + v1.y * v2.y;
    const denom = dot00 * dot11 - dot01 * dot01;
    if (denom === 0) {
      return false;
    }
    const invDenom = 1 / denom;
    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    return u >= 0 && v >= 0 && u + v <= 1;
  }

  function distanceToSegment(point, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lengthSq = dx * dx + dy * dy;
    if (lengthSq === 0) {
      return Math.hypot(point.x - a.x, point.y - a.y);
    }
    let t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSq;
    t = clamp(t, 0, 1);
    const projection = {
      x: a.x + t * dx,
      y: a.y + t * dy,
    };
    return Math.hypot(point.x - projection.x, point.y - projection.y);
  }

  function rectanglesIntersect(x, y, width, height, other) {
    return !(
      x + width < other.x ||
      other.x + other.width < x ||
      y + height < other.y ||
      other.y + other.height < y
    );
  }

  function formatTrackLabel(path) {
    const withoutQuery = path.split('?')[0];
    const segments = withoutQuery.split(/[\\/]/);
    const filename = segments[segments.length - 1] || path;
    const withoutExtension = filename.replace(/\.[^/.]+$/, '');
    return withoutExtension.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return '0:00';
    }
    const totalSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

})();
