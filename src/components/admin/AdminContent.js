import React, { useContext, useState } from "react";
import { VotationsContext } from "../../App";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import CreateVotation from "./CreateVotation";
import moment from "moment";
import "./AdminContent.css";

export default function AdminContent() {
	const { votations, changeVotations } = useContext(VotationsContext);
	const [del, setDel] = useState(false);
	const [votationToDel, setVotationToDel] = useState(null);
	const [create, setCreate] = useState(false);

	const handleDeleteVotation = (votation) => {
		setVotationToDel(votation);
		setDel(true);
		const newList = votations.filter((vote) => {
			return vote !== votation;
		});
		setTimeout(() => {
			changeVotations(newList);
			setDel(false);
		}, 500);
	};

	const checkLength = (size) => {
		if (size === "lg") {
			if (votations.length === 1) return 12;
			else if (votations.length === 2) return 6;
			else if (votations.length > 6) return 3;
			else return 4;
		}
		if (votations.length === 1) return 12;
		else return 6;
	};

	const createVotation = () => {
		setCreate(true);
	};

	return (
		<>
			{!create ? (
				<Container className="generic-content mb-2">
					<div className="mt-3 from-left">
						<Row>
							<Col className="centered py-2">
								<h2 className="title-cards">Votationi disponibili</h2>
							</Col>
						</Row>
						<Row>
							{votations.length > 0 ? (
								votations.map((votation) => {
									return (
										<Col xs={12} md={checkLength("md")} lg={checkLength("lg")} key={votation.id}>
											<Card
												className={`mb-3 cards p-1 ${
													del && votation === votationToDel ? "delete" : null
												}`}>
												<Card.Body>
													<Card.Title>{votation.title}</Card.Title>
													<Card.Subtitle className="mb-2 text-muted">
														<em>
															Dal {moment(votation.dateStart).format("DD/MM/YYYY")} al{" "}
															{moment(votation.dateEnd).format("DD/MM/YYYY")}
														</em>
													</Card.Subtitle>
													<Card.Text className="mb-5">{votation.description}</Card.Text>
													<Button
														className="btn-delete ombre-btn"
														variant="danger"
														onClick={() => handleDeleteVotation(votation)}>
														Elimina votazione
													</Button>
												</Card.Body>
											</Card>
										</Col>
									);
								})
							) : (
								<h3 className="mx-auto" style={{ color: "red" }}>
									Non ci sono votazioni disponibili, ma puoi crearne una nuova!
								</h3>
							)}
						</Row>
					</div>
					<div className="flex-column-container my-4">
						<Button variant="success" className="ombre-btn create-but" onClick={createVotation}>
							Crea una nuova votazione
						</Button>
					</div>
				</Container>
			) : (
				<CreateVotation setCreate={setCreate} />
			)}
		</>
	);
}
