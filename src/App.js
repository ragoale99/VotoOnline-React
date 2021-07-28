import React, { useState, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import GenericContent from "./components/genericUser/GenericContent";
import AdminContent from "./components/admin/AdminContent";
import { v4 as uuidv4 } from "uuid";

export const RoleContext = createContext(null);
export const VotationsContext = createContext(null);

function App() {
	const [role, setRole] = useState("");
	const [votations, setVotations] = useState([
		{
			id: uuidv4(),
			title: "Piatti italiani",
			description: "Votazione per il piatto italiano più buono",
			dateStart: new Date(),
			dateEnd: new Date("2021, 04 ,10"),
			voted: true,
			result: "Pizza",
			options: [
				{ imagePath: "vue.png", nome: "Pizza" },
				{
					imagePath: "angular.png",
					nome: "Pizza",
				},
			],
		},
		{
			id: uuidv4(),
			title: "Frameworks",
			description:
				"Votazione per la scelta del miglior framework per lo sviluppo front-end di applicazioni web",
			dateStart: new Date("2020, 04, 10"),
			dateEnd: new Date("2022, 07 ,29"),
			voted: false,
			result: "",
			options: [
				{
					imagePath: "vue.png",
					nome: "Vue.js",
				},
				{
					imagePath: "angular.png",
					nome: "Angular",
				},
				{
					imagePath: "react.png",
					nome: "React",
				},
			],
		},
		{
			id: uuidv4(),
			title: "Cani",
			description: "Votazione per il cane più bello",
			dateStart: new Date("2020, 04, 10"),
			dateEnd: new Date("2022, 07 ,29"),
			voted: false,
			result: "",
			options: [
				{ imagePath: "pastore_tedesco.jpg", nome: "Pastore tedesco" },
				{
					imagePath: "doberman.jpg",
					nome: "Doberman",
				},
				{
					imagePath: "labrador.jpg",
					nome: "Labrador",
				},
				{
					imagePath: "golden_retriver.jpg",
					nome: "Golden retriever",
				},
				{ imagePath: "beagle.jpg", nome: "Beagle" },
				{
					imagePath: "pitbull.jpg",
					nome: "Pitbull",
				},
				{
					imagePath: "bassotto.jpg",
					nome: "Bassotto",
				},
				{
					imagePath: "rottweiler.jpg",
					nome: "Rottweiler",
				},
			],
		},
		{
			id: uuidv4(),
			title: "Mete estive",
			description: "Votazione per la meta estiva preferita dagli italiani",
			dateStart: new Date("2022, 04, 10"),
			dateEnd: new Date("2022, 05, 10"),
			voted: false,
			result: "",
			options: [
				{ imagePath: "pastore_tedesco.jpg", nome: "Pastore tedesco" },
				{
					imagePath: "doberman.jpg",
					nome: "Doberman",
				},
				{
					imagePath: "labrador.jpg",
					nome: "Labrador",
				},
			],
		},
		{
			id: uuidv4(),
			title: "Gatti",
			description: "Votazione per il gatto più bello",
			dateStart: new Date("2020, 04, 10"),
			dateEnd: new Date("2021, 04, 10"),
			voted: true,
			result: "Persiano",
			options: [
				{ imagePath: "pastore_tedesco.jpg", nome: "Pastore tedesco" },
				{
					imagePath: "doberman.jpg",
					nome: "Persiano",
				},
			],
		},
	]);

	const changeRole = (typeUser) => {
		console.log(typeUser);
		setRole(typeUser);
	};

	const changeVotations = (nuoveVotazioni) => {
		setVotations(nuoveVotazioni);
	};

	return (
		<div className="App">
			<RoleContext.Provider value={{ role, changeRole }}>
				<Header />
				{role === "" && <LoginForm />}
				<VotationsContext.Provider value={{ votations, changeVotations }}>
					{role === "genericUser" && <GenericContent />}
					{role === "admin" && <AdminContent />}
				</VotationsContext.Provider>
			</RoleContext.Provider>
		</div>
	);
}

export default App;
