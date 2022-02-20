import Cell from "../pathfinding/cell"
import { clamp, lerp } from "./../utils"

// ----- internal vars for reusability -----

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let parent: HTMLElement

let cellSize: number
let gridWidth: number
let gridHeight: number

let gutter = 0.25
let offsetX: number
let offsetY: number

let lastMousePos = { x: -1, y: -1 }

// ----- init -----

export const initCanvas = (
    _canvas: HTMLCanvasElement,
    width: number,
    height: number
) => {
    canvas = _canvas
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    parent = <HTMLElement>canvas.parentElement

    gridWidth = width
    gridHeight = height
    cellSize = resizeCanvas()

    return { cellSize, gridWidth, gridHeight }
}

// ----- drawing -----

export const drawGrid = (
    drawFn: (x: number, y: number) => {},
    _gutter: number
) => {
    gutter = _gutter

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    offsetX = (canvas.width - cellSize * gridWidth) / 2
    offsetY = (canvas.height - cellSize * gridHeight) / 2

    for (let x = 0; x < gridWidth; x++)
        for (let y = 0; y < gridHeight; y++) drawFn(x, y)
}

export const drawCell = (x: number, y: number, color: string) => {
    let posX = x * cellSize + offsetX + gutter
    let posY = y * cellSize + offsetY + gutter
    let w = cellSize - gutter * 2
    let h = cellSize - gutter * 2

    ctx.fillStyle = color
    ctx.fillRect(
        Math.floor(posX),
        Math.floor(posY),
        Math.floor(w),
        Math.floor(h)
    )
}

export const clearGrid = () => {
    let grid: Cell[][] = []

    for (let x = 0; x < gridWidth; x++) {
        grid[x] = []
        for (let y = 0; y < gridHeight; y++)
            grid[x][y] = new Cell(x, y, "empty")
    }

    return grid
}

// ----- resize -----

export const resizeCanvas = () => {
    canvas.width = clamp(parent.clientWidth, 200, 1200)
    cellSize = canvas.width / gridWidth
    canvas.height = cellSize * gridHeight

    return clampCellSize()
}

export const clampCellSize = () => {
    return Math.floor(canvas.width / gridWidth) <
        Math.floor(canvas.height / gridHeight)
        ? Math.floor(canvas.width / gridWidth)
        : Math.floor(canvas.height / gridHeight)
}

export const resizeGrid = (_width = gridWidth, _height = gridHeight) => {
    gridWidth = _width
    gridHeight = _height
    cellSize =
        Math.floor(canvas.width / gridWidth) <
        Math.floor(canvas.height / gridHeight)
            ? Math.floor(canvas.width / gridWidth)
            : Math.floor(canvas.height / gridHeight)

    return { gridWidth, gridHeight, cellSize }
}

// ----- interaction -----

export const resetLastMousePos = () => {
    lastMousePos = { x: -1, y: -1 }
}

export const getlastMousePos = () => lastMousePos

export const setLastMousePos = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (
        x > offsetX &&
        x < canvas.width - offsetX &&
        y > offsetY &&
        y < canvas.height - offsetY
    ) {
        let index_x = Math.floor((x - offsetX) / cellSize)
        let index_y = Math.floor((y - offsetY) / cellSize)
        lastMousePos = { x: index_x, y: index_y }
        return
    }

    resetLastMousePos()
}

export const getCoords = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (
        x > offsetX &&
        x < canvas.width - offsetX &&
        y > offsetY &&
        y < canvas.height - offsetY
    ) {
        let index_x = Math.floor((x - offsetX) / cellSize)
        let index_y = Math.floor((y - offsetY) / cellSize)
        return { index_x, index_y }
    }

    return false
}

export const getLine = (x: number, y: number) => {
    let currentMousePos = { x, y }
    let points = []
    let N = Math.max(
        Math.abs(currentMousePos.x - lastMousePos.x),
        Math.abs(currentMousePos.y - lastMousePos.y)
    )

    for (let step = 0; step < N; step++) {
        let t = N === 0 ? 0.0 : step / N
        points.push({
            x: Math.round(lerp(lastMousePos.x, currentMousePos.x, t)),
            y: Math.round(lerp(lastMousePos.y, currentMousePos.y, t))
        })
    }

    lastMousePos = { ...currentMousePos }

    return points
}