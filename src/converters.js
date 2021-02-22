import first from '@ckeditor/ckeditor5-utils/src/first';

export function modelToViewStyleAttribute() {
	return ( evt, data, conversionApi ) => {
		if ( !conversionApi.consumable.consume( data.item, evt.name ) ) {
			return;
		}

		const viewElement = conversionApi.mapper.toViewElement( data.item );
		const viewWriter = conversionApi.writer;
		const imgElement = viewElement.getChild( 0 );

		if ( !!data.attributeNewValue && data.attributeNewValue === 'internal-link-target' ) {
			viewWriter.addClass( 'internal-link-target', imgElement );
		} else {
			viewWriter.removeClass( 'internal-link-target', imgElement );
		}
	};
}

export function viewToModelStyleAttribute() {
	return ( evt, data, conversionApi ) => {
		if ( !data.modelRange ) {
			return;
		}

		const modelImageElement = first( data.modelRange.getItems() );
		if ( !conversionApi.schema.checkAttribute( modelImageElement, 'class' ) ) {
			return;
		}

		if ( conversionApi.consumable.consume( modelImageElement, { classes: 'internal-link-target' } ) ) {
			conversionApi.writer.setAttribute( 'class', 'internal-link-target', modelImageElement );
		}
	};
}
