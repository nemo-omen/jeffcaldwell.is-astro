export const hexLoader = {
  name: "hex-loader",
  transform(code, id) {
    const [path, query] = id.split("?");
    if (query != "raw-hex") return null;

    const data = fs.readFileSync(path);
    const hex = data.toString("hex");

    return `export default '${hex}';`;
  },
};
