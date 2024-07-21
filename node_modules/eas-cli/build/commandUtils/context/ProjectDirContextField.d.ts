import ContextField from './ContextField';
export default class ProjectDirContextField extends ContextField<string> {
    getValueAsync(): Promise<string>;
}
