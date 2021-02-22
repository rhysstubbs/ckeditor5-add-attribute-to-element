/* eslint-disable no-undef */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import pencilIcon from '@ckeditor/ckeditor5-core/theme/icons/pencil.svg';
import ElementAddAttributesFormView from './ui/add-attribute-to-element-view';
import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';
import BalloonPanelView from '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview';

class ElementAddAttributesUI extends Plugin {
	static get requires() {
		return [ ContextualBalloon ];
	}

	static get pluginName() {
		return 'ElementAddAttributesUI';
	}

	init() {
		this._createButton();
		this._createForm();
	}

	destroy() {
		super.destroy();
		this._form.destroy();
	}

	_createButton() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'elementAddAttributes', locale => {
			const command = editor.commands.get( 'elementAddAttributes' );
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Set element id attribute' ),
				icon: pencilIcon,
				tooltip: true,
				class: 'element-add-attributes-btn'
			} );

			const enabled = editor.config.get( 'elementAddAttributes.enabled' ) || false;

			if ( !enabled ) {
				view.isEnabled = false;
			} else {
				view.bind( 'isEnabled' ).to( command, 'isEnabled' );
			}

			this.listenTo( view, 'execute', () => {
				this._showForm();
			} );

			return view;
		} );
	}

	_createForm() {
		const editor = this.editor;
		const view = editor.editing.view;
		const viewDocument = view.document;

		this._balloon = this.editor.plugins.get( 'ContextualBalloon' );

		this._form = new ElementAddAttributesFormView( editor.locale );
		// Render the form so its #element is available for clickOutsideHandler.
		this._form.render();

		this.listenTo( this._form, 'submit', () => {
			editor.execute( 'elementAddAttributes', {
				newValue: this._form.labeledInput.inputView.element.value
			} );

			this._hideForm( true );
		} );

		this.listenTo( this._form, 'cancel', () => {
			this._hideForm( true );
		} );

		// Close the form on Esc key press.
		this._form.keystrokes.set( 'Esc', ( data, cancel ) => {
			this._hideForm( true );
			cancel();
		} );

		// Reposition the balloon or hide the form if an image widget is no longer selected.
		this.listenTo( editor.ui, 'update', () => {
			if ( !viewDocument.selection ) {
				this._hideForm( true );
			}
		} );

		// Close on click outside of balloon panel element.
		clickOutsideHandler( {
			emitter: this._form,
			activator: () => this._isVisible,
			contextElements: [ this._balloon.view.element ],
			callback: () => this._hideForm()
		} );
	}

	_showForm() {
		if ( this._isVisible ) {
			return;
		}

		const editor = this.editor;
		const command = editor.commands.get( 'elementAddAttributes' );
		const labeledInput = this._form.labeledInput;

		if ( !this._isInBalloon ) {
			const defaultPositions = BalloonPanelView.defaultPositions;
			const target = document.querySelector( '.element-add-attributes-btn' );

			this._balloon.add( {
				view: this._form,
				position: {
					target,
					positions: [
						defaultPositions.northArrowSouth,
						defaultPositions.northArrowSouthWest,
						defaultPositions.northArrowSouthEast,
						defaultPositions.southArrowNorth,
						defaultPositions.southArrowNorthWest,
						defaultPositions.southArrowNorthEast
					]
				}
			} );
		}

		// Make sure that each time the panel shows up, the field remains in sync with the value of
		// the command. If the user typed in the input, then canceled the balloon (`labeledInput#value`
		// stays unaltered) and re-opened it without changing the value of the command, they would see the
		// old value instead of the actual value of the command.
		// https://github.com/ckeditor/ckeditor5-image/issues/114
		labeledInput.inputView.value = labeledInput.inputView.element.value = command.value || '';

		this._form.labeledInput.inputView.select();
	}

	_hideForm( focusEditable ) {
		if ( !this._isInBalloon ) {
			return;
		}

		// Blur the input element before removing it from DOM to prevent issues in some browsers.
		// See https://github.com/ckeditor/ckeditor5/issues/1501.
		if ( this._form.focusTracker.isFocused ) {
			this._form.saveButtonView.focus();
		}

		this._balloon.remove( this._form );

		if ( focusEditable ) {
			this.editor.editing.view.focus();
		}
	}

	get _isVisible() {
		return this._balloon.visibleView === this._form;
	}

	get _isInBalloon() {
		return this._balloon.hasView( this._form );
	}
}

export default ElementAddAttributesUI;
