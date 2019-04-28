// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * The Atto plugin smartmedia is defined here.
 *
 * @package     atto_smartmedia
 * @copyright   2019 Matt Porritt <mattp@catalyst-au.net>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Atto text editor smartmedia video plugin.
 *
 * @module moodle-atto_smartmedia-button
 */

var COMPONENTNAME = 'atto_smartmedia',
    TAG = 'smartmedia',
    CSS = {
        BUTTON: 'atto_smartmedia_submit',
        BUTTON_SELECT: 'atto_smartmedia_select',
        FORM:   'atto_smartmedia_form',
    },
    SELECTORS = {
        FORM: '.atto_smartmedia_form',
        SUBMIT: '.atto_smartmedia_submit',
        SELECT: '.atto_smartmedia_select',
    },
    TEMPLATE = '' +
        '<form class="mform atto_form {{CSS.FORM}}">' +
        '<input id="smartmedia-id" class="form-control" type="text" size="32"/>' +
        '<button class="btn btn-secondary select" name="{{CSS.BUTTON_SELECT}}" type="button">{{get_string "select" component}}</button>' +
        '<button class="btn btn-secondary select" name="{{CSS.BUTTON_SELECT}}" type="button">{{get_string "select" component}}</button>' +
        '<br /><br />' +
        '<button class="btn btn-primary submit {{CSS.BUTTON}}" type="submit">{{get_string "insert" component}}</button>' +
        '</form>';


/**
 * Atto smartmedia plugin.
 *
 * @namespace M.atto_smartmedia.
 * @class button.
 * @extends M.editor_atto.EditorPlugin.
 */

Y.namespace('M.atto_smartmedia').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * A reference to the current selection at the time that the dialogue was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    initializer: function(config) {
        if (config.disabled) {
            return;
        }

        this.editor.delegate('click', this._handleClick, 'smartmedia', this);
        this.editor.delegate('dblclick', this._displayDialogue, 'smartmedia', this);

        this.addButton({
            icon: 'e/insert_edit_video',
            callback: this._displayDialogue,
            tags: 'video, audio',
            tagMatchRequiresAll: false
        });
    },

    /**
     * Handles a click on a media element.
     *
     * @method _handleClick
     * @param  {EventFacade} e
     * @private
     */
    _handleClick: function(e) {
        var medium = e.target;
        var selection = this.get('host').getSelectionFromNode(medium);

        if (this.get('host').getSelection() !== selection) {
            this.get('host').setSelection(selection);
        }
    },

    /**
     * Display selector.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e) {
        this._currentSelection = this.get('host').getSelection();

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('insert', COMPONENTNAME, null),
            focusAfterHide: true,
            width: 800,
            //focusOnShowSelector: SELECTORS.URL_INPUT
        }, true);

        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent());
        dialogue.show();
    },

    /**
     * Return the dialogue content for the tool.
     *
     * @method _getDialogueContent
     * @private
     * @return {Node} The content to place in the dialogue.
     */
    _getDialogueContent: function() {
        var template = Y.Handlebars.compile(TEMPLATE);

        this._content = Y.Node.create(template({
            CSS: CSS,
            SELECTORS: SELECTORS,
            component: COMPONENTNAME
        }));

       this._content.one(SELECTORS.SUBMIT).on('click', this._insertMedia, this);

       return this._content;
    },

    /**
     * Insert the media into the editor.
     *
     * @method _insertMedia
     * @param {EventFacade} e
     * @private
     */
    _insertMedia: function(e) {
        e.preventDefault();

        // Hide the dialogue.
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        // Set the selection.
        this.get('host').setSelection(this._currentSelection);

        var html = '<' + TAG ;
        html = html.concat('>hhhh</' + TAG + '>');

        this.editor.focus();
        this.get('host').insertContentAtFocusPoint(html);
        this.markUpdated();
    },

    /**
     * Run a dialog window for selecting video.
     *
     * @method _selectVideoDialog
     * @param {EventFacade} e
     * @private
     */
    _selectVideoDialog: function(e) {
        e.preventDefault();
        alert('This feature is not implemented yet');
    }

});
