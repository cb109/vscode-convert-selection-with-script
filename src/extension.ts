import * as vscode from 'vscode';

function pickCommand(commands) {
	const options = commands.map(command => {
		return {
			label: command.label || command.binary + ' ' + command.script,
			binary: command.binary,
			script: command.script
		};
	});
	const item = vscode.window.showQuickPick(options, {
		placeHolder: 'Select one of the converters...'
	});
	return item;
}

function onCommandPicked(text, command, editor) {
	console.log('running: ' + command.binary + ' ' + command.script);

	const commandString = command.binary + ' ' + command.script + ' ' + JSON.stringify(text);
	const childProcess = require('child_process');
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
}

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
		try {
			pickCommand(config.commands).then(
				command => onCommandPicked(text, command, editor)
			);
		}
		catch (e) {
			vscode.window.showErrorMessage(`${e.message}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
