import type { ComponentType } from 'react';

export interface SmartLinkValue {
  /** Blog ID as a string; '' on single-site installs. */
  site: string;
  type: 'post' | 'term' | 'direct';
  /** Post ID (type 'post'). */
  id?: number;
  /** Term ID and taxonomy (type 'term'). */
  term_id?: number;
  taxonomy?: string;
  /** Raw URL (type 'direct'). */
  directUrl?: string;
  /** Resolved URL snapshot (post/term only). */
  href?: string;
  /** '_blank' when opening in a new tab. */
  target?: string;
  /** e.g. 'nofollow sponsored noopener'. */
  rel?: string;
  /** True when the item title should be used as the link text. */
  useTitle?: boolean;
  /** Post status snapshot (post links). */
  post_status?: string;
}

export interface SmartLinkControlProps {
  value: SmartLinkValue | null | undefined;
  onChange: ( value: SmartLinkValue | null ) => void;
  /** Label above the preview; defaults to "Link". */
  label?: string;
  /** Supply to control the drawer's open state externally. */
  isOpen?: boolean;
  onOpenChange?: ( isOpen: boolean ) => void;
  /**
   * Set false when your own entry point lives outside InspectorControls and
   * you mount the drawer yourself so it survives the sidebar closing.
   */
  renderDrawer?: boolean;
}

export const SmartLinkControl: ComponentType< SmartLinkControlProps >;

export interface SmartLinkToolbarButtonProps {
  value: SmartLinkValue | null | undefined;
  onChange: ( value: SmartLinkValue | null ) => void;
  /** Supply to control the drawer's open state externally. */
  isOpen?: boolean;
  onOpenChange?: ( isOpen: boolean ) => void;
  /** Overrides the default "Add Smart Link" / "Edit Smart Link" tooltip. */
  title?: string;
}

export const SmartLinkToolbarButton: ComponentType< SmartLinkToolbarButtonProps >;
