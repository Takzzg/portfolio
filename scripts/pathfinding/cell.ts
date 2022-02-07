class Cell {
    private _x: number
    private _y: number
    private _type: string
    private _visited: boolean
    private _color = "white"

    constructor(x: number, y: number, type: string) {
        this._x = x
        this._y = y
        this._type = type
        this._visited = false

        this.setColor()
    }

    private setColor() {
        switch (this.type) {
            case "start":
                this._color = "green"
                break
            case "checkpoint":
                this._color = "blue"
                break
            case "end":
                this._color = "red"
                break
            case "wall":
                this._color = "black"
                break
            default:
                this.visited
                    ? (this._color = "yellow")
                    : (this._color = "white")
        }
    }

    // ---------- getters and setters ----------

    public get x(): number {
        return this._x
    }
    public set x(value: number) {
        this._x = value
    }

    public get y(): number {
        return this._y
    }
    public set y(value: number) {
        this._y = value
    }

    public get type(): string {
        return this._type
    }
    public set type(value: string) {
        this._type = value
        this.setColor()
    }

    public get visited(): boolean {
        return this._visited
    }
    public set visited(value: boolean) {
        this._visited = value
        this.setColor()
    }

    public get color() {
        return this._color
    }
}

export default Cell
