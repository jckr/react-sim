import React from "react";

export default class Play extends React.Component {
  static defaultProps = {
    stopIcon: "\u25A0",
    isPlaying: false,
    styles: {}
  };

  render() {
    const styles = {
      width: "36px",
      height: "24px",
      margin: "0 12px 0 0",
      display: "flex",
      background: "#eee",
      borderRadius: "3px",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      ...this.props.styles
    };

    const { isPlaying, stop, stopIcon } = this.props;
    // todo - style stop by isPlaying status;
    return (
      <div
        style={styles}
        onClick={() => {
          stop();
        }}
      >
        {stopIcon}
      </div>
    );
  }
}
