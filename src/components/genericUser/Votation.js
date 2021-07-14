import React from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import "./Votation.css";

export default function Votation(props) {
	const { openVotation, votation } = props;
	return (
		<>
			{openVotation && (
				<Container className="votation-content mb-2">
					<div className="mt-3">
						<Row className="mt-4">
							{votation.options.map((option, index) => {
								return (
									<Col xs={12} md={6} lg={4} key={option.nome}>
										<Card
											className={`card-option p-1 ${
												index % 2 === 0 ? "from-left" : "from-right"
											}`}>
											<div className="flex-container">
												<img
													variant="top"
													src={"/images/" + option.imagePath}
													className="rounded-circle logo-img"
													alt={option.nome + " logo"}
												/>
											</div>

											<Card.Body>
												<Card.Title className="centered">
													<strong>{option.nome}</strong>
												</Card.Title>
											</Card.Body>
										</Card>
									</Col>
								);
							})}
						</Row>
					</div>
					<div className="flex-container" style={{ flexDirection: "column" }}>
						<p className="mb-2">Stai vaotando:</p>
						<Button variant="success" className="">
							Termina votazione
						</Button>
					</div>
				</Container>
			)}
		</>
	);
}
