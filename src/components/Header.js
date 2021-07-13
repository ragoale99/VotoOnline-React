import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { FiLogOut } from "react-icons/fi";
import { RoleContext } from "../App";
import "./Header.css";

export default function Header() {
	// eslint-disable-next-line no-unused-vars
	const { role, changeRole } = useContext(RoleContext);
	return (
		<header className="header">
			<div className="title-container">
				<img src="/logo192.png" alt="logo react" className="logo mr-1" />
				<h1>
					<strong>VotoOnline</strong>
				</h1>
			</div>
			{role !== "" && (
				<div className="log-out-container">
					<Button
						variant="warning"
						className="px-4"
						onClick={() => changeRole("")}>
						<FiLogOut size={26} /> Log out
					</Button>
				</div>
			)}
		</header>
	);
}
