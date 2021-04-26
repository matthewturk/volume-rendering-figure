import {IGridSpec} from './grid';

export interface IRay {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}

export interface ICellTraversal {
    t0: number;
    t1: number;
    index: [number, number];
}

export class Ray implements IRay { 
    constructor(x0: number, y0: number, x1: number, y1: number) {
        this.x0 = x0;
        this.x1 = x1;
        this.y0 = y0;
        this.y1 = y1;
    }

    public walkRay() : ICellTraversal[] {
        return [];
    }

    x0: number;
    x1: number;
    y0: number;
    y1: number;
}