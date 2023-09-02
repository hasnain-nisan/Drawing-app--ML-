console.log('sketch pad');

class SketchPad {
    constructor(container, size= window.innerWidth < 400 ? window.innerWidth : 450 ){
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style = `
            background-color: white ;
            box-shadow: 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas)

        const lineBreak = document.createElement('br');
        container.appendChild(lineBreak);

        this.undoButton = document.createElement('button');
        this.undoButton.innerHTML = "UNDO";
        this.undoButton.disabled = true;
        container.appendChild(this.undoButton);

        this.paths = [];
        this.isDrawing = false;

        this.#addEventlistners();
    }

    #addEventlistners(){
        this.canvas.onmousedown = (e) => {
            const mouse = this.#getMousePosition(e);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }
        this.canvas.onmousemove = (e) => {
            if(this.isDrawing){
                const mouse = this.#getMousePosition(e);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                this.#reDraw();
            }
        }
        this.canvas.onmouseup = (e) => {
            this.isDrawing = false;
        }
        this.canvas.ontouchstart = (e) => {
            const loc = e.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove = (e) => {
            const loc = e.touches[0];
            this.canvas.onmousemove(loc);
        }
        this.undoButton.onclick = () => {
            this.paths.pop();
            this.#reDraw();
        }
    }

    #reDraw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);

        if(this.paths.length > 0){
            this.undoButton.disabled = false;
        } else {
            this.undoButton.disabled = true;
        }
    }

    #getMousePosition = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const mouse = [
            Math.round(e.clientX - rect.left),
            Math.round(e.clientY - rect.top)
        ];
        return mouse;
    }
}