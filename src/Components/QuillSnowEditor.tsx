import { FC } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const QuillSnowEditor: FC<QuillSnowEditor> = ({ value, onChange }) => {
    return <ReactQuill value={value} onChange={onChange} theme="snow" />
}

export default QuillSnowEditor
