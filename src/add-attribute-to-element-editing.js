import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ElementAddAttributesCommand from './add-attribute-to-element-command';
import { viewToModelStyleAttribute, modelToViewStyleAttribute } from './converters';

class ElementAddAttributesEditing extends Plugin {
	static get pluginName() {
		return 'ElementAddAttributesEditing';
	}

	init() {
		const editor = this.editor;
		const data = editor.data;
		const editing = editor.editing;

		// Converters for imageStyle attribute from model to view.
		editing.downcastDispatcher.on( 'attribute:class:heading3', modelToViewStyleAttribute() );
		data.downcastDispatcher.on( 'attribute:class:heading3', modelToViewStyleAttribute() );

		// Converter for figure element from view to model.
		data.upcastDispatcher.on( 'element:heading3', viewToModelStyleAttribute(), { priority: 'low' } );

		this.editor.commands.add( 'elementAddAttributes', new ElementAddAttributesCommand( this.editor ) );
	}
}

export default ElementAddAttributesEditing;
