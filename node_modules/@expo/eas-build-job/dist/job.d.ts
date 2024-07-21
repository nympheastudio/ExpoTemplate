import Joi from 'joi';
import * as Android from './android';
import { Generic } from './generic';
import * as Ios from './ios';
export type BuildJob = Android.Job | Ios.Job;
export type Job = BuildJob | Generic.Job;
export declare const JobSchema: Joi.ObjectSchema<BuildJob>;
export declare function sanitizeBuildJob(rawJob: object): BuildJob;
