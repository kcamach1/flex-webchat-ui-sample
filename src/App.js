import React from 'react';
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import ReactDOM from 'react-dom';
import MinimizeButton from "./components/MinimizeButton"
import CloseButton from "./components/CloseButton"
import { AppConfig } from '@twilio/flex-webchat-ui';

class App extends React.Component {

  state = {};

  constructor(props) {
    super(props);

    const { configuration } = props;

    FlexWebChat.MainHeader.defaultProps.showImage = false;



    FlexWebChat.MessageCanvasTray.defaultProps.showButton = false;
    FlexWebChat.MessagingCanvas.defaultProps.memberDisplayOptions = {
      yourDefaultName: 'You',
      theirDefaultName: 'NAMI HelpLine',
      yourFriendlyNameOverride: false,
      theirFriendlyNameOverride: false,
    };

    FlexWebChat.Manager.create(configuration)
    .then((manager) => {
      // Add the EndChat component into FlexWebChat
      FlexWebChat.MainHeader.Content.add(<MinimizeButton key="mimize-chat"  />, { sortOrder: -1, align: "end" });
      FlexWebChat.MainHeader.Content.add(<CloseButton key="close-chat" runtimeDomain={AppConfig.current().runtimeDomain} manager={manager}/>, { sortOrder: -1, align: "end" });
      FlexWebChat.MainHeader.Content.remove("close-button");

      manager.strings.WelcomeMessage ="NAMI Helpline</br><a target='_' href='https://www.nami.org/Terms-of-Use/NAMI-HelpLine-Terms-of-Service'>Terms of Service</a>";
      manager.strings.MessageCanvasTrayContent = '<h6>Thanks for chatting with us!</h6><p style="text-align:center;font-size:12px">Please remember to save any resources you received today. <br/> <br/> If you have any more questions, please reach out to us again.</p>';
      manager.strings.PredefinedChatMessageBody = 'Welcome to the NAMI HelpLine.  If you are in crisis, text CRISIS.  Before you proceed, please review our terms of use, linked above. If you understand and agree to the terms of use, text GO';
      manager.strings.PredefinedChatMessageAuthorName = 'NAMI HelpLine'

      this.setState({ manager });
    }).catch(error => this.setState({ error }));

    FlexWebChat.Manager.create(configuration)
      .then(manager => {
                
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
