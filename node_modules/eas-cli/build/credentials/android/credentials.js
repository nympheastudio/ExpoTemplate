"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keystoreSchema = void 0;
exports.keystoreSchema = {
    name: 'Android Keystore',
    provideMethodQuestion: {
        question: `Generate a new Android Keystore?`,
    },
    questions: [
        {
            field: 'keystore',
            question: 'Path to the Keystore file.',
            type: 'file',
            base64Encode: true,
        },
        {
            field: 'keystorePassword',
            question: 'Keystore password',
            type: 'password',
        },
        {
            field: 'keyAlias',
            question: 'Key alias',
            type: 'string',
        },
        {
            field: 'keyPassword',
            question: 'Key password',
            type: 'password',
        },
    ],
};
