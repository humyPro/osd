import apis from '../common/apis'
const xmlToJson = apis.xmlToJson
const str = `
    <root>
    <name>humin</name>
    <like>a1</like>
    <like>a1</like>
    </root>
`
const res = xmlToJson(str)
