import {IGridSpec} from './grid';
import { IPoint } from './interfaces';

export interface IRay {
    p0: IPoint;
    p1: IPoint;
}

export interface ICellTraversal {
    t0: number;
    t1: number;
    index: [number, number];
}

export class Ray implements IRay { 
    constructor(x0: number, y0: number, x1: number, y1: number) {
        this.p0 = {x: x0, y: y0};
        this.p1 = {x: x1, y: y1};
    }

    public walkRay() : ICellTraversal[] {
        return [];
    }

    p0: IPoint;
    p1: IPoint;
}