YUI.add('moodle-atto_smartmedia-button', function (Y, NAME) {

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
 * Atto smartmedia plugin.
 *
 * @namespace M.atto_smartmedia.
 * @class button.
 * @extends M.editor_atto.EditorPlugin.
 */

Y.namespace('M.atto_smartmedia').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function() {
        window.console.log('load');
        this.addButton({
            icon: 'e/insert_edit_video',
            callback: this._displayDialogue,
            tags: 'video, audio',
            tagMatchRequiresAll: false
        });
    },
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
