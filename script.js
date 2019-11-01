let W = 500;
let H = 500;

let spacing = 1;

let thread = [];

let mark = false;

function setup(){
	createCanvas(W, H).parent('sketch_holder');
	background(0xF0);
}

function mouseDragged () {
	if (mouseIsPressed) {

		stroke('gray');
		strokeWeight(5);

		// drawing thread
		let rounded_mouseX = spacing * Math.round(mouseX / spacing);
		let rounded_mouseY = spacing * Math.round(mouseY / spacing);

		if (
				rounded_mouseX >= 0
			&&	rounded_mouseX <= W
			&&	rounded_mouseY >= 0
			&&	rounded_mouseY <= H
		) {
			let mouse_pair = [rounded_mouseX, rounded_mouseY];
			
			if (thread.length) {
				let prev = thread[thread.length - 1];
				
				let prev_x = prev[0];
				let prev_y = prev[1];
				
				if (prev_x !== rounded_mouseX || prev_y !== rounded_mouseY) {
					thread.push(mouse_pair);
					line(prev_x, prev_y, rounded_mouseX, rounded_mouseY);
				}
			} else {
				thread.push(mouse_pair);
			}
		}
	}
}

function draw () {
	mark = document.getElementById("mark").checked
}

function startSimulation () {
	background(0xFF);
	place();
}

function place () {
	if (thread.length) {
		setTimeout(update, 50);
		if (!mark)
			background(0xF0);
		for (let i = 1; i < thread.length; ++i) {
			stroke('black');
			strokeWeight(5);
			line(
				thread[i - 1][0], thread[i - 1][1],
				thread[i][0], thread[i][1]
			);
		}
	}
}

function update () {

	let new_thread = [];
	
	let root = thread[0];
	
	root[1] += spacing;
	
	new_thread.push(root);

	for (let i = 1; i < thread.length; ++i) {
		let prev_x = thread[i][0];
		let prev_y = thread[i][1];
		let last_x = new_thread[new_thread.length - 1][0];
		let last_y = new_thread[new_thread.length - 1][1];

		let new_x = spacing * Math.round((prev_x + last_x) / (2 * spacing));
		let new_y = spacing * Math.round((prev_y + last_y) / (2 * spacing));

		let entry = [new_x, new_y];
		new_thread.push(entry);
	}
	
	thread = [];

	for (let i = 0; i < new_thread.length; ++i)
		if (new_thread[i][1] <= H)
			thread.push(new_thread[i]);
	
	place();
}