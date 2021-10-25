/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext, commands, window } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

import WppVerificationView from './ui/wppVerificationView';

let client: LanguageClient;

export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "wpp" is now active!');

	const updateWindow = window.onDidChangeActiveTextEditor(editor => WppVerificationView.updateWppVerifications(editor));
	const updateWorkspace = workspace.onDidChangeTextDocument(() => WppVerificationView.updateWppVerifications(window.activeTextEditor));
	const showWppCommand = commands.registerCommand('output.showWppVerification', () => WppVerificationView.showWppVerifications(window.activeTextEditor));
	const hideWppCommand = commands.registerCommand('output.hideWppVerification', () => WppVerificationView.hideWppVerifications(window.activeTextEditor));

	context.subscriptions.push(updateWindow, updateWorkspace, showWppCommand, hideWppCommand);
	
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'dafny' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
