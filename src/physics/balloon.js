import vector from "./vector";
import Constants from "./constants";
class balloon {

    constructor(
        basketMass,
        ballooMass
    
    ){
        this.ballooMass = ballooMass;
        this.basketMass=basketMass; // kg
        this.gravity = 9.81; // m/s^2
        this.w = vector.create(0, 0,0); 
    }

    weightForce() {
        // W = m . g
        // return vector.create(0, -this.gravityAcceleration * this.totalMass);
        // //console.log("this.gravity", this.gravity);
        // //console.log("this.totalMass", ((this.fuelMass+this.rocketMass)));
        this.w = vector.create(
            0, -1 * (this.basketMass + this.ballooMass) * this.gravity ,0
        );
        // //console.log("this.g", this.g);
        // w = G . m1 . m2 / r ^ 2
        //     let weight = vector.create(this.position.getX(), this.position.getY() + World.earthRaduis);
        //     let instantaneousHeight = weight.getLength();
        //     let v = World.GravitationalConstant * World.earthMass * (this.rocketMass + this.fuelMass) / (instantaneousHeight * instantaneousHeight);
        //    this.g= vector.create(weight.getX(),weight.getY());
    }
    
}