import React from "react";
import { FlexColumn, FlexRow } from "./";

export default function Frame(props) {
  const rows = Array(10).fill(0);
  const cols = Array(10).fill(0);

  return (
    <FlexColumn>
      {rows.map((i, y) => (
        <FlexRow key={`r-${y}`}>
          {cols.map((j, x) => (
            <FlexColumn key={`r-${y}-c-${x}`}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px"
                }}
              >
                {y * 10 + x < props.tick ? "X" : "O"}
              </div>
            </FlexColumn>
          ))}
        </FlexRow>
      ))}
    </FlexColumn>
  );
}
