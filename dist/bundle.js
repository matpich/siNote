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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Display\": () => (/* binding */ Display)\n/* harmony export */ });\n//Singleton Class\r\nvar Display = /** @class */ (function () {\r\n    function Display() {\r\n    }\r\n    Display.getDisplay = function () {\r\n        if (this.instance)\r\n            return this.instance;\r\n        this.instance = new Display();\r\n        return this.instance;\r\n    };\r\n    Display.prototype.createNoteMainContainer = function (title, tasks) {\r\n        var noteMainContainer = document.createElement('div');\r\n        noteMainContainer.className = \"container flex-1 mx-2 my-2 md:max-w-md md:min-w-[250px]\";\r\n        noteMainContainer.setAttribute(\"data-note\", \"note\");\r\n        //appends each element to create component\r\n        noteMainContainer.appendChild(this.createNoteBackgroundContainer(title, tasks));\r\n        return noteMainContainer;\r\n    };\r\n    Display.prototype.createNoteBackgroundContainer = function (title, tasks) {\r\n        //creates note background container\r\n        var noteBackgroundContainer = document.createElement('div');\r\n        noteBackgroundContainer.className = \"pt-2 px-3 pb-2 flex flex-col rounded-md w-full bg-white relative\";\r\n        var noteDeleteButton = this.createNoteDeleteButton();\r\n        //adds event listeners to note background container to show note delete button when hovering and hide while not\r\n        noteBackgroundContainer.addEventListener('mouseover', function () { return noteDeleteButton.className = noteDeleteButton.className.replace(\"invisible\", \"visible\"); });\r\n        noteBackgroundContainer.addEventListener('mouseleave', function () { return noteDeleteButton.className = noteDeleteButton.className.replace(\"visible\", \"invisible\"); });\r\n        noteBackgroundContainer.append(noteDeleteButton, this.createNoteTitle(title), this.createNoteTasks(tasks), this.createNewNoteButton());\r\n        return noteBackgroundContainer;\r\n    };\r\n    Display.prototype.createNoteDeleteButton = function () {\r\n        //creates note delete button\r\n        var noteDeleteButton = document.createElement('a');\r\n        noteDeleteButton.className = \"invisible absolute flex justify-center items-center w-6 h-6 rounded-xl text-white text-xs font-semibold bg-gray-800 right-2 hover:bg-gray-600\";\r\n        noteDeleteButton.href = '#';\r\n        noteDeleteButton.innerHTML = \"X\";\r\n        noteDeleteButton.addEventListener(\"click\", this.removeSingleNote.bind(this));\r\n        return noteDeleteButton;\r\n    };\r\n    Display.prototype.createNoteTitle = function (title) {\r\n        //creates note title\r\n        var noteTitle = document.createElement('div');\r\n        noteTitle.className = \"text-lg justify-self-start font-bold mb-2 w-4/5\";\r\n        noteTitle.setAttribute(\"contentEditable\", \"true\");\r\n        noteTitle.innerHTML = \"\".concat(title);\r\n        noteTitle.addEventListener(\"focusout\", this.saveToCookies);\r\n        noteTitle.addEventListener(\"keypress\", function (key) {\r\n            if (key.key === 'Enter') {\r\n                noteTitle.blur(); //blur removes keyboard focus from the element\r\n            }\r\n        });\r\n        return noteTitle;\r\n    };\r\n    Display.prototype.createNoteTasks = function (tasks) {\r\n        //creates notes tasks container\r\n        var noteTasks = document.createElement('div');\r\n        noteTasks.className = \"flex flex-col space-y-2\";\r\n        if (tasks) {\r\n            tasks.forEach(function (task) {\r\n                var singleTask = \"\\n          <div>\\n            <input type=\\\"checkbox\\\" \".concat(task[1] ? \"checked\" : \"\", \">\\n            <label>\").concat(task[0], \"</label>\\n          </div>\");\r\n                noteTasks.innerHTML += singleTask;\r\n            });\r\n        }\r\n        return noteTasks;\r\n    };\r\n    Display.prototype.createNewNoteButton = function () {\r\n        //creates add new task button\r\n        var newNoteButton = document.createElement('a');\r\n        newNoteButton.className = \"justify-self-center self-center flex justify-center items-end w-8 h-8 text-3xl rounded-full mt-4 text-white font-semibold bg-green-500 right-2\";\r\n        newNoteButton.href = \"#\";\r\n        newNoteButton.innerHTML = \"+\";\r\n        return newNoteButton;\r\n    };\r\n    Display.prototype.displaySingleNote = function (content) {\r\n        //gets section container of specific category\r\n        var sectionNotesContainer = document.getElementById(\"notes-container-\".concat(content.category));\r\n        //appends note component to category section\r\n        if (sectionNotesContainer)\r\n            sectionNotesContainer.appendChild(this.createNoteMainContainer(content.title, content.tasks || []));\r\n    };\r\n    Display.prototype.removeSingleNote = function (note) {\r\n        note.path[2].remove();\r\n        this.saveToCookies();\r\n    };\r\n    Display.prototype.displayCategory = function (category) {\r\n        var _this = this;\r\n        var cDecoded = decodeURIComponent(document.cookie); //to be careful\r\n        var cArr = cDecoded.split('; ');\r\n        var categoryNotes = cArr.find(function (category) {\r\n            return category.includes(\"notes\");\r\n        });\r\n        if (!!categoryNotes) {\r\n            var parsed = JSON.parse(categoryNotes.slice(6));\r\n            parsed.forEach(function (note) { return _this.displaySingleNote(note); });\r\n        }\r\n    };\r\n    Display.prototype.saveToCookies = function () {\r\n        var categoryNotes = [];\r\n        var notes = document.querySelectorAll('*[data-note=\"note\"]');\r\n        notes.forEach(function (note) {\r\n            var _a;\r\n            categoryNotes.push({\r\n                category: \"main\",\r\n                title: ((_a = note.firstChild) === null || _a === void 0 ? void 0 : _a.childNodes[1].textContent) || \"Title Loading Error\",\r\n                tasks: JSON.parse(note.dataset.tasks || \"[]\") || []\r\n            });\r\n        });\r\n        console.log(categoryNotes);\r\n        document.cookie = \"notes=\".concat(JSON.stringify(categoryNotes));\r\n    };\r\n    return Display;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sinote/./src/Display.ts?");

/***/ }),

/***/ "./src/SingleNote.ts":
/*!***************************!*\
  !*** ./src/SingleNote.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Note\": () => (/* binding */ Note)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ \"./src/main.ts\");\n\r\nvar Note = /** @class */ (function () {\r\n    function Note(category, title, tasks) {\r\n        this.category = category;\r\n        this.title = title;\r\n        this.tasks = tasks;\r\n    }\r\n    Note.prototype.newNote = function () {\r\n        _main__WEBPACK_IMPORTED_MODULE_0__.display.displaySingleNote({ category: this.category, title: this.title, tasks: this.tasks });\r\n        _main__WEBPACK_IMPORTED_MODULE_0__.display.saveToCookies();\r\n    };\r\n    Note.prototype.deleteNote = function () {\r\n        console.log(this.deleteNote);\r\n    };\r\n    Note.prototype.newTask = function () {\r\n        console.log(this.newTask);\r\n    };\r\n    Note.prototype.deleteTask = function () {\r\n        console.log(this.deleteNote);\r\n    };\r\n    return Note;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sinote/./src/SingleNote.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"display\": () => (/* binding */ display)\n/* harmony export */ });\n/* harmony import */ var _SingleNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SingleNote */ \"./src/SingleNote.ts\");\n/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Display */ \"./src/Display.ts\");\nvar _a;\r\n\r\n\r\nvar display = _Display__WEBPACK_IMPORTED_MODULE_1__.Display.getDisplay();\r\n(_a = document.querySelector('#new-note')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {\r\n    var asd = new _SingleNote__WEBPACK_IMPORTED_MODULE_0__.Note('main', \"Unnamed\");\r\n    asd.newNote();\r\n});\r\nwindow.addEventListener(\"load\", function () { return display.displayCategory(\"asd\"); });\r\n//this will save notes in the cookies when page is closed\r\nwindow.addEventListener(\"beforeunload\", function () {\r\n    document.cookie = \"beforeClosing='test'\";\r\n});\r\n\n\n//# sourceURL=webpack://sinote/./src/main.ts?");

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