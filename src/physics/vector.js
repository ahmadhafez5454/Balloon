class Vector3 {
    constructor(x=0, y=0, z=0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    //create a vector
    create(x, y, z) {
        return new Vector3(x, y, z);
    }

    //adding two vectors
    add(vec) {
      return new Vector3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }
    //subtracting two vectors
    subtract(vec) {
      return new Vector3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }
    //dividing two vectors
    divideVector(vec) {
        return new Vector3(this.x / vec.x, this.y / vec.y, this.z / vec.z);
    }
    //multiply vector by a value
    multiplyVal(value) {
      return new Vector3(this.x * value, this.y * value, this.z * value);
    }
    //dividing two vectors
    divide(value) {
        if (value === 0) {
          return new Vector3(0, 0, 0);
        }
        return new Vector3(this.x / value, this.y / value, this.z / value);
      }
    //length
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    //normal of a vector
    normalize() {
      const length = this.length();
      if (length === 0) {
        return new Vector3(0, 0, 0);
      }
      return new Vector3(this.x / length, this.y / length, this.z / length);
    }
  }