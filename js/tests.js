/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 04.11.12
 * Time: 18:42
 * To change this template use File | Settings | File Templates.
 */
describe("Hero tests", function(){

    var hero;
    beforeEach(function() {
        hero = new Hero(100,100);
    });

    describe("Hero jumping", function(){
        it("Should start jumping when is called", function(){
            // act
            hero.Jump();

            // asserts
            expect(hero.SpeedY).toEqual(maxSpeedY);
            expect(hero.IsJumping).toBeTruthy();
        });
    });

    describe("Hero movements", function(){
       beforeEach(function(){
          hero.x = 100;
          width = 500;
          hero.IsRunning = true;
       });

       it("Should move right when function called with right direction", function(){
           var previousX = hero.x;
           hero.Move("right");
           expect(hero.x).toEqual(previousX + maxSpeedX);
       });

       it("Should move left when function called with left direction", function(){
           var previousX = hero.x;
           hero.Move("left");
           expect(hero.x).toEqual(previousX - maxSpeedX);
       });
    });

    describe("Screen borders", function(){
       beforeEach(function(){
           width = 100;
           hero.IsRunning = true;
       });

       it("Should not move if stay near right screen border and called moving in right direction", function(){
            hero.x = 100;
            var previousX = hero.x;
            hero.Move("right");
            expect(hero.x).toEqual(previousX);
       });

       it("Should not move if stay near left screen border and called moving in left direction", function(){
            hero.x = 0;
            var previousX = hero.x;
            hero.Move("left");
            expect(hero.x).toEqual(previousX);
       });
    });
});