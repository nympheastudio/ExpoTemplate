"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_data_1 = __importDefault(require("form-data"));
const index_1 = require("../index");
test('multipart response parsing and part utilities', async () => {
    const form = new form_data_1.default();
    form.append('manifest', JSON.stringify({ hello: 'world' }), {
        contentType: 'application/json',
        header: {
            test: 'wat',
        },
    });
    form.append('extensions', JSON.stringify({ hello: 'world2' }), {
        contentType: 'application/json',
    });
    const mutlipartParts = await (0, index_1.parseMultipartMixedResponseAsync)(`multipart/mixed; boundary=${form.getBoundary()}`, form.getBuffer());
    expect(mutlipartParts.length).toBe(2);
    const manifestPart = mutlipartParts.find((it) => (0, index_1.isMultipartPartWithName)(it, 'manifest'));
    expect(JSON.parse(manifestPart.body)).toMatchObject({ hello: 'world' });
    expect(manifestPart === null || manifestPart === void 0 ? void 0 : manifestPart.headers.get('test')).toEqual('wat');
    const extensionsPart = mutlipartParts.find((it) => (0, index_1.isMultipartPartWithName)(it, 'extensions'));
    expect(JSON.parse(extensionsPart.body)).toMatchObject({ hello: 'world2' });
});
//# sourceMappingURL=index-test.js.map