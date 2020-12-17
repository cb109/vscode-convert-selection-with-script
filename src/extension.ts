import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('convert-selection-with-script.convertSelectionWithScript', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
				return;
		}
		var selection = editor.selection;
		var text = editor.document.getText(selection);
		text = '\n' + text + '\n';

		const config = vscode.workspace.getConfiguration('convertSelectionWithScript');
		const commandString = config.binary + ' ' + config.script + ' ' + JSON.stringify(text);
		console.log('running:', config.binary, config.script);

		const childProcess = require('child_process')
		childProcess.exec(commandString, (err, stdout, stderr) => {
			console.log(stdout);
			console.log(stderr);
			if (stdout) {
				editor.edit(builder => {
					builder.replace(editor.selection, stdout);
				});
			}
			if (err) {
				console.log('error: ' + err);
			}
		});

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
