import React from "react";
import { Button } from "rebass";

export default class Play extends React.Component {
  static defaultProps = {
    playIcon: <img src="https://icon.now.sh/play_arrow/fff" alt="play" />,
    pauseIcon: <img src="https://icon.now.sh/pause/fff" alt="play" />,
    isPlaying: false,
    styles: {}
  };

  render() {
    const { isPlaying, play, playIcon, pause, pauseIcon } = this.props;
    return (
      <Button
        px={2}
        py={1}
        mr={2}
        lineHeight={1}
        onClick={() => {
          isPlaying ? pause() : play();
        }}
      >
        {isPlaying ? pauseIcon : playIcon}
      </Button>
    );
  }
}
