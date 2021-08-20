function trace(current) {
	/*while (!currzent.end) {
        current.neighbours.forEach(element => {
            if(!element.visited)
        });
    }
    */
}

function BFS(grid, start) {
	// Creating a copy which can be safely modified during the algorithm
	let graph = grid.slice();
	graph.forEach((element) => {
		element = { ...element, visited: false, backTrace: "null" };
	});

	let root = { ...graph[start], visited: true };

	let current = root;
	console.log(current);
}
export default BFS;
