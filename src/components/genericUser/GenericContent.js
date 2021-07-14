import React, { useContext, useState } from "react";
import { VotationsContext } from "../../App";
import { Col, Row, Container, Card } from "react-bootstrap";
import moment from "moment";
import Votation from "./Votation";
import "./GenericContent.css";

export default function GenericContent() {
	// eslint-disable-next-line no-unused-vars
	const votations = useContext(VotationsContext);
	const [open, setOpen] = useState(false);
	const [selectedVotation, setSelectedVotation] = useState(null);

	let votationsToDo = votations.filter((votation) => {
		return votation.voted === false;
	});

	let votationsDone = votations.filter((votation) => {
		return votation.voted !== false;
	});

	const openVotation = (votation) => {
		setOpen(true);
		setSelectedVotation(votation);
	};
	return (
		<>
			{!open && (
				<Container className="generic-content mb-2">
					<div className="mt-3 from-left">
						<Row>
							<Col className="centered py-2">
								<h2 className="title-cards">Votationi disponibili</h2>
							</Col>
						</Row>
						<Row>
							{votationsToDo.length > 0 ? (
								votationsToDo.map((votation) => {
									return (
										<Col
											xs={12}
											md={6}
											lg={4}
											key={votation.id}
											onClick={() => openVotation(votation)}>
											<Card className="mb-3 card-votations p-1">
												<Card.Body>
													<Card.Title>{votation.title}</Card.Title>
													<Card.Subtitle className="mb-2 text-muted">
														<em>
															Dal{" "}
															{moment(votation.dateStart).format("DD/MM/YYYY")}{" "}
															al {moment(votation.dateEnd).format("DD/MM/YYYY")}
														</em>
													</Card.Subtitle>
													<Card.Text className="mb-4">
														{votation.description}
													</Card.Text>
												</Card.Body>
											</Card>
										</Col>
									);
								})
							) : (
								<h3 className="mx-auto" style={{ color: "red" }}>
									Non ci sono votazioni disponibili in questo momento
								</h3>
							)}
						</Row>
					</div>
					<div className="mt-3 from-right">
						<Row>
							<Col className="centered py-2">
								<h2 className="title-cards">Votationi già concluse</h2>
							</Col>
						</Row>
						<Row>
							{votationsDone.length > 0 ? (
								votationsDone.map((votation) => {
									return (
										<Col xs={12} md={6} lg={4} key={votation.id}>
											<Card className="mb-3 card-votations p-1">
												<Card.Body>
													<Card.Title>{votation.title}</Card.Title>
													<Card.Subtitle className="mb-2 text-muted">
														<em>
															Conclusa il{" "}
															{moment(votation.dateEnd).format("DD/MM/YYYY")}
														</em>
													</Card.Subtitle>
													<Card.Text>{votation.description}</Card.Text>
												</Card.Body>
											</Card>
										</Col>
									);
								})
							) : (
								<h3 className="mx-auto" style={{ color: "red" }}>
									Non hai concluso ancora nessuna votazione
								</h3>
							)}
						</Row>
					</div>
				</Container>
			)}

			{open && (
				<Votation
					setOpenVotation={setOpen}
					openVotation={open}
					votation={selectedVotation}></Votation>
			)}
		</>
	);
}
