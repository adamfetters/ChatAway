import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
    };
  }

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
                  {this.state.messages.map(message => {
                    return (
                      <div>
                        {message.author}: {message.message}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-footer">
                <input type="text" placeholder="Username" className="form-control" />
                <input type="text" placeholder="Message" className="form-control" />
                <button className="btn btn-primary form-control">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
