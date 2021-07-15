import React, { useContext } from "react";
import { VotationsContext } from "../../App";
import { Col, Row, Container, Card } from "react-bootstrap";
import moment from "moment";

export default function AdminContent() {
	const votations = useContext(VotationsContext);
	return (
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
								<Col xs={12} md={6} lg={4} key={votation.id}>
									<Card className="mb-3 card-votations p-1">
										<Card.Body>
											<Card.Title>{votation.title}</Card.Title>
											<Card.Subtitle className="mb-2 text-muted">
												<em>
													Dal {moment(votation.dateStart).format("DD/MM/YYYY")}{" "}
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
		</Container>
	);
}
