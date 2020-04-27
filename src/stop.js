import React from "react";
import { Button } from "rebass";

export default class Play extends React.Component {
  static defaultProps = {
    stopIcon: <img src="https://icon.now.sh/stop/fff" alt="stop" />,
    isPlaying: false,
    styles: {}
  };

  render() {


    const { isPlaying, stop, stopIcon } = this.props;
    return (
    <Button
          px={2}
        py={1}
        mr={2}
        bg='#33e'
        lineHeight={1}
        onClick={() => {
          stop();
        }}
      >
        {stopIcon}
      </Button>
    );
  }
}
