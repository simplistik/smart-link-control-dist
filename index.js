/**
 * Typed doorway to the components the TPRT Smart Links plugin exposes at
 * runtime on window.tprt.smartLinks. This package ships no implementation;
 * without the plugin active the control renders a notice.
 */

import { createElement } from '@wordpress/element';
import { Notice } from '@wordpress/components';

let warned = false;

const resolve = ( name ) => {
  const component = window.tprt?.smartLinks?.[ name ];

  if ( ! component && ! warned ) {
    warned = true;
    // eslint-disable-next-line no-console
    console.warn(
      '@tprt/smart-link-control: window.tprt.smartLinks is not defined. ' +
        'Install and activate the TPRT Smart Links plugin, and declare ' +
        '\'tprt-smart-links-editor\' as a dependency of your editor script.',
    );
  }

  return component;
};

export const SmartLinkControl = ( props ) => {
  const Control = resolve( 'SmartLinkControl' );

  if ( ! Control ) {
    return createElement(
      Notice,
      { status: 'warning', isDismissible: false },
      'This field requires the TPRT Smart Links plugin to be installed and active.',
    );
  }

  return createElement( Control, props );
};

// A Notice cannot render inside the block toolbar, so this stays silent beyond
// the console warning; SmartLinkControl carries the visible fallback.
export const SmartLinkToolbarButton = ( props ) => {
  const Button = resolve( 'SmartLinkToolbarButton' );

  if ( ! Button ) return null;

  return createElement( Button, props );
};
