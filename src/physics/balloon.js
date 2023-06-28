import { Vector3 } from "three";

class Balloon {
  constructor(position, basketMass = 2, ballooMass = 1, balloonV = 10,temperature=25) {
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
    this.rhoA = 1.225;
    this.rhoB = 1.225;
    this.temperature=temperature;
    this.p=101323;
  }

  setPosition(position) {
    // Set the position of the balloon
    this.position.copy(position);
  }

  getPosition() {
    // Get the position of the balloon
    return this.position;
  }



   air_rho() {
    let Rspecific = 287.058; //specific gas constant for dry air
    let Tkelvin = this.temperature + 273.15;
    let P = this.p;
    let rho = P / (Rspecific * Tkelvin); // Path: ./formulas/rho.png
    console.log('rho',rho)
    this.rhoB=rho;
    //return rho;
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
      (this.rhoA - this.rhoB) * this.balloonV * this.gravity,
      0
    );
    this.air_rho();
    console.log('lift = ',this.lift)
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
  windForceX(v) {
    this.windX = new Vector3(
    (1 / 2) * this.rhoA * this.k * this.balloonSizeHorizontal * v * v,
      0,
      0
    );
    return this.windX;
  }
 
  windForceZ(v) {
    this.windZ = new Vector3(
    0,
      0,
      (1 / 2) * this.rhoA * this.k * this.balloonSizeHorizontal * v * v
    );
    return this.windZ;
  }



  netForce() {
    const weight = this.weightForce();
    const lift = this.liftForce();
    const air = this.airResistence();
    this.netForceT = this.netForceT.add(lift)
    this.netForceT = this.netForceT.add(weight)
    //this.netForceT = this.netForceT.add(air)
    //this.netForceT = this.netForceT.add(this.windForceX(25))
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
    this.temperature+=0.1
    console.log('temp',this.temperature)
     this.netForceT = this.netForce();
    if (this.netForceT.y > 0) {
      this.updateVelocity(dt);
      this.updatePosition(dt);
    }
  }

  
}

export default Balloon;