export class Vector2D {
    constructor(public x: number, public y: number) {}

    // Method to calculate the magnitude of the vector
    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Method to calculate the dot product with another vector
    dot(other: Vector2D): number {
        return this.x * other.x + this.y * other.y;
    }

    // Method to calculate the angle between two vectors in radians
    angleBetween(other: Vector2D): number {
        const dotProduct = this.dot(other);
        const magnitudeProduct = this.magnitude() * other.magnitude();
        return Math.acos(dotProduct / magnitudeProduct);
    }

    // Method to add another vector to this vector
    add(other: Vector2D): Vector2D {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    // Method to subtract another vector from this vector
    subtract(other: Vector2D): Vector2D {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }

    // Method to scale the vector by a scalar value
    scale(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    // Method to get the normalized vector (unit vector)
    normalize(): Vector2D {
        const magnitude = this.magnitude();
        return new Vector2D(this.x / magnitude, this.y / magnitude);
    }
}
