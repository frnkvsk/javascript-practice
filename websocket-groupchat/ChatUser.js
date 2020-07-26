/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require('./Room');
const { text } = require('express');
const axios = require("axios");
/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch(err) {
      console.error(err)
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(name) {
    this.name = name;
    this.room.join(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} joined "${this.room.name}".`
    });
  }

  /** handle a chat: broadcast to room. */

  handleChat(text) {
    this.room.broadcast({
      name: this.name,
      type: 'chat',
      text: text
    });
  }

  /** handle a joke feature: DON't broadcast to room. */

  async handleJoke() {
    const config = {
      method: "get", 
      url: "https://icanhazdadjoke.com/", 
      headers: {"Accept": "application/json"}
    };
    let res = await axios(config);
    this.room.singlecast({
      name: this.name,
      type: 'joke',
      text: res.data.joke
    });
  }

  /** handle private message feature: DON't broadcast to room. */

  handlePrivateMessage(text) {
    let arr = text.split` `;
    let msg = arr.slice(2).join` `;
    // let [_, toUser, msg] = text.split` `;
    this.room.privatecast({
      name: this.name,
      toUser: arr[1],
      type: 'priv',
      text: msg
    });
  }

  /** handle a member feature: DON't broadcast to room. */

  handleMembers() {
    this.room.membercast({
      name: this.name,
      type: 'inRoom',
      text: ""
    });
  }

  /** handle change name feature: broadcast new name to room. */

  handleChangeName(text) {
    const newName = text.split` `.slice(1).join` `;
    let msg = `Attention: ${this.name} changed their name to ${newName}`;
    this.name = newName;
    this.room.broadcast({
      name: newName,
      type: 'chat',
      text: msg
    });
  }
  
  /** Handle messages from client:
   *
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   */

  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);    
    if (msg.type === 'join') this.handleJoin(msg.name);
    else if (msg.text === '/joke') this.handleJoke();
    else if (msg.text === '/members') this.handleMembers();
    else if (msg.text.startsWith('/priv')) this.handlePrivateMessage(msg.text);
    else if (msg.text.startsWith('/name')) this.handleChangeName(msg.text);
    else if (msg.type === 'chat') this.handleChat(msg.text);    
    
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      type: 'note',
      text: `${this.name} left ${this.room.name}.`
    });
  }
}

module.exports = ChatUser;
