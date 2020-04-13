import React from "react";

export default class FlexRow extends React.Component {
  render() {
    const { styles, ...props } = this.props;
    const flexRowStyles = {
      display: "flex",
      flexDirection: "row",
      ...this.props.styles
    };

    return (
      <div {...props} style={flexRowStyles}>
        {this.props.children}
      </div>
    );
  }
}
