/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationX:number;
        public rotationY:number;
        public rotationZ:number;
        
        public skinColour:string;
        public shirtColour:string;
        public pantColour:string;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationX:number, rotationY:number, rotationZ:number, 
        skinColour:string, shirtColour:string, pantColour:string) {
            this.rotationX = rotationX;
            this.rotationY = rotationY;
            this.rotationZ = rotationZ;
            
            this.skinColour = skinColour;
            this.shirtColour = shirtColour;
            this.pantColour = pantColour;

        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
