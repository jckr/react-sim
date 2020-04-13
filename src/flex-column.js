import React from "react";

export default class FlexColumn extends React.Component {
  render() {
    const { styles, ...props } = this.props;

    const flexColumnStyles = {
      display: "flex",
      flexDirection: "column",
      ...this.props.styles
    };

    return (
      <div {...props} style={flexColumnStyles}>
        {this.props.children}
      </div>
    );
  }
}
