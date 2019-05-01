YUI.add("moodle-atto_smartmedia-button",function(e,t){var i="atto_smartmedia",o="smartmedia",n={BUTTON:"atto_smartmedia_submit",BUTTON_SELECT:"atto_smartmedia_select",FORM:"atto_smartmedia_form"},s={FORM:".atto_smartmedia_form",SUBMIT:".atto_smartmedia_submit",SELECT:".atto_smartmedia_select"};e.namespace("M.atto_smartmedia").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,initializer:function(t){t.disabled||(this.editor.delegate("click",this._handleClick,"smartmedia",this),this.editor.delegate("dblclick",this._displayDialogue,"smartmedia",this),this.addButton({icon:"e/insert_edit_video",callback:this._displayDialogue,tags:"video, audio",tagMatchRequiresAll:!1}))},_handleClick:function(t){var e=t.target,i=this.get("host").getSelectionFromNode(e);this.get("host").getSelection()!==i&&this.get("host").setSelection(i)},_displayDialogue:function(t){this._currentSelection=this.get("host").getSelection();var e=this.getDialogue({headerContent:M.util.get_string("add",i,null),focusAfterHide:!0,width:800},!0);e.set("bodyContent",this._getDialogueContent()),e.show()},_getDialogueContent:function(){var t=e.Handlebars.compile('<form class="mform atto_form {{CSS.FORM}}"><input id="smartmedia-id" class="form-control" type="text" size="32"/><button class="btn btn-secondary select" name="{{CSS.BUTTON_SELECT}}" type="button">{{get_string "insertnew" component}}</button><button class="btn btn-secondary select" name="{{CSS.BUTTON_SELECT}}" type="button">{{get_string "select" component}}</button><br /><br /><button class="btn btn-primary submit {{CSS.BUTTON}}" type="submit">{{get_string "insertexisting" component}}</button></form>');return this._content=e.Node.create(t({CSS:n,SELECTORS:s,component:i})),this._content.one(s.SUBMIT).on("click",this._insertMedia,this),this._content},_insertMedia:function(t){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide(),this.get("host").setSelection(this._currentSelection);var e="<"+o;e=e.concat(">hhhh</"+o+">"),this.editor.focus(),this.get("host").insertContentAtFocusPoint(e),this.markUpdated()},_selectVideoDialog:function(t){t.preventDefault(),alert("This feature is not implemented yet")}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});