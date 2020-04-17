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

import GameOfLife from "./examples/game-of-life";
import Fur from "./examples/fur";

import Epidemic from "./examples/epidemic";

const examples = [
  {
    label: "Default",
    model: <Model />
  },
  {
    label: "Agent-based epidemic simulation",
    model: <Epidemic />
  },
  {
    label: "Game of Life",
    model: <GameOfLife />
  },
  {
    label: "Fur",
    model: <Fur />
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
            {examples.map(({ label }, index) => {
              console.log(index, this.state.selected);

              return (
                <li
                  key={`label-${index}`}
                  onClick={() => this.updateSelection(index)}
                  style={{
                    background: this.state.selected === index ? "#eee" : "none"
                  }}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </FlexColumn>
        <FlexColumn styles={{ width: "100%" }}>
          {examples.map(
            ({ model }, index) => index === this.state.selected && model
          )}
        </FlexColumn>
      </FlexRow>
    );
  }
}

export default App;
