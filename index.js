/**
 * Typed doorway to the SmartLinkControl that the TPRT Smart Links plugin
 * exposes at runtime as window.tprt.smartLinks.SmartLinkControl. This package
 * ships no implementation; without the plugin active it renders a notice.
 */

import { createElement } from '@wordpress/element';
import { Notice } from '@wordpress/components';

let warned = false;

export const SmartLinkControl = ( props ) => {
  const Control = window.tprt?.smartLinks?.SmartLinkControl;

  if ( ! Control ) {
    if ( ! warned ) {
      warned = true;
      // eslint-disable-next-line no-console
      console.warn(
        '@tprt/smart-link-control: window.tprt.smartLinks.SmartLinkControl is not defined. ' +
          'Install and activate the TPRT Smart Links plugin, and declare ' +
          '\'tprt-smart-links-editor\' as a dependency of your editor script.',
      );
    }

    return createElement(
      Notice,
      { status: 'warning', isDismissible: false },
      'This field requires the TPRT Smart Links plugin to be installed and active.',
    );
  }

  return createElement( Control, props );
};
