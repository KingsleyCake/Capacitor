function Controller()
{
	let towers = [];
	const spawnDelay = 50;
	let spawnTimer = 0;
	// 
	this.Update=()=>
	{
		++spawnTimer;
		if( mouseIsPressed &&
			spawnTimer > spawnDelay )
		{
			towers.push( { x: mouseX,y: mouseY } );
		}
	}
	
	this.Draw=()=>
	{
		for( let i in towers )
		{
			DrawRect( towers[i].x,towers[i].y,
				40,40,"brown" );
		}
	}
}