const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			uploadFile: async (fileToUpload) => {
				const data = new FormData();
				console.log("data", fileToUpload)
				data.append("image", fileToUpload);
				const url = "https://api.cloudinary.com/v1_1/ddpetmio/image/upload";
				const options = {
					method: 'POST',
					body: data,
					headers: {
						Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`,
						'Content-Type': 'application/json'
					}
				};
				const response = await fetch(url, options);
				if (response.ok) {
					const data = await response.json();
					console.log('URL de la imagen subida:', data.url);
				} else {
					const error = await response.json();
					console.error('Error al subir la imagen:', error.message);
				  };

				// let data = new FormData();
				// console.log("data", fileToUpload);
				// data.append("image", fileToUpload);

				// let response = fetch('https://api.cloudinary.com/v1_1/ddpetmio/image/upload', {
				// 	method: "POST",
				// 	body: data,
				// 	headers: {
				// 		Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`,
				// 	},
				// });
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
