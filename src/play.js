import React from "react";

export default class Play extends React.Component {
  static defaultProps = {
    playIcon: "\u25B6",
    pauseIcon: "||",
    isPlaying: false,
    styles: {}
  };

  render() {
    const styles = {
      width: "36px",
      height: "24px",
      display: "flex",
      background: "#eee",
      borderRadius: "3px",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      ...this.props.styles
    };

    const { isPlaying, play, playIcon, pause, pauseIcon } = this.props;
    return (
      <div
        style={styles}
        onClick={() => {
          isPlaying ? pause() : play();
        }}
      >
        {isPlaying ? pauseIcon : playIcon}
      </div>
    );
  }
}
