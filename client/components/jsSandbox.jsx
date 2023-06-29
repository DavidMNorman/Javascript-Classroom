import {basicSetup, EditorView} from "codemirror"
import {EditorState, Compartment} from "@codemirror/state"
// import {language} from "@codemirror/language"
import {javascript} from "@codemirror/lang-javascript"


let language = new Compartment, tabSize = new Compartment