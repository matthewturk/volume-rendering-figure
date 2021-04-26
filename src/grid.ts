import * as d3 from "d3";

export interface IGridSpec {
    nx: number;
    ny: number;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    dx: number;
    dy: number;
}

export class GridPatch implements IGridSpec {

    constructor(x0: number, y0: number, nx: number, ny: number, dx: number, dy: number) {
        this.x0 = x0;
        this.y0 = y0;
        this.nx = nx;
        this.ny = ny;
        this.dx = dx;
        this.dy = dy;
        this.x1 = x0 + dx * nx;
        this.y1 = y0 + dy * ny;
        this.destinations = [];
    }

    public drawGrid(svg: d3.Selection<SVGElement, {}, HTMLElement, any>): void {
        this.destinations.push(svg.node());
        const g: d3.Selection<SVGGElement, {}, HTMLElement, any> = svg.append("g").attr("transform", `translate(${this.x0} ${this.y0})`);
        const dragGrid: d3.DragBehavior<SVGGElement, any, unknown> = d3.drag<SVGGElement, unknown>();
        dragGrid.on("drag", (event) => {
            this.x0 += event.dx;
            this.x1 += event.dx;
            this.y0 += event.dy;
            this.y1 += event.dy;
        })
        g.call(dragGrid);
        g.attr("class", "grid")
            .selectAll("rect.cell")
            .data(d3.cross(d3.range(this.nx), d3.range(this.ny)))
            .enter()
            .append("rect")
            .attr("class", "cell")
            .attr("id", d => `cell-${d[0]}-${d[1]}`)
            .attr("x", d => d[0] * this.dx)
            .attr("y", d => d[1] + this.dy)
            .attr("height", this.dx)
            .attr("width", this.dy);
    }

    public update() {
        this.destinations.forEach((element: SVGElement | null) => {
            if (!element) return;
            d3.select(element).attr("transform", `translate(${this.x0} ${this.y0})`);
        }
        );
    }

    nx: number;
    ny: number;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    dx: number;
    dy: number;
    destinations: (SVGElement | null)[];
}