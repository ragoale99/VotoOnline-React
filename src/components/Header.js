import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { RoleContext } from "../App";
import "./Header.css";

export default function Header() {
	const { role, changeRole } = useContext(RoleContext);
	const [showDialog, setShowDialog] = useState(false);

	const handleCloseDialog = () => setShowDialog(false);
	const handleShowDialog = () => setShowDialog(true);

	const handleLogout = () => {
		changeRole("");
		setShowDialog(false);
	};
	return (
		<header className="header">
			<div className="title-container">
				<img src="/logo192.png" alt="logo react" className="logo mr-1" />
				<h1 className="mt-2">
					<strong>VotoOnline</strong>
				</h1>
			</div>
			{role !== "" && (
				<>
					<div className="log-out-container">
						<button className="btn-logout ombre-btn" onClick={handleShowDialog}>
							<FiLogOut size={26} /> <span className="test">Logout</span>
						</button>
					</div>
					<Modal show={showDialog} onHide={handleCloseDialog}>
						<Modal.Header closeButton>
							<Modal.Title>Vuoi effettuare il logout?</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p>Verrai riportato alla pagina di login.</p>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseDialog}>
								Indietro
							</Button>
							<Button variant="danger" onClick={handleLogout}>
								Esci
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
		</header>
	);
}
