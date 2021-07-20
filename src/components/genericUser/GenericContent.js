import React, { useContext, useState } from "react";
import { VotationsContext } from "../../App";
import { Col, Row, Container, Card, Tooltip, OverlayTrigger } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import moment from "moment";
import Votation from "./Votation";
import "./GenericContent.css";

export default function GenericContent() {
	// eslint-disable-next-line no-unused-vars
	const { votations, changeVotations } = useContext(VotationsContext);
	const [open, setOpen] = useState(false);
	const [voteToFlip, setVoteToFlip] = useState(null);
	const [flipped, setFlipped] = useState(false);
	const [selectedVotation, setSelectedVotation] = useState(null);

	let votationsToDo = votations.filter((votation) => {
		return votation.voted === false;
	});

	let votationsDone = votations.filter((votation) => {
		return votation.voted !== false;
	});

	const openVotation = (votation) => {
		setVoteToFlip(null);
		setFlipped(false);
		setOpen(true);
		setSelectedVotation(votation);
	};

	const checkLength = (size, votes) => {
		if (size === "lg") {
			if (votes.length === 1) return 12;
			else if (votes.length === 2) return 6;
			else if (votes.length > 6) return 3;
			else return 4;
		}
		if (votations.length === 1) return 12;
		else return 6;
	};

	const handleFlipped = (vote) => {
		setVoteToFlip(vote);
		setFlipped(!flipped);
	};

	const checkDataStart = (data) => {
		const today = new Date();
		const date = new Date(data);
		return date.getTime() <= today.getTime();
	};

	return (
		<>
			{!open && (
				<Container className="generic-content mb-2">
					<div className="mt-3 from-left">
						<Row>
							<Col className="centered py-2">
								<h2 className="title-cards">
									Votazioni disponibili
									<OverlayTrigger
										placement="bottom"
										overlay={
											<Tooltip id="tooltip">
												Clicca su una votazione disponibile per iniziarla!
											</Tooltip>
										}>
										<BsInfoCircleFill size={18} className="info" />
									</OverlayTrigger>
								</h2>
							</Col>
						</Row>
						<Row>
							{votationsToDo.length > 0 ? (
								votationsToDo.map((votation) => {
									return (
										<Col
											xs={12}
											md={checkLength("md", votationsToDo)}
											lg={checkLength("lg", votationsToDo)}
											key={votation.id}
											onClick={
												checkDataStart(votation.dateStart)
													? () => openVotation(votation)
													: undefined
											}>
											<Card
												className={`mb-3  p-1 ${
													checkDataStart(votation.dateStart)
														? "card-votations"
														: "card-votations-future"
												}`}>
												<Card.Body>
													<Card.Title
														className={`mb-2 ${
															checkDataStart(votation.dateStart) ? "" : "title-future"
														}`}>
														{votation.title}
													</Card.Title>
													{checkDataStart(votation.dateStart) && (
														<Card.Subtitle className="mb-2 text-muted">
															<em>
																Dal {moment(votation.dateStart).format("DD/MM/YYYY")} al{" "}
																{moment(votation.dateEnd).format("DD/MM/YYYY")}
															</em>
														</Card.Subtitle>
													)}
													<Card.Text
														className={`mb-4 ${
															checkDataStart(votation.dateStart) ? "" : "text-future"
														}`}>
														{checkDataStart(votation.dateStart)
															? votation.description
															: "La votazione inizierà il " +
															  moment(votation.dateStart).format("DD/MM/YYYY")}
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
								<h2 className="title-cards">
									Votazioni concluse
									<OverlayTrigger
										placement="bottom"
										overlay={
											<Tooltip id="tooltip">
												Clicca su una votazione già conclusa per vedere cosa hai votato!
											</Tooltip>
										}>
										<BsInfoCircleFill size={18} className="info" />
									</OverlayTrigger>
								</h2>
							</Col>
						</Row>
						<Row>
							{votationsDone.length > 0 ? (
								votationsDone.map((votation) => {
									return (
										<Col
											xs={12}
											md={checkLength("md", votationsDone)}
											lg={checkLength("lg", votationsDone)}
											key={votation.id}>
											<div className="scene">
												<div
													className={`bueo ${
														flipped && voteToFlip === votation ? "is-flipped" : null
													}`}
													onClick={() => handleFlipped(votation)}>
													<Card className="mb-3 bueo__face bueo__face--front p-1">
														<Card.Body>
															<Card.Title>{votation.title}</Card.Title>
															<Card.Subtitle className="mb-2 text-muted">
																<em>Conclusa il {moment(votation.dateEnd).format("DD/MM/YYYY")}</em>
															</Card.Subtitle>
															<Card.Text>{votation.description}</Card.Text>
														</Card.Body>
													</Card>
													<Card className="bueo__face bueo__face--back p-1">
														<Card.Body>
															<Card.Title>
																Alla votazione del {moment(votation.dateEnd).format("DD/MM/YYYY")}{" "}
																hai votato: <strong>{votation.result}</strong>
															</Card.Title>
														</Card.Body>
													</Card>
												</div>
											</div>
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
