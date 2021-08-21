function BFS(grid, start) {
	let current = grid[start];
	current.visited = true;

	let queue = []; // array used only as queue

	queue.push(current);

	let iterations = 0;

	let end = null;

	while (queue.length > 0 && end === null) {
		current = queue.shift();
		current.neighbours.forEach((element, index, neighbours) => {
			if (!element.visited && element.available) {
				neighbours[index].backTrace = current; // setting the path for backtrace
				if (element.end) {
					end = neighbours[index];
					return;
				}
				neighbours[index].visited = true;
				queue.push(neighbours[index]);
			}
		});
		iterations++;
	}

	return end;
}

const backTrace = (end) => {
	let current = end.backTrace;
	let path = [];
	while (!current.start) {
		path.push(current.id);
		current = current.backTrace;
	}
	return path;
};

export { BFS, backTrace };
