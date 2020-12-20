import React from "react";
import io from "socket.io-client";
import Header from "../common/header";
import { detailMedecinStyles } from "../common/styles/detailMedecin";
import Swal from 'sweetalert2';

import { Grid } from "@material-ui/core";

class PatientRoom extends React.Component {
	constructor(props) {
		super();
		this.localVideoref = React.createRef();
		this.remoteVideoref = React.createRef();

		this.socket = null;

		this.candidates = [];
	}

	componentDidMount() {
		this.socket = io("/webrtcPeer", {
			path: "/webrtc",
			query: {},
		});

		this.socket.on("connection-success", (success) => {
			console.log(success);
		});

		this.socket.on("offer", (sdp) => {
			// this.textref.value = JSON.stringify(sdp);
			// console.log(sdp)
			var desc = JSON.stringify(sdp);
			Swal.fire({
                title: 'Notification !',
                text: "Votre médecin vous invite à rejoindre la salle virtuelle de téléconsultation",
                icon: 'info',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Rejoindre',
            }).then((result) => {
                if (result.value) {
					// props.dispatch(updateDemande(id,status))
					this.pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(desc)));
					this.pc.createAnswer({ offerToReceiveVideo: 1 }).then(
						(sd) => {
							// console.log(JSON.stringify(sdp))
							this.pc.setLocalDescription(sd);
							this.sendToPeer("Answer", sd);
						},
						(e) => {}
					);
                }
            })
			// this.textref.value = JSON.stringify(sdp);
		});

		this.socket.on("debut", () => {
			// Swal.fire({
            //     title: 'Notification !',
            //     text: "Débutddd",
            //     icon: 'success',
            //     showCancelButton: false,
            //     confirmButtonColor: '#3085d6',
            //     confirmButtonText: 'Rejoindre',
			// }).then((result) => {
			// 	if (result.value) { }
			// })
			// console.log('debuuuuuuuuuuuut')
			this.candidates.forEach((candidate) => {
				console.log(JSON.stringify(candidate));
				this.pc.addIceCandidate(new RTCIceCandidate(candidate));
			});
		})

		this.socket.on("candidate", (candidate) => {
			this.candidates = [...this.candidates, candidate];
			
			
		});

		const pc_config = {
			"iceServers": [
			  {
				urls: 'stun:stun.l.google.com:19302'
			  }
			]
		  }
		this.pc = new RTCPeerConnection(pc_config);

		this.pc.onicecandidate = (e) => {
			if (e.candidate) {
				this.sendToPeer("candidate", e.candidate);
			}
		};

		this.pc.oniceconnectionstatechange = (e) => {
			console.log(e);
		};

		this.pc.onaddstream = (e) => {
			this.remoteVideoref.current.srcObject = e.stream;
		};

		const constraints = { video: true };

		const success = (stream) => {
			this.localVideoref.current.srcObject = stream;
			this.pc.addStream(stream);
		};

		const failure = (e) => {
			console.log("getUserMedia Error: ", e);
		};
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(success)
			.catch(failure);
	}

	handleToggle = (value) => () => {
		const currentIndex = this.state.exams.indexOf(value.nom);
		const newChecked = [...this.state.exams];

		if (currentIndex === -1) {
			newChecked.push(value.nom);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({ exams: newChecked });
	};
	sendToPeer = (messageType, payload) => {
		this.socket.emit(messageType, {
			socketID: this.socket.id,
			payload,
		});
	};
	createOffer = () => {
		console.log("offer");
		this.pc.createOffer({ offerToReceiveVideo: 1 }).then(
			(sdp) => {
				// console.log(JSON.stringify(sdp))
				this.pc.setLocalDescription(sdp);
				this.sendToPeer("offerOrAnswer", sdp);
			},
			(e) => {}
		);
	};

	createAnswer = () => {
		console.log("Answer");
		this.pc.createAnswer({ offerToReceiveVideo: 1 }).then(
			(sdp) => {
				// console.log(JSON.stringify(sdp))
				this.pc.setLocalDescription(sdp);
				this.sendToPeer("offerOrAnswer", sdp);
			},
			(e) => {}
		);
	};

	addCandidate = () => {
		this.candidates.forEach((candidate) => {
			console.log(JSON.stringify(candidate));
			this.pc.addIceCandidate(new RTCIceCandidate(candidate));
		});
	};

	setRemoteDescription = () => {
		const desc = JSON.parse(this.textref.value);

		this.pc.setRemoteDescription(new RTCSessionDescription(desc));
	};

	render() {
		return (
			<div>
				<Header />
				<Grid container style={{ paddingTop: 67 }}>
					<Grid item xs="12" style={{ height: '95vh', width:"100%" }}>
						<video
							style={{ height: "100%", width: "100%" }}
							ref={this.localVideoref}
							autoPlay
						></video>
						<video
							style={{
								margin: 5,
                                height: 200,
                                width: 300,
								position: "fixed",
								right: 0,
								backgroundColor: "white",
							}}
							ref={this.remoteVideoref}
							autoPlay
						></video>
					</Grid>
					
					{/* <Box ></Box> */}
				</Grid>
			</div>
		);
	}
}

export default PatientRoom;
