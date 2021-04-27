import * as d3 from 'd3';
import { IPoint } from './interfaces';
import {Ray} from './ray';

export class RayPlane {
    constructor(x0: number, y0: number, x1: number, y1: number) {
        this.p0 = {x: x0, y: y0};
        this.p1 = {x: x1, y: y1};
        this.destinations = [];
        this.rayData = [];
    }

    public drawRayPlane(svg: d3.Selection<SVGElement, {}, HTMLElement, any>): void {
        const g = svg.append("g")
            .attr("class", "ray-plane");
        const line = g.append("g").append("line");
        line
            .data([this.p0, this.p1])
            .attr("class", "plane-line")
            .attr("x1", this.p0.x)
            .attr("y1", this.p0.y)
            .attr("x2", this.p1.x)
            .attr("y2", this.p1.y)
            .call(dragLine);
        const circles = g.attr("class", "plane")
            .selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("class", "plane-endpoint")
            .attr("r", 5)
            .call(dragCircle);
        const rays = g.append("g")
            .attr("class", "ray-group");
        rays
            .selectAll("line")
            .data(d3.range(N))
            .enter()
            .append("line")
            .attr('marker-end', 'url(#arrow)')
            .classed("ray", true)
            .classed("ray-hidden", true)
            .call(dragLine);
        update();
        return g;
    }

    updateRays(): void {
        this.destinations.forEach((element: SVGElement) => {
            const rays = d3.select(element).selectAll(".ray-plane");
            rays
                .selectAll("line")
                .data(this.rayData)
                .attr("x1", d => d.x1)
                .attr("y1", d => d.y1)
                .attr("x2", d => d.x2)
                .attr("y2", d => d.y2);
            // Now we walk them all
            svg.selectAll(".cell").classed("traced", false);
            for (const r of rayData) {
                var iPoints = walkRay(r.x1, r.y1, r.x2, r.y2);
                for (const ip of iPoints) {
                    svg.selectAll("#cell-" + ip.index[0] + "-" + ip.index[1]).classed("traced", true);
                }
            }
        }
        }

    p0: IPoint;
    p1: IPoint;
    destinations: SVGElement[];
    rayData: Ray[];
}