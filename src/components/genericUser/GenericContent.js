import React, { useContext } from "react";
import { VotationsContext } from "../../App";
import { Col, Row, Container, Card } from "react-bootstrap";
import moment from "moment";
import "./GenericContent.css";

export default function GenericContent() {
	// eslint-disable-next-line no-unused-vars
	const { votations, changeVotations } = useContext(VotationsContext);
	return (
		<Container className="generic-content">
			<div className="mt-3 from-left">
				<Row>
					<Col className="centered py-2">
						<h2>Votationi disponibili</h2>
					</Col>
				</Row>
				<Row>
					{votations.map((votation) => {
						return (
							<Col xs={12} md={6} lg={4} key={votation.id}>
								<Card className="mb-3 card-votations p-1">
									<Card.Body>
										<Card.Title>{votation.title}</Card.Title>
										<Card.Subtitle className="mb-2 text-muted">
											Dal {moment(votation.dateStart).format("DD/MM/YYYY")} al{" "}
											{moment(votation.dateEnd).format("DD/MM/YYYY")}
										</Card.Subtitle>
										<Card.Text className="mb-4">
											{votation.description}
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</div>
			<div className="mt-3 from-right">
				<Row>
					<Col className="centered py-2">
						<h2>Votationi già concluse</h2>
					</Col>
				</Row>
				<Row>
					{votations.map((votation) => {
						return (
							<Col xs={12} md={6} lg={4} key={votation.id}>
								<Card className="mb-3 card-votations">
									<Card.Body>
										<Card.Title>{votation.title}</Card.Title>
										<Card.Subtitle className="mb-2 text-muted">
											Dal {moment(votation.dateStart).format("DD/MM/YYYY")} al{" "}
											{moment(votation.dateEnd).format("DD/MM/YYYY")}
										</Card.Subtitle>
										<Card.Text>{votation.description}</Card.Text>
										<Card.Link href="#">Card Link</Card.Link>
										<Card.Link href="#">Another Link</Card.Link>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</div>
		</Container>
	);
}
