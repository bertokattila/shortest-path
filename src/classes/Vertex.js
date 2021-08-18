class Vertex {
	constructor(id) {
		this.#id = id;
		this.#available = true;
	}
	#id;
	getId() {
		return this.#id;
	}
	#available;
	setAvailable(val) {
		this.#available = val;
	}
	getAvailable() {
		return this.#available;
	}
	static start;
	static end;
	#Neighbours = [];
	addNeighbour(neighbour) {
		this.#Neighbours.push(neighbour);
	}
}
export default Vertex;
