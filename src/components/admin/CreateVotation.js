import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Row, Container, Button, Form, Card } from "react-bootstrap";
import "./CreateVotation.css";
import { VotationsContext } from "../../App";

export default function CreateVotation() {
	const { votations, changeVotations } = useContext(VotationsContext);
	const [startDate, setStartDate] = useState(new Date());
	const [charsCount, setCharsCount] = useState(0);
	const [endDate, setEndDate] = useState(new Date());
	const formSubmitHandler = (event) => {
		event.preventDefault();
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
					/>
				</Form.Group>
				<Form.Group className="descrizione">
					<Form.Label>
						<strong>Descrizione</strong>
					</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						maxlength="100"
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
							className="date-picker"
							selected={startDate}
							onChange={(date) => setStartDate(date)}
						/>
					</div>
					<div className="flex-column-container">
						<Form.Label>
							<strong>Data di fine</strong>
						</Form.Label>
						<DatePicker
							className="date-picker"
							selected={endDate}
							onChange={(date) => setEndDate(date)}
						/>
					</div>
				</div>
				<h3 className="mt-5 centered">Inseirisci scelte</h3>
				<Row>
					{votations.map((votation, index) => {
						return (
							<Col xs={12} key={votation.id}>
								<Card className="mt-3	">
									<Card.Body>
										<Card.Title className="centered">
											Carta {index + 1}
										</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
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
