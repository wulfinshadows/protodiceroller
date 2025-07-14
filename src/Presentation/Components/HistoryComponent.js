import { useState } from "react";

export default function HistoryComponent() {
  const [rollHistory, setRollHistory] = useState([]);
  return <div>{rollHistory.map(() => {})}</div>;
}
/*
[
    1D4 = 3
    2d6 = 7
    1D8 = 6
]
[
    1d10 + 1d12 = 9
]
[
    1d6, 1d20, 2d10
    
    1d6 = 4
    1d20 = 9
    2d10 = 3 + 5

    Total: 21
]

[
    5D20 = 85
]
*/
