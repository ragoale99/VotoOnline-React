import React, { useContext, useState } from "react";
import { VotationsContext } from "../../App";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import moment from "moment";
import "./AdminContent.css";

export default function AdminContent() {
	const { votations, changeVotations } = useContext(VotationsContext);
	const [del, setDel] = useState(false);
	const [votationToDel, setVotationToDel] = useState(null);

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
									<Card
										className={`mb-3 cards p-1 ${
											del && votation === votationToDel ? "delete" : null
										}`}>
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
											<Button
												variant="danger"
												onClick={() => handleDeleteVotation(votation)}>
												Delete
											</Button>
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
