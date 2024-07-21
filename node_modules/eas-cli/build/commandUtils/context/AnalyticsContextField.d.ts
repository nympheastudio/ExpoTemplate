import ContextField, { ContextOptions } from './ContextField';
import { Analytics } from '../../analytics/AnalyticsManager';
export default class AnalyticsContextField extends ContextField<Analytics> {
    getValueAsync({ analytics }: ContextOptions): Promise<Analytics>;
}
