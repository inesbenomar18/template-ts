import { Vector2D } from "./Vector2D";

export class Matrix3x3 {
    public data: number[][];

    constructor(matrix: number[][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) {
        this.data = matrix;
    }

    // Method to get the determinant of the matrix
    determinant(): number {
        const [a, b, c] = this.data[0];
        const [d, e, f] = this.data[1];
        const [g, h, i] = this.data[2];
        return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    }

    // Method to get the inverse of the matrix
    inverse(): Matrix3x3 {
        const det = this.determinant();
        if (det === 0) {
            throw new Error("Matrix is singular, cannot compute inverse");
        }

        const [a, b, c] = this.data[0];
        const [d, e, f] = this.data[1];
        const [g, h, i] = this.data[2];

        const invDet = 1 / det;
        const newData: number[][] = [
            [(e * i - f * h) * invDet, (c * h - b * i) * invDet, (b * f - c * e) * invDet],
            [(f * g - d * i) * invDet, (a * i - c * g) * invDet, (c * d - a * f) * invDet],
            [(d * h - e * g) * invDet, (b * g - a * h) * invDet, (a * e - b * d) * invDet]
        ];

        return new Matrix3x3(newData);
    }

    // Method to multiply the matrix with another matrix
    multiply(other: Matrix3x3): Matrix3x3 {
        const newData: number[][] = [];
        for (let i = 0; i < 3; i++) {
            newData[i] = [];
            for (let j = 0; j < 3; j++) {
                newData[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    newData[i][j] += this.data[i][k] * other.data[k][j];
                }
            }
        }
        return new Matrix3x3(newData);
    }

    // Method to transform a point/vector by the matrix
    transformPoint(point: Vector2D): Vector2D {
        const { x, y } = point; // Access x and y properties of the Vector2D instance
        const [[a, b, tx], [c, d, ty], [, , _]] = this.data;
        return new Vector2D(a * x + b * y + tx, c * x + d * y + ty);
    }


    // Static method to create a translation matrix
    static translation(tx: number, ty: number): Matrix3x3 {
        return new Matrix3x3([[1, 0, tx], [0, 1, ty], [0, 0, 1]]);
    }

    // Static method to create a rotation matrix (angle in radians)
    static rotation(angle: number): Matrix3x3 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Matrix3x3([[cos, -sin, 0], [sin, cos, 0], [0, 0, 1]]);
    }

    // Static method to create a scaling matrix
    static scaling(sx: number, sy: number): Matrix3x3 {
        return new Matrix3x3([[sx, 0, 0], [0, sy, 0], [0, 0, 1]]);
    }
}
