import React, { useState } from "react";
import {
	Col,
	Row,
	Container,
	Card,
	Button,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { FaVoteYea } from "react-icons/fa";
import "./Votation.css";

export default function Votation(props) {
	const { openVotation, votation } = props;
	const [vote, setVote] = useState(null);

	const checkLength = () => {
		if (votation.options.length === 2) return 6;
		else if (votation.options.length > 6) return 3;
		else return 4;
	};

	const selectCard = (option) => {
		if (vote === null) setVote(option);
		else setVote(null);
	};
	return (
		<>
			{openVotation && (
				<Container className="votation-content mb-2">
					<div className="mt-3">
						<Row className="mt-4">
							{votation.options.map((option, index) => {
								return (
									<Col xs={12} md={6} lg={checkLength()} key={option.nome}>
										<Card
											tabIndex="0"
											className={`card-option p-1 disable-select ${
												index % 2 === 0 ? "from-left" : "from-right"
											} ${
												vote === option
													? "selected"
													: vote !== null
													? "not-selected"
													: "hover-behaviour"
											}`}
											onClick={
												vote === option || vote === null
													? () => selectCard(option)
													: undefined
											}>
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
						{!vote ? (
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="tooltips">
										Bottone disabilitato! Clicca su una carta per votare.
									</Tooltip>
								}>
								<span className="d-inline-block" style={{ width: "100%" }}>
									<div
										className="flex-container"
										style={{ flexDirection: "column" }}>
										<Button
											variant="primary"
											className="mb-5 px-3 py-2"
											disabled
											aria-disabled="true"
											style={{ pointerEvents: "none" }}>
											<FaVoteYea size={20} className="mr-2 mb-1" />
											Termina votazione
										</Button>
									</div>
								</span>
							</OverlayTrigger>
						) : (
							<>
								<p className="mb-2">
									Stai votando: <strong>{vote.nome}</strong>
								</p>
								<Button variant="primary" className="mb-5 px-3 py-2">
									<FaVoteYea size={20} className="mr-2 mb-1" />
									Termina votazione
								</Button>
							</>
						)}
					</div>
				</Container>
			)}
		</>
	);
}
