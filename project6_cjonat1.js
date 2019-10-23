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
	
	var initBody1 = function(r,g,b)
	{
		background(0,0,0,0);
		points = [];
		for(var i = 0; i < 20; i++)
			points.push(new PVector(10+20*i, 100+30*random()));
		for(var i = 0; i < 20; i++)
			points.push(new PVector(390-20*i, 300-30*random()));
		for(var i = 0; i < 5; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		fill(r+20,g+20,b+20);
		for(var i = 0; i < 5; i++)
			ellipse(40+75*i, 180+40*random(), 20+20*random(), 20+20*random());
		return get(0,0,width,height);
	};
	var initBody2 = function(r, g, b)
	{
		background(0,0,0,0);
		points = [];
		for(var i = 0; i < 10; i++)
			points.push(new PVector(50+30*i, 100*random()));
		for(var i = 9; i >= 0; i--)
			points.push(new PVector(50+30*i, 300+50*random()));
		for(var i = 0; i < 10; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		return get(0,0,width,height);
	};
	var initLeg1 = function(r,g,b)
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
		for(var i = 0; i < 8; i++)
		{
			points.push(new PVector(250,370-50*i));
			points.push(new PVector(300,390-50*i));
		}
		points.push(new PVector(250,0));
		for(var i = 0; i < 3; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		return get(0,0,width,height);
	};
	var initLeg2 = function(r,g,b)
	{
		background(0,0,0,0);
		points = [];
		for(var i = 0; i < 11; i++)
			points.push(new PVector(100+50*random(),i*40));
		for(var i = 10; i >= 0; i--)
			points.push(new PVector(250+50*random(),i*40));
		for(var i = 0; i < 3; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		return get(0,0,width,height);
	};
	var initHead1 = function(r,g,b)
	{
		background(0,0,0,0);
		points = [new PVector(10,  50 ),
		          new PVector(200, 50 ),
				  new PVector(200, 200),
				  new PVector(390, 200),
				  new PVector(390, 350),
				  new PVector(10,  350),];
		for(var i = 0; i < 8; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		fill(220,220,220);
		ellipse(150,150,48,48);
		fill(50,50,255);
		ellipse(158,150,32,32);
		return get(0,0,width,height);
	};
	var initImages = function()
	{
	};
	
	initImages();
	
	var Animal = function(x, y, size)
	{
		this.x        = x;
		this.y        = y;
		this.size     = size;
		this.walk     = 0;
		this.change   = 0;
		this.legAngle = 0;
		this.legMove  = 1;
		r = 200*random();
		g = 200*random();
		b = 200*random();
		if(random() < 0.5)
			this.body = initBody1(r,g,b);
		else
			this.body = initBody2(r,g,b);
		this.head = initHead1(r,g,b);
		if(random() < 0.5)
			this.leg  = initLeg1(r,g,b);
		else
			this.leg  = initLeg2(r,g,b);
	};
	Animal.prototype.display = function()
	{
		pushMatrix();
		translate(this.x, this.y);
		if(this.walk < 0)
			scale(-1, 1);
		var left = -this.size/2;
		image(this.body, left, left, this.size, this.size);
		image(this.leg, left, 10, -left, -left);
		image(this.leg, 0, 10, -left, -left);
		image(this.head, 25, left, -left, -left);
		popMatrix();
	};
	Animal.prototype.update = function()
	{
		if(this.x > 300)
			this.walk = -1;
		else if(this.x < 100)
			this.walk = 1;
		else if(this.change <= 0)
		{
			var r = random();
			if(r < 0.33)
				this.walk = -1;
			else if(r < 0.67)
				this.walk = 0;
			else
				this.walk = 1;
			this.change = 180;
		}
		
		this.x += this.walk*0.2;
		this.change--;
	};
	
	var MenuGameState = function()
	{
		this.animals = [new Animal(200, 150, 110),
		                new Animal(150, 200, 128)];
	};
	MenuGameState.prototype.display = function()
	{
		background(10,10,100);
		fill(255,255,255);
		textSize(75);
		textAlign(CENTER);
		text("GAME", 200, 200);
		textSize(20);
		text("Space to play", 200, 300);
		
		for(var i = 0; i < this.animals.length; i++)
			this.animals[i].display();
	};
	MenuGameState.prototype.update = function()
	{
		for(var i = 0; i < this.animals.length; i++)
			this.animals[i].update();
	};
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