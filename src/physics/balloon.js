import { Vector3 } from "three";

class Balloon {
  constructor(position, basketMass = 10, ballooMass = 15, balloonV = 10) {
    this.position = new Vector3(position.x, position.y, position.z);
    this.ballooMass = ballooMass;
    this.basketMass = basketMass; // kg
    this.balloonV = balloonV;
    this.velocity = new Vector3(0, 0, 0);
    this.gravity = 9.81; // m/s^2
    this.weight = new Vector3(0, 0, 0);
    this.lift = new Vector3(0, 0, 0);
    this.air = new Vector3(0, 0, 0);
    this.wind = new Vector3(0, 0, 0);
    this.netForceT = new Vector3(0, 0, 0);
    this.balloonRadius = Math.pow(3 * balloonV / (4 * Math.PI), 1 / 3);
    this.basketLength = 0.1 * this.balloonRadius;
    this.basketSize = this.basketLength * this.basketLength;
    this.balloonSizeVertical = Math.PI * this.balloonRadius * this.balloonRadius;
    this.balloonSizeHorizontal =
      Math.PI * this.balloonRadius * this.balloonRadius + this.basketSize;
    this.k = 0.47;
    this.rhoA = 1.2041;
    this.rhoB = 1.0;
  }

  setPosition(position) {
    // Set the position of the balloon
    this.position.copy(position);
  }

  getPosition() {
    // Get the position of the balloon
    return this.position;
  }

  weightForce() {
    this.weight = new Vector3(
      0,
      -1 * (this.basketMass + this.ballooMass) * this.gravity,
      0
    );
    return this.weight;
  }

  liftForce() {
    this.lift = new Vector3(
      0,
      (this.rhoB - this.rhoA) * this.balloonV * this.gravity,
      0
    );
    return this.lift;
  }
  airResistence() {
    const v = this.velocity.length();
    this.air = new Vector3(
      0,
      (-1 / 2) * this.rhoA * this.k * this.balloonSizeVertical * v * v,
      0
    );
    return this.air;
  }
  windForce() {
    const v = this.velocity.length();
    this.wind = new Vector3(
      0,
      (-1 / 2) * this.rhoA * this.k * this.balloonSizeHorizontal * v * v,
      0
    );
    return this.wind;
  }

  netForce() {
    const weight = this.weightForce();
    const lift = this.liftForce();
    //const air = this.airResistence();
    this.netForceT = weight.add(lift);
    return this.netForceT;
  }

  updateVelocity(dt) {
    // update velocity based on net force and elapsed time
    this.netForceT = this.netForce();
    const acceleration = this.netForceT.divideScalar(this.ballooMass + this.basketMass);
    this.velocity.add(acceleration.multiplyScalar(dt));
  }

  updatePosition(dt) {
    // update position based on velocity and elapsed time
    this.position=this.position.add(this.velocity.clone().multiplyScalar(dt));
  }

  update(dt) {
    // update balloon
    this.rhoB = this.rhoB + 0.1;
     this.netForceT = this.netForce();
    if (this.netForceT.y > 0) {
      this.updateVelocity(dt);
      this.updatePosition(dt);
    }
  }

  
}

export default Balloon;