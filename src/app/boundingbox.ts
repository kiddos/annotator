export class BoundingBox {
  constructor(x: number, y: number, w: number, h: number, cat: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.cat = cat;
  }

  x: number;
  y: number;
  w: number;
  h: number;
  cat: string;
}
