import { describe, it, expect } from 'vitest';
import { motivationContext } from '../narrate';
import { SAMPLE_ORDER_INPUT, type RelocationOrderInput } from '../orderInput';

describe('motivationContext', () => {
  it('returns an empty string when the client gave no motivations', () => {
    const input: RelocationOrderInput = { ...SAMPLE_ORDER_INPUT, motivations: undefined };
    expect(motivationContext(input)).toBe('');
  });

  it('returns an empty string for an explicitly empty motivations array', () => {
    const input: RelocationOrderInput = { ...SAMPLE_ORDER_INPUT, motivations: [] };
    expect(motivationContext(input)).toBe('');
  });

  it('joins every selected motivation label and frames it as client context, not a fact', () => {
    const input: RelocationOrderInput = { ...SAMPLE_ORDER_INPUT, motivations: ['career', 'fresh-start'] };
    const context = motivationContext(input);
    expect(context).toContain('a specific job or career move');
    expect(context).toContain('starting a new chapter');
    expect(context).toContain('never state it back as if the chart itself said it');
  });
});
