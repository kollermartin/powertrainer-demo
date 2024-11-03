import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext } from "react";
import ThemeContext from "../../store/theme/theme-context";
import classes from "./RichEditor.module.css";

interface RichEditorProps {
    value: string;
    readonly: boolean;
    onChange?: (value: string) => void;
}

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, false] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link"],
        ["clean"],
    ],
};

const readOnlyModules = {
    toolbar: false,
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "font",
];

const RichEditor = ({ value, readonly, onChange = () => {} }: RichEditorProps) => {
    const themeCtx = useContext(ThemeContext);

    return (
        <ReactQuill
            className={themeCtx.isLightTheme ? classes.lightTheme : classes.darkTheme}
            readOnly={readonly}
            formats={formats}
            modules={readonly ? readOnlyModules : modules}
            theme="snow"
            value={value}
            onChange={onChange}
        />
    );
};

export default RichEditor;
