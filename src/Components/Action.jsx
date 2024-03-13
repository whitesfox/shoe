import { useSnapshot } from "valtio"
import { state } from "../Serve/store"

export function Picker() {
    const snap = useSnapshot(state)
    return (
      <div className="customizer">
        <div className="color-options">
          {snap.colors.map((color) => (
            <div
              key={color}
              className={`circle`}
              style={{ background: color, transform: `scale(${state.color === color ? 1.2 : 1})` }}
              onClick={() => {
                state.items[state.current] = color
              }}></div>
          ))}
        </div>
      </div>
    )
  }
  