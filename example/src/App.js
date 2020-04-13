import React from "react";

import {
  // ExampleComponent,
  FlexRow,
  FlexColumn,
  Frame,
  Model
  // StatefulControls
} from "react-sim";
import "react-sim/dist/index.css";

import { updateGameOfLifeGrid, GameOfLifeFrame } from "./examples/game-of-life";

const examples = [
  { label: "Default", props: {}, frame: <Frame /> },
  {
    label: "Game of Life",
    props: { auto: false, updateData: updateGameOfLifeGrid, maxTime: Infinity },
    frame: <GameOfLifeFrame />
  }
];

class App extends React.Component {
  state = {
    selected: 0
  };
  updateSelection = updatedExampleIndex =>
    this.setState({ selected: updatedExampleIndex });
  render() {
    return (
      <FlexRow>
        <FlexColumn styles={{ width: "200px" }}>
          <ul>
            {examples.map(({ label }, index) => (
              <li
                key={`label-${index}`}
                onClick={() => this.updateSelection(index)}
              >
                {label}
              </li>
            ))}
          </ul>
        </FlexColumn>
        <FlexColumn>
          {examples.map(
            ({ props, frame }, index) =>
              index === this.state.selected && (
                <Model key={`m-${index}`} {...props}>
                  {frame}
                </Model>
              )
          )}
        </FlexColumn>
      </FlexRow>
    );
  }
}

export default App;
