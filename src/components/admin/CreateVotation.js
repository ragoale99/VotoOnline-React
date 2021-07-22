import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiAddToQueue } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { Col, Row, Container, Button, Form, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./CreateVotation.css";
import { VotationsContext } from "../../App";
import { v4 as uuidv4 } from "uuid";

export default function CreateVotation(props) {
	const { votations, changeVotations } = useContext(VotationsContext);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [name, setName] = useState(["", "", "", "", "", "", "", ""]);
	const [file, setFile] = useState(["", "", "", "", "", "", "", ""]);
	const [options, setOptions] = useState([
		{
			nome: "",
			imagePath: null,
		},
		{
			nome: "",
			imagePath: null,
		},
	]);
	const [charsCount, setCharsCount] = useState(0);

	let formIsValid = false;
	if (title !== "" && description !== "" && startDate !== null && endDate !== null) {
		formIsValid = true;
	}

	const addCard = () => {
		setOptions([...options, { nome: "", imagePath: null }]);
	};

	const deleteCard = (index) => {
		let array = [...options]; // make a separate copy of the array
		array.splice(index, 1);
		setOptions(array);
		let array2 = [...file];
		array2.splice(index, 1);
		setFile(array2);
	};

	const handleTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleDescription = (event) => {
		setDescription(event.target.value);
		setCharsCount(event.target.value.length);
	};

	const handleName = (event, index) => {
		setName((name) => {
			const copyItems = [...name];
			const finalItems = [];
			for (let i = 0; i < copyItems.length; i += 1) {
				if (i === index) {
					finalItems.push(event.target.value);
				} else {
					finalItems.push(copyItems[i]);
				}
			}
			return finalItems;
		});
	};

	const handleFile = (e, index) => {
		setFile((file) => {
			const copyItems = [...file];
			const finalItems = [];
			for (let i = 0; i < copyItems.length; i += 1) {
				if (i === index) {
					finalItems.push(e.target.files[0]);
				} else {
					finalItems.push(copyItems[i]);
				}
			}
			return finalItems;
		});
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();

		let optionsArr = [];
		for (let i = 0; i < 8; i++) {
			if (file[i] !== "" && name[i] !== "") {
				optionsArr.push({
					imagePath: file[i].name,
					nome: name[i],
				});
			}
		}

		const newVotation = {
			id: uuidv4(),
			title: title,
			description: description,
			dateStart: startDate,
			dateEnd: endDate,
			voted: false,
			result: "",
			optionsArr,
		};

		const votesToChange = [...votations, newVotation];
		changeVotations(votesToChange);

		props.setCreate(false);
	};

	return (
		<Container className="form-add-votation mt-4">
			<Form className="mb-5" onSubmit={formSubmitHandler}>
				<Form.Group>
					<Form.Label>
						<strong>Titolo</strong>
					</Form.Label>
					<Form.Control
						type="text"
						placeholder="Inserisci il titolo"
						required
						className="ombre"
						onChange={handleTitle}
					/>
				</Form.Group>
				<Form.Group className="descrizione">
					<Form.Label>
						<strong>Descrizione</strong>
					</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						maxLength="100"
						placeholder="Inserisci la descrizione"
						required
						onChange={handleDescription}
						className="ombre"
						style={{ resize: "none" }}
					/>
					<span className="counter">{charsCount}/100</span>
				</Form.Group>
				<div className="date-container">
					<div className="flex-column-container">
						<Form.Label>
							<strong>Data di inizio</strong>
						</Form.Label>
						<DatePicker
							className="date-picker p-1"
							selected={startDate}
							onChange={(date) => setStartDate(date)}
						/>
					</div>
					<div className="flex-column-container">
						<Form.Label>
							<strong>Data di fine</strong>
						</Form.Label>
						<DatePicker
							className="date-picker p-1"
							selected={endDate}
							onChange={(date) => setEndDate(date)}
						/>
					</div>
				</div>
				<h3 className="mt-5 centered">Inserisci scelte</h3>
				<Row>
					{options.map((option, index) => {
						return (
							<Col xs={12} key={index}>
								<Card className="mt-3	carta">
									{index > 1 && (
										<img
											src="/close.png"
											alt=""
											className="close-image"
											onClick={() => deleteCard(index)}></img>
									)}
									<Card.Body>
										<Card.Title className="centered">Carta {index + 1}</Card.Title>
										<Form.Group>
											<Form.Label>
												<strong>Nome</strong>
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="Inserisci il nome della carta"
												onChange={(event) => handleName(event, index)}
												required
												className="inp"
											/>
										</Form.Group>

										<Form.Group>
											<Form.Label>
												<strong>Immagine</strong>
											</Form.Label>
											<Form.Control
												type="file"
												onChange={(event) => handleFile(event, index)}
												accept="image/*"
												required
												className="inp"
											/>
										</Form.Group>
										<div className="flex">
											<img
												className="rounded-circle"
												src={file[index] ? URL.createObjectURL(file[index]) : null}
												alt={file[index] ? file.name : null}
											/>
										</div>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
				<Row className="mt-3 flex">
					{options.length >= 8 ? (
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip id="tooltip">
									Bottone disabilitato! Controlla che tutti i campi siano riempiti.
								</Tooltip>
							}>
							<div>
								<Button
									className="mx-auto ombre-btn"
									disabled
									aria-disabled="true"
									style={{ pointerEvents: "none" }}>
									<IoIosAdd size={26} />
								</Button>
							</div>
						</OverlayTrigger>
					) : (
						<Button className="mx-auto ombre-btn" onClick={addCard}>
							<IoIosAdd size={26} />
						</Button>
					)}
				</Row>
				<Row className="mt-4 flex">
					{!formIsValid ? (
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip id="tooltip">
									Bottone disabilitato! Controlla che tutti i campi siano riempiti.
								</Tooltip>
							}>
							<div>
								<Button
									className="ombre-btn py-2 px-4"
									variant="success"
									disabled
									aria-disabled="true"
									style={{ pointerEvents: "none" }}>
									<BiAddToQueue className="mr-1" /> Crea votazione
								</Button>
							</div>
						</OverlayTrigger>
					) : (
						<Button className="mx-auto ombre-btn py-2 px-4" type="submit" variant="success">
							<BiAddToQueue className="mr-1" /> Crea votazione
						</Button>
					)}
				</Row>
			</Form>
		</Container>
	);
}
