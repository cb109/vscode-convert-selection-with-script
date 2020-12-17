# vscode-convert-selection-with-script

## Features

Lets you replace the currently selected text/code with the commandline output of a script you send it to.

Registers one command:

  - `convert-selection-with-script.convertSelectionWithScript`: **Convert Selection with Script**

### Please note

The text is escaped using `JSON.stringify()` before passing it on the commandline, so that multilines are preserved. Your custom scripts will have to unescape that.

## Extension Settings

Adds one setting to possible converter scripts, see example:

```json
"convertSelectionWithScript.commands": [
    {
        "label": "Convert python assignments -> dict",
        "binary": "python",
        "script": "~/.vscode/scripts/convert_python_assignments_to_dict.py"
    },
    {
        "label": "Convert python dict -> assignments",
        "binary": "python",
        "script": "~/.vscode/scripts/convert_python_dict_to_assignments.py"
    }
]
```
