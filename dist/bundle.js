/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Display.ts":
/*!************************!*\
  !*** ./src/Display.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Display\": () => (/* binding */ Display)\n/* harmony export */ });\n/* harmony import */ var _SaveAndLoad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SaveAndLoad */ \"./src/SaveAndLoad.ts\");\n\r\n//Singleton Class\r\nvar Display = /** @class */ (function () {\r\n    function Display() {\r\n    }\r\n    Display.getDisplay = function () {\r\n        if (this.instance)\r\n            return this.instance;\r\n        this.instance = new Display();\r\n        return this.instance;\r\n    };\r\n    Display.prototype.createNoteMainContainer = function (note) {\r\n        var noteMainContainer = document.createElement('div');\r\n        noteMainContainer.className = \"container flex-2 mx-2 my-2 md:max-w-md md:min-w-[250px]\";\r\n        noteMainContainer.setAttribute(\"data-note\", \"note\");\r\n        noteMainContainer.setAttribute(\"id\", note.id.toString());\r\n        noteMainContainer.appendChild(this.createNoteBackgroundContainer(note));\r\n        return noteMainContainer;\r\n    };\r\n    Display.prototype.createNoteBackgroundContainer = function (note) {\r\n        //creates note background container\r\n        var noteBackgroundContainer = document.createElement('div');\r\n        noteBackgroundContainer.className = \"pt-2 px-3 pb-2 flex flex-col rounded-md w-full bg-white relative\";\r\n        var noteDeleteButton = this.createNoteDeleteButton(note);\r\n        //adds event listeners to note background container to show note delete button when hovering and hide while not\r\n        noteBackgroundContainer.addEventListener('mouseover', function () { return noteDeleteButton.className = noteDeleteButton.className.replace(\"invisible\", \"visible\"); });\r\n        noteBackgroundContainer.addEventListener('mouseleave', function () { return noteDeleteButton.className = noteDeleteButton.className.replace(\"visible\", \"invisible\"); });\r\n        noteBackgroundContainer.append(noteDeleteButton, this.createNoteTitle(note), this.createNoteTasks(note), this.createNoteControlSection(note));\r\n        return noteBackgroundContainer;\r\n    };\r\n    Display.prototype.createNoteDeleteButton = function (note) {\r\n        //creates note delete button\r\n        var noteDeleteButton = document.createElement('a');\r\n        noteDeleteButton.className = \"invisible absolute flex justify-center items-center w-6 h-6 rounded-xl text-white text-xs font-semibold bg-gray-800 right-2 hover:bg-gray-600\";\r\n        noteDeleteButton.href = '#';\r\n        noteDeleteButton.innerHTML = \"X\";\r\n        noteDeleteButton.dataset.id = note.id.toString();\r\n        noteDeleteButton.addEventListener(\"click\", note.deleteNote);\r\n        return noteDeleteButton;\r\n    };\r\n    Display.prototype.createNoteTitle = function (note) {\r\n        //creates note title\r\n        var noteTitle = document.createElement('div');\r\n        noteTitle.className = \"text-lg justify-self-start font-bold mb-2 w-4/5\";\r\n        noteTitle.setAttribute(\"contentEditable\", \"true\");\r\n        noteTitle.setAttribute(\"data-type\", \"title\");\r\n        noteTitle.innerText = \"\".concat(note.title);\r\n        noteTitle.addEventListener(\"focusout\", _SaveAndLoad__WEBPACK_IMPORTED_MODULE_0__.SaveAndLoad.saveToCookies);\r\n        noteTitle.addEventListener(\"keypress\", note.blurElement);\r\n        return noteTitle;\r\n    };\r\n    Display.prototype.createNoteTasks = function (note) {\r\n        //creates notes tasks container\r\n        var noteTasksContainer = document.createElement('div');\r\n        noteTasksContainer.setAttribute(\"data-contentContainerId\", \"\".concat(note.id));\r\n        noteTasksContainer.className = \"flex flex-col space-y-2\";\r\n        if (note.tasks) {\r\n            note.tasks.forEach(function (task) {\r\n                var singleTask = \"\\n          <div>\\n            <input type=\\\"checkbox\\\" \".concat(task[1] ? \"checked\" : \"\", \">\\n            <label>\").concat(task[0], \"</label>\\n          </div>\");\r\n                noteTasksContainer.innerHTML += singleTask;\r\n            });\r\n        }\r\n        return noteTasksContainer;\r\n    };\r\n    Display.prototype.createNoteControlSection = function (note) {\r\n        var noteControlSection = document.createElement(\"div\");\r\n        noteControlSection.className = \"flex space-x-6 justify-center mt-4\";\r\n        noteControlSection.setAttribute(\"data-noteControlSectionId\", \"\".concat(note.id));\r\n        noteControlSection.append(this.createNoteControlButton({ size: \"text-2xl\", color: \"text-green-500\", symbol: \"fa-list-check\" }, note), this.createNoteControlButton({ size: \"text-xl\", color: \"text-gray-500\", symbol: \"fa-align-justify\" }, note), this.createNoteControlButton({ size: \"text-xl\", color: \"text-red-500\", symbol: \"fa-heading\" }, note));\r\n        return noteControlSection;\r\n    };\r\n    Display.prototype.createNoteControlButton = function (control, note) {\r\n        //creates add new task button\r\n        var controlButton = document.createElement('a');\r\n        controlButton.className = \"justify-self-center self-center flex justify-center items-end \".concat(control.size, \" \").concat(control.color, \" font-semibold right-2\");\r\n        controlButton.href = \"javascript:void(0)\";\r\n        controlButton.innerHTML = \"<i class=\\\"fa-solid \".concat(control.symbol, \"\\\"></i>\");\r\n        //controlButton.addEventListener(\"click\", this.addNewTask.bind(this));\r\n        controlButton.addEventListener(\"click\", function (event) { return note.newTask(event, note.id.toString()); });\r\n        return controlButton;\r\n    };\r\n    Display.prototype.addTaskDeleteButton = function () {\r\n        var taskDeleteButton = document.createElement('a');\r\n        taskDeleteButton.className = \"invisible flex justify-center items-center w-5 h-5 rounded-md text-white text-xs font-semibold bg-red-600 hover:bg-red-400\";\r\n        taskDeleteButton.href = \"javascript:void(0)\";\r\n        taskDeleteButton.innerText = \"X\";\r\n        return taskDeleteButton;\r\n    };\r\n    Display.prototype.addNewTaskContainer = function () {\r\n        var task = document.createElement(\"div\");\r\n        task.className = \"flex space-x-3\";\r\n        task.setAttribute(\"data-type\", \"task\");\r\n        return task;\r\n    };\r\n    Display.prototype.addNewTaskTextField = function () {\r\n        var taskLabel = document.createElement(\"div\");\r\n        taskLabel.setAttribute(\"contenteditable\", \"true\");\r\n        taskLabel.className = \"w-5/6 cursor-auto\";\r\n        return taskLabel;\r\n    };\r\n    Display.prototype.addNewTaskInput = function () {\r\n        var taskInput = document.createElement(\"input\");\r\n        taskInput.setAttribute(\"type\", \"checkbox\");\r\n        taskInput.className = \"mt-1\";\r\n        return taskInput;\r\n    };\r\n    Display.prototype.displaySingleNote = function (note) {\r\n        var sectionNotesContainer = document.getElementById(\"notes-container\");\r\n        if (sectionNotesContainer)\r\n            sectionNotesContainer.appendChild(this.createNoteMainContainer(note));\r\n    };\r\n    Display.prototype.removeSingleNote = function (note) {\r\n        note.path[2].remove();\r\n        _SaveAndLoad__WEBPACK_IMPORTED_MODULE_0__.SaveAndLoad.saveToCookies();\r\n    };\r\n    return Display;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sinote/./src/Display.ts?");

/***/ }),

/***/ "./src/Note.ts":
/*!*********************!*\
  !*** ./src/Note.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Note\": () => (/* binding */ Note)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ \"./src/main.ts\");\n/* harmony import */ var _SaveAndLoad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SaveAndLoad */ \"./src/SaveAndLoad.ts\");\n\r\n\r\nvar Note = /** @class */ (function () {\r\n    function Note(category, title, tasks, id) {\r\n        this.category = category;\r\n        this.title = title;\r\n        this.tasks = tasks;\r\n        this.id = id;\r\n    }\r\n    Note.prototype.newNote = function () {\r\n        console.log(this);\r\n        _main__WEBPACK_IMPORTED_MODULE_0__.display.displaySingleNote(this);\r\n        _SaveAndLoad__WEBPACK_IMPORTED_MODULE_1__.SaveAndLoad.saveToCookies();\r\n    };\r\n    Note.prototype.deleteNote = function (el) {\r\n        console.log(this);\r\n        var note = document.getElementById(\"\".concat(el.target.dataset.id));\r\n        note === null || note === void 0 ? void 0 : note.remove();\r\n    };\r\n    Note.prototype.newTask = function (event, id, sibling) {\r\n        var _this = this;\r\n        var contentContainer = document.querySelector(\"*[data-contentcontainerid=\\\"\".concat(id, \"\\\"\"));\r\n        if (event.target.className.includes(\"fa-list-check\")) {\r\n            var taskContainer_1 = _main__WEBPACK_IMPORTED_MODULE_0__.display.addNewTaskContainer();\r\n            var taskTextInputField_1 = _main__WEBPACK_IMPORTED_MODULE_0__.display.addNewTaskTextField();\r\n            var taskInputCheckBox = _main__WEBPACK_IMPORTED_MODULE_0__.display.addNewTaskInput();\r\n            var taskDeleteButton_1 = _main__WEBPACK_IMPORTED_MODULE_0__.display.addTaskDeleteButton();\r\n            taskContainer_1.append(taskInputCheckBox, taskTextInputField_1, taskDeleteButton_1);\r\n            if (sibling) {\r\n                sibling.after(taskContainer_1);\r\n            }\r\n            else if (contentContainer) {\r\n                contentContainer.append(taskContainer_1);\r\n            }\r\n            taskTextInputField_1.focus();\r\n            taskContainer_1.addEventListener(\"mouseenter\", function () { return taskDeleteButton_1.className = taskDeleteButton_1.className.replace(\"invisible\", \"visible\"); });\r\n            taskContainer_1.addEventListener(\"mouseleave\", function () { return taskDeleteButton_1.className = taskDeleteButton_1.className.replace(\"visible\", \"invisible\"); });\r\n            taskDeleteButton_1.addEventListener(\"click\", function (clickEvent) {\r\n                var _a;\r\n                (_a = clickEvent.target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();\r\n            });\r\n            taskTextInputField_1.addEventListener(\"keydown\", function (key) {\r\n                if (key.key === \"Enter\") {\r\n                    key.preventDefault();\r\n                    taskTextInputField_1.blur();\r\n                    if (!taskTextInputField_1.innerText) {\r\n                        taskDeleteButton_1.click();\r\n                        return;\r\n                    }\r\n                    _this.newTask(event, id, taskContainer_1);\r\n                    //event.target.click();\r\n                }\r\n                if (key.key === \"Escape\") {\r\n                    taskTextInputField_1.blur();\r\n                }\r\n            });\r\n            taskTextInputField_1.addEventListener(\"focusout\", function () {\r\n                if (!taskTextInputField_1.innerText) {\r\n                    taskDeleteButton_1.click();\r\n                }\r\n            });\r\n        }\r\n        if (event.target.className.includes(\"fa-align-justify\")) {\r\n            console.log('teksty');\r\n        }\r\n        if (event.target.className.includes(\"fa-heading\")) {\r\n            console.log('hedingi');\r\n        }\r\n        return function () { };\r\n    };\r\n    Note.prototype.newParagraph = function () {\r\n        console.log(this.newParagraph);\r\n    };\r\n    Note.prototype.newHeading = function () {\r\n        console.log(this.newHeading);\r\n    };\r\n    Note.prototype.deleteTask = function () {\r\n        console.log(this.deleteNote);\r\n    };\r\n    Note.prototype.deleteButtonShowOrHide = function (event) {\r\n        console.log(event.target);\r\n    };\r\n    Note.prototype.blurElement = function (event) {\r\n        if (event.key === 'Enter') {\r\n            event.target.blur(); //blur removes keyboard focus from the element\r\n        }\r\n    };\r\n    return Note;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sinote/./src/Note.ts?");

/***/ }),

/***/ "./src/ParseDOMString.ts":
/*!*******************************!*\
  !*** ./src/ParseDOMString.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ParseDOMString\": () => (/* binding */ ParseDOMString)\n/* harmony export */ });\nvar ParseDOMString = /** @class */ (function () {\r\n    function ParseDOMString() {\r\n    }\r\n    ParseDOMString.domToString = function () {\r\n        var categoryNotes = [];\r\n        var notes = document.querySelectorAll('*[data-note=\"note\"]');\r\n        notes.forEach(function (note) {\r\n            var noteToSave = {\r\n                category: \"main\",\r\n                title: \"\",\r\n                tasks: [],\r\n                id: 0\r\n            };\r\n            ParseDOMString.contentToArray(note.childNodes[1].childNodes, noteToSave);\r\n            categoryNotes.push(noteToSave);\r\n        });\r\n        console.log(categoryNotes);\r\n        return JSON.stringify(categoryNotes);\r\n    };\r\n    ParseDOMString.contentToArray = function (nodes, noteToSave) {\r\n        try {\r\n            nodes.forEach(function (el) {\r\n                //ignores text nodes\r\n                if (el.nodeType === 1 && el.dataset.type === \"content\") {\r\n                    el.childNodes.forEach(function (item) {\r\n                        if (item.nodeType === 1) {\r\n                            if (item.dataset.type === \"task\") {\r\n                                var inputElement = item.childNodes[1];\r\n                                var labelElement = item.childNodes[3];\r\n                                noteToSave.tasks.push([\"task\", labelElement.textContent || '', inputElement.checked]);\r\n                            }\r\n                            else if (item.dataset.type === \"text\") {\r\n                                var divElement = item;\r\n                                noteToSave.tasks.push([\"text\", divElement.innerText]);\r\n                            }\r\n                            else if (item.dataset.type === \"heading\") {\r\n                                var headingElement = item;\r\n                                noteToSave.tasks.push([\"heading\", headingElement.innerText]);\r\n                            }\r\n                        }\r\n                    });\r\n                }\r\n                else if (el.nodeType === 1 && el.dataset.type === \"title\") {\r\n                    noteToSave.title = el.innerText;\r\n                }\r\n            });\r\n        }\r\n        catch (_a) {\r\n            console.log(\"asd\");\r\n        }\r\n    };\r\n    return ParseDOMString;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sinote/./src/ParseDOMString.ts?");

/***/ }),

/***/ "./src/SaveAndLoad.ts":
/*!****************************!*\
  !*** ./src/SaveAndLoad.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SaveAndLoad\": () => (/* binding */ SaveAndLoad)\n/* harmony export */ });\n/* harmony import */ var _ParseDOMString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParseDOMString */ \"./src/ParseDOMString.ts\");\n\r\nvar SaveAndLoad = /** @class */ (function () {\r\n    function SaveAndLoad() {\r\n    }\r\n    SaveAndLoad.saveToCookies = function () {\r\n        document.cookie = \"notes=\".concat(_ParseDOMString__WEBPACK_IMPORTED_MODULE_0__.ParseDOMString.domToString());\r\n    };\r\n    return SaveAndLoad;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sinote/./src/SaveAndLoad.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"display\": () => (/* binding */ display)\n/* harmony export */ });\n/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Note */ \"./src/Note.ts\");\n/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Display */ \"./src/Display.ts\");\n/* harmony import */ var _SaveAndLoad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SaveAndLoad */ \"./src/SaveAndLoad.ts\");\nvar _a;\r\n\r\n\r\n\r\nvar display = _Display__WEBPACK_IMPORTED_MODULE_1__.Display.getDisplay();\r\n(_a = document.querySelector('#new-note')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {\r\n    var asd = new _Note__WEBPACK_IMPORTED_MODULE_0__.Note('main', \"Unnamed\", [], new Date().valueOf());\r\n    asd.newNote();\r\n});\r\n//window.addEventListener(\"load\", () => display.displayCategory(\"asd\"))\r\nwindow.addEventListener(\"load\", _SaveAndLoad__WEBPACK_IMPORTED_MODULE_2__.SaveAndLoad.saveToCookies);\r\n//this will save notes in the cookies when page is closed\r\nwindow.addEventListener(\"beforeunload\", function () {\r\n    document.cookie = \"beforeClosing='test'\";\r\n});\r\n\n\n//# sourceURL=webpack://sinote/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;