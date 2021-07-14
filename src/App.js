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
	const [role, setRole] = useState("genericUser");
	const [votations, setVotations] = useState([
		{
			id: uuidv4(),
			title: "Comunali",
			description: "Votazione per la scelta del sindaco di Rubano",
			dateStart: new Date(),
			dateEnd: new Date(),
			voted: false,
			result: "",
			options: [
				{ imagePath: "lega.jpg", nome: "Lega Nord" },
				{
					imagePath: "potere_al_popolo.jpg",
					nome: "Potere al popolo!",
				},
				{
					imagePath: "giovani_democratici.png",
					nome: "Giovani democratici",
				},
				{
					imagePath: "italia_viva.png",
					nome: "Italia Viva",
				},
				{ imagePath: "berla.jpg", nome: "Berlusconi" },
				{
					imagePath: "fratelli_italia.png",
					nome: "Fratelli d'Italia",
				},
			],
		},
		{
			id: uuidv4(),
			title: "Parlamentari",
			description: "Votazione bellissima",
			dateStart: new Date(),
			dateEnd: new Date(),
			voted: false,
			result: "",
			options: [
				{
					imagePath: "fratelli_italia.png",
					nome: "Fratelli d'Italia",
				},
				{
					imagePath: "movimento5stelle.jpg",
					nome: "Movimento 5 Stelle",
				},
			],
		},
		{
			id: uuidv4(),
			title: "Regionali",
			description: "Votazione per la scelta del capo della regione",
			dateStart: new Date(),
			dateEnd: new Date(),
			voted: true,
			result: "Lega Nord",
			options: [
				{ imagePath: "lega.jpg", nome: "Lega Nord" },
				{
					imagePath: "potere_al_popolo.jpg",
					nome: "Potere al popolo!",
				},
				{
					imagePath: "cambiamo.png",
					nome: "Cambiamo!",
				},
				{
					imagePath: "italia_viva.png",
					nome: "Italia Viva",
				},
				{ imagePath: "berla.jpg", nome: "Berlusconi" },
				{
					imagePath: "fratelli_italia.png",
					nome: "Fratelli d'Italia",
				},
				{
					imagePath: "movimento5stelle.jpg",
					nome: "Movimento 5 Stelle",
				},
			],
		},
		{
			id: uuidv4(),
			title: "Regionali",
			description: "Votazione per la scelta del capo della regione",
			dateStart: new Date(),
			dateEnd: new Date(),
			voted: false,
			result: "Lega Nord",
			options: [
				{ imagePath: "lega.jpg", nome: "Lega Nord" },
				{
					imagePath: "potere_al_popolo.jpg",
					nome: "Potere al popolo!",
				},
				{
					imagePath: "cambiamo.png",
					nome: "Cambiamo!",
				},
				{
					imagePath: "italia_viva.png",
					nome: "Italia Viva",
				},
				{ imagePath: "berla.jpg", nome: "Berlusconi" },
				{
					imagePath: "fratelli_italia.png",
					nome: "Fratelli d'Italia",
				},
				{
					imagePath: "movimento5stelle.jpg",
					nome: "Movimento 5 Stelle",
				},
			],
		},
	]);

	const changeRole = (typeUser) => {
		console.log(typeUser);
		setRole(typeUser);
	};

	/* 	const changeVotations = (votations) => {
		setVotations(votations);
	}; */

	return (
		<div className="App">
			<RoleContext.Provider value={{ role, changeRole }}>
				<Header />
				{role === "" && <LoginForm />}
				<VotationsContext.Provider value={votations}>
					{role === "genericUser" && <GenericContent />}
					{role === "admin" && <AdminContent />}
				</VotationsContext.Provider>
			</RoleContext.Provider>
		</div>
	);
}

export default App;
