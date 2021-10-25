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

export default class WppVerificationView {
    private static readonly activeDecorations = new Map<Uri, TextEditorDecorationType>();
    private readonly documentsWithActiveCounterExamples = new Set<Uri>();

    private constructor() {
        return;
    }
    

    public static showWppVerifications(wppVerificationsItems: WppVerificationItem[], editor: TextEditor) {
        window.showInformationMessage('Show Wpp Verification!');
        const document = editor.document.uri;
        if(this.activeDecorations.has(document)) {
            return;
        }
        
        //Verified Decorations
        const decoratorsVerified = this.generateWppDecorators(wppVerificationsItems);
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
        
}