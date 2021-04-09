const hack = {}

class MachineState {
  constructor(program) {
    this._p = hack.loadProgram(program);
  }
  tick(n) {
    n = n || 1;
    return hack.tick(this._p, n);
  }
  reset() {
    hack.reset(this._p);
  }
  getRegisters() {
    return {
      PC: Module.getValue(this._p, 'i32'),
      A: Module.getValue(this._p+4, 'i32'),
      D: Module.getValue(this._p+8, 'i32'),
    }
  }
  dump(start, end) {
    start = start || 0;
    end = end || start+3;

    const state = this.getRegisters();
    let s = `PC=${state.PC} A=${state.A} D=${state.D}`;
    if (end > 0) {
      s += ` RAM[${start}..${end}]=[`;
      for (let i = start; i < end; i++) {
        s += Module.getValue(this._p + 3*4 + i*4, 'i16');
        if (i < end-1) {
          s += ' ';
        }
      }
      s += ']';
    }
    return s;
  }
  setRAM(offset, value) {
    Module.setValue(this._p + 3*4 + offset*4, value, 'i16');
  }
  getRAM(offset) {
    return Module.getValue(this._p + 3*4 + offset*4, 'i16');
  }
  setKeyboard(event) {
    const keyMap = {
      ArrowLeft: 130,
      ArrowRight: 132,
    };
    let value = 0;
    if (event) {
      value = keyMap[event.key];
      if (value === undefined) {
        value = event.key[0];
      }  
    }

    this.setRAM(24576, value);
  }
  drawScreen(ctx) {
    // Module.HEAP8[];
    const totalPixels = 256*512;

    const screenStart = 16384;
    const screenEnd = screenStart + totalPixels/16;
    // debugger;
    let x = 0, y = 0;
    for (let i = screenStart; i < screenEnd; i++) {
      let bits = this.getRAM(i);
      if (bits == 0) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x,y,16,1);
      } else {
        for (let j = 0; j < 16; j++) {
          if (bits & (0b1 << j)) {
            ctx.fillStyle = 'black';
          } else {
            ctx.fillStyle = 'white';
          }
          ctx.fillRect(x+j,y,1,1);
        }  
      }
      x = (x + 16) % 512;
      if (x === 0) {
        y += 1;
      }
    }
  }
}

function loadDoc(name, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  };
  xhttp.open("GET", name, true);
  xhttp.send();
}

const RECT = `0000000000000000
1111110000010000
0000000000010111
1110001100000110
0000000000010000
1110001100001000
0100000000000000
1110110000010000
0000000000010001
1110001100001000
0000000000010001
1111110000100000
1110111010001000
0000000000010001
1111110000010000
0000000000100000
1110000010010000
0000000000010001
1110001100001000
0000000000010000
1111110010011000
0000000000001010
1110001100000001
0000000000010111
1110101010000111`;

const MAX = `0000000000000000
1111110000010000
0000000000000001
1111010011010000
0000000000001010
1110001100000001
0000000000000001
1111110000010000
0000000000001100
1110101010000111
0000000000000000
1111110000010000
0000000000000010
1110001100001000
0000000000001110
1110101010000111`;


runDoc = (fn) => {
  loadDoc(fn, (content) => {
    console.log(`Loaded ${fn}: ${content.length}`);
    const m = new MachineState(content);
    const context = document.getElementById("myCanvas").getContext('2d');
    document.addEventListener('keydown', (event) => m.setKeyboard(event));
    document.addEventListener('keyup', () => m.setKeyboard(null));

    let renderInterval;
    let computeInterval;
    let paused = true;
    let numTicks = 20000;
    let clock = 0;
    const speedEl = document.getElementById("speed");
    speedEl.value = numTicks;
    const pauseButton = document.getElementById("pause");
    const playButton = document.getElementById("play");
    const resetButton = document.getElementById("reset");
    const play = () => {
      if (!paused) return;
      paused = false;
      renderInterval = setInterval(() => m.drawScreen(context), 1000/30);
      computeInterval = setInterval(() => {
        m.tick(numTicks);
        clock += numTicks/1000;
        document.getElementById('numInstructions').textContent = Math.floor(clock);
      }, 0);
      playButton.classList.add("d-none");
      pauseButton.classList.remove("d-none");
    }
    const pause = () => {
      paused = true;
      clearInterval(computeInterval);
      clearInterval(renderInterval);
      playButton.classList.remove("d-none");
      pauseButton.classList.add("d-none");
    }
    const reset = () => {
      pause();
      clock = 0;
      m.reset();
      play();
    }
    speedEl.addEventListener('change', (e) => {
      numTicks = e.target.value;
      document.getElementById('speedLabel').textContent = numTicks;
    });
    resetButton.addEventListener("click", reset);
    pauseButton.addEventListener("click", pause);
    playButton.addEventListener("click", play);
    // play();
    pause();
  });
}

Module.onRuntimeInitialized = _ => {
  hack.loadProgram = Module.cwrap('load_program', 'number', ['string']);
  hack.tick = Module.cwrap('tick', 'number', ['number', 'number']);
  hack.reset = Module.cwrap('reset', null, ['number']);

  runDoc("Pong.hack");

};