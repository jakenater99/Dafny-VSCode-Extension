import { Uri, TextEditorDecorationType, TextEditor, DecorationOptions, Position, Range, window} from 'vscode';

import { WppVerificationItem } from '../api/wppVerification';
import { ConfigurationConstants } from '../constants';
import Configuration from '../configuration';

interface IColorOptions {
    backgroundColor: string | null;
    fontColor: string | null;
}

const DefaultMargin = '0 0 0 30px';
const DefaultDarkBackgroundColorVerified = '#45b536';
const DefaultDarkBackgroundColorUnverified = '#b80707';
const DefaultDarkFontColor = '#e3f2fd';
const DefaultLightBackgroundColor = '#bbdefb';
const DefaultLightFontColor = '#102027';

const verified: WppVerificationItem = {
	position: new Position(4, 20),
	verificationStatus: true
};

const unverified: WppVerificationItem = {
	position: new Position(5, 20),
	verificationStatus: false
};

export default class WppVerificationView {
    private static readonly activeDecorations = new Map<Uri, TextEditorDecorationType>();
    private readonly documentsWithActiveCounterExamples = new Set<Uri>();

    private constructor() {
        return;
    }
    

    public static showWppVerifications(editor: TextEditor) {
        window.showInformationMessage('Show Wpp Verification!');
        const document = editor.document.uri;
        if(this.activeDecorations.has(document)) {
            return;
        }
        const wppLines = this.getWppLines(editor);
        const wppVerificationItems = this.generateWppItems(wppLines);
        const decoratorsVerified = this.generateWppDecorators(wppVerificationItems);
        const decorationVerified = WppVerificationView.createTextEditorDecoration();
        this.activeDecorations.set(document, decorationVerified);
        editor.setDecorations(decorationVerified, decoratorsVerified);
    }

    public static hideWppVerifications(editor: TextEditor): void {
        window.showInformationMessage('Hide Wpp Verification!');
        const document = editor.document.uri;
        const decoration = this.activeDecorations.get(document);
        if(decoration == null) {
          return;
        }
        decoration.dispose();
        this.activeDecorations.delete(document);
    }

    private static generateWppDecorators(wppVerificationsItems: WppVerificationItem[]): DecorationOptions[] {
        return wppVerificationsItems
            .filter(wppVerificationItem => wppVerificationItem.position.line >= 0)
            .map(wppVerificationItem => WppVerificationView.createDecorator(wppVerificationItem));
    }

    private static createDecorator(wppVerification: WppVerificationItem): DecorationOptions { 
        const verificationStatus = wppVerification.verificationStatus;
        const contentText = verificationStatus ? 'Verified' : 'Unverified';
        const line = wppVerification.position.line;
        if(verificationStatus) {
            return {
                range: new Range(
                    new Position(line, wppVerification.position.character + 1),
                    new Position(line, Number.MAX_VALUE)
                ),
                renderOptions: {
                    after: { contentText },
                    dark:{
                        after: {
                            backgroundColor: DefaultDarkBackgroundColorVerified,
                            color: DefaultDarkFontColor,
                            margin: DefaultMargin
                        }
                    },
                    light: {
                        after: {
                            backgroundColor: DefaultLightBackgroundColor,
                            color: DefaultLightFontColor,
                            margin: DefaultMargin
                        }
                    }
                }
            };
        } else {
            return {
                range: new Range(
                    new Position(line, wppVerification.position.character + 1),
                    new Position(line, Number.MAX_VALUE)
                ),
                renderOptions: {
                    after: { contentText },
                    dark:{
                        after: {
                            backgroundColor: DefaultDarkBackgroundColorUnverified,
                            color: DefaultDarkFontColor,
                            margin: DefaultMargin
                        }
                    },
                    light: {
                        after: {
                            backgroundColor: DefaultLightBackgroundColor,
                            color: DefaultLightFontColor,
                            margin: DefaultMargin
                        }
                    }
                }
            };
        }
        
    }

    private static createTextEditorDecoration(): TextEditorDecorationType { 
        return window.createTextEditorDecorationType({
            dark:{
                after: {
                    color: DefaultDarkFontColor,
                    margin: DefaultMargin
                }
            },
            light: {
                after: {
                    color: DefaultLightFontColor,
                    margin: DefaultMargin
                }
            }
        });
    }

    private static getWppLines(editor: TextEditor): number[] {
        // eslint-disable-next-line prefer-const
        let wppLines: number[] = [];
        let text: string;
        const re = new RegExp("(?<={s{0,}).*(?=s{0,}})");
        for (let i = 0; i < editor.document.lineCount; i++) {
            console.log(editor.document.lineAt(i).text);
            text = editor.document.lineAt(i).text;
            if(re.test(text)) {
                console.log(i);
                wppLines.push(i);
            } 
        }
        console.log(wppLines);
        return wppLines;
    }

    private static generateWppItems(lines: number[]): WppVerificationItem[] {
        // eslint-disable-next-line prefer-const
        let wppItems: WppVerificationItem[] = [];
        let wppItem: WppVerificationItem;
        console.log('a');
        for (let i = 0; i < lines.length; i++) {
            console.log(i);
            wppItem = {
                position: new Position(lines[i], 20),
                verificationStatus: false
            };
            wppItems.push(wppItem);
        }
        return wppItems;
    }
}