import { proxy } from "valtio"

const state = proxy({
  current: "laces",
  colors: ["#EAEAEA", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
  color: "",
  items: { laces: "#fff", mesh: "#fff", caps: "#fff", inner: "#fff", sole: "#fff", stripes: "#fff", band: "#fff", patch: "#fff" },
})

export { state }
