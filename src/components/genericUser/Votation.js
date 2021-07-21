import React, { useState, useContext } from "react";
import {
	Col,
	Row,
	Container,
	Card,
	Button,
	OverlayTrigger,
	Tooltip,
	Modal,
} from "react-bootstrap";
import { VotationsContext } from "../../App";
import { FaVoteYea } from "react-icons/fa";
import "./Votation.css";

export default function Votation(props) {
	// eslint-disable-next-line no-unused-vars
	const { votations, changeVotations } = useContext(VotationsContext);
	const { setOpenVotation, openVotation, votation } = props;
	const [showRules, setShowRules] = useState(false);
	const [vote, setVote] = useState(null);
	const [showDialog, setShowDialog] = useState(false);

	const handleCloseDialog = () => setShowDialog(false);
	const handleShowDialog = () => setShowDialog(true);

	const checkLength = () => {
		if (votation.options.length === 2) return 6;
		else if (votation.options.length > 6) return 3;
		else return 4;
	};

	const selectCard = (option) => {
		if (vote === null) setVote(option);
		else setVote(null);
	};

	const handleEndVotation = () => {
		let elToChange = votations.find((vot) => vot === votation);
		elToChange.voted = true;
		elToChange.result = vote.nome;
		setOpenVotation(false);
		handleCloseDialog();
	};

	const handleShowRules = () => {
		setShowRules(!showRules);
	};
	return (
		<>
			<Container className="regole">
				<Row className="mt-4">
					<Col xs={12} className="centered py-2">
						<h1>Votazione: {votation.title}</h1>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="centered py-2">
						<p className="rules" onClick={handleShowRules}>
							{!showRules ? "Apri" : "Chiudi"} le regole da seguire per la
							votazione
							{!showRules ? (
								<img src="/down.png" alt="" className="dropdown-img ml-1" />
							) : (
								<img src="/up.png" alt="" className="dropdown-img ml-1" />
							)}
						</p>
					</Col>
				</Row>
				<Row>
					<Col xs={12} className="centered py-2">
						{showRules && (
							<ul>
								<li>
									È possibile votare <strong>un solo</strong> partito.
								</li>
								<li>
									Per votare è necessario fare un
									<strong> click (da PC)</strong> o un
									<strong> tap (da cellulare)</strong> sulla scelta da votare.
									Si può fare nuovamente la stessa operazione sulla carta scelta
									per <strong>annulare</strong> il voto e sceglierne un'altra.
								</li>
								<li>
									Una volta fatta la scelta, cliccare sul bottone
									<strong> "Termina votazione"</strong>. A questo punto si aprià
									una finestra in cui si potrà confermare la votazione o tornare
									indietro. Tale bottone rimarrà <strong> disabilitato</strong>{" "}
									fino a che non si avrà fatto una scelta.
								</li>
							</ul>
						)}
					</Col>
				</Row>
			</Container>

			{openVotation && (
				<Container className="votation-content">
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
											<div className="flex-row-container">
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
					<div className="flex-column-container end-votation mb-2">
						{!vote ? (
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id="tooltips">
										Bottone disabilitato! Seleziona una carta per votarla.
									</Tooltip>
								}>
								<span className="d-inline-block" style={{ width: "100%" }}>
									<div className="flex-column-container">
										<Button
											variant="primary"
											className="px-3 py-2 ombre-btn mb-5"
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
								<Button
									variant="primary"
									className="px-3 py-2 ombre-btn mb-5"
									onClick={handleShowDialog}>
									<FaVoteYea size={20} className="mr-2 mb-1" />
									Termina votazione
								</Button>
								<Modal show={showDialog} onHide={handleCloseDialog}>
									<Modal.Header closeButton>
										<Modal.Title>Vuoi terminare la votazione?</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										Stai per votare:
										<div className="flex-column-container">
											<img
												src={"/images/" + vote.imagePath}
												className="rounded-circle"
												style={{ width: "10em" }}
												alt={vote.nome + " logo"}
											/>
											<h3 className="mt-2">
												<strong>{vote.nome}</strong>
											</h3>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleCloseDialog}>
											Indietro
										</Button>
										<Button variant="success" onClick={handleEndVotation}>
											Vota
										</Button>
									</Modal.Footer>
								</Modal>
							</>
						)}
					</div>
				</Container>
			)}
		</>
	);
}
