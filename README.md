# Add ID Attribute To Element

**NB** this plugin currently only supports add an `id` atrribute. If you'd like to see this expanded to support any attribute please open an issue or create a Pull Request!


```html
<h2 id="i-want-to-scroll-to-this">Example</h2>
```

## Getting Started

To start using the plugin all you need to do is import and register is with CKEDitor, for example:

```js
import ElementAddAttributes from './path/to/plugin';

class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
    // Add core CKEditor plugins etc.
    ElementAddAttributes
];

export default ClassicEditor;
```

### Configuration

By Default the plugin is disabled, to enable the button you'll need to enable it in your configuration. For example:

```js
{
    elementAddAttributes: {
        enabled: true, // false will disable the button on the UI
    },
}
```

To add the toolbar UI, include it in the configuration. For example:

```js
toolbar: {
    items: [
        'bold',
        'italic',
        '|',
        'elementAddAttributes',
    ]
}
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Rhys Stubbs** - *Initial work* - [GitHub](https://github.com/rhysstubbs)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [CKEditor](https://github.com/ckeditor) for making me do this ;)
