export default function _colorFromStr(str) {
    return "#" + parseInt(parseInt(str, 36).toExponential().slice(2)  & 0xFFFFFF).toString(16).toUpperCase()
}
