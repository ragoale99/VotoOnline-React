import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiAddToQueue } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { Col, Row, Container, Button, Form, Card } from "react-bootstrap";
import "./CreateVotation.css";
import { VotationsContext } from "../../App";

export default function CreateVotation() {
	// eslint-disable-next-line no-unused-vars
	const { votations, changeVotations } = useContext(VotationsContext);
	const [startDate, setStartDate] = useState(new Date());
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
	const [file, setFile] = useState(["", "", "", "", "", "", "", ""]);

	const [charsCount, setCharsCount] = useState(0);
	const [endDate, setEndDate] = useState(new Date());

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

	const formSubmitHandler = (event) => {
		event.preventDefault();
	};

	const fileHandler = (e, index) => {
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

	return (
		<Container className="form-add-votation mt-4">
			<Form className="mb-5" onSubmit={formSubmitHandler}>
				<Form.Group>
					<Form.Label>
						<strong>Titolo</strong>
					</Form.Label>
					<Form.Control type="text" placeholder="Inserisci il titolo" required className="ombre" />
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
						onChange={(e) => setCharsCount(e.target.value.length)}
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
												placeholder="Inserisci il titolo"
												required
												value={option.nome}
												className="inp"
											/>
										</Form.Group>

										<Form.Group>
											<Form.Label>
												<strong>Immagine</strong>
											</Form.Label>
											<Form.Control
												type="file"
												onChange={(event) => fileHandler(event, index)}
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
				<Row className="mt-3">
					<Button className="mx-auto ombre-btn" onClick={addCard} disabled={options.length >= 8}>
						<IoIosAdd size={26} />
					</Button>
				</Row>
				<Row className="mt-4">
					<Button className="mx-auto ombre-btn py-2 px-4" onClick={addCard} variant="success">
						<BiAddToQueue className="mr-1" /> Crea votazione
					</Button>
				</Row>
			</Form>
		</Container>
	);
}

/* {!formIsValid ? (
	<OverlayTrigger
		placement="top"
		overlay={
			<Tooltip id="tooltip">
				Bottone disabilitato! Controlla che email e password siano
				validi.
			</Tooltip>
		}>
		<span className="d-inline-block" style={{ width: "100%" }}>
			<Button
				type="submit"
				disabled
				aria-disabled="true"
				style={{ pointerEvents: "none" }}
				className="sub-button mt-2 ombre-btn">
				Accedi
			</Button>
		</span>
	</OverlayTrigger>
) : (
	<Button
		type="submit"
		variant="success"
		className="sub-button mt-2 ombre-btn">
		Accedi
	</Button>
)} */
