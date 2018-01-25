import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
    };

    this.socket = io('http://localhost:5000');

    this.sendMessage = event => {
      event.preventDefault();

      this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message,
      });
      this.setState({ message: '' });
    };

    this.socket.on('RECEIVE_MESSAGE', data => {
      
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({
        messages: [...this.state.messages, data],
      });
      console.log(this.state.message);
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="card-body">
                <div className="card-title">ChatAway</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map((message, index) => {
                    return (
                      <div>
                        {message.author}: {message.message}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-footer">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
                <input
                  type="text"
                  name="message"
                  placeholder="Message"
                  className="form-control"
                  value={this.state.message}
                  onChange={this.handleInputChange}
                />
                <button onClick={this.sendMessage} className="btn btn-primary form-control">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
