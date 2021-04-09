import React from "react";

const range = (start: number, end: number) => Array.from(Array(Math.abs(end - start)), (_, i) => start + i);

function Separator(props: any) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${props.turns}turn)`
      }}
    >
      <div style={props.style} />
    </div>
  );
}

function RadialSeparators(props: any): any {
  const turns = 1 / props.count;
  return range(0, props.count).map(index => <Separator turns={index * turns} style={props.style} />);
}

export default RadialSeparators;
