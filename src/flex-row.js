import React from 'react';

export default class FlexRow extends React.Component {
  render() {
    const styles = {
      display: 'flex',
      flexDirection: 'row',
      ...this.props.styles
    };

    return <div style={styles}>{this.props.children}</div>
  }
}
