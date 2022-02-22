import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import SocketIO from "socket.io-client";
import "./Chat.css";
import sendImg from "../../images/send.png";
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../../images/closeIcon.png'
let socket;
const ENDPOINT = "https://sayhehe.herokuapp.com/";

const Chat = () => {
        const [id, setId] = useState("");
        const [messages, setMessages] = useState([]);
        const send = () => {
            const message = document.getElementById("chatInput").value;
            if (message !== "") {
                socket.emit('message', { message, id });
                document.getElementById("chatInput").value = "";
            }
        }
        useEffect(() => {
            socket = SocketIO(ENDPOINT, { transports: ["websocket"] });
            socket.on("connect", () => {
                console.log("Connected");
                setId(socket.id);
            });
            socket.emit("joined", { user: user });
            socket.on("welcome", (data) => {
                setMessages([...messages, data]);
                console.log(data.user, data.message);
            });
            socket.on("userJoined", (data) => {
                setMessages([...messages, data]);
                console.log(data.user, data.message);
            });
            socket.on("leave", (data) => {
                setMessages([...messages, data]);
                console.log(data.user, data.message);
            });
            return () => {
                socket.emit("disconnect", { user: user });
                socket.off();
            };
        }, []);

        useEffect(() => {
            socket.on('sendMessage', (data) => {
                setMessages([...messages, data]);
                console.log(data.user, data.message, data.message);
            })

            return () => {
                socket.off();
            }
        }, [messages])


        return ( < div className = "chatPage" >
                <div className = "chatContainer" >
                <div className = "header" >
                <h2 > Say hehe </h2>
                <a href = "/"> < img src = { closeIcon } alt = "Close" /></a></div >
                <ReactScrollToBottom className = "chatBox" > {messages.map((item) => < Message user = { item.id === id ? '' : item.user }
                 message = { item.message }
                        classs = { item.id === id ? 'right' : 'left' }
                        />)}
                        </ReactScrollToBottom >
                        <div className = "inputBox" >
                        
                        <input onKeyPress = {
                            (event) => event.key === "Enter" ? send() : null }
                        type = "text"
                        placeholder = "Send message ..."
                        id = "chatInput" />
                        <button onClick = { send }
                        className = "sendbtn" > < img src = { sendImg }
                        alt = "Send" /> </button> 
                        </div>  
                        </div> 
                        </div>
                    );
                };

                export default Chat;