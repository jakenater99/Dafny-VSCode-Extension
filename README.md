# Thesis Project
This repository will be for my thesis project
https://github.com/jakenater99/Thesis-Project/tree/master

This project will develop VS Code extensions which allow users to write and check weakest precondition proofs on Dafny code. This will allow future students of CSSE3100/7100 to readily format their assignments, and for tutors of CSSE3100/7100 to readily check assignments for correctness. It will also provide a valuable tool for software developers wanting to understand the behaviour of complex code.

You must either have knowledge of the following, or be keen to gain it:
- Dafny programming language
- weakest precondition reasoning
- TypeScript or JavaScript

# Extension 1: Student version that checks syntax and semantics (Public)
Difference between syntax and semantics
https://www.usna.edu/Users/cs/wcbrown/courses/F19SI413/lec/l07/lec.html 
                 scanning               parsing
character stream --------> token stream -------> parse tree -----> abstract syntax tree

Step 1: Implemnt wpp keyword
Step 2: Implement syntax and semantics on wpp predicate (Either textMate or Coco/R)
Step 3: Add hovers 

# Extension 2: Tutor version that checks the validity of the proof (Private)

# How to run the extension
1. Enter code ./verify-dafny into terminal
2. The extension development editor will open
3. Press F5
4. A new Extension Development Host window will open where the extension will be implemented
Futher help at: https://code.visualstudio.com/api/get-started/your-first-extension 

## Notes
Declarative Language Features
- Bracket Matching
- Syntax Highlighting

Programatic Language Features
- Hovers
- Go to Definitions
- Diagnostic Errors

Custom Text Editor and Text Document
https://code.visualstudio.com/api/references/vscode-api#TextDocument 

Embedded Languages

TypeScript Language Service
https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API 

TextMate grammars
https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide

Format Code as User Types
https://code.visualstudio.com/api/language-extensions/programmatic-language-features 

Dafny Assert Keyword
- Potentially change to wpp with added syntax and semantic checking and highlighting

The normal implementation of { bool } is recognised as a set in dafny

Z3 theorem prover

Boogie

.NET

Coco/R lexer and parser generator
- Scanner
- Parser

Dafny Github Repository 
https://github.com/dafny-lang/ide-vscode 
https://github.com/dafny-lang/dafny

Dafny Documentation 
https://dafny-lang.github.io/dafny/ 

Tasks
1. Implement wpp keywork/function without functionality