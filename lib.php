<?php
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
 * Plugin lib functions.
 *
 * @package     atto_smartmedia
 * @category    string
 * @copyright   2019 Matt Porritt <mattp@catalyst-au.net>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Initialise the strings required for JS.
 */
function atto_smartmedia_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(
        array(
            'add',
            'insertexisting',
            'insertnew',
            'select',
        ),
        'atto_smartmedia'
    );
}

/**
 * Return the js params required for this module.
 *
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_smartmedia_params_for_js($elementid, $options, $fpoptions) {
    global $COURSE;

    $coursecontext = context_course::instance($COURSE->id);
    $params = array();
    $params['disabled'] = false;

    if (!has_capability('atto/smartmedia:visible', $coursecontext)) {
        $params['disabled'] = true;
    }

    return $params;
}
