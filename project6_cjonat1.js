var sketchProc = function(processingInstance) 
{
 with (processingInstance) 
 {
	/*
	*/
	//Author:          Jonathan Crow
	//PID:             cjonat1
	//Completion Date: 09/27/2019
	//Assignment:      Project 4
	frameRate(60);
	size(400,400);
	
	/*-------------------------
	Degree to radian conversion
	constants
	-------------------------*/
	var deg0     = 0;
	var deg90    = Math.PI/2;
	var deg180   = Math.PI;
	var deg270   = 3*Math.PI/2;
	var deg360   = 2*Math.PI;
	var degToRad = Math.PI/180;
	
	var keyArray = [];
	
	var keyPressed = function() 
	{
		keyArray[keyCode] = 1;
	};
	var keyReleased = function() 
	{
		keyArray[keyCode] = 0;
	};
	var mouseReleased = function()
	{
		gameState.clickEvent(mouseX, mouseY);
	};
	
	var splitPoints = function(points) 
	{
		split = [];
		for(var i = 0; i < points.length - 1; i++) 
		{
			split.push(new PVector(points[i].x, points[i].y));
			split.push(new PVector((points[i].x + points[i+1].x)/2, (points[i].y + points[i+1].y)/2));
		}  
		split.push(new PVector(points[i].x, points[i].y));
		split.push(new PVector((points[0].x + points[i].x)/2, (points[0].y + points[i].y)/2));
		return split;
	};
	var average = function(split) 
	{
		for (var i = 0; i < split.length - 1; i++) 
		{
			var x = (split[i].x + split[i+1].x)/2;
			var y = (split[i].y + split[i+1].y)/2;
			split[i].set(x, y);
		} 
		var x = (split[i].x + split[0].x)/2;
		var y = (split[i].y + split[0].y)/2;
		points = [];
		for (i = 0; i < split.length; i++)
			points.push(new PVector(split[i].x, split[i].y)); 
		return points;
	};
	var subdivide = function(points)
	{
		split = splitPoints(points);
		return average(split);
	};
	
	var imgs     = [];
	var imgBody1 = 0;
	var imgLeg1  = 1;
	
	var initBody1 = function()
	{
		background(0,0,0,0);
		points = [];
		for(var i = 0; i < 20; i++)
			points.push(new PVector(10+20*i, 100+30*random()));
		for(var i = 0; i < 20; i++)
			points.push(new PVector(390-20*i, 300-30*random()));
		for(var i = 0; i < 5; i++)
			points = subdivide(points);
		noStroke();
		fill(77,31,10);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		fill(206,154,64);
		for(var i = 0; i < 5; i++)
			ellipse(40+75*i, 180+40*random(), 20+20*random(), 20+20*random());
		imgs[imgBody1] = get(0,0,width,height);
	};
	var initLeg1 = function()
	{
		background(0,0,0,0);
		points = [new PVector(150,0)];
		for(var i = 0; i < 8; i++)
		{
			points.push(new PVector(100,40+50*i));
			points.push(new PVector(150,20+50*i));
		}
		points.push(new PVector(150,400));
		points.push(new PVector(250,400));
		points.push(new PVector(250,0));
		for(var i = 0; i < 3; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(77,31,10);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		imgs[imgLeg1] = get(0,0,width,height);
	};
	var initImages = function()
	{
		initBody1();
		initLeg1();
	};
	
	initImages();
	
	var MenuGameState = function()
	{};
	MenuGameState.prototype.display = function()
	{
		background(10,10,100);
		fill(255,255,255);
		textSize(75);
		textAlign(CENTER);
		text("GAME", 200, 200);
		textSize(20);
		text("Space to play", 200, 300);
		image(imgs[imgLeg1], 0, 0);
	};
	MenuGameState.prototype.update = function()
	{};
	MenuGameState.prototype.getNextState = function()
	{
		return this;
	};
	MenuGameState.prototype.clickEvent = function(x, y)
	{};
	
	var gameState = new MenuGameState();
	
	var showFPS  = 1;
	var lastTime = 0;
	
	draw = function() 
	{
		gameState.update();
		gameState.display();
		gameState = gameState.getNextState();
		
		//calculates fps
		var time = millis();
		var fps = 1000/(time-lastTime);
		lastTime = time;
		
		fill(0,0,0);
		if(showFPS)
		{
			textSize(10);
			text("FPS: " + fps.toFixed(2), width-50, height-10);
			if(fps < 50)
				console.log("fps dropped to: " + fps);
		}
	};
}};