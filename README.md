# @tprt/smart-link-control

Typed wrapper for the `SmartLinkControl` inspector control exposed by the
TPRT Smart Links WordPress plugin.

> This repository is generated build output published from a private source
> repository. Issues and pull requests here are not monitored.

## Requirements

- The TPRT Smart Links plugin installed and active on the site. Without it,
  the control renders a warning notice in place of the field.
- Your editor script must load after the plugin's editor bundle. Declare the
  script dependency in PHP:

```php
$asset = require $path_to_asset_file;
$asset['dependencies'][] = 'tprt-smart-links-editor';
wp_register_script( 'my-block-editor', $src, $asset['dependencies'], $asset['version'], true );
```

## Install

```bash
pnpm add "simplistik/smart-link-control-dist#v<version>"
# or track a range against this repo's tags:
pnpm add "simplistik/smart-link-control-dist#semver:^<version>"
```

Replace `<version>` with a release tag from this repo's Releases/tags list.

## Compatibility

Wrapper `x.y.z` is published alongside plugin `x.y.z`. Older plugin versions
may lack props that a newer wrapper's types describe.

## Usage

Store the value in one block attribute of `type: "object"`:

```json
{ "attributes": { "smartLink": { "type": "object" } } }
```

```js
import { SmartLinkControl } from '@tprt/smart-link-control';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

const Edit = ( { attributes, setAttributes } ) => (
  <InspectorControls>
    <PanelBody title="Link">
      <SmartLinkControl
        value={ attributes.smartLink }
        onChange={ ( smartLink ) => setAttributes( { smartLink } ) }
      />
    </PanelBody>
  </InspectorControls>
);
```

### Toolbar button

`SmartLinkToolbarButton` renders a block-toolbar entry point and mounts the
drawer itself, so it survives the settings sidebar being closed. Render it at
your block's top level, not inside `InspectorControls`.

```js
import { SmartLinkControl, SmartLinkToolbarButton } from '@tprt/smart-link-control';
import { useState } from '@wordpress/element';

const Edit = ( { attributes, setAttributes } ) => {
  const [ isOpen, setIsOpen ] = useState( false );
  const onChange = ( smartLink ) => setAttributes( { smartLink } );

  return (
    <>
      <SmartLinkToolbarButton
        value={ attributes.smartLink }
        onChange={ onChange }
        isOpen={ isOpen }
        onOpenChange={ setIsOpen }
      />
      <InspectorControls>
        <PanelBody title="Link">
          <SmartLinkControl
            value={ attributes.smartLink }
            onChange={ onChange }
            isOpen={ isOpen }
            onOpenChange={ setIsOpen }
            renderDrawer={ false }
          />
        </PanelBody>
      </InspectorControls>
    </>
  );
};
```

Sharing `isOpen`/`onOpenChange` and setting `renderDrawer={ false }` on the
control is what keeps a single drawer mounted. Used alone, omit both open props
and the button manages its own state.

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `SmartLinkValue \| null` | The stored link object. |
| `onChange` | `( value ) => void` | Receives the new value. |
| `isOpen` | `boolean` | Optional controlled open state. |
| `onOpenChange` | `( isOpen ) => void` | Open-state change callback. |
| `title` | `string` | Optional tooltip override. |

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `SmartLinkValue \| null` | The stored link object. |
| `onChange` | `( value ) => void` | Receives the new value, or `null` on remove. |
| `label` | `string` | Optional label; defaults to "Link". |
| `isOpen` | `boolean` | Optional controlled open state for the drawer. |
| `onOpenChange` | `( isOpen ) => void` | Open-state change callback. |
| `renderDrawer` | `boolean` | Default `true`; set `false` to mount the drawer yourself. |

See `index.d.ts` for the `SmartLinkValue` shape.
