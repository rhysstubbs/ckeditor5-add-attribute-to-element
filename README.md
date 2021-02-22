# Add Attribute To Element

This ckeditor5 plugin allows you to add any attriute key/value to a HTML Element. For example ID attributes for internal anchor links:

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

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Rhys Stubbs** - *Initial work* - [GitHub](https://github.com/rhysstubbs)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [CKEditor](https://github.com/ckeditor) for making me do this ;)
