window.onload = function()
{
	onkeydown = onkeyup = function( e )
	{
		keyMap[e.keyCode] = ( e.type == "keydown" );
	}
	canvas.addEventListener( "mousedown",function()
	{
		mouseIsPressed = true;
	} );
	canvas.addEventListener( "mouseup",function()
	{
		mouseIsPressed = false;
	} );
	canvas.addEventListener( "mousemove",function( e )
	{
		const rect = canvas.getBoundingClientRect();
		const root = document.documentElement;
		mouseX = e.clientX - rect.left - root.scrollLeft;
		mouseY = e.clientY - rect.top - root.scrollTop;
	} );
	BeginGame();
	const fps = 30.0;
	setInterval( function()
	{
		UpdateModel();
		ComposeFrame();
	},1000 / fps );
	console.log( "Starter Framework 0.0.1 started successfully!" );
}

function $( element )
{
	return( document.getElementById( element ) );
}

const canvas = $( "gameCanvas" );
const context = canvas.getContext( "2d" );

const ScreenWidth = canvas.width;
const ScreenHeight = canvas.height;

let keyMap = [];
let images = [];
let sounds = [];

let mouseX = 0.0;
let mouseY = 0.0;
let mouseIsPressed = false;

// Drawing Stuff!
function DrawRect( x,y,width,height,color,opacity = 1.0 )
{
	if( isNaN( x ) )
	{
		console.log( new Error( "X argument of DrawRect is not a number!" ) );
	}
	if( isNaN( y ) )
	{
		console.log( new Error( "Y argument of DrawRect is not a number!" ) );
	}
	if( isNaN( width ) )
	{
		console.log( new Error( "Width argument of DrawRect is not a number!" ) );
	}
	if( isNaN( height ) )
	{
		console.log( new Error( "Height argument of DrawRect is not a number!" ) );
	}
	else
	{
		context.globalAlpha = opacity;
		context.fillStyle = color;
		context.fillRect( x,y,width,height );
		context.globalAlpha = 1.0;
	}
}

function DrawCircle( x,y,size,color,opacity )
{
	if( isNaN( x ) )
	{
		console.log( new Error( "X argument of DrawCircle is not a number!" ) );
	}
	if( isNaN( y ) )
	{
		console.log( new Error( "Y argument of DrawCircle is not a number!" ) );
	}
	if( isNaN( size ) )
	{
		console.log( new Error( "Size argument of DrawCircle is not a number!" ) );
	}
	else
	{
		context.globalAlpha = opacity;
		context.fillStyle = color;
		context.beginPath();
		context.arc( x,y,size,0.0,Math.PI * 2.0 );
		context.fill();
		context.globalAlpha = 1.0;
	}
}

function DrawImage( url,x = 0.0,y = 0.0,
	width = undefined,height = undefined,
	opacity = 1.0 )
{
	let imageId = -1;
	for( let i = 0; i < images.length; ++i )
	{
		const temp = new Image();
		temp.src = url;
		if( images[i].src == temp.src )
		{
			imageId = i;
		}
	}
	if( imageId < 0 )
	{
		images.push( new Image() );
		images[images.length - 1].src = url;
		imageId = images.length - 1;
	}
	
	if( width == undefined || height == undefined )
	{
		width = images[imageId].width;
		height = images[imageId].height;
	}
	
	context.globalAlpha = opacity;
	context.drawImage( images[imageId],
		x,y,width,height );
	context.globalAlpha = 1.0;
}

// Keyboard Stuff!
function KeyIsPressed( keyCodeOrChar )
{
	if( typeof( keyCodeOrChar ) === 'string' )
	{
		keyCodeOrChar = keyCodeOrChar.charCodeAt( 0 );
	}
	
	return keyMap[keyCodeOrChar];
}

// Sound Stuff!
function PlaySound( url,volume = 1.0 )
{
	let soundId = -1;
	for( let i = 0; i < images.length; ++i )
	{
		const temp = new Audio( url );
		if( sounds[i].src == temp.src )
		{
			soundId = i;
		}
	}
	if( soundId < 0 )
	{
		sounds.push( new Audio( url ) );
		soundId = images.length - 1;
	}
	
	sounds[soundId].volume = volume;
	sounds[soundId].play();
}

// Calculator Stuff!
function Random( min,max )
{
	return( Math.floor( Math.random() * ( 1 + max - min ) ) + min );
}

function HitTest( x0,y0,w0,h0,x1,y1,w1,h1 )
{
	return( x0 < x1 + w1 && x0 + w0 > x1 &&
	         y0 < y1 + h1 && y0 + h0 > y1 );
}