import React from 'react';
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import ReactDOM from 'react-dom'

class App extends React.Component {

  state = {};

  constructor(props) {
    super(props);

    const { configuration } = props;

    FlexWebChat.MainHeader.defaultProps.showImage = false;

    // FlexWebChat.MessagingCanvas.defaultProps.showTrayOnInactive = false;

    FlexWebChat.Manager.create(configuration)
      .then(manager => {
        manager.strings.WelcomeMessage = "NAMI Helpline </br> <a target='_' href='http://www.google.com'>Webchat Terms of Service</a>";
        manager.strings.PredefinedChatMessageAuthorName = "NAMI Helpline";
        manager.strings.PredefinedChatMessageBody = "Thank you for contacting to the NAMI Helpline.  How can we help you today?  NOTE: If you are in crisis, please text CRISIS."

        ReactDOM.render(
            <FlexWebChat.ContextProvider manager={manager}>
                <FlexWebChat.RootContainer />
            </FlexWebChat.ContextProvider>,
            document.getElementById("root")
        );
    })
        //this.setState({ manager }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { manager, error } = this.state;
    if (manager) {
      return (
        <FlexWebChat.ContextProvider manager={manager}>
          <FlexWebChat.RootContainer />
        </FlexWebChat.ContextProvider>
      );
    }

    if (error) {
      console.error("Failed to initialize Flex Web Chat", error);
    }

    return null;
  }
}

export default App;
