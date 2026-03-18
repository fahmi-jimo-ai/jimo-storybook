/**
 * Moji Component Library — Machine-readable documentation schema
 * Used by generate-docs.ts to produce COMPONENTS.md and the doc site.
 * All required fields must be present or TypeScript will error at build time.
 */

export interface ComponentProp {
  /** Prop name as declared in the TypeScript interface */
  name: string;
  /** TypeScript type string */
  type: string;
  /** Default value (if any) */
  default?: string;
  /** Whether the prop is required */
  required?: boolean;
  /** Human-readable description for the props table */
  description: string;
}

export interface ComponentExample {
  /** Short label shown above the code block */
  label: string;
  /** JSX code string — used for live preview and copy-paste */
  code: string;
}

export interface ComponentDoc {
  /** Display name matching the React component (e.g. "Button") */
  name: string;
  /** Full Figma URL including node-id query param */
  figmaUrl: string;
  /** One-sentence description of what the component does */
  description: string;
  /** When Claude Code (or a developer) should reach for this component */
  whenToUse: string[];
  /** When NOT to use this component — prefer an alternative */
  whenNotToUse: string[];
  /** Named variant dimensions and their accepted values */
  variants?: Record<string, string[]>;
  /** All props documented for the props table */
  props: ComponentProp[];
  /** Copy-paste usage examples shown in the doc site */
  examples: ComponentExample[];
  /** Other Moji components commonly used alongside this one */
  relatedComponents?: string[];
  /** Relative path to the component source file */
  sourceFile: string;
}
