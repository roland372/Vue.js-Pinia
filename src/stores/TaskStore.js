import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
	//* our initial state, we can use it throught out app
	state: () => ({
		tasks: [
			// {
			// 	id: 1,
			// 	title: 'title 1',
			// 	isFav: false,
			// },
			// {
			// 	id: 2,
			// 	title: 'title 2',
			// 	isFav: true,
			// },
		],
		name: 'Pinia Tasks',
		isLoading: false,
	}),
	//* getters are used to manipulate data before they're returned (we don't change state directly, just return new values based on state)
	//* similar to computed properties
	getters: {
		favs() {
			return this.tasks.filter(task => task.isFav);
		},
		favCount() {
			return this.tasks.filter(task => task.isFav).length;
		},
		// favCount() {
		// 	return this.tasks.reduce((prev, curr) => {
		// 		return curr.isFav ? prev + 1 : prev;
		// 	}, 0);
		// },
		// arrow function, we can't use this inside of it
		totalCount: state => {
			return state.tasks.length;
		},
	},
	//* actions are used to update and manipulate the store directly
	actions: {
		// task object
		async addTask(task) {
			this.tasks.push(task); // accept task object as parameter and add it to our state array

			const res = await fetch('http://localhost:3000/tasks', {
				method: 'POST',
				body: JSON.stringify(task),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.error) {
				console.log(res.error);
			}
		},
		async deleteTask(id) {
			this.tasks = this.tasks.filter(task => {
				return task.id !== id;
			});

			const res = await fetch('http://localhost:3000/tasks/' + id, {
				method: 'DELETE',
			});

			if (res.error) {
				console.log(res.error);
			}
		},
		async toggleFav(id) {
			const task = this.tasks.find(task => task.id === id);
			task.isFav = !task.isFav;

			const res = await fetch('http://localhost:3000/tasks/' + id, {
				method: 'PATCH',
				body: JSON.stringify({
					isFav: task.isFav,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (res.error) {
				console.log(res.error);
			}
		},
		async getTasks() {
			this.isLoading = true;
			const res = await fetch('http://localhost:3000/tasks');
			const data = await res.json();

			// when we fetch data from api set it to our state in store
			this.tasks = data;

			this.isLoading = false;
		},
	},
});
