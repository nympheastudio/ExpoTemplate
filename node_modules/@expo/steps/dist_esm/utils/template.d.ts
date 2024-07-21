export declare const BUILD_STEP_INPUT_EXPRESSION_REGEXP: RegExp;
export declare const BUILD_STEP_OUTPUT_EXPRESSION_REGEXP: RegExp;
export declare const BUILD_GLOBAL_CONTEXT_EXPRESSION_REGEXP: RegExp;
export declare const BUILD_STEP_OR_BUILD_GLOBAL_CONTEXT_REFERENCE_REGEX: RegExp;
export declare function interpolateWithInputs(templateString: string, inputs: Record<string, string>): string;
export declare function interpolateWithOutputs<InterpolableType extends string | object>(interpolableValue: InterpolableType, fn: (path: string) => string): InterpolableType;
export declare function interpolateStringWithOutputs(templateString: string, fn: (path: string) => string): string;
export declare function interpolateObjectWithOutputs(interpolableObject: object, fn: (path: string) => string): object;
export declare function getObjectValueForInterpolation(path: string, obj: Record<string, unknown>): string | number | boolean | null;
export declare function interpolateWithGlobalContext<InterpolableType extends string | object>(interpolableValue: InterpolableType, fn: (path: string) => string): InterpolableType;
export declare function interpolateStringWithGlobalContext(templateString: string, fn: (path: string) => string): string;
export declare function interpolateObjectWithGlobalContext(templateObject: object, fn: (path: string) => string): object;
interface BuildOutputPath {
    stepId: string;
    outputId: string;
}
export declare function findOutputPaths(templateString: string): BuildOutputPath[];
export declare function parseOutputPath(outputPathWithObjectName: string): BuildOutputPath;
export {};
