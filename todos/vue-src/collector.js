export class Collector {
	metrics = {}
	current = {}
	result = {}

	constructor(metrics) {
		this.metrics = metrics
	}
	
	start() {
		this.startTime = Date.now();
	}
	
	collect(name) {
		const maxCount = this.metrics[name]
		if (!maxCount) {
			// console.log('Cannot found metric limit of ' + name)
			return;
		}
		const current = !this.current[name] ? (this.current[name] = 1) : ++this.current[name];
		if (current === maxCount) {
			const time = Date.now() - this.startTime
			this.result[name] = time;
			console.log(`Collected ${maxCount} count. The cost of "${name}" with ${time}ms`);
		} else if (current > maxCount) {
			console.log(`Overhead collected of "${name}" with ${(maxCount - current)}ms`);
		}
	}
}

const metrics = {}
const currents = {}
const currentTimes = {}
const result = {}
const reportResolvers = {}
const reportWaiters = {}

export function collect() {
	return {...result}
}

export function init(name, count) {
	metrics[name] = count
	currents[name] = 0
	currentTimes[name] = Date.now()
	result[name] = Infinity
}

export function report(name) {
	const maxCount = metrics[name]
	if (!maxCount) {
		// console.log('Cannot found metric limit of ' + name)
		return;
	}
	const current = !currents[name] ? (currents[name] = 1) : ++currents[name];
	if (current === maxCount) {
		const time = Date.now() - currentTimes[name]
		result[name] = time;
		console.log(`Collected ${maxCount} count. The cost of "${name}" with ${time}ms`);
		reportResolvers[name] && reportResolvers[name]()
	} else if (current > maxCount) {
		console.log(`Overhead collected of "${name}" with ${(maxCount - current)}ms`);
	}
}

export function waitReported(name) {
	if (reportWaiters[name]) {
		return reportWaiters[name]
	}
	const promise = new Promise((resolve) => {
		reportResolvers[name] = resolve
	})
	reportWaiters[name] = promise
	promise.then(() => {
		reportResolvers[name] = reportWaiters[name] = null
	})
	return promise
}
