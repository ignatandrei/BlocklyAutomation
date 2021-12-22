(self["webpackChunkAutoBlocklyApp"] = self["webpackChunkAutoBlocklyApp"] || []).push([["main"],{

/***/ 79945:
/*!*******************************!*\
  !*** ./src/app/AppDetails.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppDetails": () => (/* binding */ AppDetails)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 83575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 10745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 91640);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 59346);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 21339);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 19337);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 32673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 53158);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 50635);
/* harmony import */ var _DemoBlocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DemoBlocks */ 43787);
/* harmony import */ var _blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @blockly/blocklyswagger */ 46935);
/* harmony import */ var _blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LocalApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocalApi */ 57857);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var _load_show_usage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./load-show-usage.service */ 16335);








class AppDetails {
    constructor(http, loadShowUsageService) {
        this.http = http;
        this.loadShowUsageService = loadShowUsageService;
        this.settings = null;
        this.linksSwagger = [];
        this.demoBlocks = [];
        this.swaggersDict = new Map();
        this.customCategories = '';
        this.LocalAPI = null;
        this.Init();
    }
    CreateLocalApis(http, url) {
        return new _LocalApi__WEBPACK_IMPORTED_MODULE_2__.LocalAPI(url, http);
    }
    Init() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.zip)(this.getSettings(), this.loadShowUsageService.getSwaggerLinks(), this.loadShowUsageService.getDemoBlocks(), this.loadShowUsageService.getCustomCategories(), this.getLatestVersion())
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.delay)(1000), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(([settings, links, demoBlocks, categs, lv]) => {
            this.settings = settings;
            this.settings.latestVersion = lv;
            this.linksSwagger = links;
            this.demoBlocks = demoBlocks.map(it => {
                var n = new _DemoBlocks__WEBPACK_IMPORTED_MODULE_0__.DemoBlocks(it);
                n.Source = "Demos";
                return n;
            });
            this.customCategories = categs;
            this.LocalAPI = this.CreateLocalApis(this.http, this.settings.localAPI);
            //console.log('settings loaded', this.customCategories);
            this.LocalAPI.IsAlive().subscribe(it => {
                console.log('LocalAPI is alive', it);
            });
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => {
            return this.obtainSwaggers(this.linksSwagger);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)("")));
    }
    obtainSwaggers(l) {
        var allSwaggers = l.map(link => this.LoadSwaggersFromUrl(link));
        var arr = (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.forkJoin)(allSwaggers);
        return arr;
    }
    LoadSwaggersFromUrl(l) {
        var cacheUrl = l.link;
        var name = l.id || l.link;
        var parser = new _blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_1__.parseData(cacheUrl);
        var api = (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.from)(parser.ParseSwagger())
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)((it) => {
            console.log('swagger loaded:' + cacheUrl, it);
            it.name = name;
            this.swaggersDict.set(cacheUrl, it);
        }, (err) => {
            console.error('swagger error:' + cacheUrl, err);
        }));
        ;
        return api;
    }
    getLatestVersion() {
        //var dt=new Date().toISOString();  
        return this.http.get(`https://ignatandrei.github.io/BlocklyAutomation/version.txt`, { responseType: 'text' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.catchError)(err => {
            console.error('error getting latest version', err);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)('v' + "cannot get latest version");
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)((res) => {
            return res.toString().trim().substr(1); //remove first char v
        }));
    }
    getSettings() {
        var dt = new Date().toISOString();
        return this.http.get(`assets/settings.json?${dt}`, { responseType: 'text' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)((res) => {
            var data = JSON.parse(res);
            return data;
        }));
    }
}
AppDetails.ɵfac = function AppDetails_Factory(t) { return new (t || AppDetails)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_load_show_usage_service__WEBPACK_IMPORTED_MODULE_3__.LoadShowUsageService)); };
AppDetails.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({ token: AppDetails, factory: AppDetails.ɵfac });


/***/ }),

/***/ 43787:
/*!*******************************!*\
  !*** ./src/app/DemoBlocks.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DemoBlocks": () => (/* binding */ DemoBlocks)
/* harmony export */ });
class DemoBlocks {
    constructor(data = {}) {
        this.id = '';
        this.description = "";
        this.categories = "";
        this.blocks = "";
        this.Source = "None";
        Object.assign(this, data);
    }
}


/***/ }),

/***/ 57857:
/*!*****************************!*\
  !*** ./src/app/LocalApi.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalAPI": () => (/* binding */ LocalAPI)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 53158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 10745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 50635);
/* harmony import */ var _DemoBlocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DemoBlocks */ 43787);


class LocalAPI {
    constructor(urL, http) {
        this.urL = urL;
        this.http = http;
        this.WasAlive = false;
    }
    download() {
        window.location.href = 'https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseLocalAPI.zip';
    }
    IsAlive() {
        this.WasAlive = false;
        var self = this;
        var dt = new Date().toISOString();
        return this.http.get(this.urL + `api/v1/Management/CurrentDate?${dt}`, { responseType: 'text' })
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.catchError)((err) => (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)('')), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(res => {
            if ((res === null || res === void 0 ? void 0 : res.length) > 0) {
                var dt = Date.parse(res);
                //console.log(dt);
                self.WasAlive = true;
                return true;
            }
            return false;
        }));
    }
    LoadBlockContent(id) {
        var dt = new Date().toISOString();
        return this.http.post(this.urL + `api/v1/BASave/GetBlocksContent`, { id: id }, { responseType: 'text' })
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(it => it === null || it === void 0 ? void 0 : it.toString()));
    }
    LoadBlocks() {
        var dt = new Date().toISOString();
        return this.http.post(this.urL + `api/v1/BASave/GetBlocks`, null)
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(it => {
            var q = it.map(d => {
                var n = new _DemoBlocks__WEBPACK_IMPORTED_MODULE_0__.DemoBlocks(d);
                n.Source = "LocalAPI";
                return n;
            });
            return q;
        }));
    }
    SaveBlock(db, content) {
        return this.http.post(this.urL + 'api/v1/BASave/SaveNewBlock', { b: db, content: content }, { responseType: 'text' })
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(res => Number.parseInt(res === null || res === void 0 ? void 0 : res.toString(), 10)));
    }
}


/***/ }),

/***/ 14095:
/*!*****************************!*\
  !*** ./src/app/Settings.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Settings": () => (/* binding */ Settings)
/* harmony export */ });
class Settings {
    constructor() {
        this.title = '';
        this.footer = '';
        this.startBlocks = [];
        this.tourSteps = [];
        this.latestVersion = '';
        this.localAPI = '';
    }
}
Settings.version = '2021.12.22.1349';


/***/ }),

/***/ 68260:
/*!***********************************!*\
  !*** ./src/app/TransmitAction.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransmitAction": () => (/* binding */ TransmitAction)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 80228);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class TransmitAction {
    constructor() {
        this.sendData = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    }
    receiveData() {
        return this.sendData.asObservable();
    }
    sendDataToServer(toComponent, func) {
        let tuple = [toComponent, func];
        this.sendData.next(tuple);
    }
}
TransmitAction.ɵfac = function TransmitAction_Factory(t) { return new (t || TransmitAction)(); };
TransmitAction.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TransmitAction, factory: TransmitAction.ɵfac });


/***/ }),

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _blockly_studio_blockly_studio_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blockly-studio/blockly-studio.component */ 99795);
/* harmony import */ var _display_blockly_display_blockly_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display-blockly/display-blockly.component */ 74801);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





const routes = [
    { path: '', redirectTo: 'automation/main', pathMatch: 'full' },
    { path: 'automation/main', component: _display_blockly_display_blockly_component__WEBPACK_IMPORTED_MODULE_1__.DisplayBlocklyComponent },
    { path: 'automation/studio', component: _blockly_studio_blockly_studio_component__WEBPACK_IMPORTED_MODULE_0__.BlocklyStudioComponent },
    { path: 'automation/loadexample/:demoblock', component: _display_blockly_display_blockly_component__WEBPACK_IMPORTED_MODULE_1__.DisplayBlocklyComponent }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _AppDetails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppDetails */ 79945);
/* harmony import */ var _primary_navig_primary_navig_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./primary-navig/primary-navig.component */ 35582);




class AppComponent {
    constructor(titleService, appDetails) {
        var _a, _b;
        this.titleService = titleService;
        this.title = 'AutoBlocklyApp';
        console.log((_a = appDetails.settings) === null || _a === void 0 ? void 0 : _a.title);
        this.titleService.setTitle((((_b = appDetails.settings) === null || _b === void 0 ? void 0 : _b.title) || ''));
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_AppDetails__WEBPACK_IMPORTED_MODULE_0__.AppDetails)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-primary-navig");
    } }, directives: [_primary_navig_primary_navig_component__WEBPACK_IMPORTED_MODULE_1__.PrimaryNavigComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "initializeApp1": () => (/* binding */ initializeApp1)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _display_blockly_display_blockly_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display-blockly/display-blockly.component */ 74801);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 73598);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/material/toolbar */ 19946);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/autocomplete */ 43188);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/badge */ 70178);
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 43672);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button-toggle */ 31959);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/checkbox */ 61534);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/chips */ 81196);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/stepper */ 7650);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/divider */ 19975);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/expansion */ 12928);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/grid-list */ 63346);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/menu */ 82796);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/paginator */ 26439);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/progress-bar */ 60833);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/progress-spinner */ 74742);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/radio */ 68390);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/slider */ 61859);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/sort */ 64316);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/table */ 97217);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/tabs */ 12379);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/material/tree */ 34972);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/sidenav */ 7216);
/* harmony import */ var _primary_navig_primary_navig_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./primary-navig/primary-navig.component */ 35582);
/* harmony import */ var _AppDetails__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AppDetails */ 79945);
/* harmony import */ var ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ngx-monaco-editor */ 66218);
/* harmony import */ var _TransmitAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TransmitAction */ 68260);
/* harmony import */ var _blockly_studio_blockly_studio_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blockly-studio/blockly-studio.component */ 99795);
/* harmony import */ var _find_saved_blocks_find_saved_blocks_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./find-saved-blocks/find-saved-blocks.component */ 23920);


















































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ providers: [_AppDetails__WEBPACK_IMPORTED_MODULE_4__.AppDetails, _TransmitAction__WEBPACK_IMPORTED_MODULE_5__.TransmitAction,
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_8__.APP_INITIALIZER, useFactory: initializeApp1, deps: [_AppDetails__WEBPACK_IMPORTED_MODULE_4__.AppDetails], multi: true }], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule,
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_12__.MatSliderModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule,
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_15__.MatAutocompleteModule,
            _angular_material_badge__WEBPACK_IMPORTED_MODULE_16__.MatBadgeModule,
            _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_17__.MatBottomSheetModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule,
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_18__.MatButtonToggleModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_19__.MatCardModule,
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_20__.MatCheckboxModule,
            _angular_material_chips__WEBPACK_IMPORTED_MODULE_21__.MatChipsModule,
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_22__.MatStepperModule,
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__.MatDatepickerModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__.MatDialogModule,
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_25__.MatDividerModule,
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_26__.MatExpansionModule,
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_27__.MatGridListModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_28__.MatIconModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_29__.MatInputModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_30__.MatListModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_31__.MatMenuModule,
            _angular_material_core__WEBPACK_IMPORTED_MODULE_32__.MatNativeDateModule,
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__.MatPaginatorModule,
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_34__.MatProgressBarModule,
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_35__.MatProgressSpinnerModule,
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_36__.MatRadioModule,
            _angular_material_core__WEBPACK_IMPORTED_MODULE_32__.MatRippleModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_37__.MatSelectModule,
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_38__.MatSidenavModule,
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_12__.MatSliderModule,
            _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_39__.MatSlideToggleModule,
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_40__.MatSnackBarModule,
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_41__.MatSortModule,
            _angular_material_table__WEBPACK_IMPORTED_MODULE_42__.MatTableModule,
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_43__.MatTabsModule,
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_44__.MatToolbarModule,
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_45__.MatTooltipModule,
            _angular_material_tree__WEBPACK_IMPORTED_MODULE_46__.MatTreeModule,
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_44__.MatToolbarModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule,
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_38__.MatSidenavModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_28__.MatIconModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_30__.MatListModule,
            ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_47__.MonacoEditorModule.forRoot()
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _display_blockly_display_blockly_component__WEBPACK_IMPORTED_MODULE_2__.DisplayBlocklyComponent,
        _primary_navig_primary_navig_component__WEBPACK_IMPORTED_MODULE_3__.PrimaryNavigComponent,
        _blockly_studio_blockly_studio_component__WEBPACK_IMPORTED_MODULE_6__.BlocklyStudioComponent,
        _find_saved_blocks_find_saved_blocks_component__WEBPACK_IMPORTED_MODULE_7__.FindSavedBlocksComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule,
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_12__.MatSliderModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule,
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_15__.MatAutocompleteModule,
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_16__.MatBadgeModule,
        _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_17__.MatBottomSheetModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule,
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_18__.MatButtonToggleModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_19__.MatCardModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_20__.MatCheckboxModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_21__.MatChipsModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_22__.MatStepperModule,
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__.MatDatepickerModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__.MatDialogModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_25__.MatDividerModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_26__.MatExpansionModule,
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_27__.MatGridListModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_28__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_29__.MatInputModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_30__.MatListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_31__.MatMenuModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_32__.MatNativeDateModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__.MatPaginatorModule,
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_34__.MatProgressBarModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_35__.MatProgressSpinnerModule,
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_36__.MatRadioModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_32__.MatRippleModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_37__.MatSelectModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_38__.MatSidenavModule,
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_12__.MatSliderModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_39__.MatSlideToggleModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_40__.MatSnackBarModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_41__.MatSortModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_42__.MatTableModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_43__.MatTabsModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_44__.MatToolbarModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_45__.MatTooltipModule,
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_46__.MatTreeModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_44__.MatToolbarModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_38__.MatSidenavModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_28__.MatIconModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_30__.MatListModule, ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_47__.MonacoEditorModule] }); })();
function initializeApp1(appDet) {
    return () => {
        return appDet.Init();
    };
}


/***/ }),

/***/ 99795:
/*!************************************************************!*\
  !*** ./src/app/blockly-studio/blockly-studio.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlocklyStudioComponent": () => (/* binding */ BlocklyStudioComponent)
/* harmony export */ });
/* harmony import */ var _home_runner_work_BlocklyAutomation_BlocklyAutomation_src_AutoBlocklyApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tabs */ 12379);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);







const _c0 = ["vcr"];

function BlocklyStudioComponent_mat_tab_4_ng_template_1_mat_icon_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const number_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" filter_", number_r1 + 1, "");
  }
}

function BlocklyStudioComponent_mat_tab_4_ng_template_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "W:{{number+1}");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}

function BlocklyStudioComponent_mat_tab_4_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, BlocklyStudioComponent_mat_tab_4_ng_template_1_mat_icon_0_Template, 2, 1, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BlocklyStudioComponent_mat_tab_4_ng_template_1_span_1_Template, 2, 0, "span", 8);
  }

  if (rf & 2) {
    const number_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", number_r1 < 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", number_r1 > 9);
  }
}

function BlocklyStudioComponent_mat_tab_4_ng_template_2_Template(rf, ctx) {}

function BlocklyStudioComponent_mat_tab_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BlocklyStudioComponent_mat_tab_4_ng_template_1_Template, 2, 2, "ng-template", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, BlocklyStudioComponent_mat_tab_4_ng_template_2_Template, 0, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const number_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("label", "W:" + (number_r1 + 1));
  }
}

class BlocklyStudioComponent {
  constructor(fooInjector, resolver) {
    this.fooInjector = fooInjector;
    this.resolver = resolver;
    this.data = [];
    this.selectedTabIndex = 0;
    this.numbers = [0];
  }

  addTab() {
    // console.log('x',this.selectedTabIndex);
    this.numbers.push(this.numbers.length); // console.log('y',this.numbers.length-1);

    this.selectedTabIndex = this.numbers.length - 1;
  }

  changeSelected(index) {
    if (this.data.filter(it => it == index).length > 0) return;
    this.data.push(index);
    this.loadBar(index).then(it => {// console.log('loaded'+ it);
    });
  }

  ngAfterViewInit() {
    this.data.push(0);
    this.loadBar(0).then(it => {// console.log('loaded tab' +it);
    });
  }

  loadBar(index) {
    var _this = this;

    return (0,_home_runner_work_BlocklyAutomation_BlocklyAutomation_src_AutoBlocklyApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _a;

      try {
        const b = yield Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../display-blockly/display-blockly.component */ 74801));

        const factory = _this.resolver.resolveComponentFactory(b.DisplayBlocklyComponent);

        var vcr = (_a = _this.components) === null || _a === void 0 ? void 0 : _a.get(index);
        if (vcr != null) vcr.createComponent(factory);
      } catch (e) {
        console.error("loading" + index, e);
      }

      return index;
    })();
  }

  ngOnInit() {}

}

BlocklyStudioComponent.ɵfac = function BlocklyStudioComponent_Factory(t) {
  return new (t || BlocklyStudioComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ComponentFactoryResolver));
};

BlocklyStudioComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: BlocklyStudioComponent,
  selectors: [["app-blockly-studio"]],
  viewQuery: function BlocklyStudioComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5, _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.components = _t);
    }
  },
  decls: 7,
  vars: 2,
  consts: [["mat-icon-button", "", "color", "primary", 3, "click"], [3, "selectedIndex", "selectedIndexChange"], [3, "label", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [3, "label"], ["mat-tab-label", ""], ["vcr", ""], ["aria-hidden", "false", 4, "ngIf"], [4, "ngIf"], ["aria-hidden", "false"]],
  template: function BlocklyStudioComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BlocklyStudioComponent_Template_button_click_0_listener() {
        return ctx.addTab();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "add_circle");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-tab-group", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedIndexChange", function BlocklyStudioComponent_Template_mat_tab_group_selectedIndexChange_3_listener($event) {
        return ctx.changeSelected($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BlocklyStudioComponent_mat_tab_4_Template, 4, 1, "mat-tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BlocklyStudioComponent_Template_button_click_5_listener() {
        return ctx.addTab();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Add");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selectedIndex", ctx.selectedTabIndex);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.numbers);
    }
  },
  directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__.MatTabGroup, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__.MatTabLabel, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibG9ja2x5LXN0dWRpby5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 74801:
/*!**************************************************************!*\
  !*** ./src/app/display-blockly/display-blockly.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplayBlocklyComponent": () => (/* binding */ DisplayBlocklyComponent)
/* harmony export */ });
/* harmony import */ var _home_runner_work_BlocklyAutomation_BlocklyAutomation_src_AutoBlocklyApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var blockly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! blockly */ 62266);
/* harmony import */ var blockly__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(blockly__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var blockly_javascript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! blockly/javascript */ 21269);
/* harmony import */ var blockly_javascript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _blockly_workspace_content_highlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @blockly/workspace-content-highlight */ 41051);
/* harmony import */ var _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @blockly/blocklyscripts */ 73134);
/* harmony import */ var _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @blockly/blocklyhelpers */ 75774);
/* harmony import */ var _blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DemoBlocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DemoBlocks */ 43787);
/* harmony import */ var _blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @blockly/blocklyswagger */ 46935);
/* harmony import */ var _blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var intro_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! intro.js */ 97958);
/* harmony import */ var intro_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(intro_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! chart.js/auto */ 93566);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 23280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 53158);
/* harmony import */ var _find_saved_blocks_find_saved_blocks_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../find-saved-blocks/find-saved-blocks.component */ 23920);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _tabulator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tabulator */ 69233);
/* harmony import */ var _AppDetails__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../AppDetails */ 79945);
/* harmony import */ var _load_show_usage_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../load-show-usage.service */ 16335);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _TransmitAction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../TransmitAction */ 68260);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/grid-list */ 63346);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/menu */ 82796);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/divider */ 19975);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/expansion */ 12928);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/progress-spinner */ 74742);
/* harmony import */ var ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-monaco-editor */ 66218);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/forms */ 90587);








 // import { Chart , registerables } from 'chart.js';























function DisplayBlocklyComponent_mat_spinner_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "mat-spinner");
  }
}

const _c0 = function (a3) {
  return ["/", "automation", "loadexample", a3];
};

function DisplayBlocklyComponent_a_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpureFunction1"](2, _c0, ctx_r2.mustLoadDemoBlock));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"]("Direct link ", ctx_r2.mustLoadDemoBlock, "");
  }
}

function DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "ngx-monaco-editor", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_1_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return ctx_r8.showInner = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r4.editorPlain)("ngModel", ctx_r4.showInner);
  }
}

function DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "ngx-monaco-editor", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_2_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return ctx_r10.showJSCode = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r5.editorJSOptions)("ngModel", ctx_r5.showJSCode);
  }
}

function DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "ngx-monaco-editor", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_3_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return ctx_r12.showXMLCode = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r6.editorXMLOptions)("ngModel", ctx_r6.showXMLCode);
  }
}

function DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "ngx-monaco-editor", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngModelChange", function DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_4_Template_ngx_monaco_editor_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return ctx_r14.showBlocksDefinition = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("options", ctx_r7.editorJSOptions)("ngModel", ctx_r7.showBlocksDefinition);
  }
}

function DisplayBlocklyComponent_mat_grid_tile_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-grid-tile");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_1_Template, 1, 2, "ngx-monaco-editor", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_2_Template, 1, 2, "ngx-monaco-editor", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_3_Template, 1, 2, "ngx-monaco-editor", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](4, DisplayBlocklyComponent_mat_grid_tile_48_ngx_monaco_editor_4_Template, 1, 2, "ngx-monaco-editor", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r3.ShowOutput());
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r3.ShowCode());
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r3.ShowXML());
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r3.ShowBlocksDefinition());
  }
}

var ShowCodeAndXML;

(function (ShowCodeAndXML) {
  ShowCodeAndXML[ShowCodeAndXML["ShowNone"] = 0] = "ShowNone";
  ShowCodeAndXML[ShowCodeAndXML["ShowBlocksDefinition"] = 1] = "ShowBlocksDefinition";
  ShowCodeAndXML[ShowCodeAndXML["ShowXML"] = 2] = "ShowXML";
  ShowCodeAndXML[ShowCodeAndXML["ShowOutput"] = 3] = "ShowOutput";
  ShowCodeAndXML[ShowCodeAndXML["ShowCode"] = 4] = "ShowCode";
  ShowCodeAndXML[ShowCodeAndXML["Stop"] = 100] = "Stop";
})(ShowCodeAndXML || (ShowCodeAndXML = {}));

class DisplayBlocklyComponent {
  constructor(tabulator, DetailsApp, loadDemo, ar, ta, snackBar, dialog) {
    var _a;

    this.tabulator = tabulator;
    this.DetailsApp = DetailsApp;
    this.loadDemo = loadDemo;
    this.ar = ar;
    this.ta = ta;
    this.snackBar = snackBar;
    this.dialog = dialog; //monaco settings

    this.editorXMLOptions = {
      theme: 'vs-dark',
      language: 'xml'
    };
    this.editorJSOptions = {
      theme: 'vs-dark',
      language: 'javascript',
      lineNumbers: 'on'
    };
    this.editorPlain = {
      theme: 'vs-dark',
      language: 'plaintext',
      lineNumbers: 'on'
    };
    this.code = 'function x() {\nconsole.log("Hello world!");\n}';
    this.showCodeAndXML = ShowCodeAndXML.ShowNone;
    this.swaggerLoaded = 0;
    this.demoWorkspace = null;
    this.mustLoadDemoBlock = ''; // private directLinkDemo:string='';

    this.intro = intro_js__WEBPACK_IMPORTED_MODULE_8__();
    this.myId = 0;
    this.fullTextData = '';
    this.fullHtmlData = '';
    this.myChart = null; //   this.myChart = new Chart(e!,
    //   {"type":"bar","data":
    //   {"labels":["2019","2018","2017","2016","2015","2014","2013"],
    //   "datasets":[{"label":"Population",
    //   "data":[328239523/10000000,327167439/10000000,325719178/10000000,323127515/10000000,321418821/10000000,318857056/10000000,316128839/10000000]}]}
    // });

    this.step = 0; // swaggersUrl:string[]=[
    //   'https://microservicesportchooser.azurewebsites.net/swagger/v1/swagger.json',
    //   'https://netcoreblockly.herokuapp.com/swagger/v1/swagger.json',
    //   'https://petstore.swagger.io/v2/swagger.json'
    // ];

    this.swaggerData = [];
    this.showInner = '';
    this.showXMLCode = '';
    this.showJSCode = '';
    this.showBlocksDefinition = '';
    this.toolboxXML = '';
    this.loadedCompletely = false;
    this.myId = ++DisplayBlocklyComponent.id; //    console.log('x_',this.myId);
    //console.log(bs.filterBlocks.definitionBlocks());

    this.ar.paramMap.subscribe(params => {
      this.mustLoadDemoBlock = params.get('demoblock');
    });
    this.ta.receiveData().subscribe(it => {
      if (it[0] == 'DisplayBlocklyComponent') {
        this[it[1]]();
      }
    });
    (_a = this.DetailsApp.LocalAPI) === null || _a === void 0 ? void 0 : _a.IsAlive().subscribe();
  }

  createIntro() {
    var _a;

    var steps = (_a = this.DetailsApp.settings) === null || _a === void 0 ? void 0 : _a.tourSteps.map(it => {
      var _a;

      return {
        title: ((_a = this.DetailsApp.settings) === null || _a === void 0 ? void 0 : _a.title) || 'Blockly Automation',
        intro: it.text,
        element: document.querySelector(it.query) || undefined
      };
    });
    this.intro.setOptions({
      exitOnEsc: true,
      showStepNumbers: true,
      showButtons: true,
      doneLabel: 'Exit',
      skipLabel: 'Skip',
      showProgress: true,
      steps: steps
    }).start();
  }

  clearOutput() {
    this.step = 0;
    this.showInner = '';
    this.tabulator.ClearDataGrid();

    if (this.myChart != null) {
      this.myChart.destroy();
    }

    ;
    var el = this.theHtmlOutput();
    el.innerHTML = '';
    this.fullHtmlData = '';
    el = this.theTextOutput();
    el.innerText = '';
    this.fullTextData = '';
  }

  ShowText(data) {
    if (data == null) return;
    var dt = data.toString();
    this.fullTextData += dt;
    var el = this.theTextOutput();
    el.innerText = this.fullTextData;
  }

  finishHTMLOutput() {
    this.theHtmlOutput().innerHTML = this.fullHtmlData;
  }

  ShowHTML(data) {
    if (data == null) return;
    var dt = data.toString();
    this.fullHtmlData += dt;
    var el = this.theHtmlOutput();
    el.innerHTML += dt;
  }

  theHtmlOutput() {
    return document.getElementById('htmlOutput' + this.myId);
  }

  theTextOutput() {
    return document.getElementById('htmlText' + this.myId);
  }

  ShowChart(data) {
    var _a;

    var e = (_a = document.getElementById('barchart' + this.myId)) === null || _a === void 0 ? void 0 : _a.getContext('2d');

    if (e == null) {
      console.log("not canvas available for chart!");
      return;
    }

    try {
      var st = data === null || data === void 0 ? void 0 : data.toString();
      var dt = JSON.parse(st);

      if (dt && dt.type) {
        this.myChart = new chart_js_auto__WEBPACK_IMPORTED_MODULE_9__["default"](e, dt);
        console.log('make chart', data);
      }
    } catch (e) {
      //console.log(e);
      this.myChart = null;
    }
  }

  RunCode() {
    this.snackBar.open('Program start', 'Executing...');
    var self = this;
    var code = this.run.latestCode;
    var jsCode = this.showJSCode;
    self.CalculateXMLAndCode();

    var f = (latestCode, initApi) => {
      try {
        return new Interpreter(latestCode, initApi);
      } catch (e) {
        self.CalculateXMLAndCode();
        window.alert('please copy the left output and report there is an error at ' + JSON.stringify(e));
        this.showCodeAndXML = ShowCodeAndXML.ShowCode;
      }
    };

    this.run = _blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5__.interpreterHelper.createInterpreter(this.demoWorkspace, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
    this.clearOutput();
    this.showCodeAndXML = ShowCodeAndXML.ShowOutput;
    this.showInner = '{ "step_start": "start program",'; // console.log('x',code);
    // console.log('y',jsCode);

    if (code != jsCode) {
      if (window.confirm('Do you want to run the code modified by you ?')) code = jsCode;
      this.showJSCode = jsCode;
    }

    this.run.runCode(f, data => {
      // data = data?.toString()?.replace(/\n/g, '')?.replace(/\r/g, '');
      self.step++;
      self.showInner += `\n           
"step_${self.step}" : "${data}",`; // console.log(`obtained ${data}`);

      self.tabulator.AddDataToGrid(data);
      self.ShowChart(data);
      self.ShowHTML(data);
      self.ShowText(data);
    }, () => {
      this.snackBar.open('Program end', 'Done!', {
        duration: 3000
      });
      self.showInner += `\n "step_end" : "program executed; see results below"\n}`;
      this.tabulator.FinishGrid();
      this.finishHTMLOutput();
    }, code);
  }

  ShowLocalAPI(id) {
    var _a;

    (_a = this.DetailsApp.LocalAPI) === null || _a === void 0 ? void 0 : _a.LoadBlockContent(id).subscribe(data => {
      var xml = blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.textToDom(data);

      if (this.demoWorkspace != null) {
        blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.clearWorkspaceAndLoadFromXml(xml, this.demoWorkspace);
        window.alert('please press execute button');
      }

      ;
    });
  }

  ShowDemo(id) {
    this.mustLoadDemoBlock = id;
    this.loadDemo.getDemoBlock(id).subscribe(data => {
      var xml = blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.textToDom(data);

      if (this.demoWorkspace != null) {
        blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.clearWorkspaceAndLoadFromXml(xml, this.demoWorkspace);
        window.alert('please press execute button');
      }

      ;
    });
  }

  registerSwaggerBlocksObjects(demoWorkspace, item) {
    var xmlList = [];
    xmlList = item.fieldXMLObjects.map(it => blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.textToDom(it)); // var cat='<category id="microservicesportchooserazurewebsitesnet" name="microservicesportchooserazurewebsitesnet"><block type="IRegister"></block></category>';
    // cat='<block type="IRegister"></block>';
    // var block = Blockly.Xml.textToDom(cat);
    // xmlList.push(block);

    return xmlList; // console.log(data);
    // window.alert('a');
    // var str= data.map((it:any)=>it.categSwagger().toString() as string);
    // console.log(str);
    // var ret= str.map((it:string)=> Blockly.Xml.textToDom(it));
    // return ret;
  }

  registerSwaggerBlocksAPIControllers(demoWorkspace, item, controller) {
    var xmlList = [];
    xmlList = item.findfieldXMLFunctions(controller).map(it => blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.textToDom(it.gui));
    return xmlList;
  }

  registerSwaggerBlocksAPIAll(demoWorkspace, item) {
    var xmlList = [];
    xmlList = item.fieldXMLFunctions.map(it => blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.textToDom(it.gui));
    return xmlList;
  }

  ngOnInit() {//this.ShowBlocks();
  }

  ngAfterViewInit() {
    this.StartRegister(); //this.createIntro();

    (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.fromEvent)(window, 'TabDownload').subscribe(it => this.tabulator.copyCSV());
    (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.fromEvent)(window, 'TabCopy').subscribe(it => this.tabulator.copyClip());
  }

  ShowBlocks() {
    const dialogRef = this.dialog.open(_find_saved_blocks_find_saved_blocks_component__WEBPACK_IMPORTED_MODULE_10__.FindSavedBlocksComponent, {//width: '250px',
      //data: {name: this.name, animal: this.animal},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        var d = result;

        switch (d.Source) {
          case "Demos":
            this.ShowDemo(result.id);
            break;

          case "LocalAPI":
            this.ShowLocalAPI(result.id);
            break;

          default:
            window.alert(d.Source);
            break;
        }
      }
    });
  }

  LoadSwagger() {
    //https://swagger-tax-calc-api.herokuapp.com/api-docs
    //cors: https://humorapi.com/downloads/humorapi-openapi-3.json
    var self = this;
    var parser = new _blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_7__.parseData("");
    parser.showWindowToLoad('', json => {
      if (!json) return;

      if (json.endsWith('.html') || json.endsWith('.htm')) {
        window.alert('Swagger should end with .json - see source of html page');
        return;
      } //self.loadedCompletely=false;


      self.LoadSwaggerFromUrl(json).then(api => {
        // this.afterTimeout(this);
        if (api.hasError) window.alert("error loading local api");else {
          self.addToToolboxSwagger(api, this); //self.loadedCompletely=true;

          window.alert("loaded successfully");
        }
      });
    });
  } // var json = window.prompt(
  //   'Swagger url? ',
  //   'https://swagger-tax-calc-api.herokuapp.com/api-docs'
  // );
  // if (!json) return;
  // if (json.endsWith('.html') || json.endsWith('.htm')) {
  //   window.alert('Swagger should end with .json - see source of html page');
  //   return;
  // }
  // this.LoadSwaggerFromUrl(json).then((it) => {
  //   // this.afterTimeout(this);
  //   this.addToToolboxSwagger(it,this);
  //   window.alert('done');
  // });


  LoadSwaggerFromUrl(url, name) {
    var _this = this;

    return (0,_home_runner_work_BlocklyAutomation_BlocklyAutomation_src_AutoBlocklyApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var parser = new _blockly_blocklyswagger__WEBPACK_IMPORTED_MODULE_7__.parseData(url);
      var api = yield parser.ParseSwagger();
      api.name = name || url;
      if (!api.hasError) return _this.LoadSwaggerFromAPI(api);else return api;
    })();
  }

  LoadSwaggerFromAPI(api) {
    if (api.hasError) {
      console.error("error in swagger", api);
      return api;
    }

    this.swaggerData.push(api);

    for (var i = 0; i < api.GenerateBlocks.length; i++) {
      var e = api.GenerateBlocks[i];
      e(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
    }

    for (var i = 0; i < api.GenerateFunctions.length; i++) {
      var e = api.GenerateFunctions[i];

      var image = function (opKey) {
        var image = `assets/httpImages/${opKey}.png`;
        return new blockly__WEBPACK_IMPORTED_MODULE_1__.FieldImage(image, 90, 20, opKey);
      };

      e(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
    }

    api.metaBlocks()(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
    return api;
  }

  StartRegister() {
    var _this2 = this;

    return (0,_home_runner_work_BlocklyAutomation_BlocklyAutomation_src_AutoBlocklyApp_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // var swaggersUrl= await firstValueFrom( this.loadDemo.getSwaggerLinks());
      var swaggersUrl = _this2.DetailsApp.swaggersDict;
      var swaggersDict = new Map();
      swaggersUrl.forEach((it, key) => {
        if (!it.hasError) swaggersDict.set(key, _this2.LoadSwaggerFromAPI(it));
      }); // swaggersUrl.forEach(async (it) => {
      //   swaggersDict.set(it.id, await this.LoadSwaggerFromUrl(it.link, it.id));
      // });
      // SwaggerParser
      // .parseSwagger
      // .parseSwagger('https://microservicesportchooser.azurewebsites.net/swagger/v1/swagger.json')
      // .then(function(api: any) {
      //   console.log(api[0]);
      //   api[0](Blockly.Blocks,BlocklyJavaScript);
      //   api[1](Blockly.Blocks,BlocklyJavaScript);
      //   // console.log(api[1](Blockly.Blocks,BlocklyJavaScript));
      // });
      //hidden='true'

      var newSwaggerCategories = [...Array(50).keys()].map(it => _this2.CategorySwaggerHidden(it)).join(''); //this.loadDemo.getDemoBlocks().subscribe(
      // );

      const gridElement = document.getElementById('steps' + _this2.myId);

      if (gridElement == null) {
        window.alert('gridElement is null');
        return;
      }

      _this2.tabulator.initGrid(gridElement);

      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.filterBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.waitBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.defineBlocksWithJsonArray, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.xhrBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.propBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.guiBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.convertersBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.exportFileBlock.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.createObjectBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__, blockly__WEBPACK_IMPORTED_MODULE_1__.Extensions, blockly__WEBPACK_IMPORTED_MODULE_1__.Mutator);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.currentDateBlock.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.dateFromTextBlock.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.waitBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.commentBlock.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.trycatchFinBlock.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.auth0Blocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.windowsCreds.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.chartBlock.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.emailBlocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.htmlblocks.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__); // console.log('z',window.speechSynthesis.getVoices());

      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.ttsBlock.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      _blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.pianoBlock.definitionBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
      var customCategs = _this2.DetailsApp.customCategories;
      var blocks = [_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.defaultBlocks.generalBlocks(), ` 
        <category name='Blockly Advanced'>
        <category id="Audio" name="Audio">
        ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.ttsBlock.fieldXML()}
        ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.pianoBlock.fieldXML()}
        </category>  
            ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.filterBlocks.fieldXML()}
                
                ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.auth0Blocks.fieldXML()}
                <category id="catConverters"  name="Converters">
                ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.convertersBlocks.fieldXML()}
              </category>    
              <category id="catDates"  name="Dates">
          ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.currentDateBlock.fieldXML()}
          ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.dateFromTextBlock.fieldXML()}
          ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.waitBlocks.fieldXML()}
        </category>
        <category id="catEmail"  name="Email">
        ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.emailBlocks.fieldXML()}
      </category>

        <category id="catExporter"  name="Exporter">
        ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.exportFileBlock.fieldXML()}
      </category>
              <category id="catGUI" name="GUI">
              ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.guiBlocks.fieldXML()}
              ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.chartBlock.fieldXML()}
              </category>
              <category id="catHTML" name="HTML">
              ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.htmlblocks.fieldXML()}
              </category>
              <category name="Objects" id="objects">
              ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.propBlocks.fieldXML()}
              ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.createObjectBlocks.fieldXML()}
              </category>
              <category id="XHR" name="Request">
            ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.xhrBlocks.fieldXML()}
            ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.windowsCreds.fieldXML()}
            </category>
        `, `<category id="catTimers"  name="Timers">
          ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.waitBlocks.fieldXML()}
        </category>`, `  <category id="programming" name="Programming">
        ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.trycatchFinBlock.fieldXML()}
        ${_blockly_blocklyscripts__WEBPACK_IMPORTED_MODULE_4__.commentBlock.fieldXML()}
          </category>
        
      `, `</category>
      ${customCategs}
      
      <category name="Swagger" id="catSwagger" expanded='false' >          
          ${newSwaggerCategories}
        </category> 
       
        `];

      _this2.initialize(blocks); // console.log('x',bs.windowsCreds.fieldXML());

    })();
  }

  SaveBlocks() {
    _blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5__.saveBlocksUrl.saveState(blockly__WEBPACK_IMPORTED_MODULE_1__.Xml, this.demoWorkspace, this.myId);
  }

  ShowBlocksDefinition() {
    return this.showCodeAndXML === ShowCodeAndXML.ShowBlocksDefinition;
  }

  ShowSelection() {
    return ShowCodeAndXML[this.showCodeAndXML];
  }

  ShowSomething() {
    return this.showCodeAndXML !== ShowCodeAndXML.ShowNone;
  }

  ShowOutput() {
    return this.showCodeAndXML === ShowCodeAndXML.ShowOutput;
  }

  ShowCode() {
    return this.showCodeAndXML === ShowCodeAndXML.ShowCode;
  }

  ShowXML() {
    return this.showCodeAndXML === ShowCodeAndXML.ShowXML;
  }

  CalculateXMLAndCode() {
    var xml = blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.workspaceToDom(this.demoWorkspace, true);
    var xml_text = blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.domToPrettyText(xml); // this.showInner = `
    //         ${this.run.latestCode}
    //         ========
    //         ${xml_text}
    //         ========
    //         `;

    this.showJSCode = this.run.latestCode;
    this.showXMLCode = xml_text;
    var blocks = this.parseTextForBlocks(xml_text);
    this.showBlocksDefinition = blocks.map(it => {
      try {
        var blocks = `Blockly.Blocks['${it}']={ init: \n` + blockly__WEBPACK_IMPORTED_MODULE_1__.Blocks[it]['init'].toString() + '};';
        var js = `Blockly.JavaScript['${it}']=` + blockly_javascript__WEBPACK_IMPORTED_MODULE_2__[it].toString() + ';';
        return blocks + '\n' + js; //console.log('x'+it,(Blockly.Blocks[it] as any)['init']());
      } catch (e) {
        console.error('parse definition : ' + it, e);
        return '//Error for ' + it;
      }
    }).join('\n');
  }

  parseTextForBlocks(xml_text) {
    var ret = [];
    1;

    if (xml_text.indexOf('<block type="') >= 0) {
      var blocks = xml_text.split('<block type="');

      for (var i = 1; i < blocks.length; i++) {
        var block = blocks[i].split('"')[0];
        ret.push(block);
      }
    }

    return ret;
  }

  ShowInnerWorkings() {
    if (this.demoWorkspace == null) {
      window.alert('demoWorkspace is null');
      return;
    }

    this.showCodeAndXML++;
    var item = this.ShowSelection();

    if (!item) {
      this.showCodeAndXML = ShowCodeAndXML.ShowNone;
      setTimeout(d => {
        blockly__WEBPACK_IMPORTED_MODULE_1__.svgResize(d);
      }, 1000, this.demoWorkspace);
    }

    this.CalculateXMLAndCode(); //outputArea.value += latestCode;
    // Blockly.svgResize(this.demoWorkspace);
  }

  Download() {
    //todo: use vex as for others - electron compatibility
    var name = window.prompt('Name?', 'blocks.txt');
    if (name == null) return;
    _blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5__.saveLoad.DownloadBlocks(blockly__WEBPACK_IMPORTED_MODULE_1__.Xml, this.demoWorkspace, name);
  }

  changeListener($event) {
    this.readThis($event.target);
  }

  readThis(inputValue) {
    var file = inputValue.files[0];
    var myReader = new FileReader();
    var self = this;

    myReader.onloadend = function (e) {
      // you can perform an action with readed data here
      //console.log(myReader.result);
      _blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5__.saveLoad.LoadFile(blockly__WEBPACK_IMPORTED_MODULE_1__.Xml, self.demoWorkspace, myReader.result);
      self.run.resetInterpreter();
    };

    myReader.readAsText(file);
  }

  CategorySwaggerHidden(id) {
    return `<category name='swagger_hidden_${id}' hidden='true' >${id}</category>`;
  }

  SaveToLocalAPI() {
    var _a, _b, _c;

    if ((((_b = (_a = this.DetailsApp) === null || _a === void 0 ? void 0 : _a.LocalAPI) === null || _b === void 0 ? void 0 : _b.WasAlive) || false) == false) {
      this.LoadLocalAPI();
      window.alert("local api it is not yet loaded - please try again after loading");
      return;
    }

    var xml = blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.workspaceToDom(this.demoWorkspace, true);
    var xml_text = blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.domToPrettyText(xml);
    var db = new _DemoBlocks__WEBPACK_IMPORTED_MODULE_6__.DemoBlocks();
    var name = window.prompt("name of the blocks?");
    if (name == null) return;
    db.id = name;
    db.blocks = "";
    db.categories = "";
    db.description = "";
    (_c = this.DetailsApp.LocalAPI) === null || _c === void 0 ? void 0 : _c.SaveBlock(db, xml_text).subscribe(it => {
      console.log("number blocks", it);
      window.alert("saved !");
    });
  }

  LoadLocalAPI() {
    var _a, _b; // console.log('x_',self);


    var self = this;
    return (_b = (_a = self.DetailsApp.LocalAPI) === null || _a === void 0 ? void 0 : _a.IsAlive()) === null || _b === void 0 ? void 0 : _b.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_17__.catchError)(err => {
      var _a;

      window.alert(`cannot load ${(_a = self.DetailsApp.LocalAPI) === null || _a === void 0 ? void 0 : _a.urL}`);
      throw err;
    })).subscribe(it => {
      var _a;

      if (!it) {
        if (!window.confirm('LocalAPI is not alive.\n Do you want to downlod and run ?')) return;
        self.DetailsApp.LocalAPI.download();
      }

      var swaggerUrl = ((_a = self.DetailsApp.LocalAPI) === null || _a === void 0 ? void 0 : _a.urL) || '';
      swaggerUrl += "swagger/v1/swagger.json"; //window.alert(swaggerUrl);
      //self.loadedCompletely=false;

      self.LoadSwaggerFromUrl(swaggerUrl).then(api => {
        // this.afterTimeout(this);
        if (api.hasError) window.alert("error loading local api");else {
          api.name = "LocalAPI";
          self.addToToolboxSwagger(api, this); // self.loadedCompletely=true;

          window.alert("loaded successfully");
        }
      });
    });
  }

  initialize(defaultBlocks) {
    var _a, _b, _c, _d;

    const blocklyDiv = document.getElementById('blocklyDiv' + this.myId);

    if (blocklyDiv == null) {
      window.alert('blocklyDiv is null');
      return;
    }

    var blocks = defaultBlocks.map(it => `<sep></sep>${it}`);
    this.toolboxXML = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-simple" style="display: none">    
    ${blocks}
    </xml>`; // console.log(toolboxXML);

    this.demoWorkspace = blockly__WEBPACK_IMPORTED_MODULE_1__.inject(blocklyDiv, {
      readOnly: false,
      media: 'media/',
      trashcan: true,
      // renderer:'thrasos',
      // theme: "highcontrast",
      horizontalLayout: false,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true
      },
      toolbox: this.toolboxXML
    }); // this.demoWorkspace.registerButtonCallback("LoadLocalAPI",()=>this.LoadLocalAPI(this));

    const contentHighlight = new _blockly_workspace_content_highlight__WEBPACK_IMPORTED_MODULE_3__.ContentHighlight(this.demoWorkspace);
    contentHighlight.init();
    var self = this;

    if ((((_b = (_a = this.DetailsApp.settings) === null || _a === void 0 ? void 0 : _a.startBlocks) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0) {
      try {
        var xmlBlocks = (((_c = this.DetailsApp.settings) === null || _c === void 0 ? void 0 : _c.startBlocks) || []).join('\n');
        var xml = blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.textToDom(xmlBlocks);
        blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.clearWorkspaceAndLoadFromXml(xml, this.demoWorkspace);
      } catch (e) {
        console.error('error when load default blocks', e);
      }
    }

    if ((_d = this.DetailsApp.LocalAPI) === null || _d === void 0 ? void 0 : _d.WasAlive) {
      this.LoadSwaggerFromUrl(this.DetailsApp.LocalAPI.urL + "swagger/v1/swagger.json", "LocalAutomation");
    }

    window.setTimeout(self.afterTimeout, 2000, this); // console.log(BlocklyJavaScript);

    this.run = _blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5__.interpreterHelper.createInterpreter(this.demoWorkspace, blockly_javascript__WEBPACK_IMPORTED_MODULE_2__);
    var self = this;
    this.demoWorkspace.addChangeListener(function (evt) {
      if (!evt.isUiEvent) {
        self.run.resetInterpreter();
        self.run.generateCodeAndLoadIntoInterpreter(); //self.ShowInnerWorkings();

        self.CalculateXMLAndCode();
      }
    });
  }

  restoreBlocks() {
    _blockly_blocklyhelpers__WEBPACK_IMPORTED_MODULE_5__.saveBlocksUrl.restoreState(blockly__WEBPACK_IMPORTED_MODULE_1__.Xml, this.demoWorkspace, this.myId);
  }

  addToToolboxSwagger(item, myComponent) {
    var _a;

    var newCateg = item.findCategSwaggerFromPaths().sort().map(it => `<category name='${it}' custom='func_${item.name}_${it}'></category>`).join('\n');
    var nameExistingCategorySwagger = (myComponent === null || myComponent === void 0 ? void 0 : myComponent.CategorySwaggerHidden(myComponent === null || myComponent === void 0 ? void 0 : myComponent.swaggerLoaded)) || '';
    var xmlToolbox = myComponent.toolboxXML; // console.log('a',xmlToolbox);

    var replaceCategory = `<category name='${item.name}'>
<category name='API' id='func_${item.name}'>
${newCateg}
</category>
${item.categSwagger()}

<category name='meta' id='meta_${item.name}'>
<block type='meta_swagger_controllers_${item.name}'></block>
<block type='meta_swagger_controllers_actions_${item.name}'></block>
</category>

</category>
`; // console.log('x',replaceCategory)

    xmlToolbox = xmlToolbox.replace(nameExistingCategorySwagger, replaceCategory); // console.log('x',xmlToolbox)

    myComponent.swaggerLoaded++; // console.log(item.name);

    myComponent.toolboxXML = xmlToolbox;
    var toolbox = (_a = myComponent === null || myComponent === void 0 ? void 0 : myComponent.demoWorkspace) === null || _a === void 0 ? void 0 : _a.updateToolbox(xmlToolbox); //myComponent?.swaggerData?.forEach((item: any) => 

    {
      if ((myComponent === null || myComponent === void 0 ? void 0 : myComponent.demoWorkspace) == null) return;
      var nameCat = 'objects_' + item.nameCategSwagger();
      var nameAPI = 'AllApi_' + item.nameCategSwagger();
      var cache = item;
      myComponent.demoWorkspace.registerToolboxCategoryCallback(nameCat, d => {
        return myComponent.registerSwaggerBlocksObjects(d, cache);
      });
      myComponent.demoWorkspace.registerToolboxCategoryCallback(nameAPI, d => {
        return myComponent.registerSwaggerBlocksAPIAll(d, cache);
      });
      item.findCategSwaggerFromPaths().forEach(it => {
        var _a;

        (_a = myComponent === null || myComponent === void 0 ? void 0 : myComponent.demoWorkspace) === null || _a === void 0 ? void 0 : _a.registerToolboxCategoryCallback(`func_${item.name}_${it}`, d => {
          return myComponent.registerSwaggerBlocksAPIControllers(d, item, it);
        });
      });
    }
  }

  afterTimeout(myComponent) {
    var _a, _b, _c; // console.log('start register');


    myComponent.loadedCompletely = true;
    if ((myComponent === null || myComponent === void 0 ? void 0 : myComponent.swaggerData) == null) return;
    var nr = myComponent.swaggerData.length;
    myComponent.toolboxXML = myComponent.toolboxXML.replace('Swagger', `Swagger(${nr})`);
    myComponent.swaggerData.forEach(item => {
      // console.log('a_item', item);
      var cache = item;
      myComponent.addToToolboxSwagger(cache, myComponent);
    });
    if ((myComponent === null || myComponent === void 0 ? void 0 : myComponent.mustLoadDemoBlock) != null) myComponent.ShowDemo(myComponent === null || myComponent === void 0 ? void 0 : myComponent.mustLoadDemoBlock);else {
      //from default
      if ((((_b = (_a = myComponent.DetailsApp.settings) === null || _a === void 0 ? void 0 : _a.startBlocks) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0) {
        try {
          var xml_text = (((_c = myComponent.DetailsApp.settings) === null || _c === void 0 ? void 0 : _c.startBlocks) || []).join('\n'); //<xml xmlns="https://developers.google.com/blockly/xml"></xml>

          if ((xml_text === null || xml_text === void 0 ? void 0 : xml_text.length) > 62) {
            var xml = blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.textToDom(xml_text);
            blockly__WEBPACK_IMPORTED_MODULE_1__.Xml.clearWorkspaceAndLoadFromXml(xml, myComponent.demoWorkspace);
          }
        } catch (e) {
          console.log('error when load default blocks', e);
        }
      } //from browser cache


      myComponent.restoreBlocks();
    }
  }

}
DisplayBlocklyComponent.id = 0;

DisplayBlocklyComponent.ɵfac = function DisplayBlocklyComponent_Factory(t) {
  return new (t || DisplayBlocklyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_tabulator__WEBPACK_IMPORTED_MODULE_11__.TabulatorHelper), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_AppDetails__WEBPACK_IMPORTED_MODULE_12__.AppDetails), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_load_show_usage_service__WEBPACK_IMPORTED_MODULE_13__.LoadShowUsageService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_TransmitAction__WEBPACK_IMPORTED_MODULE_14__.TransmitAction), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_19__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_20__.MatDialog));
};

DisplayBlocklyComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: DisplayBlocklyComponent,
  selectors: [["app-display-blockly"]],
  decls: 79,
  vars: 14,
  consts: [[4, "ngIf"], ["rowHeight", "1:1", 3, "cols"], [2, "display", "inline-block", "height", "100%", "width", "100%"], [2, "display", "inline-block", "height", "5%", "width", "100%"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "id", "downloadBlocks", "color", "primary", 3, "matMenuTriggerFor"], ["menuSave", "matMenu"], [3, "inset"], ["id", "downloadBlocks", "mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", 3, "color", "click"], ["mat-raised-button", "", "color", "warn", "id", "runButton", 3, "click"], ["type", "file", 3, "change"], ["mat-raised-button", "", "id", "demos", "color", "accent", 3, "click"], ["target", "_blank", "mat-raised-button", "", "color", "primary", 3, "routerLink", 4, "ngIf"], [2, "display", "inline-block", "height", "100%", "width", "100%", 3, "id"], [3, "id"], ["width", "800", "height", "450", 3, "id"], ["target", "_blank", "mat-raised-button", "", "color", "primary", 3, "routerLink"], ["style", "display: inline-block; height: 100%; width: 100%", 3, "options", "ngModel", "ngModelChange", 4, "ngIf"], [2, "display", "inline-block", "height", "100%", "width", "100%", 3, "options", "ngModel", "ngModelChange"]],
  template: function DisplayBlocklyComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](0, DisplayBlocklyComponent_mat_spinner_0_Template, 1, 0, "mat-spinner", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "mat-grid-list", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "mat-grid-tile-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function DisplayBlocklyComponent_Template_button_click_5_listener() {
        return ctx.LoadSwagger();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](7, "file_upload");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8, " Load Swagger/OpenAPI ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](9, " \u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](11, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](12, "save");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](13, " Save => ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "mat-menu", null, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](16, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function DisplayBlocklyComponent_Template_button_click_16_listener() {
        return ctx.SaveBlocks();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](17, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](18, "web");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](19, " Persist in browser ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](20, "mat-divider", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](21, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function DisplayBlocklyComponent_Template_button_click_21_listener() {
        return ctx.Download();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](22, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](23, "download");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](24, " Download blocks ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](25, "mat-divider", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](26, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function DisplayBlocklyComponent_Template_button_click_26_listener() {
        return ctx.SaveToLocalAPI();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](27, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](28, "save");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](29, " Save Local ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](30, " \u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](31, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function DisplayBlocklyComponent_Template_button_click_31_listener() {
        return ctx.RunCode();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](32, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](33, "play_arrow");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](34, " Execute ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](35, " \u00A0 \u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](36, "input", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("change", function DisplayBlocklyComponent_Template_input_change_36_listener($event) {
        return ctx.changeListener($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](37, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function DisplayBlocklyComponent_Template_button_click_37_listener() {
        return ctx.ShowInnerWorkings();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](38, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](39, "code");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](40);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](41, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function DisplayBlocklyComponent_Template_button_click_41_listener() {
        return ctx.ShowBlocks();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](42, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](43, "list");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](44, " Load Saved Blocks ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](45, DisplayBlocklyComponent_a_45_Template, 2, 4, "a", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](46, "mat-grid-tile");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](47, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](48, DisplayBlocklyComponent_mat_grid_tile_48_Template, 5, 4, "mat-grid-tile", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](49, "mat-accordion");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](50, "mat-expansion-panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](51, "mat-expansion-panel-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](52, "mat-panel-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](53, " Output Grid ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](54, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](55, " Click to see grid of output values ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](56, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](57, "mat-expansion-panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](58, "mat-expansion-panel-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](59, "mat-panel-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](60, " Chart ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](61, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](62, " Click to see chart of output values ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](63, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](64, "canvas", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](65, "mat-expansion-panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](66, "mat-expansion-panel-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](67, "mat-panel-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](68, " HTML ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](69, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](70, " Click to see output as HTML ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](71, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](72, "mat-expansion-panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](73, "mat-expansion-panel-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](74, "mat-panel-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](75, " Text ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](76, "mat-panel-description");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](77, " Click to see output as Text ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](78, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](15);

      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.loadedCompletely);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("cols", ctx.ShowSomething() ? 2 : 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("matMenuTriggerFor", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("inset", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("inset", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("color", (ctx.DetailsApp.LocalAPI == null ? null : ctx.DetailsApp.LocalAPI.WasAlive) || false ? "primary" : "warn");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", ctx.ShowSelection(), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.mustLoadDemoBlock == null ? null : ctx.mustLoadDemoBlock.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("id", "blocklyDiv" + ctx.myId);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.ShowSomething());
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("id", "steps" + ctx.myId);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("id", "barchart" + ctx.myId);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("id", "htmlOutput" + ctx.myId);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("id", "htmlText" + ctx.myId);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__.MatGridList, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__.MatGridTileText, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__.MatGridTileHeaderCssMatStyler, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_24__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__.MatMenuTrigger, _angular_material_menu__WEBPACK_IMPORTED_MODULE_25__.MatMenu, _angular_material_divider__WEBPACK_IMPORTED_MODULE_26__.MatDivider, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__.MatGridTile, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_27__.MatAccordion, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_27__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_27__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_27__.MatExpansionPanelTitle, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_27__.MatExpansionPanelDescription, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_28__.MatSpinner, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterLinkWithHref, ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_29__.EditorComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_30__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_30__.NgModel],
  styles: [".tabulator[_ngcontent-%COMP%] {\n    font-size: 12px;\n    border: none;\n }\n\n  .tabulator[_ngcontent-%COMP%]   .tabulator-header[_ngcontent-%COMP%] {\n    font-weight: normal;\n    border-bottom: 1px solid;\n    border-bottom-color: rgba(0, 0, 0, 0.12);\n    color: rgba(0, 0, 0, 0.54);\n }\n\n  .tabulator[_ngcontent-%COMP%]   .tabulator-header[_ngcontent-%COMP%]   .tabulator-col[_ngcontent-%COMP%] {\n    height: 48px;\n    background-color: #ffffff;\n    border: none;\n    padding: 0 7px;\n }\n\n  .tabulator-row[_ngcontent-%COMP%] {\n    border-bottom: 1px solid;\n    border-bottom-color: rgba(0, 0, 0, 0.12);\n    min-height: 48px;\n    vertical-align: middle;\n }\n\n  .tabulator-row[_ngcontent-%COMP%]   .tabulator-cell[_ngcontent-%COMP%] {\n    padding: 16px 7px;\n    border-right: none;\n    vertical-align: middle;\n }\n\n  .tabulator-row[_ngcontent-%COMP%]   .tabulator-cell[_ngcontent-%COMP%]:first-of-type, .tabulator[_ngcontent-%COMP%]   .tabulator-header[_ngcontent-%COMP%]   .tabulator-col[_ngcontent-%COMP%]:first-of-type {\n    padding-left: 24px;\n }\n\n  .tabulator-row.tabulator-row-even[_ngcontent-%COMP%] {\n    background-color: #ffffff;\n }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXktYmxvY2tseS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztLQUtLOztFQUVIO0lBQ0UsZUFBZTtJQUNmLFlBQVk7Q0FDZjs7RUFFQTtJQUNHLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsd0NBQXdDO0lBQ3hDLDBCQUEwQjtDQUM3Qjs7RUFFQTtJQUNHLFlBQVk7SUFDWix5QkFBeUI7SUFDekIsWUFBWTtJQUNaLGNBQWM7Q0FDakI7O0VBRUE7SUFDRyx3QkFBd0I7SUFDeEIsd0NBQXdDO0lBQ3hDLGdCQUFnQjtJQUNoQixzQkFBc0I7Q0FDekI7O0VBRUE7SUFDRyxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLHNCQUFzQjtDQUN6Qjs7RUFFQTs7SUFFRyxrQkFBa0I7Q0FDckI7O0VBRUE7SUFDRyx5QkFBeUI7Q0FDNUIiLCJmaWxlIjoiZGlzcGxheS1ibG9ja2x5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAjYmxvY2tseURpdiB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gIH0gKi9cblxuICAudGFidWxhdG9yIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgYm9yZGVyOiBub25lO1xuIH1cbiBcbiAudGFidWxhdG9yIC50YWJ1bGF0b3ItaGVhZGVyIHtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpO1xuIH1cbiBcbiAudGFidWxhdG9yIC50YWJ1bGF0b3ItaGVhZGVyIC50YWJ1bGF0b3ItY29sIHtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcGFkZGluZzogMCA3cHg7XG4gfVxuIFxuIC50YWJ1bGF0b3Itcm93IHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQ7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgICBtaW4taGVpZ2h0OiA0OHB4O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gfVxuIFxuIC50YWJ1bGF0b3Itcm93IC50YWJ1bGF0b3ItY2VsbCB7XG4gICAgcGFkZGluZzogMTZweCA3cHg7XG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gfVxuIFxuIC50YWJ1bGF0b3Itcm93IC50YWJ1bGF0b3ItY2VsbDpmaXJzdC1vZi10eXBlLFxuIC50YWJ1bGF0b3IgLnRhYnVsYXRvci1oZWFkZXIgLnRhYnVsYXRvci1jb2w6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgcGFkZGluZy1sZWZ0OiAyNHB4O1xuIH1cbiBcbiAudGFidWxhdG9yLXJvdy50YWJ1bGF0b3Itcm93LWV2ZW4ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gfSJdfQ== */"]
});

/***/ }),

/***/ 69233:
/*!**********************************************!*\
  !*** ./src/app/display-blockly/tabulator.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabulatorHelper": () => (/* binding */ TabulatorHelper)
/* harmony export */ });
/* harmony import */ var tabulator_tables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tabulator-tables */ 48060);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class TabulatorHelper {
    constructor() {
        this.a = null;
        this.b = null;
        this.dataObject = [];
        this.objectsForGrid = [];
        this.stringsForGrid = [];
        this.hotInstance = null;
    }
    get hot() {
        if (this.hotInstance != null)
            return this.hotInstance;
        throw new Error("hot is null");
    }
    ;
    initGrid(gridElement) {
        //console.log(gridElement); 
        tabulator_tables__WEBPACK_IMPORTED_MODULE_0__.Tabulator.registerModule([tabulator_tables__WEBPACK_IMPORTED_MODULE_0__.FormatModule, tabulator_tables__WEBPACK_IMPORTED_MODULE_0__.ClipboardModule, tabulator_tables__WEBPACK_IMPORTED_MODULE_0__.DownloadModule, tabulator_tables__WEBPACK_IMPORTED_MODULE_0__.SelectRowModule]);
        this.hotInstance = new tabulator_tables__WEBPACK_IMPORTED_MODULE_0__.Tabulator(gridElement, {
            columns: [{ title: 'Step', field: 'id' }],
            layout: "fitColumns",
            // dataTree: false,
            // dataTreeStartExpanded: false,
            // movableRows: false,
            // movableColumns: true,
            // selectable: false,
            // selectableRangeMode: "click",
            clipboard: "copy",
            footerElement: `<div>
        <!-- <a href="javascript:{var event = new Event('TabCopy'); window.dispatchEvent(event);}">Copy Clipboard</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:{var event = new Event('TabDownload'); window.dispatchEvent(event);}">CSV</a>
        -->
        
    </div>`,
            placeholder: "please press execute button",
            tooltips: function (cell) {
                //cell - cell component
                //function should return a string for the tooltip of false to hide the tooltip
                return cell.getColumn().getField() + " - " + cell.getValue(); //return cells "field - value";
            },
        });
        this.hot.replaceData([]);
        // this.hot.clearFilter(true);
        // this.hot.clearHeaderFilter();
        this.hot.redraw(true);
    }
    AddStringToGrid(value) {
        //window.alert(value);
        if (value.startsWith("{") && value.endsWith("}")) {
            try {
                var obj = JSON.parse(value);
                this.objectsForGrid.push(obj);
                return;
            }
            catch (err) {
                //do nothing
            }
        }
        ;
        if (value.startsWith("[") && value.endsWith("]")) {
            try {
                var arr = JSON.parse(value);
                for (var i = 0; i < arr.length; i++) {
                    this.objectsForGrid.push(arr[i]);
                }
                ;
                return;
            }
            catch (err) {
                //do nothing
            }
        }
        ;
        this.stringsForGrid.push(value);
        //console.log(this.stringsForGrid);
        //window.alert('length:'+stringsForGrid.length);
    }
    AddDataToGrid(value) {
        //gridElement.innerHTML = '';
        //hot.addData([dataObject]);
        //hot.redraw(true);
        //window.alert(JSON.stringify(value) + typeof value);
        if (typeof value === 'string') {
            // console.log("adding string to grid");
            this.AddStringToGrid(value === null || value === void 0 ? void 0 : value.toString());
            this.dataObject.push([value === null || value === void 0 ? void 0 : value.toString()]);
            return;
        }
        if (typeof value === 'object') {
            console.log("adding object to grid");
            this.AddStringToGrid(JSON.stringify(value));
            this.dataObject.push([value]);
            return;
        }
        // console.log("adding data to grid");
        this.dataObject.push([value.ToString()]);
        this.AddStringToGrid(value.toString());
    }
    ClearDataGrid() {
        this.dataObject = [];
        this.objectsForGrid = [];
        this.stringsForGrid = [];
        if (this.hot != null) {
            var cStep = { title: 'Step', field: 'id' };
            var cValue = { title: 'Value', field: 'val' };
            this.hot.setColumns([cStep, cValue]);
            this.hot.replaceData([]);
            //this.hot.clearFilter(true);
            // this.hot.clearHeaderFilter();
            this.hot.redraw(true);
        }
    }
    hasOwnProperty(obj, prop) {
        if (obj == null)
            return false;
        return obj.hasOwnProperty(prop);
    }
    AddObjectToFinishGrid() {
        var headers = [];
        var obj = this.objectsForGrid;
        //console.log("object !", obj);
        for (var i = 0; i < obj.length; i++) {
            var data = obj[i];
            if (typeof data === 'string') {
                headers.push("_");
            }
            else {
                headers.push(...Object.keys(data));
            }
        }
        //console.log("headers 1", headers);
        var mySet = new Set(headers);
        headers = Array.from(mySet);
        var allHeaders = [...headers];
        var fullData = [];
        for (var i = 0; i < obj.length; i++) {
            var data = obj[i];
            //console.log(data);
            var res = { Nr: i + 1 };
            //res["_children"] = [];
            for (var p = 0; p < headers.length; p++) {
                var key = headers[p];
                var defKey = this.goodNameForKey(key);
                //console.log(`${key} ${data && data.hasOwnProperty(key)} `)
                if (data && this.hasOwnProperty(data, key)) {
                    var val = data[key];
                    if (typeof val === "object") {
                        res[defKey] = JSON.stringify(val);
                        //res["_children"].push(val);
                        //allHeaders.push(...Object.keys(val));
                    }
                    else
                        res[defKey] = val;
                }
                else {
                    if (typeof data === 'string' && p === 0) {
                        res[defKey] = data;
                    }
                    else {
                        res[defKey] = '';
                    }
                }
            }
            fullData.push(res);
        }
        headers.splice(0, 0, "Nr");
        allHeaders.splice(0, 0, "Nr");
        var hs = this.Headers(allHeaders);
        this.hot.setColumns(hs);
        this.hot.replaceData(fullData);
    }
    Headers(allHeaders) {
        return allHeaders.map(it => {
            return {
                // cellClick: function (e:any, cell:any) {
                //     var row = cell.getRow().getData().Nr;
                //     var col = cell.getColumn().getField();
                //     alert(`The row at : ${row} , col: ${row} has value :\n ` + cell.getValue()); //display the cells value
                // },
                title: it,
                field: this.goodNameForKey(it),
                // headerFilter: true,
                formatter: function (cell, formatterParams, onRendered) {
                    //cell - the cell component
                    //formatterParams - parameters set for the column
                    //onRendered - function to call when the formatter has been rendered
                    try {
                        var value = cell.getValue().toString();
                        //console.log('a',value);
                        //return 'a'+value;
                        if (value.length < 2)
                            return value;
                        if (value.startsWith("[") && value.endsWith("]")) {
                            try {
                                var arr = JSON.parse(value);
                                var row = cell.getRow().getData().Nr;
                                var col = cell.getColumn().getField();
                                var id = col + "_" + row;
                                onRendered(function () {
                                    //window.alert('test');
                                    var table = new tabulator_tables__WEBPACK_IMPORTED_MODULE_0__.Tabulator("#" + id, {
                                        data: arr,
                                        autoColumns: true,
                                        layout: "fitDataFill",
                                        // headerSort: false,
                                        // tooltips: function (cell:Tabulator.CellComponent) {
                                        //     return cell.getColumn().getField() + " - " + JSON.stringify(cell.getValue()); //return cells "field - value";
                                        // }
                                    });
                                });
                                return "<div id='" + id + "'>" + value + "</div>";
                            }
                            catch (err) {
                                return value;
                            }
                        }
                        ;
                    }
                    catch (e) {
                        return value;
                    }
                    return cell.getValue();
                }
            };
        });
    }
    AddStringToFinishGrid() {
        var fullData = [];
        for (var i = 0; i < this.stringsForGrid.length; i++) {
            fullData.push({ Nr: i + 1, Text: this.stringsForGrid[i] });
        }
        //window.alert(fullData.length);
        var allHeaders = ["Nr", "Text"];
        var hs = this.Headers(allHeaders);
        this.hot.setColumns(hs);
        this.hot.replaceData(fullData);
    }
    FinishGrid() {
        if (this.objectsForGrid.length + this.stringsForGrid.length == 0)
            return;
        if (this.objectsForGrid.length > 0) {
            this.AddObjectToFinishGrid();
        }
        else {
            this.AddStringToFinishGrid();
        }
        // this.hot.clearFilter(true);
        this.hot.redraw(true);
    }
    goodNameForKey(key) {
        var ret = key;
        ret = ret.replace(".", "_");
        return ret;
    }
    copyClip() {
        this.hot.copyToClipboard();
    }
    copyCSV() {
        this.hot.download("csv", "data.csv", { bom: true });
    }
}
TabulatorHelper.ɵfac = function TabulatorHelper_Factory(t) { return new (t || TabulatorHelper)(); };
TabulatorHelper.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TabulatorHelper, factory: TabulatorHelper.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 23920:
/*!******************************************************************!*\
  !*** ./src/app/find-saved-blocks/find-saved-blocks.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FindSavedBlocksComponent": () => (/* binding */ FindSavedBlocksComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 44874);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 50635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 26562);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _AppDetails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AppDetails */ 79945);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tabs */ 12379);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/autocomplete */ 43188);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/core */ 88133);















function FindSavedBlocksComponent_mat_option_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const option_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", option_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", option_r7, " ");
  }
}

function FindSavedBlocksComponent_mat_option_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const option_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", option_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", option_r8, " ");
  }
}

function FindSavedBlocksComponent_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FindSavedBlocksComponent_tr_28_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r12);
      const demo_r9 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r11.chooseDemo(demo_r9);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const demo_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    let tmp_2_0;
    let tmp_3_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", i_r10 + 1, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", demo_r9.description, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](demo_r9.categories == null ? null : (tmp_2_0 = demo_r9.categories.split(";")) == null ? null : tmp_2_0.join(", "));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", demo_r9.blocks == null ? null : (tmp_3_0 = demo_r9.blocks.split(";")) == null ? null : tmp_3_0.join(", "), " ");
  }
}

function FindSavedBlocksComponent_button_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FindSavedBlocksComponent_button_31_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r13.Verify();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Verify LocalAPI ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}

function FindSavedBlocksComponent_tr_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FindSavedBlocksComponent_tr_41_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);
      const demo_r15 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return ctx_r17.chooseDemo(demo_r15);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const demo_r15 = ctx.$implicit;
    const i_r16 = ctx.index;
    let tmp_2_0;
    let tmp_3_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", i_r16 + 1, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", demo_r15.description || demo_r15.id, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](demo_r15.categories == null ? null : (tmp_2_0 = demo_r15.categories.split(";")) == null ? null : tmp_2_0.join(", "));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", demo_r15.blocks == null ? null : (tmp_3_0 = demo_r15.blocks.split(";")) == null ? null : tmp_3_0.join(", "), " ");
  }
}

class FindSavedBlocksComponent {
  constructor(dialogRef, DetailsApp) {
    this.dialogRef = dialogRef;
    this.DetailsApp = DetailsApp;
    this.BlocksLocal = [];
    this.demos = [];
    this.demosCategories = new Map();
    this.demosBlocks = new Map();
    this.demosArray = null;
    this.myBlocks = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl();
    this.optionsBlocks = [];
    this.filteredOptionsBlocks = null;
    this.myCategories = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl();
    this.optionsCategories = [];
    this.filteredOptionsCategories = null;
    this.InitiateDemos();
    this.loadFromLocalAPI();
  }

  loadFromLocalAPI() {
    var _a, _b;

    if ((_a = this.DetailsApp.LocalAPI) === null || _a === void 0 ? void 0 : _a.WasAlive) {
      (_b = this.DetailsApp.LocalAPI) === null || _b === void 0 ? void 0 : _b.LoadBlocks().subscribe(it => {
        this.BlocksLocal = it;
      });
    }
  }

  Verify() {
    var _a;

    (_a = this.DetailsApp.LocalAPI) === null || _a === void 0 ? void 0 : _a.IsAlive().subscribe(it => {
      if (it) {
        this.loadFromLocalAPI();
      }
    });
  }

  InitiateDemos() {
    var data = this.DetailsApp.demoBlocks;
    this.demos = data.sort((a, b) => a.description.localeCompare(b.description));
    this.optionsCategories = [...new Set(data.map(it => it.categories).filter(it => (it === null || it === void 0 ? void 0 : it.length) > 0).flatMap(it => it.split(';')).filter(it => (it === null || it === void 0 ? void 0 : it.length) > 0).sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())))];
    this.optionsBlocks = [...new Set(data.map(it => it.blocks).filter(it => (it === null || it === void 0 ? void 0 : it.length) > 0).flatMap(it => it.split(';')).filter(it => (it === null || it === void 0 ? void 0 : it.length) > 0).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))];
    ;
    this.filteredOptionsBlocks = this.myBlocks.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.startWith)(''), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(value => {
      var val = (value || '').trim();
      return this._filter(val, this.optionsBlocks);
    }));
    this.filteredOptionsCategories = this.myCategories.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.startWith)(''), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(value => {
      var val = (value || '').trim();
      return this._filter(val, this.optionsCategories);
    })); // console.log('x',this.demos);

    this.demosArray = (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.combineLatest)([this.myBlocks.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.startWith)('')), this.myCategories.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.startWith)(''))]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.startWith)(this.demos), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(([block, category]) => {
      if (Array.isArray(block) || typeof block === 'object') block = '';
      if (Array.isArray(category) || typeof category === 'object') category = '';
      block = (block || '').trim().toLowerCase();
      category = (category || '').trim().toLowerCase(); // console.log('search for ',block,category);

      var ret = this.demos.filter(it => {
        var _a, _b;

        return (block.length == 0 || ((_a = it.blocks) === null || _a === void 0 ? void 0 : _a.toLowerCase().indexOf(block)) > -1) && (category.length == 0 || ((_b = it.categories) === null || _b === void 0 ? void 0 : _b.toLowerCase().indexOf(category)) > -1);
      }); // console.log('ret',ret);

      return ret;
    }));
  }

  ngOnInit() {}

  _filter(value, arrToFilter) {
    const filterValue = value.toLowerCase();

    if (filterValue.length == 0) {
      return arrToFilter;
    }

    return arrToFilter.filter(option => option.toLowerCase().includes(filterValue));
  }

  chooseDemo(demo) {
    return this.dialogRef.close(demo);
  }

  Close() {
    this.dialogRef.close();
  }

}

FindSavedBlocksComponent.ɵfac = function FindSavedBlocksComponent_Factory(t) {
  return new (t || FindSavedBlocksComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_AppDetails__WEBPACK_IMPORTED_MODULE_0__.AppDetails));
};

FindSavedBlocksComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: FindSavedBlocksComponent,
  selectors: [["app-find-saved-blocks"]],
  decls: 48,
  vars: 15,
  consts: [["label", "Demos"], [1, "example-form"], ["appearance", "fill", 1, "example-full-width"], ["type", "text", "placeholder", "Pick one", "aria-label", "Categories", "matInput", "", 3, "formControl", "matAutocomplete"], ["autoCategories", "matAutocomplete"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "placeholder", "Pick one", "aria-label", "Blocks", "matInput", "", 3, "formControl", "matAutocomplete"], ["autoBlocks", "matAutocomplete"], [4, "ngFor", "ngForOf"], ["label", "Saved on local"], ["mat-raised-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["label", "CLOUD", "disabled", "disabled"], ["mat-raised-button", "", "id", "blocks", "color", "accent", 3, "click"], [3, "value"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
  template: function FindSavedBlocksComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-tab-group");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-tab", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "form", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-form-field", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Categories");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-autocomplete", null, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, FindSavedBlocksComponent_mat_option_9_Template, 2, 2, "mat-option", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-form-field", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Blocks");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-autocomplete", null, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, FindSavedBlocksComponent_mat_option_17_Template, 2, 2, "mat-option", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](18, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "table");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "thead");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Number");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Details");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, FindSavedBlocksComponent_tr_28_Template, 10, 4, "tr", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](29, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "mat-tab", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, FindSavedBlocksComponent_button_31_Template, 4, 0, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "table");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "thead");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Number");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "Details");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](41, FindSavedBlocksComponent_tr_41_Template, 10, 4, "tr", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "mat-tab", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, " Saved on Cloud ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FindSavedBlocksComponent_Template_button_click_44_listener() {
        return ctx.Close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](46, "close");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, " Close\n");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](8);

      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](16);

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.myCategories)("matAutocomplete", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](10, 9, ctx.filteredOptionsCategories));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.myBlocks)("matAutocomplete", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](18, 11, ctx.filteredOptionsBlocks));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](29, 13, ctx.demosArray));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !(ctx.DetailsApp.LocalAPI == null ? null : ctx.DetailsApp.LocalAPI.WasAlive));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.BlocksLocal);
    }
  },
  directives: [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTabGroup, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTab, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgForm, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__.MatAutocompleteTrigger, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_10__.MatAutocomplete, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatOption],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe],
  styles: ["table[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n    border: 1px solid;\n}\n\ntable[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 480px;\n    margin: 0 auto;\n    display: block;\n    overflow-x: auto;\n    border-spacing: 0;\n}\n\ntbody[_ngcontent-%COMP%] {\n    white-space: nowrap;\n}\n\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n    padding: 5px 10px;\n    border-top-width: 0;\n    border-left-width: 0;\n}\n\nth[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 0;\n    background: #fff;\n    vertical-align: bottom;\n}\n\nth[_ngcontent-%COMP%]:last-child, td[_ngcontent-%COMP%]:last-child {\n    border-right-width: 0;\n}\n\ntr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n    border-bottom-width: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbmQtc2F2ZWQtYmxvY2tzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztJQUdJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2IsY0FBYztJQUNkLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBOztJQUVJLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLE1BQU07SUFDTixnQkFBZ0I7SUFDaEIsc0JBQXNCO0FBQzFCOztBQUVBOztJQUVJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQiIsImZpbGUiOiJmaW5kLXNhdmVkLWJsb2Nrcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUsXG50aCxcbnRkIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcbn1cblxudGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDgwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICBib3JkZXItc3BhY2luZzogMDtcbn1cblxudGJvZHkge1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbnRoLFxudGQge1xuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgIGJvcmRlci10b3Atd2lkdGg6IDA7XG4gICAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7XG59XG5cbnRoIHtcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgIHRvcDogMDtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG59XG5cbnRoOmxhc3QtY2hpbGQsXG50ZDpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XG59XG5cbnRyOmxhc3QtY2hpbGQgdGQge1xuICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XG59Il19 */"]
});

/***/ }),

/***/ 16335:
/*!********************************************!*\
  !*** ./src/app/load-show-usage.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadShowUsageService": () => (/* binding */ LoadShowUsageService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 10745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 50635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 19337);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 28784);




class LoadShowUsageService {
    constructor(http) {
        this.http = http;
    }
    getDemoBlocks() {
        var dt = new Date().toISOString();
        return this.http.get(`assets/showUsage/demoBlocks/all.txt?${dt}`, { responseType: 'text' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.map)((res) => {
            var r = res;
            // console.log(r);
            var d = JSON.parse(res);
            return d;
        }));
    }
    getCustomCategories() {
        var dt = new Date().toISOString();
        return this.http.get(`assets/loadAtStartup/customCategories.txt?${dt}`, { responseType: 'text' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.map)(res => res.toString()));
    }
    getSwaggerLinks() {
        var dt = new Date().toISOString();
        return this.http.get(`assets/loadAtStartup/swaggers.json?${dt}`, { responseType: 'text' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.map)((res) => {
            var r = res;
            // console.log(r);
            var d = JSON.parse(res);
            return d;
        }));
    }
    getDemoBlock(id) {
        var dt = new Date().toISOString();
        var q = this.http.get(`assets/showUsage/demoBlocks/${id}.txt?${dt}`, { responseType: 'text' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.tap)((res) => {
            // console.log(res);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.map)((res) => {
            return res.toString();
        }));
        return q;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)("andrei");
    }
}
LoadShowUsageService.ɵfac = function LoadShowUsageService_Factory(t) { return new (t || LoadShowUsageService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient)); };
LoadShowUsageService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: LoadShowUsageService, factory: LoadShowUsageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 35582:
/*!**********************************************************!*\
  !*** ./src/app/primary-navig/primary-navig.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrimaryNavigComponent": () => (/* binding */ PrimaryNavigComponent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/layout */ 39910);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 50635);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 89196);
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Settings */ 14095);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _AppDetails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AppDetails */ 79945);
/* harmony import */ var _TransmitAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TransmitAction */ 68260);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sidenav */ 7216);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 19946);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/divider */ 19975);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/expansion */ 12928);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/menu */ 82796);


















const _c0 = function (a3) {
  return ["/", "automation", "loadexample", a3];
};

function PrimaryNavigComponent_a_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " https ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const nr_r6 = ctx.index;
    const demo_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](3, _c0, demo_r7.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" ", nr_r6 + 1, " ", demo_r7.description, "");
  }
}

function PrimaryNavigComponent_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PrimaryNavigComponent_button_27_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2);

      return _r0.toggle();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}

function PrimaryNavigComponent_span_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" ", ctx_r4.version, " => ", ctx_r4.latestVersion, " ");
  }
}

const _c1 = function () {
  return ["/", "automation", "studio"];
};

const _c2 = function () {
  return ["/", "automation", "main"];
};

class PrimaryNavigComponent {
  constructor(breakpointObserver, details, ta) {
    this.breakpointObserver = breakpointObserver;
    this.details = details;
    this.ta = ta;
    this.demoBlocks = [];
    this.isHandset$ = this.breakpointObserver.observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.Breakpoints.Handset).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(result => result.matches || true), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.shareReplay)());
    this.version = _Settings__WEBPACK_IMPORTED_MODULE_0__.Settings.version;
    this.latestVersion = '';
    this.title = "Blockly Automation";
    this.footer = '';
    this.standalone = false;
  }

  ngOnInit() {
    var _a, _b, _c, _d, _e;

    this.latestVersion = (_a = this.details.settings) === null || _a === void 0 ? void 0 : _a.latestVersion;
    this.demoBlocks = this.details.demoBlocks.sort((a, b) => a.description.localeCompare(b.description));
    this.title = ((_c = (_b = this.details) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c.title) || 'Blockly Automation';
    this.footer = ((_e = (_d = this.details) === null || _d === void 0 ? void 0 : _d.settings) === null || _e === void 0 ? void 0 : _e.footer) || '';

    if (navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
      this.standalone = true;
    }
  }

  executeOnDisplayBlockly(func) {
    this.ta.sendDataToServer('DisplayBlocklyComponent', func);
  }

}

PrimaryNavigComponent.ɵfac = function PrimaryNavigComponent_Factory(t) {
  return new (t || PrimaryNavigComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_AppDetails__WEBPACK_IMPORTED_MODULE_1__.AppDetails), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_TransmitAction__WEBPACK_IMPORTED_MODULE_2__.TransmitAction));
};

PrimaryNavigComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: PrimaryNavigComponent,
  selectors: [["app-primary-navig"]],
  decls: 80,
  vars: 27,
  consts: [[1, "sidenav-container"], ["fixedInViewport", "", 1, "sidenav", 3, "mode", "opened"], ["drawer", ""], ["mat-list-item", "", "routerLink", "/"], ["mat-list-item", "", "href", "https://github.com/ignatandrei/BlocklyAutomation", "target", "_blank"], ["mat-list-item", "", "href", "https://ignatandrei.github.io/BlocklyAutomation", "target", "_blank"], ["mat-list-item", "", "target", "_blank", 3, "routerLink", 4, "ngFor", "ngForOf"], ["color", "primary", 1, "nav-bar"], ["type", "button", "aria-label", "Toggle sidenav", "mat-icon-button", "", 3, "click", 4, "ngIf"], [3, "title"], [1, "example-spacer"], ["mat-mini-fab", "", "color", "primary", 3, "click"], ["id", "download", "mat-button", "", 3, "matMenuTriggerFor"], ["download", "matMenu"], ["mat-list-item", "", 4, "ngIf"], ["mat-list-item", "", "href", "https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseBlocklyAutomation.zip/", "target", "_blank"], ["mat-list-item", "", "href", "https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseLin.zip/", "target", "_blank"], ["mat-list-item", "", "href", "https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseWin.zip/", "target", "_blank"], ["mat-list-item", "", "href", "https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseIISWin.zip/", "target", "_blank"], ["mat-list-item", "", "href", "https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseLocalAPI.zip/", "target", "_blank"], ["mat-button", "", 3, "matMenuTriggerFor"], ["examples", "matMenu"], ["mat-list-item", "", "target", "_blank", 3, "routerLink"], [1, "main-content"], ["type", "button", "aria-label", "Toggle sidenav", "mat-icon-button", "", 3, "click"], ["aria-label", "Side nav toggle icon"], ["mat-list-item", ""]],
  template: function PrimaryNavigComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-sidenav-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-sidenav", 1, 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-toolbar");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "a", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Menu");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "mat-nav-list");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, " source ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " Github");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "mat-divider");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " https ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, " Demo online");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](19, "mat-divider");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "mat-expansion-panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "mat-expansion-panel-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "mat-panel-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, PrimaryNavigComponent_a_24_Template, 4, 5, "a", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "mat-sidenav-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "mat-toolbar", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](27, PrimaryNavigComponent_button_27_Template, 3, 0, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](28, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](31, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PrimaryNavigComponent_Template_button_click_32_listener() {
        return ctx.executeOnDisplayBlockly("createIntro");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, " help_outline ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, " file_download ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "mat-menu", null, 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, PrimaryNavigComponent_span_40_Template, 2, 2, "span", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "a", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](42, " Download HTML");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "a", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, " Download Linux");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "a", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](46, " Download Windows");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "a", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, " Download IIS");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "a", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, " Download LocalAPI");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "button", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53, " source ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "mat-menu", null, 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "a", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, " star ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](59, "Studio ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](60, "a", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62, " star_half ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](63, "Single ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](64, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, " source ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](67, " Github");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](68, "mat-divider");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](71, " https ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, " Demo online");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](74, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "footer");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](76, "small");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](77);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](78, "small");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](79);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](39);

      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](55);

      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("mode", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](4, 19, ctx.isHandset$) ? "over" : "side")("opened", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 21, ctx.isHandset$) === false);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("role", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 17, ctx.isHandset$) ? "dialog" : "navigation");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Demos ", ctx.demoBlocks.length, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.demoBlocks);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](28, 23, ctx.isHandset$));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("title", ctx.version);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matMenuTriggerFor", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.version != ctx.latestVersion);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matMenuTriggerFor", _r5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](25, _c1));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](26, _c2));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.footer);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate3"]("", ctx.standalone ? "standalone" : "browser", " ", ctx.version, " -> ", ctx.latestVersion, "");
    }
  },
  directives: [_angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatSidenavContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatSidenav, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbar, _angular_material_list__WEBPACK_IMPORTED_MODULE_9__.MatListItem, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLinkWithHref, _angular_material_list__WEBPACK_IMPORTED_MODULE_9__.MatNavList, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__.MatDivider, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_13__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_13__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_13__.MatExpansionPanelTitle, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_7__.MatSidenavContent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButton, _angular_material_menu__WEBPACK_IMPORTED_MODULE_16__.MatMenuTrigger, _angular_material_menu__WEBPACK_IMPORTED_MODULE_16__.MatMenu, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterOutlet],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe],
  styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n\n.sidenav-container[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.sidenav[_ngcontent-%COMP%] {\n  width: 200px;\n}\n\n.sidenav[_ngcontent-%COMP%]   .mat-toolbar[_ngcontent-%COMP%] {\n  background: inherit;\n}\n\n.mat-toolbar.mat-primary[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n\n.example-spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.main-content[_ngcontent-%COMP%] {\n  height: 97%;\n  width: 100%;\n}\n\n.nav-bar[_ngcontent-%COMP%] {\n  height: 3%;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaW1hcnktbmF2aWcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFRSxZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLE1BQU07RUFDTixVQUFVO0FBQ1o7O0FBQ0E7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFVBQVU7RUFDVixXQUFXO0FBQ2IiLCJmaWxlIjoicHJpbWFyeS1uYXZpZy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaHRtbCxcbmJvZHkge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uc2lkZW5hdi1jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5zaWRlbmF2IHtcbiAgd2lkdGg6IDIwMHB4O1xufVxuXG4uc2lkZW5hdiAubWF0LXRvb2xiYXIge1xuICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xufVxuXG4ubWF0LXRvb2xiYXIubWF0LXByaW1hcnkge1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICB0b3A6IDA7XG4gIHotaW5kZXg6IDE7XG59XG4uZXhhbXBsZS1zcGFjZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cblxuLm1haW4tY29udGVudCB7XG4gIGhlaWdodDogOTclO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLm5hdi1iYXIge1xuICBoZWlnaHQ6IDMlO1xuICB3aWR0aDogMTAwJTtcbn1cbiJdfQ== */"]
});

/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
/* harmony import */ var zone_js_plugins_zone_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js/plugins/zone-error */ 15856);
/* harmony import */ var zone_js_plugins_zone_error__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_plugins_zone_error__WEBPACK_IMPORTED_MODULE_0__);
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 // Included with Angular CLI.


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 92340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ }),

/***/ 75774:
/*!**********************************!*\
  !*** ../BlocklyHelpers/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// exports.printMsg = function() {
//     window.alert("This is a message from the demo package");
//   }

// exports.filter1={
//   "asd":"asdasd"
// }

module.exports = {
  
  interpreterHelper: __webpack_require__(/*! ./interpreterHelper */ 61079),
  saveBlocksUrl: __webpack_require__(/*! ./saveBlocksUrl */ 65562),
  saveLoad: __webpack_require__(/*! ./saveLoad */ 57672),

};

/***/ }),

/***/ 61079:
/*!**********************************************!*\
  !*** ../BlocklyHelpers/interpreterHelper.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const synthPiano = __webpack_require__(/*! ./js/audioTest.js */ 99765);

const vex = __webpack_require__(/*! vex-js */ 77249);

vex.registerPlugin(__webpack_require__(/*! vex-dialog */ 22853));

exports.createInterpreter = function (workspace, BlocklyJavaScript) {
  return {
    latestCode: '',
    workspace: workspace,
    BlocklyJavaScript: BlocklyJavaScript,
    step: 0,
    highlightPause: false,
    myInterpreter: null,
    runner: null,
    generateCodeAndLoadIntoInterpreter: function () {
      // Generate BlocklyJavaScript code and parse it.
      this.BlocklyJavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      this.BlocklyJavaScript.addReservedWords('highlightBlock');
      this.latestCode = this.BlocklyJavaScript.workspaceToCode(workspace); //window.alert(this.latestCode);

      this.resetStepUi(true);
    },
    resetStepUi: function (clearOutput) {
      // Reset the UI to the start of the program.
      this.step = 0;
      this.workspace.highlightBlock(null);
      this.highlightPause = false;
    },
    resetInterpreter: function () {
      this.myInterpreter = null;

      if (this.runner) {
        window.clearTimeout(this.runner);
        this.runner = null;
      }
    },
    // runnerThis : function (callBackProgramComplete) {
    //     if (this.myInterpreter) {
    //         var hasMore = this.myInterpreter.run();
    //         if (hasMore) {
    //             // Execution is currently blocked by some async call.
    //             // Try again later.
    //             setTimeout(this.runner, 10);
    //         } else {
    //           if(callBackProgramComplete)
    //             callBackProgramComplete();
    //             else
    //             console.log('\n\n<< Program complete! >>');
    //             //FinishGrid();
    //             this.resetInterpreter();
    //             this.resetStepUi(false);
    //         }
    //     }
    // },
    highlightBlock: function (id) {
      this.workspace.highlightBlock(id);
      highlightPause = true;
    },
    nextStep: function (self, callBackProgramComplete) {
      console.log('next step');

      if (self.myInterpreter.step()) {
        // var s1=self;
        // var s2= callBackProgramComplete;
        // console.log('s1',s1);
        setTimeout((a, b) => {
          a.nextStep(a, b);
        }, 10, self, callBackProgramComplete);
      } else {
        if (callBackProgramComplete) callBackProgramComplete();else console.log('\n\n<< Program complete >>');
        self.resetInterpreter();
        self.resetStepUi(false);
      }
    },
    runCode: function (newInterpreterConstructor, callBackData, callBackProgramComplete, code) {
      // console.log('z',code);
      if (code == '') {
        code = this.latestCode;
      }

      if (!this.myInterpreter) {
        // First statement of this code.
        // Clear the program output.
        this.resetStepUi(true);
      }

      this.generateCodeAndLoadIntoInterpreter();
      var self = this;
      self.myInterpreter = newInterpreterConstructor(code, (G, I) => self.initApiJS(G, I, self, callBackData, callBackProgramComplete));

      if (window["runOneByOne"] == 1) {
        this.nextStep(self, callBackProgramComplete);
        return;
      }

      setTimeout(function () {
        this.highlightPause = false; // console.log(self.latestCode);
        // console.log(self.BlocklyJavaScript);

        self.runner = function () {
          if (self.myInterpreter) {
            // debugger;
            var hasMore = self.myInterpreter.run();

            if (hasMore) {
              // Execution is currently blocked by some async call.
              // Try again later.
              setTimeout(self.runner, 10);
            } else {
              if (callBackProgramComplete) callBackProgramComplete();else console.log('\n\n<< Program complete >>');
              self.resetInterpreter();
              self.resetStepUi(false);
            }
          }
        };

        if (self.runner) self.runner();
      }, 100);
    },
    initInterpreterWaitForSeconds: function (interpreter, globalObject) {
      // Ensure function name does not conflict with variable names.
      this.BlocklyJavaScript.addReservedWords('waitForSeconds');
      var wrapper = interpreter.createAsyncFunction(function (timeInSeconds, callback) {
        // Delay the call to the callback.
        setTimeout(callback, timeInSeconds * 1000);
      });
      interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);
    },
    getCreds: function (interpreter, withCredsForDomain, href) {
      var creds = interpreter.pseudoToNative(withCredsForDomain);
      var hostname = '(localSite)';

      if (href.startsWith('http://') || href.startsWith('https://')) {
        hostname = new URL(href).hostname;
      }

      var withCreds = false;

      if (hostname in creds) {
        withCreds = creds[hostname];
      } else if ("*" in creds) {
        withCreds = creds["*"];
      }

      return withCreds;
    },
    getHeaders: function (interpreter, headersForDomain, href) {
      var heads = interpreter.pseudoToNative(headersForDomain);
      var hostname = '(localSite)';

      if (href.startsWith('http://') || href.startsWith('https://')) {
        hostname = new URL(href).hostname;
      }

      var arrHeaders = []; // console.log("heads2",heads);

      if (hostname in heads) {
        arrHeaders = heads[hostname];
      } else if ("*" in heads) {
        arrHeaders = heads["*"];
      }

      return arrHeaders;
    },
    doGet: function (href, callback, headers, withCreds) {
      // console.log(href, callback);
      let req = new XMLHttpRequest();
      req.open('GET', href, true);
      this.generateDataAndCreds(req, headers, withCreds, false);

      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status >= 200 && req.status < 300) {
            var answer = JSON.stringify({
              'origHref': href,
              'objectToSend': '',
              'status': req.status,
              'statusOK': true,
              'text': req.responseText
            });
            return callback(answer);
          } else {
            var answer = JSON.stringify({
              'origHref': href,
              'objectToSend': '',
              'status': req.status,
              'statusOK': false,
              'text': req.responseText,
              'headers': req.getAllResponseHeaders()
            });
            return callback(answer);
          }
        } else {//window.alert(`error ${href} ${req.status}`);
        }
      };

      req.send(null);
    },
    exportToFile: function (nameFile, content, toByte) {
      // try {
      //     var isFileSaverSupported = !!new Blob;
      // } catch (e) {
      //     window.alert('file saving not supported');
      //     return;
      // }
      var FileSaver = __webpack_require__(/*! file-saver */ 75536);

      var blob;

      if (toByte) {
        blob = this.b64toBlob(content);
      } else {
        blob = new Blob([content], {
          type: "text/plain;charset=utf-8"
        });
      }

      FileSaver.saveAs(blob, nameFile);
      return nameFile;
    },
    b64toBlob: function (b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, {
        type: contentType
      });
      return blob;
    },
    displayDateCurrentAsHuman: function () {
      //undefined - get the date format form user browser.
      let today = new Date().toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      return today;
    },
    displayDateCurrentAsIso: function () {
      let today = new Date().toISOString();
      return today;
    },
    displayDateCurrentAsUnix: function () {
      return Date.now();
    },
    displayDateFormatted: function (format) {
      switch (format) {
        case 'human':
          // console.log("calling displayDateCurrentAsHuman")
          return this.displayDateCurrentAsHuman();
          break;

        case 'iso':
          //console.log("calling displayDateCurrentAsIso")
          return this.displayDateCurrentAsIso();
          break;

        case 'unix':
          // console.log("calling displayDateCurrentAsUnix")
          return this.displayDateCurrentAsUnix();
          break;

        default:
          console.log('Date time format not suported');
      }
    },

    generateDataAndCreds(req, headers, withCreds, hasSomethingToSend) {
      //read https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header
      if (withCreds) req.withCredentials = withCreds;else {
        var hasContentType = false; // 

        if (headers && headers.length > 0) {
          //alert(JSON.stringify(headers));
          for (var iHeader = 0; iHeader < headers.length; iHeader++) {
            var head = headers[iHeader];

            if (head.name == "Content-Type") {
              hasContentType = true;
            }

            req.setRequestHeader(head.name, head.value);
          }
        }

        ;

        if (hasSomethingToSend && !hasContentType) {
          req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
      }
    },

    doPut: (href, objectToPost, callback, headers, withCreds) => {
      let data = objectToPost; //console.log(`sending ${data}`);

      let req = new XMLHttpRequest();
      req.open('PUT', href, true);
      this.generateDataAndCreds(req, headers, withCreds, objectToPost ? true : false);

      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status >= 200 && req.status < 300) {
            var answer = JSON.stringify({
              'origHref': href,
              'objectToSend': objectToPost,
              'status': req.status,
              'statusOK': true,
              'text': req.responseText
            });
            return callback(answer);
          } else {
            var answer = JSON.stringify({
              'origHref': href,
              'objectToSend': objectToPost,
              'status': req.status,
              'statusOK': false,
              'text': req.responseText,
              'objectToSend': objectToPost,
              'headers': req.getAllResponseHeaders()
            });
            return callback(answer);
          }
        } else {//window.alert(`error ${href} ${req.status}`);
        }
      };

      req.send(data);
    },
    doDelete: function (href, objectToDelete, callback, headers, withCreds) {
      let data = objectToDelete;
      var req = new XMLHttpRequest();
      req.open('DELETE', href, true); //req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      this.generateDataAndCreds(req, headers, withCreds, objectToDelete ? true : false);

      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status >= 200 && req.status < 300) {
            var answer = JSON.stringify({
              'origHref': href,
              'objectToSend': '',
              'status': req.status,
              'statusOK': true,
              'text': req.responseText
            });
            return callback(answer);
          } else {
            var answer = JSON.stringify({
              'origHref': href,
              'objectToSend': '',
              'status': req.status,
              'statusOK': false,
              'text': req.responseText,
              'objectToSend': objectToDelete,
              'headers': req.getAllResponseHeaders()
            });
            return callback(answer);
          }
        } else {//window.alert(`error ${href} ${req.status}`);
        }
      };

      req.send(data);
    },
    doPost: function (href, objectToPost, callback, headers, withCreds) {
      let data = objectToPost; // console.log(`sending `, data);

      let req = new XMLHttpRequest();
      req.open('POST', href, true);
      this.generateDataAndCreds(req, headers, withCreds, objectToPost ? true : false); //req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status >= 200 && req.status < 300) {
            var answer = JSON.stringify({
              'origHref': href,
              'objectToSend': objectToPost,
              'status': req.status,
              'statusOK': true,
              'text': req.responseText
            });
            return callback(answer);
          } else {
            // console.log('x_',req);
            var answer = JSON.stringify({
              'origHref': href,
              'objectToSend': objectToPost,
              'status': req.status,
              'statusOK': false,
              'text': req.responseText,
              'objectToSend': objectToPost,
              'headers': req.getAllResponseHeaders()
            });
            return callback(answer);
          }
        } else {//window.alert(`error ${href} ${req.status}`);
        }
      };

      req.send(data);
    },
    initApiJS: function (interpreter, globalObject, thisClass, callBackData, callBackProgramComplete) {
      var wrapper = item => {
        if (callBackData) callBackData('\n error --' + '\n' + item + '\n error --');else console.log(item);
      };

      interpreter.setProperty(globalObject, 'errHandler', interpreter.createNativeFunction(wrapper));
      var withCredsForDomain = interpreter.nativeToPseudo({
        '(localSite)': false
      });
      interpreter.setProperty(globalObject, 'withCredsForDomain', withCredsForDomain);
      var headersForDomain = interpreter.nativeToPseudo({
        '(localSite)': []
      });
      interpreter.setProperty(globalObject, 'headersForDomain', headersForDomain);

      var wrapper = function (text) {
        text = text ? text.toString() : '';
        window.alert(text);
      };

      interpreter.setProperty(globalObject, 'alert1', interpreter.createNativeFunction(wrapper));

      var wrapper = function (note, octave, duration) {
        var piano = synthPiano.Synth.createInstrument('piano');
        piano.play(note, octave, duration); //window.alert(text);
      };

      interpreter.setProperty(globalObject, 'playPiano', interpreter.createNativeFunction(wrapper));

      var wrapper = function (msg, id, item) {
        thisClass.highlightBlock(id);
        debugger;
        console.log(msg, id, item);
      };

      interpreter.setProperty(globalObject, 'startDebugger', interpreter.createNativeFunction(wrapper)); // Add an API function for the alert() block, generated for "text_print" blocks.

      var wrapper = function (text) {
        text = text ? text.toString() : ''; //outputArea.value = outputArea.value + '\n' + text;

        if (callBackData) callBackData(text);else console.log(text);
      };

      interpreter.setProperty(globalObject, 'alert', interpreter.createNativeFunction(wrapper));

      var wrapper = (nr, callback) => {
        console.log(`waiting seconds ${nr}`);
        setTimeout(callback, nr * 1000);
      };

      interpreter.setProperty(globalObject, 'waitTime', interpreter.createAsyncFunction(wrapper));

      var wrapper = it => thisClass.displayDateFormatted(it);

      interpreter.setProperty(globalObject, 'displayDateFormatted', interpreter.createNativeFunction(wrapper));

      var wrapper = (it, content, toByte) => thisClass.exportToFile(it, content, toByte);

      interpreter.setProperty(globalObject, 'exportToFile', interpreter.createNativeFunction(wrapper));

      var wrapper = arrayOrString => {
        let arr = typeof arrayOrString != 'object' ? JSON.parse(arrayOrString) : {};
        arr = [Object.keys(arr[0])].concat(arr);
        var data = arr.map(it => {
          return Object.values(it).toString();
        }).join('\n');
        return data;
      };

      interpreter.setProperty(globalObject, 'convertToCSV', interpreter.createNativeFunction(wrapper));

      var wrapper = function (text) {
        window.open(text, '_blank');
      };

      interpreter.setProperty(globalObject, 'open', interpreter.createNativeFunction(wrapper));

      var wrapper = function (url, hostname) {
        hostname = hostname ? hostname.toString() : '';
        hostname = hostname.trim();

        if (hostname.length == 0) {
          return url;
        }

        url = url ? url : '';
        url = url.trim();

        if (url.length == 0) {
          url = hostname;

          if (!url.startsWith("http")) {
            throw `please put in front of ${hostname} http:// or https://`;
          }
        }

        var url = new URL(url); //console.log(`url ${url.hostname} to ${hostname}`);

        url.hostname = hostname.replace('https://', '').replace('http://', ''); //console.log(`url ${url.href}`);

        var ret = url.href;
        if (ret.endsWith('/')) ret = ret.substring(0, ret.length - 1);
        return ret;
      };

      interpreter.setProperty(globalObject, 'changeHost', interpreter.createNativeFunction(wrapper));

      var wrapper = function (url, port) {
        var url = new URL(url);
        console.log(`url ${url.href}`);
        url.port = port;
        console.log(`url ${url.href}`);
        var ret = url.href;
        if (ret.endsWith('/')) ret = ret.substring(0, ret.length - 1);
        return ret;
      };

      interpreter.setProperty(globalObject, 'changePort', interpreter.createNativeFunction(wrapper)); //speak

      var wrapper = function (text, voice, rate, pitch, volume) {
        var msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
      };

      interpreter.setProperty(globalObject, 'speakDefault', interpreter.createNativeFunction(wrapper)); //speak
      // Add an API function for the prompt() block.
      // var wrapper = function(text) {
      //   text = text ? text.toString() : '';
      //   return interpreter.createPrimitive(prompt(text));
      // };
      // interpreter.setProperty(globalObject, 'prompt',
      //     interpreter.createNativeFunction(wrapper));

      var wrapper = interpreter.createAsyncFunction(function (text, callback) {
        vex.defaultOptions.className = 'vex-theme-os';
        text = text ? text.toString() : '';
        return vex.dialog.prompt({
          message: text,
          callback: callback
        });
      });
      interpreter.setProperty(globalObject, 'prompt', wrapper); // Add an API for the wait block.  See wait_block.js
      // this.initInterpreterWaitForSeconds(interpreter, globalObject);

      thisClass.BlocklyJavaScript.addReservedWords('waitForSeconds');
      var wrapper = interpreter.createAsyncFunction(function (timeInSeconds, callback) {
        // Delay the call to the callback.
        setTimeout(callback, timeInSeconds * 1000);
      });
      interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);

      var wrapper = (href, callback) => {
        var arrHeaders = thisClass.getHeaders(interpreter, headersForDomain, href);
        var withCreds = thisClass.getCreds(interpreter, withCredsForDomain, href);
        return thisClass.doGet(href, callback, arrHeaders, withCreds);
      };

      interpreter.setProperty(globalObject, 'getXhr', interpreter.createAsyncFunction(wrapper));

      var wrapper = (href, objectToPost, callback) => {
        try {
          var arrHeaders = thisClass.getHeaders(interpreter, headersForDomain, href);
          var withCreds = thisClass.getCreds(interpreter, withCredsForDomain, href);
          thisClass.doPost(href, objectToPost, callback, arrHeaders, withCreds);
        } catch (e) {
          alert("is an error" + e);
        }
      };

      interpreter.setProperty(globalObject, 'postXhr', interpreter.createAsyncFunction(wrapper));

      var wrapper = (href, objectToDelete, callback) => {
        try {
          var arrHeaders = thisClass.getHeaders(interpreter, headersForDomain, href);
          var withCreds = thisClass.getCreds(interpreter, withCredsForDomain, href);
          thisClass.doDelete(href, objectToDelete, callback, arrHeaders, withCreds);
        } catch (e) {
          alert("is an error" + e);
        }
      };

      interpreter.setProperty(globalObject, 'deleteXhr', interpreter.createAsyncFunction(wrapper));

      var wrapper = (href, objectToPost, callback) => {
        try {
          var heads = interpreter.pseudoToNative(headersForDomain);
          var hostname = '(localSite)';

          if (href.startsWith('http://') || href.startsWith('https://')) {
            hostname = new URL(href).hostname;
          }

          var arrHeaders = [];

          if (hostname in heads) {
            arrHeaders = heads[hostname];
          }

          var withCreds = false; // if (hostname in creds) {
          //     withCreds = creds[hostname];
          // }

          thisClass.doPut(href, objectToPost, callback, arrHeaders, withCreds);
        } catch (e) {
          alert("is an error" + e);
        }
      };

      interpreter.setProperty(globalObject, 'putXhr', interpreter.createAsyncFunction(wrapper)); // Add an API function for highlighting blocks.

      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(thisClass.highlightBlock(id));
      };

      interpreter.setProperty(globalObject, 'highlightBlock', interpreter.createNativeFunction(wrapper));
    }
  };
};

/***/ }),

/***/ 99765:
/*!*****************************************!*\
  !*** ../BlocklyHelpers/js/audioTest.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Synth": () => (/* binding */ Synth)
/* harmony export */ });
var Synth, AudioSynth, AudioSynthInstrument;
!function(){

	var URL = window.URL || window.webkitURL;
	var Blob = window.Blob;

	if(!URL || !Blob) {
		throw new Error('This browser does not support AudioSynth');
	}

	var _encapsulated = false;
	var AudioSynthInstance = null;
	var pack = function(c,arg){ return [new Uint8Array([arg, arg >> 8]), new Uint8Array([arg, arg >> 8, arg >> 16, arg >> 24])][c]; };
	var setPrivateVar = function(n,v,w,e){Object.defineProperty(this,n,{value:v,writable:!!w,enumerable:!!e});};
	var setPublicVar = function(n,v,w){setPrivateVar.call(this,n,v,w,true);};
	AudioSynthInstrument = function AudioSynthInstrument(){this.__init__.apply(this,arguments);};
	var setPriv = setPrivateVar.bind(AudioSynthInstrument.prototype);
	var setPub = setPublicVar.bind(AudioSynthInstrument.prototype);
	setPriv('__init__', function(a,b,c) {
		if(!_encapsulated) { throw new Error('AudioSynthInstrument can only be instantiated from the createInstrument method of the AudioSynth object.'); }
		setPrivateVar.call(this, '_parent', a);
		setPublicVar.call(this, 'name', b);
		setPrivateVar.call(this, '_soundID', c);
	});
	setPub('play', function(note, octave, duration) {
		return this._parent.play(this._soundID, note, octave, duration);
	});
	setPub('generate', function(note, octave, duration) {
		return this._parent.generate(this._soundID, note, octave, duration);
	});
	AudioSynth = function AudioSynth(){if(AudioSynthInstance instanceof AudioSynth){return AudioSynthInstance;}else{ this.__init__(); return this; }};
	setPriv = setPrivateVar.bind(AudioSynth.prototype);
	setPub = setPublicVar.bind(AudioSynth.prototype);
	setPriv('_debug',false,true);
	setPriv('_bitsPerSample',16);
	setPriv('_channels',1);
	setPriv('_sampleRate',44100,true);
	setPub('setSampleRate', function(v) {
		this._sampleRate = Math.max(Math.min(v|0,44100), 4000);
		this._clearCache();
		return this._sampleRate;
	});
	setPub('getSampleRate', function() { return this._sampleRate; });
	setPriv('_volume',32768,true);
	setPub('setVolume', function(v) {
		v = parseFloat(v); if(isNaN(v)) { v = 0; }
		v = Math.round(v*32768);
		this._volume = Math.max(Math.min(v|0,32768), 0);
		this._clearCache();
		return this._volume;
	});
	setPub('getVolume', function() { return Math.round(this._volume/32768*10000)/10000; });
	setPriv('_notes',{'C':261.63,'C#':277.18,'D':293.66,'D#':311.13,'E':329.63,'F':349.23,'F#':369.99,'G':392.00,'G#':415.30,'A':440.00,'A#':466.16,'B':493.88});
	setPriv('_fileCache',[],true);
	setPriv('_temp',{},true);
	setPriv('_sounds',[],true);
	setPriv('_mod',[function(i,s,f,x){return Math.sin((2 * Math.PI)*(i/s)*f+x);}]);
	setPriv('_resizeCache', function() {
		var f = this._fileCache;
		var l = this._sounds.length;
		while(f.length<l) {
			var octaveList = [];
			for(var i = 0; i < 8; i++) {
				var noteList = {};
				for(var k in this._notes) {
					noteList[k] = {};
				} 
				octaveList.push(noteList);
			}
			f.push(octaveList);
		}
	});
	setPriv('_clearCache', function() {
		this._fileCache = [];
		this._resizeCache();
	});
	setPub('generate', function(sound, note, octave, duration) {
		var thisSound = this._sounds[sound];
		if(!thisSound) {
			for(var i=0;i<this._sounds.length;i++) {
				if(this._sounds[i].name==sound) {
					thisSound = this._sounds[i];
					sound = i;
					break;
				}
			}
		}
		if(!thisSound) { throw new Error('Invalid sound or sound ID: ' + sound); }
		var t = (new Date).valueOf();
		this._temp = {};
		octave |= 0;
		octave = Math.min(8, Math.max(1, octave));
		var time = !duration?2:parseFloat(duration);
		if(typeof(this._notes[note])=='undefined') { throw new Error(note + ' is not a valid note.'); }
		if(typeof(this._fileCache[sound][octave-1][note][time])!='undefined') {
			if(this._debug) { console.log((new Date).valueOf() - t, 'ms to retrieve (cached)'); }
			return this._fileCache[sound][octave-1][note][time];
		} else {
			var frequency = this._notes[note] * Math.pow(2,octave-4);
			var sampleRate = this._sampleRate;
			var volume = this._volume;
			var channels = this._channels;
			var bitsPerSample = this._bitsPerSample;
			var attack = thisSound.attack(sampleRate, frequency, volume);
			var dampen = thisSound.dampen(sampleRate, frequency, volume);
			var waveFunc = thisSound.wave;
			var waveBind = {modulate: this._mod, vars: this._temp};
			var val = 0;
			var curVol = 0;

			var data = new Uint8Array(new ArrayBuffer(Math.ceil(sampleRate * time * 2)));
			var attackLen = (sampleRate * attack) | 0;
			var decayLen = (sampleRate * time) | 0;

			for (var i = 0 | 0; i !== attackLen; i++) {
		
				val = volume * (i/(sampleRate*attack)) * waveFunc.call(waveBind, i, sampleRate, frequency, volume);

				data[i << 1] = val;
				data[(i << 1) + 1] = val >> 8;

			}

			for (; i !== decayLen; i++) {

				val = volume * Math.pow((1-((i-(sampleRate*attack))/(sampleRate*(time-attack)))),dampen) * waveFunc.call(waveBind, i, sampleRate, frequency, volume);

				data[i << 1] = val;
				data[(i << 1) + 1] = val >> 8;

			}

			var out = [
				'RIFF',
				pack(1, 4 + (8 + 24/* chunk 1 length */) + (8 + 8/* chunk 2 length */)), // Length
				'WAVE',
				// chunk 1
				'fmt ', // Sub-chunk identifier
				pack(1, 16), // Chunk length
				pack(0, 1), // Audio format (1 is linear quantization)
				pack(0, channels),
				pack(1, sampleRate),
				pack(1, sampleRate * channels * bitsPerSample / 8), // Byte rate
				pack(0, channels * bitsPerSample / 8),
				pack(0, bitsPerSample),
				// chunk 2
				'data', // Sub-chunk identifier
				pack(1, data.length * channels * bitsPerSample / 8), // Chunk length
				data
			];
			var blob = new Blob(out, {type: 'audio/wav'});
			var dataURI = URL.createObjectURL(blob);
			this._fileCache[sound][octave-1][note][time] = dataURI;
			if(this._debug) { console.log((new Date).valueOf() - t, 'ms to generate'); }
			return dataURI;
		}
	});
	setPub('play', function(sound, note, octave, duration) {
		var src = this.generate(sound, note, octave, duration);
		var audio = new Audio(src);
		audio.play();
		return true;
	});
	setPub('debug', function() { this._debug = true; });
	setPub('createInstrument', function(sound) {
		var n = 0;
		var found = false;
		if(typeof(sound)=='string') {
			for(var i=0;i<this._sounds.length;i++) {
				if(this._sounds[i].name==sound) {
					found = true;
					n = i;
					break;
				}
			}
		} else {
			if(this._sounds[sound]) {
				n = sound;
				sound = this._sounds[n].name;
				found = true;
			}
		}
		if(!found) { throw new Error('Invalid sound or sound ID: ' + sound); }
		_encapsulated = true;
		var ins = new AudioSynthInstrument(this, sound, n);
		_encapsulated = false;
		return ins;
	});
	setPub('listSounds', function() {
		var r = [];
		for(var i=0;i<this._sounds.length;i++) {
			r.push(this._sounds[i].name);
		}
		return r;
	});
	setPriv('__init__', function(){
		this._resizeCache();
	});
	setPub('loadSoundProfile', function() {
		for(var i=0,len=arguments.length;i<len;i++) {
			var o = arguments[i];
			if(!(o instanceof Object)) { throw new Error('Invalid sound profile.'); }
			this._sounds.push(o);
		}
		this._resizeCache();
		return true;
	});
	setPub('loadModulationFunction', function() {
		for(var i=0,len=arguments.length;i<len;i++) {
			var f = arguments[i];
			if(typeof(f)!='function') { throw new Error('Invalid modulation function.'); }
			this._mod.push(f);
		}
		return true;
	});
	AudioSynthInstance = new AudioSynth();
	Synth = AudioSynthInstance;
}();

Synth.loadModulationFunction(
	function(i, sampleRate, frequency, x) { return 1 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 1 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 1 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 1 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 1 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(2 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(4 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(8 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(0.5 * Math.PI * ((i / sampleRate) * frequency) + x); },
	function(i, sampleRate, frequency, x) { return 0.5 * Math.sin(0.25 * Math.PI * ((i / sampleRate) * frequency) + x); }
);

Synth.loadSoundProfile({
	name: 'piano',
	attack: function() { return 0.002; },
	dampen: function(sampleRate, frequency, volume) {
		return Math.pow(0.5*Math.log((frequency*volume)/sampleRate),2);
	},
	wave: function(i, sampleRate, frequency, volume) {
		var base = this.modulate[0];
		return this.modulate[1](
			i,
			sampleRate,
			frequency,
			Math.pow(base(i, sampleRate, frequency, 0), 2) +
				(0.75 * base(i, sampleRate, frequency, 0.25)) +
				(0.1 * base(i, sampleRate, frequency, 0.5))
		);
	}
},
{
	name: 'organ',
	attack: function() { return 0.3 },
	dampen: function(sampleRate, frequency) { return 1+(frequency * 0.01); },
	wave: function(i, sampleRate, frequency) {
		var base = this.modulate[0];
		return this.modulate[1](
			i,
			sampleRate,
			frequency,
			base(i, sampleRate, frequency, 0) +
				0.5*base(i, sampleRate, frequency, 0.25) +
				0.25*base(i, sampleRate, frequency, 0.5)
		);
	}
},
{
	name: 'acoustic',
	attack:	function() { return 0.002; },
	dampen: function() { return 1; },
	wave: function(i, sampleRate, frequency) {

		var vars = this.vars;
		vars.valueTable = !vars.valueTable?[]:vars.valueTable;
		if(typeof(vars.playVal)=='undefined') { vars.playVal = 0; }
		if(typeof(vars.periodCount)=='undefined') { vars.periodCount = 0; }
	
		var valueTable = vars.valueTable;
		var playVal = vars.playVal;
		var periodCount = vars.periodCount;

		var period = sampleRate/frequency;
		var p_hundredth = Math.floor((period-Math.floor(period))*100);

		var resetPlay = false;

		if(valueTable.length<=Math.ceil(period)) {
	
			valueTable.push(Math.round(Math.random())*2-1);
	
			return valueTable[valueTable.length-1];
	
		} else {
	
			valueTable[playVal] = (valueTable[playVal>=(valueTable.length-1)?0:playVal+1] + valueTable[playVal]) * 0.5;
	
			if(playVal>=Math.floor(period)) {
				if(playVal<Math.ceil(period)) {
					if((periodCount%100)>=p_hundredth) {
						// Reset
						resetPlay = true;
						valueTable[playVal+1] = (valueTable[0] + valueTable[playVal+1]) * 0.5;
						vars.periodCount++;	
					}
				} else {
					resetPlay = true;	
				}
			}
	
			var _return = valueTable[playVal];
			if(resetPlay) { vars.playVal = 0; } else { vars.playVal++; }
	
			return _return;
	
		}
	}
},
{
	name: 'edm',
	attack:	function() { return 0.002; },
	dampen: function() { return 1; },
	wave: function(i, sampleRate, frequency) {
		var base = this.modulate[0];
		var mod = this.modulate.slice(1);
		return mod[0](
			i,
			sampleRate,
			frequency,
			mod[9](
				i,
				sampleRate,
				frequency,
				mod[2](
					i,
					sampleRate,
					frequency,
					Math.pow(base(i, sampleRate, frequency, 0), 3) +
						Math.pow(base(i, sampleRate, frequency, 0.5), 5) +
						Math.pow(base(i, sampleRate, frequency, 1), 7)
				)
			) +
				mod[8](
					i,
					sampleRate,
					frequency,
					base(i, sampleRate, frequency, 1.75)
				)
		);
	}
});


/***/ }),

/***/ 65562:
/*!******************************************!*\
  !*** ../BlocklyHelpers/saveBlocksUrl.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

function formatInt(number) {
    return number < 10 ? '0' + number : number;
}
function formatDate(date) {

    return `${formatInt(date.getFullYear())}${formatInt((date.getMonth() + 1))}${formatInt(date.getDate())}` +
        `${formatInt(date.getHours())}${formatInt(date.getMinutes())}${formatInt(date.getSeconds())}`;

}
exports.saveState = function(BLocklyXML, Workspace, id){
    var cname= 'BlocklyState'+(id?id:"");
    var xml = BLocklyXML.workspaceToDom(Workspace, true);
    var xml_text = BLocklyXML.domToPrettyText(xml);
    window.localStorage.setItem(cname, xml_text);
}
exports.restoreState = function(BLocklyXML,workspace, id){
    
    var cname= 'BlocklyState'+(id?id:"");
    var xml_text = window.localStorage.getItem(cname);
    //<xml xmlns="https://developers.google.com/blockly/xml"></xml>
    if(xml_text?.length>62){
        var xml = BLocklyXML.textToDom(xml_text);
        BLocklyXML.clearWorkspaceAndLoadFromXml(xml, workspace);
    }
    return "";
  }

/***/ }),

/***/ 57672:
/*!*************************************!*\
  !*** ../BlocklyHelpers/saveLoad.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var FileSaver = __webpack_require__(/*! file-saver */ 75536);
exports.DownloadBlocks = function(BlocklyXML, workspace, filename) {
    var xml = BlocklyXML.workspaceToDom(workspace, true);
    var xml_text = BlocklyXML.domToPrettyText(xml);    
    //window.alert(xml_text);
    var blob = new Blob([xml_text], { type: "text/plain;charset=utf-16" });
    FileSaver.saveAs(blob, filename);
}
exports.LoadFile = function(BlocklyXML,workspace,content) {
        workspace.clear();
        var dom = BlocklyXML.textToDom(content);
        BlocklyXML.domToWorkspace(dom, workspace);
}

/***/ }),

/***/ 32253:
/*!***************************************!*\
  !*** ../BlocklyScripts/HTMLBlocks.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Blockly =__webpack_require__(/*! blockly */ 5912);

exports.definitionBlocks = function (blocks, javaScript) {
  blocks['HTMLheaders'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("Header")
          .appendField(new  Blockly.FieldDropdown([["H1","H1"], ["H2","H2"], ["H3","H3"]]), "NAME");
      this.setOutput(true, null);
      this.setColour(240);
   this.setTooltip("string to Header ");
   this.setHelpUrl("");
    }
  };

  javaScript['HTMLheaders'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_name = javaScript.valueToCode(block, 'NAME', javaScript.ORDER_ATOMIC);
    // if(value_name.startsWith("'") && value_name.endsWith("'")){
    //   value_name= value_name.substring(1,value_name.length-1);
    // }
    // console.log('_x',value_name);

    var code = `'<${dropdown_name}>'+ ${value_name} + '</${dropdown_name}>'`;
    return [code, javaScript.ORDER_NONE];
  };

  blocks['HTMLlist'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("List ")
        .appendField(new Blockly.FieldDropdown([["OL","ol"],["UL","ul"] ]), "listType");
      this.appendStatementInput("Content")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(240);
  this.setTooltip("list - please add li block ");
   this.setHelpUrl("");
    }
  };

  javaScript['HTMLlist'] = function(block) {
    var dropdown_listtype = block.getFieldValue('listType');
    var value_listtype = javaScript.valueToCode(block, 'ListType', javaScript.ORDER_ATOMIC);
    var statements_content = javaScript.statementToCode(block, 'Content');
    
    var code = `window.alert('<${dropdown_listtype}>');\n;${statements_content};\n;window.alert('</${dropdown_listtype}>');\n`;
    
    return code;
  };

  blocks['HTMLli'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("LI")
      this.setOutput(true, null);
      this.setColour(240);
   this.setTooltip("string to LI");
   this.setHelpUrl("");
    }
  };

  javaScript['HTMLli'] = function(block) {
    var value_name = javaScript.valueToCode(block, 'NAME', javaScript.ORDER_ATOMIC);
    // if(value_name.startsWith("'") && value_name.endsWith("'")){
    //   value_name= value_name.substring(1,value_name.length-1);
    // }
    // console.log('_x',value_name);

    var code = `'<li>'+ ${value_name} + '</li>'`;
    return [code, javaScript.ORDER_NONE];
  };


  blocks['HTMLliStart'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("List")
          .appendField(new Blockly.FieldDropdown([["OL","OL"], ["LI","LI"]]), "NAME");
      this.setColour(240);
      this.setOutput(true, null);
      this.setTooltip("LI start");
   this.setHelpUrl("");
    }
  };
  javaScript['HTMLliStart'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var code = `'<${dropdown_name}>'`;
    return  [code, javaScript.ORDER_NONE];;
  };

  blocks['HTMLliStop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("/List")
          .appendField(new Blockly.FieldDropdown([["OL","OL"], ["LI","LI"]]), "NAME");
      this.setColour(240);
      this.setOutput(true, null);
      this.setTooltip("LI stop");
   this.setHelpUrl("");
    }
  };
  javaScript['HTMLliStop'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var code = `'</${dropdown_name}>'`;
    return  [code, javaScript.ORDER_NONE];
  };

  blocks['HTMLlink'] =  {
    init: function() {
      this.appendDummyInput()
          .appendField("A")
          .appendField("target")
          .appendField(new Blockly.FieldDropdown([["_blank","_blank"], ["_self","_self"], ["_parent","_parent"], ["_top","_top"]]), "targetDrop");
      this.appendValueInput("HREF")
          .setCheck(null)
          .appendField("href");
      this.appendValueInput("text")
          .setCheck(null)
          .appendField("text");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  javaScript['HTMLlink'] = function(block) {
    var dropdown_targetdrop = block.getFieldValue('targetDrop');
    var value_href = javaScript.valueToCode(block, 'HREF', javaScript.ORDER_ATOMIC);
    var value_text = javaScript.valueToCode(block, 'text', javaScript.ORDER_ATOMIC);
    value_text = value_text || value_href;
    var code = `'<a href="'+`+  value_href ;
    code  +=`+ '" target="${dropdown_targetdrop}"'`;
    code+=`+ '>'+` + value_text  + `+ '</a> '`;
    // code= javaScript.quote_(code);
    return [code, javaScript.ORDER_NONE];
  };


};


exports.fieldXML = function () {
    return `
    <block type='text_print'>" 
               <value name='TEXT'>" 
                 
    <block type="HTMLheaders">
        <value name="NAME">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>    
      </value>


      </block>
        
<block type="HTMLlist"></block>

<block type='text_print'>" 
<value name='TEXT'>" 
  
<block type="HTMLli">
<value name="NAME">
<shadow type="text">
 <field name="TEXT"></field>
</shadow>
</value>
</block>    
</value>
</block>
<block type='text_print'>" 
<value name='TEXT'>" 

<block type="HTMLliStart"></block>
</value>
</block>    
<block type='text_print'>" 
<value name='TEXT'>" 

<block type="HTMLliStop"></block>

</value>
</block>    

<block type='text_print'>" 
<value name='TEXT'>" 

<block type="HTMLlink"></block>

</value>
</block>    


`

      
}

/***/ }),

/***/ 61096:
/*!*************************************!*\
  !*** ../BlocklyScripts/TTSBlock.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
const Blockly =__webpack_require__(/*! blockly */ 5912);
// const a = require('./audioTest.js');
exports.definitionBlocks = function (blocks, javaScript) {
    
    blocks['ttsBlock'] = {
        init: function() {
            this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("Voice");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
     this.setTooltip("");
     this.setHelpUrl("");
        }
      };
      javaScript['ttsBlock'] = function(block) {
        // var dropdown_voice = block.getFieldValue('Voice');
        var value_name = javaScript.valueToCode(block, 'NAME', javaScript.ORDER_ATOMIC);
        var code = 'speakDefault('+ value_name+');\n';
        // console.log(a);
        // var piano = a.Synth.createInstrument('piano');
        // piano.play('C', 4, 2);
        return code;
      };
      
}

exports.fieldXML = function () {
    return `<block type="ttsBlock">
        <value name="NAME">
            <shadow type="text">
            <field name="TEXT">Hello</field></shadow>
        </value>       
        </block>
`;
}

/***/ }),

/***/ 16537:
/*!*****************************************!*\
  !*** ../BlocklyScripts/WindowsCreds.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.definitionBlocks = function (blocks, javaScript) {
    
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;


    blocks['credsforhttp'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Http with Creds");
            this.appendValueInput("HttpDomain")
                .setCheck("String")
                .appendField("Domain");
            this.appendValueInput("WithCreds")
                .setCheck("Boolean")
                .appendField("With Creds ?");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            //this.setColour(230);
            //this.setTooltip("");
            //this.setHelpUrl("");
        }
    };
    javaScript['credsforhttp'] = function (block) {
        var value_httpdomain = javaScript.valueToCode(block, 'HttpDomain', /*javaScript.*/ORDER_ATOMIC) || '(localSite)';
        var value_headername = javaScript.valueToCode(block, 'WithCreds', /*javaScript.*/ORDER_ATOMIC);
        var code = 'withCredsForDomain[' + value_httpdomain + ']=' + value_headername + ';\n';
        return code;
    };
};

exports.fieldXML =function(){
    return `<block type="credsforhttp">
    <value name="HttpDomain">
        <shadow type="text">
            <field name="TEXT">(localSite)</field>
        </shadow>
    </value>
    <value name="WithCreds">
        <shadow type="logic_boolean">
            <field name="BOOL">FALSE</field>
        </shadow>
    </value>
</block>
`
}

/***/ }),

/***/ 30101:
/*!****************************************!*\
  !*** ../BlocklyScripts/auth0Blocks.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;
    blocks['auth0webapidata'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Auth0");
          this.appendValueInput("client_id")
              .setCheck(null)
              .appendField("client_id");
          this.appendValueInput("client_secret")
              .setCheck(null)
              .appendField("client_secret");
          this.appendValueInput("audience")
              .setCheck(null)
              .appendField("audience");
          this.appendValueInput("grant_type")
              .setCheck(null)
              .appendField("grant_type");
          this.setOutput(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
      
      javaScript['auth0webapidata'] = function(block) {
        
        var value_client_id = javaScript.valueToCode(block, 'client_id', /*javaScript.*/ORDER_ATOMIC);
        var value_client_secret = javaScript.valueToCode(block, 'client_secret', /*javaScript.*/ORDER_ATOMIC);
        var value_audience = javaScript.valueToCode(block, 'audience', /*javaScript.*/ORDER_ATOMIC);
        var value_grant_type = javaScript.valueToCode(block, 'grant_type', /*javaScript.*/ORDER_ATOMIC);
        
        var code = '{"client_id":'+ value_client_id;
        code+=',"client_secret":'+ value_client_secret;
        code+=',"audience":'+ value_audience;
        code+=',"grant_type":'+ value_grant_type;
        code+='}';
        
        return [code, /*javaScript.*/ORDER_NONE];
      };
      
      
}

exports.fieldXML = function () {
    return `<category id="Auth0" name="Auth0">
    <block type="auth0webapidata">
        <value name="client_id">
            <shadow type="text">
                <field name="TEXT">client_id?</field>
            </shadow>

        </value>
        <value name="client_secret">
            <shadow type="text">
                <field name="TEXT">client_secret?</field>
            </shadow>

        </value>
        <value name="audience">
            <shadow type="text">
                <field name="TEXT">audience</field>
            </shadow>

        </value>
        <value name="grant_type">
            <shadow type="text">
                <field name="TEXT">grant_type?</field>
            </shadow>

        </value>
    </block>
</category>
`;
}


/***/ }),

/***/ 77868:
/*!***************************************!*\
  !*** ../BlocklyScripts/chartBlock.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Blockly =__webpack_require__(/*! blockly */ 5912);

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
exports.definitionBlocks = function (blocks, javaScript) {


    // const value_json = javaScript.valueToCode(block, 'JSON', ORDER_ATOMIC);
    //     const code = `JSON.parse(${value_json})`;
    //     return [code, ORDER_NONE];
    blocks['chart_js'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("ChartType")
              .appendField(new Blockly.FieldDropdown ([["HBar","HBar"], ["VBar","VBar"]]), "ChartTypeValue");
          this.appendValueInput("ChartTitleValue")
              .setCheck(null)
              .appendField(new Blockly.FieldLabelSerializable("Title"), "ChartTitle");
          this.appendValueInput("LabelsValue")
              .setCheck("Array")
              .appendField(new Blockly.FieldLabelSerializable("Labels"), "ChartLabels");
          this.appendValueInput("DataSet1Label")
              .setCheck("String")
              .appendField(new Blockly.FieldLabelSerializable("DataSet1 Label"), "DataSetLabel1");
          this.appendValueInput("DataSet1Data")
              .setCheck("Array")
              .appendField(new Blockly.FieldLabelSerializable("DataSet1 Data"), "DataSetData1");
          this.setOutput(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };

      javaScript['chart_js'] = function(block) {
        var dropdown_charttypevalue = block.getFieldValue('ChartTypeValue');
        var value_charttitlevalue = javaScript.valueToCode(block, 'ChartTitleValue', javaScript.ORDER_ATOMIC);
        var value_labelsvalue = javaScript.valueToCode(block, 'LabelsValue', javaScript.ORDER_ATOMIC);
        var value_dataset1label = javaScript.valueToCode(block, 'DataSet1Label', javaScript.ORDER_ATOMIC);
        var value_dataset1data = javaScript.valueToCode(block, 'DataSet1Data', javaScript.ORDER_ATOMIC);
        //var backgroundColor: ["red", "blue", "green", "blue", "red", "blue"],
        var barType= "";
        var indexAxis='x';
        switch (dropdown_charttypevalue) {
            case "HBar":
                barType="bar";
                indexAxis='y';
                break;
            case "VBar":
                barType="bar";
                break;
            default:
                throw "Unknown chart type:"+dropdown_charttypevalue;
        }
        // window.alert(indexAxis);
        var code = `JSON.stringify({ 'type': '${barType}', 'options':{ 'indexAxis':'${indexAxis}'},  'data': {  'labels': ${value_labelsvalue}, 'datasets': [{ 'backgroundColor': ['green','blue'],'label': ${value_dataset1label}, 'data': ${value_dataset1data} }] } })`;
        
        return [code, javaScript.ORDER_NONE];
      };


}

exports.fieldXML = function () {
    return `<block type="chart_js"></block>`;
 
}

/***/ }),

/***/ 66737:
/*!*****************************************!*\
  !*** ../BlocklyScripts/commentBlock.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

const Blockly =__webpack_require__(/*! blockly */ 5912);
 exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    blocks['comment'] = {
        init: function() {
          this.appendValueInput("TEXT")
              .setCheck(null)
              .appendField("comment /* */")
              .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
          //this.setOutput(true, null);
            this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
      
      javaScript['comment'] = function(block) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
        /*javaScript.*/ORDER_ATOMIC) || '\'\'';
        var code= '/*\n' + msg+'\n*/;\n';
        return code;
      };
      
      blocks['debugger'] = {
        init: function() {
          this.appendValueInput("TEXT")
              .setCheck(null)
              .appendField("debugger")
              .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
          //this.setOutput(true, null);
            this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
      
      javaScript['debugger'] = function(block) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
        /*javaScript.*/ORDER_ATOMIC) || '\'\'';
        var code= 'startDebugger('+ msg+",'"+ block.id+"',this);\n";
        return code;
      };
}

exports.fieldXML = function () {
    return `<block type="comment">
    <value name="TEXT">
        <shadow type="text">
            <field name="TEXT">Put here comments</field>
        </shadow>
    </value>
</block>
<block type="debugger">
    <value name="TEXT">
        <shadow type="text">
            <field name="TEXT">my message for debug</field>
        </shadow>
    </value>
</block>
`
}


/***/ }),

/***/ 84591:
/*!*********************************************!*\
  !*** ../BlocklyScripts/convertersBlocks.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;
    blocks['converttojson'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ConvertToJSON");
            this.appendValueInput("ValueToConvert")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setTooltip("Convert to JSON");
            this.setHelpUrl("");
        }
    };
    javaScript['converttojson'] = function (block) {
        var value_ValueToConvert = javaScript.valueToCode(block, 'ValueToConvert', /*javaScript.*/ORDER_ATOMIC);
        //value_ValueToConvert = value_ValueToConvert.replace(/(\r\n|\n|\r)/gm, "")
        const code = 'JSON.parse(' + value_ValueToConvert + ')';
        return [code, /*javaScript.*/ORDER_NONE];

    };

            blocks['converttostring'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ConvertToString");
            this.appendValueInput("ValueToConvert")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setTooltip("Convert to String");
            this.setHelpUrl("");
        }
    };
    javaScript['converttostring'] = function (block) {
        var value_ValueToConvert = javaScript.valueToCode(block, 'ValueToConvert', /*javaScript.*/ORDER_ATOMIC);
        var code = 'JSON.stringify(' + value_ValueToConvert + ')';
        return [code, /*javaScript.*/ORDER_NONE];
    };

    blocks['convertcsv'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Convert To CSV");
            this.appendValueInput("ArrayToConvert")
                .setCheck(null)
                .appendField("Array to convert");
            //this.setPreviousStatement(true, null);
            //this.setNextStatement(true, null);
            this.setOutput(true, null);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    javaScript['convertcsv'] = function (block) {
        var data = javaScript.valueToCode(block, 'ArrayToConvert', javaScript.ORDER_ATOMIC);
        var code = 'convertToCSV(' + data+')';
        //return code;
        return [code, /*javaScript.*/ORDER_NONE];
    };
    
    const convertCSV = function (arrayOrString) {
        
        
        let arr = typeof arrayOrString != 'object' ? JSON.parse(arrayOrString) : objArray;
    
        arr = [Object.keys(arr[0])].concat(arr)
        var data = arr.map(it => {
            return Object.values(it).toString()
        }).join('\n');
        // console.log(data);
        return data;
    }
}

exports.fieldXML = function () {
 return `<block type="converttojson"></block>
 <block type="converttostring"></block>
 <block type="convertcsv"></block>
`
}

/***/ }),

/***/ 53160:
/*!***********************************************!*\
  !*** ../BlocklyScripts/createObjectBlocks.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

const Blockly=__webpack_require__(/*! blockly */ 5912);
//https://gist.github.com/mark-friedman/48f43a9b62b1c8ad029a75d4b4e61f31
exports.definitionBlocks = function (blocks, javaScript,BlocklyExtensions,  BlocklyMutator) {

    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;
    const ALIGN_RIGHT=1;
    const ALIGN_CENTRE=0;
    
    javaScript['object_from_json'] = function(block) {
        const value_json = javaScript.valueToCode(block, 'JSON', ORDER_ATOMIC);
        // TODO: Maybe check that the parsed value is actually an object.
        const code = `JSON.parse(${value_json})`;
        return [code, ORDER_NONE];
      };
      
      javaScript['object_to_json'] = function(block) {
        const value_object = javaScript.valueToCode(block, 'object', ORDER_ATOMIC);
        const code = `JSON.stringify(${value_object})`;
        return [code, ORDER_NONE];
      };
      
      javaScript['object_get'] = function(block) {
        const text_field_name = block.getFieldValue('field_name');
        const value_object = javaScript.valueToCode(block, 'object', ORDER_ATOMIC);
        const code = `${value_object}['${text_field_name}']`;
        return [code, ORDER_NONE];
      };
      
      javaScript['object_set'] = function(block) {
        const text_field_name = block.getFieldValue('field_name');
        const value_object_field = javaScript.valueToCode(block, 'object_field', ORDER_ATOMIC);
        const value_value_field = javaScript.valueToCode(block, 'value_field', ORDER_ATOMIC);
        return `${value_object_field}['${text_field_name}'] = ${value_value_field};\n`;
      };
      
      javaScript['object_create'] = function(block) {
        if (!block.numFields) {
          return ['{}', ORDER_NONE];
        }
        let fieldInitCode = '';
        for (let i = 1; i <= block.numFields; i++) {
          const fieldName = block.getFieldValue('field' + i);
          const fieldValue = javaScript.valueToCode(block, 'field_input' + i, ORDER_ATOMIC);
          fieldInitCode += `"${fieldName}": ${fieldValue}, `
        }
        const code = `{ ${fieldInitCode} }`;
        return [code, ORDER_NONE];
      };
      
      
      const CUSTOM_OBJECT_FROM_JSON_BLOCK_NAME = 'object_from_json';
      const CUSTOM_OBJECT_TO_JSON_BLOCK_NAME = 'object_to_json';
      const CUSTOM_OBJECT_GET_BLOCK_NAME = 'object_get';
      const CUSTOM_OBJECT_SET_BLOCK_NAME = 'object_set';
      const CUSTOM_OBJECT_CREATE_BLOCK_NAME = 'object_create';
      const CUSTOM_OBJECT_MUTATOR_FIELD_BLOCK_NAME = 'object_field';
      const CUSTOM_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME = 'object_create_mutator_top';
      const CUSTOM_OBJECT_BLOCK_COLOR = '#F99EA3';
      
      const getMessage = (msgName, ...arg) => {
        const MESSAGES = {
          object_from_json: "get object from JSON %1",
          object_from_json_tooltip: "Create object from JSON string.",
          object_to_json: "generate JSON from object %1",
          object_to_json_tooltip: "Save object as a JSON string.",
          object_get_json: "get property %1 %2 of object %3",
          object_get_json_tooltip: "Get a property of an object.",
          object_set_json: "set property %1 %2 of object %3 to %4",
          object_set_json_tooltip: "Set a property of an object.",
          object_create: "create object",
          object_create_tooltip: "Create a new object, optionally with some property values.",
          object_field_name: "property name",
        };
        return MESSAGES[msgName];
      };
      
      const objectFromJSONBlockDef = {
        "type": "object_from_json",
        "message0": getMessage('object_from_json'),
        "args0": [
          {
            "type": "input_value",
            "name": "JSON",
            "check": "String"
          }
        ],
        "output": "Object",
        "colour": CUSTOM_OBJECT_BLOCK_COLOR,
        "tooltip": getMessage('object_from_json_tooltip'),
        "helpUrl": "http://www.json.org/"
      };
      
      blocks[CUSTOM_OBJECT_FROM_JSON_BLOCK_NAME] = {
        init: function () {
          this.jsonInit(objectFromJSONBlockDef);
        }
      };
      
      const objectToJSONBlockDef = {
          "type": "object_to_json",
          "message0": getMessage('object_to_json'),
          "args0": [
            {
              "type": "input_value",
              "name": "object",
              "check": "Object"
            }
          ],
          "output": null,
          "colour": CUSTOM_OBJECT_BLOCK_COLOR,
          "tooltip": getMessage('object_to_json_tooltip'),
        "helpUrl": "http://www.json.org/"
      };
      
      blocks[CUSTOM_OBJECT_TO_JSON_BLOCK_NAME] = {
        init: function () {
          this.jsonInit(objectToJSONBlockDef);
        }
      };
      
      const objectGetBlockDef = {
          "type": "object_get",
          "message0": getMessage('object_get_json'),
          "args0": [
            {
              "type": "field_input",
              "name": "field_name",
              "text": "default"
            },
            {
              "type": "input_dummy"
            },
            {
              "type": "input_value",
              "name": "object",
              "check": "Object",
              "align": "RIGHT"
            }
          ],
          "output": null,
          "colour": CUSTOM_OBJECT_BLOCK_COLOR,
          "tooltip": getMessage('object_get_json_tooltip'),
          "helpUrl": ""
      };
      
      blocks[CUSTOM_OBJECT_GET_BLOCK_NAME] = {
        init: function () {
          this.jsonInit(objectGetBlockDef);
        }
      };
      
      const objectSetBlockDef =  {
        "type": "object_set",
        "message0": getMessage('object_set_json'),
        "args0": [
          {
            "type": "field_input",
            "name": "field_name",
            "text": getMessage('object_field_name'),
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "object_field",
            "check": "Object",
            "align": "RIGHT"
          },
          {
            "type": "input_value",
            "name": "value_field",
            "align": "RIGHT"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": CUSTOM_OBJECT_BLOCK_COLOR,
        "tooltip": getMessage('object_set_json_tooltip'),
        "helpUrl": ""
      };
      
      
      blocks[CUSTOM_OBJECT_SET_BLOCK_NAME] = {
        init: function () {
          this.jsonInit(objectSetBlockDef);
        }
      };  
      
      const objectCreateBlockDef = {
        "type": "object_create",
        "message0": getMessage('object_create'),
        "output": "Object",
        "mutator": "controls_create_mutator",
        "colour": 15,
        "tooltip": getMessage('object_create_tooltip'),
        "helpUrl": ""
      };
      
      blocks[CUSTOM_OBJECT_CREATE_BLOCK_NAME] = {
        init: function () {
          this.jsonInit(objectCreateBlockDef);
        }
      };
      
      const objectFieldBlockDef = {
        "type": "object_field",
        "message0": "%1 %2",
        "args0": [
          {
            "type": "field_input",
            "name": "field_name",
            "text": getMessage('object_field_name')
          },
          {
            "type": "input_value",
            "name": "field_value"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 15,
        "tooltip": "",
        "helpUrl": ""
      };
      
      blocks[CUSTOM_OBJECT_MUTATOR_FIELD_BLOCK_NAME] = {
        init: function () {
          this.jsonInit(objectFieldBlockDef);
        }
      };
      
      const objectCreateMutatorBlockDef = {
        "type": "object_create_mutator",
        "message0": getMessage('object_create'),
        "nextStatement": null,
        "colour": 15,
        "tooltip": getMessage('object_create_tooltip'),
        "helpUrl": ""
      };
      
      blocks[CUSTOM_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME] = {
        init: function () {
          this.jsonInit(objectCreateMutatorBlockDef);
        }
      };
      
      const objectCreateMutator = {
        numFields: 0,
        fields: [],
      
        /**
         * Standard function for Mutator mixin. It's called to update the block based on contents of the mutator's XML
         * DOM element.
         */
        domToMutation: function(xmlElement) {
          this.fields = [];
          for (let i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'field') {
              this.fields.push(childNode.getAttribute('name'));
            }
          }
          this.numFields = this.fields.length;
          this.updateShape();
        },
      
        /**
         * Standard function for Mutator mixin. It's called to generate the mutator's XML DOM element based on the content
         * of the block.
         */
        mutationToDom: function() {
          if (!this.numFields) {
            return null;
          }
          const container = document.createElement('mutation');
          container.setAttribute('num_fields', '' + this.numFields);
          for (let i = 0; i < this.fields.length; i++) {
            const field = document.createElement('field');
            field.setAttribute('name', this.fields[i]);
            container.appendChild(field);
          }
          return container;
        },
      
        /**
         * Standard function for Mutator mixin when the mutator uses the standard mutator UI. It's called to update the
         * block based on changes to the mutator's UI.
         */
        compose: function(topBlock) {
          let fieldBlock = topBlock.nextConnection && topBlock.nextConnection.targetBlock();
          this.numFields = 0;
          this.fields = [];
          let connectionsToRestore = [null];
          while (fieldBlock) {
            this.fields.push(fieldBlock.getFieldValue('field_name'));
            this.numFields++;
            connectionsToRestore.push(fieldBlock.savedConnection);
            fieldBlock = fieldBlock.nextConnection && fieldBlock.nextConnection.targetBlock();
          }
          this.updateShape();
          // Reconnect any child blocks.
          for (let i = 1; i <= this.numFields; i++) {
            BlocklyMutator.reconnect(connectionsToRestore[i], this, 'field_input' + i);
          }
        },
      
        /**
         * Standard function for Mutator mixin when the mutator uses the standard mutator UI.  It's called to populate the
         * mutator UI.
         */
        decompose: function(workspace) {
          const topBlock = workspace.newBlock(CUSTOM_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME);
          topBlock.initSvg();
          let connection = topBlock.nextConnection;
          for (let i = 0; i < this.fields.length; i++) {
            const fieldBlock = workspace.newBlock(CUSTOM_OBJECT_MUTATOR_FIELD_BLOCK_NAME);
            fieldBlock.initSvg();
            fieldBlock.setFieldValue(this.fields[i], 'field_name');
            connection.connect(fieldBlock.previousConnection);
            connection = fieldBlock.nextConnection;
          }
          return topBlock;
        },
      
        /**
         * Standard function for Mutator mixin when the mutator uses the standard mutator UI.  It's called on any changes to
         * the block and is generally used to keep track of input connections (by saving them with their corresponding mutator
         * blocks), so that if the mutator later causes changes to the block it can restore those input connections.
         *
         * We're also using this function to update the mutator block field name values if the user changes the name in the
         * block.
         */
        saveConnections: function(topBlock) {
          let fieldBlock = topBlock.nextConnection && topBlock.nextConnection.targetBlock();
          let i = 1;
          while (fieldBlock) {
            const input = this.getInput('field_input' + i);
            fieldBlock.savedConnection = input && input.connection.targetConnection;
            // Set mutator block field name from the corresponding 'real' Object.create block
            fieldBlock.setFieldValue(this.getFieldValue('field' + i), 'field_name');
            i++;
            fieldBlock = fieldBlock.nextConnection &&
              fieldBlock.nextConnection.targetBlock();
          }
        },
      
        updateShape: function() {
          // Delete everything.
          if (this.getInput('with')) {
            this.removeInput('with');
          }
          let i = 1;
          while (this.getInput('field_input' + i)) {
            this.removeInput('field_input' + i);
            i++;
          }
          // Rebuild block.
          if (this.numFields > 0) {
            this.appendDummyInput('with')
            .setAlign(ALIGN_RIGHT)
            .appendField("with fields");
          }
          for (let i = 1; i <= this.numFields; i++) {
            const fieldName = this.fields[i - 1];
            this.appendValueInput("field_input" + i)
              .setCheck(null)
              .setAlign(ALIGN_RIGHT)
              .appendField(new Blockly.FieldTextInput(fieldName), "field" + i);
          }
        },
      
      };
      try{
      BlocklyExtensions.registerMutator('controls_create_mutator', objectCreateMutator, null, ['object_field']);
      }
      catch(e){
        //already registered
      }
}

exports.fieldXML = function () {
    return `    
    <block type="modifyproperty"></block>
    <block type="getproperty"></block>
    <block type="object_create"></block>
    <!--<block type="object_from_json"></block>
<block type="object_to_json"></block>
<block type="object_get"></block>
<block type="object_set"></block>-->

`;
}

/***/ }),

/***/ 83761:
/*!*********************************************!*\
  !*** ../BlocklyScripts/currentDateBlock.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
const Blockly =__webpack_require__(/*! blockly */ 5912);


exports.definitionBlocks = function (blocks, javaScript) {
    /*
 * Block that display the current date time
 * @Author: Popescu Ionut Cosmin (cosmin.popescu93@gmail.com)
 * https://github.com/cosminpopescu14
 */
    const ORDER_NONE=99;
    blocks['displayCurrentDate'] = {

    
    init: function () {
        this.appendDummyInput()
            .appendField("Current Date");
        this.appendDummyInput()
            .appendField('Pick date format:')
            .appendField(new Blockly.FieldDropdown([
                ['Unix format', 'unix'],
                ['ISO format', 'iso'],
                ['Human format', 'human']
            ]), 'dateFormat');

        this.setOutput(true, null);
        this.setColour(100);
        this.setTooltip('Show current date.');
        this.setHelpUrl('https://www.w3schools.com/jsref/jsref_obj_date.asp');

    }
}
const dateFormats = {
    UNIX: 'unix',
    ISO: 'iso',
    HUMAN: 'human'
}

javaScript['displayCurrentDate'] = block => {
    let dropdownOption = block.getFieldValue('dateFormat');

    let operation = ''
    switch (dropdownOption.toString()) {

        case dateFormats.HUMAN:
            operation = `displayDateFormatted('${dateFormats.HUMAN}')`;
            break;
        case dateFormats.ISO:
            operation = `displayDateFormatted('${dateFormats.ISO}')`;
            break;
        case dateFormats.UNIX:
            operation = `displayDateFormatted('${dateFormats.UNIX}')`;
            break;

        default:
            console.log('Date time format not suported')
    }

    let code = operation;
    return [code, /*javaScript.*/ORDER_NONE];
}



}

exports.fieldXML = function () {
return `<block type="displayCurrentDate"></block>`;
}



/***/ }),

/***/ 99225:
/*!**********************************************!*\
  !*** ../BlocklyScripts/dateFromTextBlock.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_NONE=99;
    blocks['DateFromText'] = {
        init: function() {
            this.appendValueInput('VALUE')            
                .appendField('Date from ');
            this.setOutput(true, null); 
            this.setHelpUrl('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format');
            
        }
    }
    
    javaScript['DateFromText'] = block => {
        let data = javaScript.valueToCode(block, 'VALUE', javaScript.ORDER_ATOMIC)|| '';
        //console.log(data);
        //console.log(data.length);
        //read about formats at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format
        //if(!(data.length ==12 || data.length ==21))// '' means 10+2 or 19+2
        //	throw " data should be yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss";
        
        let code = 'Date.parse(' + data +')';
        return [code, /*javaScript.*/ORDER_NONE];
        
    }
}

exports.fieldXML = function () {
    return `<block type="DateFromText">
    <value name="VALUE">
        <shadow type="text">
            <field name="TEXT">1970-04-16T02:00:00</field>
        </shadow>
    </value>
</block>
`;
}

/***/ }),

/***/ 24534:
/*!******************************************!*\
  !*** ../BlocklyScripts/defaultBlocks.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.generalBlocks = function(){
    return    `
    
    <category name="Blockly Core">

    <category id="catLogic" colour="210" name="Logic">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
    </category>
    <category id="catLoops" colour="120" name="Loops">
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="controls_whileUntil"></block>
        <block type="controls_for">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="BY">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="controls_forEach"></block>
        <block type="controls_flow_statements"></block>
    </category>
    <category id="catMath" colour="230" name="Math">
        <block type="math_number"></block>
        <block type="math_arithmetic">
            <value name="A">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="math_single">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">9</field>
                </shadow>
            </value>
        </block>
        <block type="math_trig">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">45</field>
                </shadow>
            </value>
        </block>
        <block type="math_constant"></block>
        <block type="math_number_property">
            <value name="NUMBER_TO_CHECK">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="math_change">
            <value name="DELTA">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="math_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">3.1</field>
                </shadow>
            </value>
        </block>
        <block type="math_on_list"></block>
        <block type="math_modulo">
            <value name="DIVIDEND">
                <shadow type="math_number">
                    <field name="NUM">64</field>
                </shadow>
            </value>
            <value name="DIVISOR">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="math_constrain">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="LOW">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="HIGH">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="math_random_int">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="math_random_float"></block>
    </category>
    <category id="catText" colour="160" name="Text">
        <block type="text"></block>
        <block type="text_join"></block>
        <block type="text_append">
            <value name="TEXT">
                <shadow type="text"></shadow>
            </value>
        </block>
        <block type="text_length">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_isEmpty">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>
            </value>
        </block>
        <block type="text_indexOf">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">text</field>
                </block>
            </value>
            <value name="FIND">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_charAt">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">text</field>
                </block>
            </value>
        </block>
        <block type="text_getSubstring">
            <value name="STRING">
                <block type="variables_get">
                    <field name="VAR">text</field>
                </block>
            </value>
        </block>
        <block type="text_changeCase">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_trim">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_print">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_prompt_ext">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
    </category>
    <category id="catLists" colour="260" name="Lists">
        <block type="lists_create_with">
            <mutation items="0"></mutation>
        </block>
        <block type="lists_create_with"></block>
        <block type="lists_repeat">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        <block type="lists_length"></block>
        <block type="lists_isEmpty"></block>
        <block type="lists_indexOf">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
        </block>
        <block type="lists_getIndex">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
        </block>
        <block type="lists_setIndex">
            <value name="LIST">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
        </block>
        <block type="lists_getSublist">
            <value name="LIST">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
        </block>
        <block type="lists_split">
            <value name="DELIM">
                <shadow type="text">
                    <field name="TEXT">,</field>
                </shadow>
            </value>
        </block>
        <block type="lists_sort"></block>
    </category>
    <category id="catColour" colour="20" name="Color">
        <block type="colour_picker"></block>
        <block type="colour_random"></block>
        <block type="colour_rgb">
            <value name="RED">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="GREEN">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="BLUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="colour_blend">
            <value name="COLOUR1">
                <shadow type="colour_picker">
                    <field name="COLOUR">#ff0000</field>
                </shadow>
            </value>
            <value name="COLOUR2">
                <shadow type="colour_picker">
                    <field name="COLOUR">#3333ff</field>
                </shadow>
            </value>
            <value name="RATIO">
                <shadow type="math_number">
                    <field name="NUM">0.5</field>
                </shadow>
            </value>
        </block>
    </category>
    <category id="catVariables" colour="330" custom="VARIABLE" name="Variables"></category>
    <category id="catFunctions" colour="290" custom="PROCEDURE" name="Functions"></category>
</category>

      `;   


  }

/***/ }),

/***/ 21816:
/*!****************************************!*\
  !*** ../BlocklyScripts/emailBlocks.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
const Blockly =__webpack_require__(/*! blockly */ 5912);

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_NONE=99;
    blocks['blockemail'] = {
        init: function() {
          this.appendValueInput("from")
              .setCheck(null)
              .appendField("From:");
          this.appendValueInput("to")
              .setCheck(null)
              .appendField("To:");
          this.appendValueInput("cc")
              .setCheck(null)
              .appendField("CC:");
          this.appendValueInput("bcc")
              .setCheck(null)
              .appendField("BCC:");
          this.appendValueInput("subject")
              .setCheck(null)
              .appendField("Subject:");
          this.appendValueInput("body")
              .setCheck(null)
              .appendField("Body:")
              .appendField(new Blockly.FieldDropdown ([["HTML","Html"], ["TEXT","Text"]]), "NAME");
          this.setOutput(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };

      blocks['sendinblue'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("SendInBlue");
          this.appendValueInput("APIKey")
              .setCheck(null)
              .appendField("ApiKey");
          this.appendValueInput("email")
              .setCheck("blockemail")
              .appendField("Email");
        //   this.setPreviousStatement(true, null);
        //   this.setNextStatement(true, null);
          this.setColour(230);
       this.setTooltip("Please see https://account.sendinblue.com/advanced/api");
       this.setHelpUrl("https://account.sendinblue.com/advanced/api");
       this.setOutput(true, null);

        }
      };

      javaScript['sendinblue'] = function(block) {
        var value_apikey = javaScript.valueToCode(block, 'APIKey', javaScript.ORDER_ATOMIC);
        var value_email = javaScript.valueToCode(block, 'email', javaScript.ORDER_ATOMIC);
        var code = 'window.alert("SendInBlue");\n';
        // "(function(url,data){ var res=JSON.parse(postXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(" +
        //   value_theurl ;
        // if (value_data) {
        //   operation+="," +value_data           
        // }
        // operation += ") )";
        var domain="api.sendinblue.com";
        code = `(function(apiKey,email){if(!('${domain}' in headersForDomain)){ headersForDomain['${domain}']=[]; };\n`;
        code += `headersForDomain['${domain}'].push({"name":"api-key","value":apiKey});\n`;
        code += `headersForDomain['${domain}'].push({"name":"Content-Type","value":"application/json"});\n`;
        code += `headersForDomain['${domain}'].push({"name":"Accept","value":"application/json"});\n`;
        code += `var sendinblueData={"sender":{"email": email.from }, "to":[{"email":email.to }],"subject":email.subject,"htmlContent": email.body} ;\n`;
        code += `\nwindow.alert(JSON.stringify(sendinblueData));\n`;
        code += `var res=JSON.parse(postXhr("https://${domain}/v3/smtp/email",JSON.stringify(sendinblueData)));if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;\n`;
        
        code+="})("+value_apikey+","+value_email+")";
        return [code, javaScript.ORDER_NONE];

      };

    javaScript['blockemail'] = function(block) {
        var value_from = javaScript.valueToCode(block, 'from', javaScript.ORDER_ATOMIC);
        var value_to = javaScript.valueToCode(block, 'to', javaScript.ORDER_ATOMIC);
        var value_cc = javaScript.valueToCode(block, 'cc', javaScript.ORDER_ATOMIC);
        var value_bcc = javaScript.valueToCode(block, 'bcc', javaScript.ORDER_ATOMIC);
        var value_subject = javaScript.valueToCode(block, 'subject', javaScript.ORDER_ATOMIC);
        var dropdown_name = block.getFieldValue('NAME');
        var value_body = javaScript.valueToCode(block, 'body', javaScript.ORDER_ATOMIC);
        var value_json = '{';
        value_json += '"from":' + value_from + ',';
        value_json += '"to":' + value_to + ',';
        value_json += '"cc":' + value_cc + ',';
        value_json += '"bcc":' + value_bcc + ',';
        value_json += '"subject":' + value_subject + ',';
        value_json += '"body":' + value_body + ',';
        value_json += '"typeEmail":' + '"' + dropdown_name + '"' ;
        value_json += '}';
        // console.log(value_json);
        var code = `${value_json}`;
        return [code, javaScript.ORDER_NONE];
      };
      
}

exports.fieldXML = function () {
    return `<block type="blockemail">
        <value name="from">
            <shadow type="text">
                <field name="TEXT">test@test.com</field>
            </shadow>
        </value>
        <value name="to">
            <shadow type="text">
                <field name="TEXT">ignatandrei@yahoo.com</field>
            </shadow>
        </value>
        <value name="cc">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
        <value name="bcc">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
        <value name="subject">
            <shadow type="text">
                <field name="TEXT">My test email</field>
            </shadow>
        </value>
        <value name="body">
            <shadow type="text">
                <field name="TEXT">This is the body</field>
            </shadow>
        </value>
            </block>
        <block type="sendinblue">
        <value name="APIKey">
            <shadow type="text">
                <field name="TEXT">Please put here the API Key from SendInBlue</field>
            </shadow>
            
        </value>
        <value name="email">
            <shadow type="blockemail">
            </shadow>
            
        </value>
        
        </block>
`;
}

/***/ }),

/***/ 26577:
/*!********************************************!*\
  !*** ../BlocklyScripts/exportfileBlock.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;
  
    blocks['exportfile'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ExportToFile");
            this.appendValueInput("fileName")
                .setCheck(null)
                .appendField("FileName");
            this.appendValueInput("contentFile")
                .setCheck(null)
                .appendField("Content");
            this.appendValueInput("convertToByte")
                .setCheck("Boolean")
                .appendField("ConvertToByteFromBase64");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    
    javaScript['exportfile'] = function (block) {
    
        var value_filename = javaScript.valueToCode(block, 'fileName', /*javaScript.*/ORDER_ATOMIC);
        var value_contentfile = javaScript.valueToCode(block, 'contentFile', /*javaScript.*/ORDER_ATOMIC);
        var value_converttobyte = javaScript.valueToCode(block, 'convertToByte', /*javaScript.*/ORDER_ATOMIC);
        
        var code = 'exportToFile('+ value_filename+','+value_contentfile+','+ value_converttobyte + ');\n';
        return code;
    };
    
}

exports.fieldXML = function () {
    return `<block type="exportfile">
    <value name="fileName">
        <shadow type="text">
            <field name="TEXT">abc</field>
        </shadow>
    </value>
    <value name="convertToByte">
        <shadow type="logic_boolean">
            <field name="BOOL">FALSE</field>
        </shadow>
    </value>
</block>
`;
}


/***/ }),

/***/ 67650:
/*!*****************************************!*\
  !*** ../BlocklyScripts/filterBlocks.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

//call m  bs.filterBlocks.definitionBlocks(Blockly.Blocks, Blockly.JavaScript));
exports.definitionBlocks=function(blocks,javaScript){
    
    blocks['filterList'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("filterList");
              this.appendValueInput("LIST")
              .setCheck("Array");
              
              this.appendValueInput("Logic")
              .setCheck("String")
              .appendField("item=>");
              this.setInputsInline(true);
              this.setOutput(true, "Array");
              this.setColour(230);
              this.setTooltip("");
              this.setHelpUrl("");
        }
      };
     
      javaScript['filterList'] = function(block) {
        var list = javaScript.valueToCode(block, 'LIST',
        javaScript.ORDER_MEMBER) || '[]';
            
        var value_logic = javaScript.valueToCode(block, 'Logic', javaScript.ORDER_ATOMIC);
        if(typeof value_logic === 'string')// remove '
            value_logic = value_logic.substr(1,value_logic.length-2);
            
        var code = '';
          code += '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' + list  +')).filter(function (item){ return ' + value_logic +';})';
        code += '';
        
        return [code, javaScript.ORDER_FUNCTION_CALL];
      };
      
      blocks['mapList'] = {
          init: function () {
              this.appendDummyInput()
                  .appendField("mapList");
              this.appendValueInput("LIST")
                  .setCheck("Array");
      
              this.appendValueInput("Logic")
                  .setCheck("String")
                  .appendField("item=>");
              this.setInputsInline(true);
              this.setOutput(true, "Array");
              this.setColour(230);
              this.setTooltip("");
              this.setHelpUrl("");
          }
      };
      
      javaScript['mapList'] = function (block) {
          var list = javaScript.valueToCode(block, 'LIST',
          javaScript.ORDER_MEMBER) || '[]';
      
          var value_logic = javaScript.valueToCode(block, 'Logic', javaScript.ORDER_ATOMIC);
          if (typeof value_logic === 'string')// remove '
              value_logic = value_logic.substr(1, value_logic.length - 2);
      
          var code = '';
          code += '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' + list +')).map(function (item){ return ' + value_logic + ';})';
          code += '';
      
          return [code, javaScript.ORDER_FUNCTION_CALL];
      };

      blocks['reduceList'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("reduceList");

            this.appendValueInput("LIST")
                .setCheck("Array");
        
            this.appendValueInput("initValue")
                .setCheck(null)
                .appendField("initialValue");

            this.appendValueInput("Logic")
                .setCheck("String")
                .appendField("callback(acc,curVal,index, array)=>");
            
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    
    javaScript['reduceList'] = function (block) {
        
        var list = javaScript.valueToCode(block, 'LIST',
        javaScript.ORDER_MEMBER) || '[]';
    
        var value_initvalue = '';
        try{
            value_initvalue  = javaScript.valueToCode(block, 'initValue', javaScript.ORDER_ATOMIC);
        }
        catch(e){
            window.alert(e);
        }
        
        var value_logic = javaScript.valueToCode(block, 'Logic', javaScript.ORDER_ATOMIC);
        if (typeof value_logic === 'string')// remove '
            value_logic = value_logic.substr(1, value_logic.length - 2);
 
        
        var code = '';
        code += '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' + list +')).reduce(function (acc,curVal,index,array){ ' + value_logic + ';}';
        if(value_initvalue && value_initvalue.toString().length>0){
            code+=','+value_initvalue;   
        }
        code+=')';
        code += '';
    
        return [code, javaScript.ORDER_FUNCTION_CALL];
    };
}
exports.fieldXML=function(){
    return `
        <category id="catA" name="Array">
            <block type="filterList">
                <value name="LIST">
                    <block type="variables_get">
                        <field name="VAR">list</field>
                    </block>
                </value>
                <value name="initValue">
                    <shadow type="text">
                        <field name="TEXT"> </field>
                    </shadow>
                </value>
                <value name="Logic">
                    <shadow type="text">
                        <field name="TEXT">item.property == "value"</field>
                    </shadow>
                </value>
            </block>
            <block type="mapList">
            <value name="LIST">
                <block type="variables_get">
                    <field name="VAR">list</field>
                </block>
            </value>
            <value name="Logic">
                <shadow type="text">
                    <field name="TEXT">item.property</field>
                </shadow>
            </value>
        </block>
        <block type="reduceList">
        <value name="LIST">
        <block type="variables_get">
                <field name="VAR">list</field>
            </block>
            </value>
            <value name="Logic">
                <shadow type="text">
                    <field name="TEXT">...</field>
                </shadow>
            </value>
        </block>
        </category>

`
}


/***/ }),

/***/ 4184:
/*!**************************************!*\
  !*** ../BlocklyScripts/guiBlocks.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Blockly=__webpack_require__(/*! blockly */ 5912);
exports.definitionBlocks=function (blocks, javaScript){
    const ORDER_NONE= 99;
    const ORDER_ATOMIC= 0;
    blocks['window_open'] = {
  
        init: function() {
          this.jsonInit({
            "message0": 'Open %1',
            "args0": [
              {
                "type": "input_value",
                "name": "TEXT"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "text_blocks"
            
          });
        }
      };
          
      
          
      javaScript['window_open'] = function(block) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
            /*javaScript.*/ORDER_NONE) || '\'\'';

        
        return 'if((typeof '+msg+' == "object") && ("to" in '+msg+')){open("mailto:'+ msg.to+'")}else{ open(' + msg + ')};\n';
      };

      blocks['text_message'] = {
        init: function() {
          this.jsonInit({
            "message0": 'alert %1',
            "args0": [
              {
                "type": "input_value",
                "name": "TEXT"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "text_blocks"
            
          });
        }
      };
      javaScript['text_message'] = function(block) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
        /*javaScript.*/ORDER_NONE) || '\'\'';
        
        var code= 'alert1(' + msg + ');\n';
        return code;
      };
      

      blocks['text_print_return'] = {
        init: function() {
          this.appendValueInput("TEXT")
              .setCheck(null)
              .appendField("print return")
              .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
          this.setOutput(true, null);
          
       this.setTooltip("");
       this.setHelpUrl("");
        }
      };
      
      javaScript['text_print_return'] = function(block) {
        // Print statement.
        var msg = javaScript.valueToCode(block, 'TEXT',
        /*javaScript.*/ORDER_ATOMIC) || '\'\'';
        
        var code= '(function(){window.alert(' + msg + ');\n;return (' + msg + ');}())\n';
        return [code, /*javaScript.*/ORDER_NONE];
      };
      

      blocks['valuefromtext'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("InputFromText");
          this.appendValueInput("IdOfText")
              .setCheck("String")
              .appendField("Text id");
        this.appendValueInput("ValueToObtain")
              .setCheck("String")
              .appendField("Property");
          this.setOutput(true, null);
          this.setColour(230);
       this.setTooltip("");
       this.setHelpUrl("");
        }
      }
        
       javaScript['valuefromtext'] = function(block) {
        var value_idoftext = javaScript.valueToCode(block, 'IdOfText', /*javaScript.*/ORDER_ATOMIC);
        var value_valuetoobtain = javaScript.valueToCode(block, 'ValueToObtain', /*javaScript.*/ORDER_ATOMIC)||'"value"';
        var code = 'getIDProp('+ value_idoftext+','+ value_valuetoobtain+')';
        return [code, /*javaScript.*/ORDER_NONE];
      };
}

exports.fieldXML = function () {
    return `<block type="window_open"></block>
    <block type="valuefromtext">
        <value name="IdOfText">
            <shadow type="text">
                <field name="TEXT">output</field>
            </shadow>
        </value>
        <value name="ValueToObtain">
            <shadow type="text">
                <field name="TEXT">value</field>
            </shadow>
        </value>
    </block>
    <block type="text_print"></block>
    <block type="text_print_return"></block>  
    <block type="text_prompt_ext"></block>
    <block type="text_message"></block>
    
    `;
}

/***/ }),

/***/ 73134:
/*!**********************************!*\
  !*** ../BlocklyScripts/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// exports.printMsg = function() {
//     window.alert("This is a message from the demo package");
//   }

// exports.filter1={
//   "asd":"asdasd"
// }

module.exports = {
  
  defaultBlocks: __webpack_require__(/*! ./defaultBlocks */ 24534),
  filterBlocks: __webpack_require__(/*! ./filterBlocks */ 67650),
  waitBlocks: __webpack_require__(/*! ./wait_block */ 33206),
  xhrBlocks: __webpack_require__(/*! ./xhrBlocks */ 77768),
  propBlocks: __webpack_require__(/*! ./propBlocks */ 86958),
  guiBlocks: __webpack_require__(/*! ./guiBlocks */ 4184),
  convertersBlocks: __webpack_require__(/*! ./convertersBlocks */ 84591),
  exportFileBlock: __webpack_require__(/*! ./exportfileBlock */ 26577),
  createObjectBlocks: __webpack_require__(/*! ./createObjectBlocks */ 53160),
  currentDateBlock: __webpack_require__(/*! ./currentDateBlock */ 83761),
  dateFromTextBlock: __webpack_require__(/*! ./dateFromTextBlock */ 99225),
  waitBlocks: __webpack_require__(/*! ./waitBlocks */ 60797),
  commentBlock: __webpack_require__(/*! ./commentBlock */ 66737),
  auth0Blocks: __webpack_require__(/*! ./auth0Blocks */ 30101),
  windowsCreds: __webpack_require__(/*! ./WindowsCreds */ 16537),
  trycatchFinBlock: __webpack_require__(/*! ./tryCatchFinBlock */ 78639),
  chartBlock: __webpack_require__(/*! ./chartBlock */ 77868),
  emailBlocks: __webpack_require__(/*! ./emailBlocks */ 21816),
  htmlblocks: __webpack_require__(/*! ./HTMLBlocks */ 32253),
  ttsBlock: __webpack_require__(/*! ./TTSBlock */ 61096),
  pianoBlock: __webpack_require__(/*! ./pianoBlock */ 41450)

};

/***/ }),

/***/ 41450:
/*!***************************************!*\
  !*** ../BlocklyScripts/pianoBlock.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }
const Blockly = __webpack_require__(/*! blockly */ 5912);
// const a = require('./audioTest.js');
exports.definitionBlocks = function (blocks, javaScript) {
  blocks["pianoBlock"] = {
    init: function () {
      this.appendValueInput("Note").setCheck("String").appendField("Note(A-G)");
      this.appendValueInput("Sharp")
        .setCheck("Boolean")
        .appendField("#");
      this.appendValueInput("Octave").setCheck("Number").appendField("Octave");
      this.appendValueInput("Duration")
        .setCheck("Number")
        .appendField("Duration");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("https://github.com/keithwhor/audiosynth");
    },
  };
  javaScript["pianoBlock"] = function (block) {
    // var dropdown_voice = block.getFieldValue('Voice');
    var value_note = javaScript.valueToCode(block, 'Note', javaScript.ORDER_ATOMIC);
  var value_sharp = javaScript.valueToCode(block, 'Sharp', javaScript.ORDER_ATOMIC)|| false;
  var value_octave = javaScript.valueToCode(block, 'Octave', javaScript.ORDER_ATOMIC);
  var value_duration = javaScript.valueToCode(block, 'Duration', javaScript.ORDER_ATOMIC)|| 2;
 
  var valSharp = '';
  if(value_sharp == "true"){
        valSharp='#';
    }   
    var code = 'playPiano(' + value_note+ valSharp+','+value_octave +','+ value_duration+');\n';
    return code;
  };

  blocks['cmajor'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("CMajor ");
      this.setOutput(true, "Array");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  javaScript['cmajor'] = function(block) {
    var code = '["C","D","E","F","G","A","B"]';
    return [code, javaScript.ORDER_NONE];
  };
  


};

exports.fieldXML = function () {
  return `<block type="pianoBlock">
        <value name="Note">
            <shadow type="text">
            <field name="TEXT">C</field></shadow>
        </value>       
        <value name="Octave">
            <shadow type="math_number">
            <field name="NUM">4</field></shadow>
        </value>       
        <value name="Sharp">
            <shadow type="logic_boolean">
            <field name="BOOL">FALSE</field></shadow>
        </value>       
        
        <value name="Duration">
            <shadow type="math_number">
            <field name="NUM">2</field></shadow>
        </value>       
        </block>
        <block type="cmajor"></block>

`;
};


/***/ }),

/***/ 86958:
/*!***************************************!*\
  !*** ../BlocklyScripts/propBlocks.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Blockly=__webpack_require__(/*! blockly */ 5912);
exports.definitionBlocks = function (blocks, javaScript) {
    const ALIGN_RIGHT=1;
    const ALIGN_CENTRE=0;
    const ORDER_ATOMIC = 0;
    const ORDER_NONE= 99;
  blocks["modifyproperty"] = {
    init: function () {
      this.appendDummyInput().appendField("Modify ");
      this.appendValueInput("ObjectToChange")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_CENTRE)
        .appendField(
          new Blockly.FieldLabelSerializable("object"),
          "objectName"
        );
      this.appendValueInput("PropertyName")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_RIGHT)
        .appendField(new Blockly.FieldLabelSerializable(",property"), "prop");
      this.appendValueInput("NewValue")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_RIGHT)
        .appendField(new Blockly.FieldLabelSerializable("toValue"), "newValue");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
  javaScript["modifyproperty"] = function (block) {
    var value_objecttochange = javaScript.valueToCode(
      block,
      "ObjectToChange",
      /*javaScript.*/ORDER_ATOMIC
    );
    var value_propertyname = javaScript.valueToCode(
      block,
      "PropertyName",
      /*javaScript.*/ORDER_ATOMIC
    );
    var value_newvalue = javaScript.valueToCode(
      block,
      "NewValue",
      /*javaScript.*/ORDER_ATOMIC
    );
    var code =
      value_objecttochange +
      "[" +
      value_propertyname +
      "]=" +
      value_newvalue +
      ";";
    return code;
  };
  blocks["getproperty"] = {
    init: function () {
      this.appendDummyInput().appendField("Get from");
      this.appendValueInput("ObjectToChange")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_CENTRE)
        .appendField(
          new Blockly.FieldLabelSerializable("object"),
          "objectName"
        );
      this.appendValueInput("PropertyName")
        .setCheck(null)
        .setAlign(/*Blockly.*/ALIGN_RIGHT)
        .appendField(new Blockly.FieldLabelSerializable("property"), "prop");
      this.setInputsInline(true);
      this.setOutput(true, null);
      //this.setTooltip("");
      //this.setHelpUrl("");
    },
  };
  javaScript["getproperty"] = function (block) {
    var value_objecttochange = javaScript.valueToCode(
      block,
      "ObjectToChange",
      /*javaScript.*/ORDER_ATOMIC
    );

    var value_propertyname = javaScript.valueToCode(
      block,
      "PropertyName",
      /*javaScript.*/ORDER_ATOMIC
    );

    var code =
      '(function(t){ if (typeof t === "string") return JSON.parse(t);  return t;}(' +
      value_objecttochange +
      "))[" +
      value_propertyname +
      "]";

    return [code, /*javaScript.*/ORDER_NONE];
  };
};


exports.fieldXML = function () {
    return `
    
    <block type="modifyproperty">
        <value name="PropertyName">
            <shadow type="text">
                <field name="TEXT">enter property name</field>
            </shadow>
        </value>
    </block>
    <block type="getproperty">
        <value name="PropertyName">
            <shadow type="text">
                <field name="TEXT">enter property name</field>
            </shadow>
        </value>

    </block>    
`
}

/***/ }),

/***/ 78639:
/*!*********************************************!*\
  !*** ../BlocklyScripts/tryCatchFinBlock.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;


    blocks['trycatchfinally'] = {
      init: function() {
        this.appendStatementInput('TRY')
        .appendField('try');
    this.appendStatementInput('CATCH')
        .appendField('catch');
    this.appendStatementInput('FINALLY')
        .appendField('finally');
    
        this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
        //this.setColour(230);
     //this.setTooltip("");
     //this.setHelpUrl("");
      }
    };
    javaScript['trycatchfinally'] = function(block) {
      var statements_try = javaScript.statementToCode(block, 'TRY');
      var statements_catch = javaScript.statementToCode(block, 'CATCH');
      var statements_finally = javaScript.statementToCode(block, 'FINALLY');
      
      var code = 'try {\n' + statements_try + '}\n'; 
      code += 'catch(err){\n errHandler(JSON.stringify(err));\n' + statements_catch + '\n}';
      code += 'finally{\n ' + statements_finally + '\n}\n';

      return code;
    };
  };
exports.fieldXML =function(){
    return `
    
    <block type="trycatchfinally">
    
</block>
`
}

/***/ }),

/***/ 60797:
/*!***************************************!*\
  !*** ../BlocklyScripts/waitBlocks.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

// exports.definitionBlocks = function (blocks, javaScript) {
// }

// exports.fieldXML = function () {
// }

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    blocks['wait'] = {
    init: function() {
      this
			.appendValueInput('VALUE')            
            .appendField('wait secs');
          // .appendField("delay")
          // .appendField(new Blockly.FieldNumber(10, 0), "wait")
          // .appendField("secs");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      //this.setColour();
      //this.setTooltip('');
      //this.setHelpUrl('');
    }
  };

  javaScript['wait'] = function(block) {
    var number_wait = javaScript.valueToCode(block, 'VALUE', javaScript.ORDER_ATOMIC)|| '';    
    var code= 'waitTime('+ 	number_wait+');';
	return code;
  };
  
  
  blocks['wait_until'] = {
    init: function() {
      this
			.appendValueInput('VALUE')            
            .appendField('wait until date');
          
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      //this.setColour();
      //this.setTooltip('');
      //this.setHelpUrl('');
    }
  };

  javaScript['wait_until'] = function(block) {
    var number_wait = javaScript.valueToCode(block, 'VALUE', /*javaScript.*/ORDER_ATOMIC)|| '';    
    //console.log(number_wait);
	
	var code= 'waitTime(('+ number_wait+'-new Date())/1000);';
	return code;
  };

}

exports.fieldXML = function () {
    return `
    <block type="wait">

    <value name="VALUE">
        <shadow type="math_number">
            <field name="NUM">10</field>
        </shadow>
    </value>

</block>
<block type="wait_until">

</block>`;
}


/***/ }),

/***/ 33206:
/*!***************************************!*\
  !*** ../BlocklyScripts/wait_block.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Example "wait" block that will pause the interpreter for a
 * number of seconds. Because wait is a blocking behavior, such blocks will
 * only work in interpreted environments.
 *
 * See https://neil.fraser.name/software/JS-Interpreter/docs.html
 */
//modified by Andrei Ignat for BlocklyScripts
exports.definitionBlocks = function (blocks_defineBlocksWithJsonArray, javaScript) {
  blocks_defineBlocksWithJsonArray([{
    "type": "wait_seconds",
    "message0": " wait %1 seconds",
    "args0": [{
      "type": "field_number",
      "name": "SECONDS",
      "min": 0,
      "max": 600,
      "value": 1
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}"
  }]);
  /**
   * Generator for wait block creates call to new method
   * <code>waitForSeconds()</code>.
   */

  javaScript['wait_seconds'] = function (block) {
    var seconds = Number(block.getFieldValue('SECONDS'));
    var code = 'waitForSeconds(' + seconds + ');\n';
    return code;
  };
};
/**
 * Register the interpreter asynchronous function
 * <code>waitForSeconds()</code>.
 */
//added in interpreter async
// function initInterpreterWaitForSeconds(interpreter, globalObject) {
//   // Ensure function name does not conflict with variable names.
//   Blockly.JavaScript.addReservedWords('waitForSeconds');
//   var wrapper = interpreter.createAsyncFunction(
//     function(timeInSeconds, callback) {
//       // Delay the call to the callback.
//       setTimeout(callback, timeInSeconds * 1000);
//     });
//   interpreter.setProperty(globalObject, 'waitForSeconds', wrapper);
// }


exports.fieldXML = function () {
  return `
  <block type="wait_seconds"></block>
`;
};

/***/ }),

/***/ 77768:
/*!**************************************!*\
  !*** ../BlocklyScripts/xhrBlocks.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Blockly =__webpack_require__(/*! blockly */ 5912);

exports.definitionBlocks = function (blocks, javaScript) {
    const ORDER_ATOMIC = 0;
    const ORDER_NONE=99;


    blocks['headersbeforehttp'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Add Headers");
        this.appendValueInput("HttpDomain")
            .setCheck("String")
            .appendField("Domain");
        this.appendValueInput("HeaderName")
            .setCheck("String")
            .appendField("Header Name");
        this.appendValueInput("HeaderValue")
            .setCheck("String")
            .appendField("Header Value");
      this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        //this.setColour(230);
     this.setTooltip("at domain put (localSite) or *");
     //this.setHelpUrl("");
      }
    };
    javaScript['headersbeforehttp'] = function(block) {
      var value_httpdomain = javaScript.valueToCode(block, 'HttpDomain', /*javaScript.*/ORDER_ATOMIC)||'(localSite)';
      var value_headername = javaScript.valueToCode(block, 'HeaderName', /*javaScript.*/ORDER_ATOMIC);
      var value_headervalue = javaScript.valueToCode(block, 'HeaderValue', /*javaScript.*/ORDER_ATOMIC);
      
      var code = '\n';//'alert("a" + JSON.stringify(headersForDomain)+"a");\n';
      code +='{\n';
      code +='if(!(' + value_httpdomain + ' in headersForDomain))\n';
      code +='{\n';
      code +='headersForDomain[' + value_httpdomain +']=[];\n';
      code +='};\n';
      code +='var arr = headersForDomain[' + value_httpdomain +'];\n';
      code +='arr.push({name:' + value_headername +', value:'+value_headervalue+'});\n';
      code +='//alert("a" + JSON.stringify(arr)+"a");\n';
      code +='//alert("a" + JSON.stringify(headersForDomain[' + value_httpdomain +'])+"a");\n';
      code +='};\n';
      return code;
    };

  blocks["httprequest"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(
          /*new*/ new Blockly.FieldDropdown([
            ["JSON", "JSON"],
            ["Text", "Text"],
          ]),
          "TypeOutput"
        )
        .appendField("HttpRequest");
      this.appendValueInput("TheUrl")
        .setCheck(null)
        .appendField(
          /*new*/ new Blockly.FieldDropdown([
            ["GET", "GET"],
            ["POST", "POST"],
            ["PUT", "PUT"],
            ["DELETE", "DELETE"],
          ]),
          "TypeRequest"
        )
        .appendField("URL");
      this.appendValueInput("Data").setCheck(null).appendField("Data");
      this.setOutput(true, null);
      //this.setColour(230);
      //this.setTooltip("");
      //this.setHelpUrl("");
    },
  };

  javaScript["httprequest"] = function (block) {
    var dropdown_typeoutput = block.getFieldValue("TypeOutput");
    var dropdown_typerequest = block.getFieldValue("TypeRequest");
    var value_theurl = javaScript.valueToCode(
      block,
      "TheUrl",
      /*javaScript.*/ORDER_ATOMIC
    );
    var value_data = javaScript.valueToCode(
      block,
      "Data",
      /*javaScript.*/ORDER_ATOMIC
    );
    var operation = "";
    switch (dropdown_typerequest.toString()) {
      case "GET":
        operation =
          "(function(url){ var res=JSON.parse(getXhr(url)); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(" +
          value_theurl +
          ") )";
        break;
      case "POST":
        // console.log('x',value_data)
        operation =
          "(function(url,data){ var res=JSON.parse(postXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(" +
          value_theurl ;
        if (value_data) {
          operation+="," +value_data           
        }
        operation += ") )";
        break;
      case "DELETE":
        operation =
          "(function(url,data){ var res=JSON.parse(deleteXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(" +
          value_theurl ;
        if (value_data) {
          operation+="," +value_data           
        }
        operation += ") )";
        break;
      case "PUT":
        operation =
          "(function(url,data){ var res=JSON.parse(putXhr(url,JSON.stringify(data))); if(res.statusOK) return res.text;errHandler(JSON.stringify(res)); throw res;}(" +
          value_theurl ;
        if (value_data) {
          operation+="," +value_data           
        }
        operation += ") )";
        break;
      default:
        alert("Do not understand : " + dropdown_typerequest.toString());
        break;
    }

    var code = operation;
    switch (dropdown_typeoutput) {
      case "JSON":
        code = "JSON.parse(" + code + ")";
    }

    return [code, /*javaScript.*/ORDER_NONE];
  };
};

exports.fieldXML =function(){
    return `
    
    <block type="headersbeforehttp">
    <value name="HttpDomain">
        <shadow type="text">
            <field name="TEXT">(localSite)</field>
        </shadow>
    </value>
    <value name="HeaderName">
        <shadow type="text">
            <field name="TEXT">Authorization</field>
        </shadow>
    </value>
    <value name="HeaderValue">
        <shadow type="text_join">

        </shadow>
    </value>
</block>
<block type="text_print">
<value name="TEXT">

    <block type="httprequest">
    <value name="TheUrl">
        <shadow type="text">
            <field name="TEXT">https://httpbin.org/get</field>
        </shadow>
    </value>
</block>
</value>
</block>    

`
}

/***/ }),

/***/ 43453:
/*!***********************************************!*\
  !*** ../BlocklySwagger/blocklySwaggerData.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _asyncToGenerator = (__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator.js */ 63752)["default"]);

const Blockly = __webpack_require__(/*! blockly */ 5912);

const vex = __webpack_require__(/*! vex-js */ 77249);

class TagsFunctions {
  functionName = '';
  tags = [];
}

class BlocklyReturnSwagger {
  constructor(url) {
    this.swaggerUrl = url;
  }

  GenerateBlocks = [];
  GenerateFunctions = [];
  fieldXMLObjects = [];
  fieldXMLFunctions = [];
  hasError = true;
  paths = [];
  name = '';
  operations = [];
  tagsSwagger = [];

  nameCategSwagger() {
    return `catSwagger${this.findHostNameRegular()}_${this.name}`;
  }

  metaBlocks() {
    var self = this;
    return function (blocks, javaScript) {
      var nameBlock = `meta_swagger_controllers_${self.name}`;
      blocks[nameBlock] = {
        init: function () {
          this.appendDummyInput().appendField("categories_" + self.name);
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl(self.swaggerUrl);
        }
      };

      javaScript[nameBlock] = function (block) {
        var categ = self.findCategSwaggerFromPaths();
        var obj = categ.map(it => {
          return {
            name: it //ops:self.operations.filter(op=>op.controller==it).map(op=>op.id)

          };
        });
        obj = {
          'name': self.name,
          'categories': obj
        };
        var code = JSON.stringify(obj);
        return [code, javaScript.ORDER_NONE];
      };

      var nameBlock = `meta_swagger_controllers_actions_${self.name}`;
      blocks[nameBlock] = {
        init: function () {
          this.appendDummyInput().appendField("categories_actions" + self.name);
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl(self.swaggerUrl);
        }
      };

      javaScript[nameBlock] = function (block) {
        var categ = self.findCategSwaggerFromPaths();
        var obj = categ.map(it => {
          return {
            name: it,
            ops: self.findfieldXMLFunctions(it).map(op => op.id).filter(op => op.length > 0)
          };
        });
        obj = {
          'name': self.name,
          'categories': obj
        };
        var code = JSON.stringify(obj);
        return [code, javaScript.ORDER_NONE];
      };
    };
  }

  cacheCategSwaggerFromPaths = [];

  findfieldXMLFunctions(controllerName) {
    var allPaths = this.openApiDocument.paths;
    var keys = Object.keys(allPaths);
    var urls = this.operations.filter(it => it.controller == controllerName); //console.log(urls);

    var xmlList = this.fieldXMLFunctions.filter(it => {
      if (it.id == '') return true;
      var val = it.id + '/';
      var existInfields = false;
      urls.forEach(url => {
        if (val.startsWith(url.id)) existInfields = true;
      });
      if (existInfields) return true;
      urls.forEach(url => {
        //url has latest / , but can have also {  for parameters
        var str = url.id.substring(0, url.id.lastIndexOf('/')) + '{';
        if (val.startsWith(str)) existInfields = true;
      });
      return existInfields;
    }); // console.log('x',xmlList);

    return xmlList;
  }

  findCategsFromTags() {
    var allPaths = this.openApiDocument.paths;
    var keys = Object.keys(allPaths);
    var self = this;
    keys.forEach(function (key) {
      var path = allPaths[key]; // console.log('x',path);

      if (path) {
        var objKeys = Object.keys(path);
        objKeys.forEach(function (objKey) {
          //console.log('z',path[objKey]);
          var tags = path[objKey].tags;
          if (tags && tags.length > 0) tags.forEach(function (tag) {
            if (!self.cacheCategSwaggerFromPaths.includes(tag)) {
              self.cacheCategSwaggerFromPaths.push(tag);
            }

            self.operations.push({
              controller: tag,
              id: key
            });
          });
        });
      }
    });
  }

  findCategSwaggerFromPaths() {
    this.findCategsFromTags();
    if (this.cacheCategSwaggerFromPaths.length > 0) return this.cacheCategSwaggerFromPaths;
    var normalized = this.paths.filter(it => it && it.id && it.id.length > 0).map(it => {
      var len = it.id.length;
      var i = it.id.indexOf("{");

      while (i > 0) {
        // /api/v{version}
        var closing = it.id.indexOf("}", i);

        if (len - closing < 2) {
          it.id = it.id.substring(0, i);
          break;
        }

        i = it.id.indexOf("{", closing);
      }

      return it;
    }).map(it => {
      if (it.id.lastIndexOf("/") != it.id.length - 1) it.id += "/";
      return it;
    });
    ;
    this.operations = normalized.filter(it => it.nrOps > 1) //.map(it=>it.id)
    .map(it => {
      var ret = {
        arr: it.id.split('/').filter(a => a.length > 0),
        id: it.id
      };
      return ret;
    }).map(it => {
      return {
        controller: it.arr[it.arr.length - 1],
        id: it.id
      };
    });
    var others = normalized.filter(it => it.nrOps == 1).map(it => {
      return {
        arr: it.id.split('/').filter(a => a.length > 0),
        id: it.id
      };
    }).map(it => {
      if (it.arr.length == 1) return {
        controller: it.arr[0],
        id: it.id
      };
      return {
        controller: it.arr[it.arr.length - 2],
        id: it.id
      };
    });
    this.operations.push(...others);
    this.cacheCategSwaggerFromPaths = [...new Set(this.operations.map(it => it.controller))];
    return this.cacheCategSwaggerFromPaths;
  }

  categSwagger() {
    var h = this.findHostNameRegular();
    h = h.replaceAll(".", "");
    var max = 5;
    if (h.length > max) var first = h.substring(0, max);
    var categ = this.nameCategSwagger();
    return '<category name="Objects' + '" custom="objects_' + categ + '"></category>' + '<category name="AllApi' + '" custom="AllApi_' + categ + '"></category>';
  }

  findRootSite() {
    var href = this.swaggerUrl;
    var hostname = "";

    if (href.startsWith("http://") || href.startsWith("https://")) {
      var url = new URL(href);
      hostname = url.protocol + "//" + url.hostname;
      if (url.port.length > 0) hostname += ":" + url.port;
    }

    return hostname;
  }

  findHostNameRegular() {
    var href = this.swaggerUrl;
    var hostname = "(localSite)";

    if (href.startsWith("http://") || href.startsWith("https://")) {
      var url = new URL(href);
      var port = url.port ?? 80;
      hostname = url.hostname + port;
    }

    return hostname.replaceAll(".", "");
  }

  openApiDocument = null;
  basePath = "";

  showWindowToLoad(defaultPrompt, callback) {
    var self = this;

    try {
      vex.registerPlugin(__webpack_require__(/*! vex-dialog */ 22853));
    } catch (e) {//do nothing
    }

    vex.defaultOptions.className = 'vex-theme-os';
    vex.dialog.prompt({
      message: "Swagger url?",
      placeholder: defaultPrompt,
      callback: callback
    });
  }

  ParseSwagger() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var self = _this;
      self.fieldXMLObjects.push(`<label text="${self.swaggerUrl}"></label>`);
      self.fieldXMLFunctions.push({
        id: '',
        gui: `<label text="${self.swaggerUrl}"></label>`
      });
      var r = null;

      try {
        // const SwaggerParser = require("@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation");
        // var q = await SwaggerParser.default(this.swaggerUrl);
        //var r = q.response;
        const SwaggerParser = __webpack_require__(/*! swagger-client */ 75682);

        var q = yield SwaggerParser.default(_this.swaggerUrl); // if(this.swaggerUrl.indexOf('blockly')>0){
        //   console.log("b__",q.spec.paths);
        //     console.log("b__",q.spec.paths["MathDivideRest"]);
        //     console.log("b__",q.apis["MathDivideRest"]);
        // }

        var r = q.spec;
      } catch (e) {
        console.error(`parseSwagger ${_this.swaggerUrl}`, e);
        self.fieldXMLObjects.push(`<label text='Error parsing!'></label>`);
        return _this;
      }

      _this.hasError = false;
      _this.basePath = r.basePath || ''; // console.log("basepath"+ this.swaggerUrl,this.basePath);
      //var r = q.response;
      // console.log(r.paths);

      var data = r.components?.schemas;

      if (data == null || data == undefined) {
        //console.log(this.swaggerUrl,data);
        data = r.definitions;
      }

      if (data) {
        var keys = Object.keys(data).sort();
        keys.forEach(function (key) {
          // console.log(key);
          var schema = data[key];
          var objPropString = self.findProperties(schema);
          var xmlBlockShow = `<block type="${key}">`;
          objPropString.forEach(function (prop) {
            //console.log('y_'+prop.key,prop);
            if (prop.value && prop.value.type) {
              var shadow = self.GenerateShadowField(prop.value.type, prop.key);

              if (shadow.length > 0) {
                //xmlBlockShow += `<field name="${prop.key}">${shadow}</field>`;
                var shadowBlock = `<value name="val_${prop.key}">${shadow}</value>`; // if(prop.key=='authority'){
                //   console.log('z'+prop.key,shadowBlock);
                // }

                xmlBlockShow += shadowBlock;
              }
            }
          });
          xmlBlockShow += '</block>';
          self.fieldXMLObjects.push(xmlBlockShow);
          self.GenerateBlocks.push(self.GenerateBlock(schema, key));
        });
      } else {
        console.log("_A", r);
      }

      if (r.paths) {
        Object.keys(r.paths).forEach(function (key) {
          var path = r.paths[key];
          self.paths.push({
            id: key,
            nrOps: Object.keys(path).length
          });
          Object.keys(path).forEach(function (oo) {
            var ops = path[oo]; // if(ops && ops["tags"]){
            //     console.log('z_',ops["tags"]);0
            // }

            self.GenerateFunctions.push(self.GenerateFunction(path, key, ops, oo));
          });
        });
      }

      self.openApiDocument = r; // console.log(self.openApiDocument);

      return self;
    })();
  } // findPath(key){
  //   return this.openApiDocument.paths[key];
  // }


  findProperties(schema) {
    var objPropString = [];

    if (schema.properties) {
      Object.keys(schema.properties).forEach(key => {
        //var t = self.TranslateToBlocklyType(schema.properties[key].type);
        // console.log(key, schema.properties[key]);
        objPropString.push({
          key: key,
          value: schema.properties[key]
        });
      });
    }

    return objPropString;
  }

  GenerateNameFunction(path, key, operation, operationKey) {
    var ret = key.replaceAll("/", "_").replaceAll("{", "__").replaceAll("}", "");
    return operationKey + "_" + ret;
  }

  GenerateShadowField(blockShadowType, key, defaultValue) {
    switch (blockShadowType) {
      case "integer":
        var val = defaultValue ? defaultValue : 0;
        return `<block type='math_number'><field name='NUM'>${val}</field></block>`;

      case "string":
        var val = defaultValue ? defaultValue : `please enter ${key}`;
        return `<block type='text'><field name='TEXT'>${val}</field></block>`;

      case "boolean":
        var val = defaultValue ? defaultValue : "FALSE";
        return `<block type='logic_boolean'><field name='BOOL'>${val}</field></block>`;

      case "array":
        return '<block type="lists_create_with"> <mutation items="0"></mutation></block>';

      default:
        return "";
    }
  }

  GenerateFunction(path, key, operation, operationKey) {
    var self = this;
    var blocklyTypeName = self.GenerateNameFunction(path, key, operation, operationKey);
    var props = "";
    var op = operation; //console.log(key);
    //console.log(operationKey);
    // console.log(`assets/httpImages/${operationKey}.png`);
    // console.log(operation);

    var xmlBlockShow = `<block type="text_print"> <value name="TEXT"><block type="${blocklyTypeName}">`;

    if (op.parameters) {
      op.parameters.forEach(it => {
        if (it.type) {
          var shadow = self.GenerateShadowField(it.type, it.name);

          if (shadow.length > 0) {
            xmlBlockShow += `<value name="val_${it.name}">${shadow}</value>`;
          }
        } else {
          if (it.schema && it.schema.type) {
            var shadow = self.GenerateShadowField(it.schema.type, it.name);

            if (shadow.length > 0) {
              xmlBlockShow += `<value name="val_${it.name}">${shadow}</value>`;
            }
          }

          ;
        }
      });
    }

    ; // add override host

    var host = "";
    var port = "";

    try {
      var url = new URL(self.findRootSite());
      host = url.hostname;
      port = url.port;
    } catch (e) {//do nothing
    }

    host = host ? host : " ";
    var shadow = self.GenerateShadowField('string', 'override_host', host); //  console.log('X_override_host',shadow);

    xmlBlockShow += `<value name="override_Host">${shadow}</value>`;
    port = port ? port : "0";
    var shadow = self.GenerateShadowField('integer', 'override_port', port); //  console.log('X_override_host',shadow);

    xmlBlockShow += `<value name="override_Port">${shadow}</value>`;
    xmlBlockShow += `</block></value>`;
    xmlBlockShow += `</block>`;
    self.fieldXMLFunctions.push({
      id: key,
      gui: xmlBlockShow
    });
    return function (blocks, javaScript) {
      blocks[blocklyTypeName] = {
        init: function () {
          //this.setInputsInline(true);
          var displayOpKey = operationKey;

          switch (operationKey.toString().toLowerCase()) {
            case "get":
              displayOpKey = "";
              this.setColour(210);
              break;

            case "post":
              displayOpKey = "";
              this.setColour(165);
              break;

            case "put":
              displayOpKey = "";
              this.setColour(40);
              break;

            case "delete":
              displayOpKey = "";
              this.setColour(10);
              break;

            default:
              console.log(`not found ${operationKey}`);
              this.setColour(10);
          }

          var str = key;
          var categs = self.findCategSwaggerFromPaths();

          for (var i = 0; i < categs.length; i++) {
            var find = '/' + categs[i] + '/';
            var whereFind = key.indexOf(find);

            if (whereFind > -1) {
              var remains = key.substring(whereFind + find.length);

              if (remains.length < str.length) {
                str = remains;
              }
            }
          }

          if (str.length > 25) str = str.substring(0, 25) + "...";
          this.appendDummyInput().appendField(new Blockly.FieldImage(`assets/httpImages/${operationKey}.png`, 90, 20, operationKey)).appendField(`${displayOpKey} ${str}`);
          var root = self.findRootSite();
          if (op.parameters) op.parameters.forEach(it => {
            var name = it.name;

            if (it.required) {
              name += "*";
            }

            if (it.type) {
              name += ":" + it.type;
            } else {
              if (it.schema) {
                if (it.schema.enum && "$$ref" in it.schema) {
                  var s = it.schema["$$ref"].split("/");
                  name += "=>" + s[s.length - 1];
                } else if (it.schema.type) {
                  if (it.schema.type == 'object') {
                    var val = it.schema["$$ref"] || '';

                    if (val.length > 0) {
                      val = val.substring(val.lastIndexOf("/") + 1);
                      name += ":" + val;
                    }
                  } else {
                    name += ":" + it.schema.type;
                  }
                }
              }
            }

            this.appendValueInput(`val_${it.name}`).appendField(name);
          });

          if (op.requestBody) {
            var type = "";

            if (op.requestBody.content) {
              var jsonResp = op.requestBody.content['application/json'];

              if (jsonResp && jsonResp.schema) {
                var ref = jsonResp.schema["$$ref"];

                if (ref) {
                  type = "=>" + ref.substring(ref.lastIndexOf("/") + 1); //var schema=self.openApiDocument.components.schemas[ref.substring(ref.lastIndexOf("/")+1)];
                  // if(schema){
                  //   var properties=self.findProperties(schema);
                  //   properties.forEach((it)=>{
                  //     this.appendValueInput(`val_${it.key}`).appendField(it.key);
                  //   });
                  // }
                }
              }
            }

            this.appendValueInput('val_values').appendField('values' + type).setCheck();
          }

          this.appendValueInput('override_Host').appendField("override Host");
          this.appendValueInput('override_Port').appendField("override Port"); // this.appendValueInput('override_Port')
          //     .appendField("override Port");

          this.setTooltip(`${operationKey} ${root}${key}`);
          this.setOutput(true, "");
        }
      };

      javaScript[blocklyTypeName] = function (block) {
        //https://netcoreblockly.herokuapp.com/blocklyAPIFunctions?v=version
        //https://netcoreblockly.herokuapp.com/blockly.html?dom=20211115121043
        // console.log(blocklyTypeName);
        const ORDER_NONE = 99;
        const ORDER_ATOMIC = 0;
        var path = self.openApiDocument.paths[key];
        var operation = path[operationKey]; // console.log('a' , key);
        // console.log('a' , operationKey);
        // console.log('b',path);
        //  console.log('b',operation);
        // console.log('c',operation.parameters);

        var parameters = [];

        if ("parameters" in operation) {
          parameters = operation.parameters;
        }

        var hasBody = false;
        var hasBodyParameter = parameters.filter(it => it.in == 'body').length > 0;

        if (hasBodyParameter || 'requestBody' in operation) {
          hasBody = true;
        } //   if (blocklyTypeName.indexOf("RestWithArgs") > 0) {
        //     console.log(parameters);
        //  }


        var obj = {};
        var objBody = {};

        if (hasBody) {
          obj['val_values'] = javaScript.valueToCode(block, 'val_values',
          /*javaScript.*/
          ORDER_ATOMIC);
          objBody['val_values'] = obj['val_values'];
        }

        parameters.forEach(it => {
          //code +=`
          obj[`val_${it.name}`] = javaScript.valueToCode(block, `val_${it.name}`,
          /*javascript.*/
          ORDER_ATOMIC); //`;
        });
        var parameterFunctionDefinition = parameters.map(it => it.name); // console.log(parameterFunctionDefinition);

        if (hasBody & !hasBodyParameter) {
          parameterFunctionDefinition.push("values");
        }

        parameterFunctionDefinition.push("extraData");
        var callingFunctionDefinition = parameters.map(it => "${" + `obj['val_${it.name}']` + "}" + ",");
        callingFunctionDefinition += "1"; //maybe later we use for logging

        var code = "function(";
        code += parameterFunctionDefinition.join(",");
        code += "){\n";
        code += `var rootSite="` + self.findRootSite() + `";\n`; // code +="window.alert(JSON.stringify(extraData));\n";

        code += 'if(extraData){\n';
        code += 'if(extraData.url && extraData.url.host && extraData.url.host.length>0 ){\n';
        code += 'rootSite =  changeHost(rootSite, extraData.url.host);\n'; //it is  wrapper  for new  url

        code += "};\n"; // code +="\n";
        // code +="window.alert('a'+extraData.url.port.toString().length);";
        // code +="\n";

        code += 'if(extraData.url && extraData.url.port && extraData.url.port.toString().length>0 ){\n';
        code += 'rootSite  =changePort(rootSite , extraData.url.port);\n';
        code += '};\n';
        code += '};\n'; //  console.log("basepath",self.basePath);

        code += 'var strUrl =rootSite +"' + self.basePath + key + '";\n';
        var paramsQuery = parameters.filter(it => it.in == "query");

        if (paramsQuery.length > 0) {
          code += 'strUrl+="?";\n;';
          var data = paramsQuery.map(it => `${it.name}=` + "{" + it.name + "}").join("&"); // console.log(data);
          // console.log('strUrl += "'+data+'";'); 

          code += 'strUrl += "' + data + '";\n;';
        }

        var replaceUrl = parameters.filter(it => it.in == "path" || it.in == "query") //.map((it) => `strUrl = strUrl.replace("{${it.name}}",${it.name});`)
        .map(it => `
          //this gives error cannot read property 'call' of undefined in acorn
          //strUrl = strUrl.replace("{${it.name}}",${it.name});
          {
            var replaceFInd = "{${it.name}}";
            var index= strUrl.indexOf(replaceFInd);
            if(index>=0){
              var strUrlReplace = strUrl.substring(0,index)+ ${it.name} + strUrl.substring(index+replaceFInd.length);
              strUrl = strUrlReplace;
            }

          };`);
        code += replaceUrl.join("\n");
        code += `\n{var res= ${operationKey}Xhr(strUrl`;

        if (hasBody) {
          var values = "values";

          if (hasBodyParameter) {
            values = parameters.filter(it => it.in == 'body')[0].name;
          }

          code += `,JSON.stringify(${values})`;
        }

        code += `);\n`;
        code += "var resJS=JSON.parse(res);\n";
        code += "if(resJS.statusOK) return resJS.text;\n";
        code += "errHandler(res);\n}\n"; //code +=";}\n";
        // code += "\nreturn strUrl;\n";

        code += `}`;
        code += "(";
        parameters.forEach(it => {
          code += obj[`val_${it.name}`] + ",";
        });

        if (hasBody & !hasBodyParameter) {
          code += objBody['val_values'] + ",";
        } // if(hasBody)
        //   code +=`${JSON.stringify(objBody)}`;
        // else


        var urlReplace = "url:{notImportant:1";
        var override_Http = javaScript.valueToCode(block, 'override_Host',
        /*javascript.*/
        ORDER_ATOMIC);
        override_Http = override_Http || ''; //window.alert('x'+override_Http);

        if (override_Http.length > 0) urlReplace += `,host:${override_Http}`;
        var override_Port = javaScript.valueToCode(block, 'override_Port',
        /*javascript.*/
        ORDER_ATOMIC);
        override_Port = override_Port || ''; //window.alert('x'+override_Http);

        if (override_Port.length > 0) urlReplace += `,port:${override_Port}`; // var override_PortHttp = javaScript.valueToCode(block, 'override_Port ', /*javascript.*/ ORDER_ATOMIC);
        // window.alert('x'+override_PortHttp);
        // override_PortHttp= override_PortHttp ||'';
        // if(override_PortHttp.length>0)
        //   urlReplace+=`,port:${override_PortHttp}`;//extra parameter for later

        urlReplace += "}";
        code += `{${urlReplace}}\n`;
        code += ")"; //var code =`{GenerateGet(actionInfo)}({argsXHR})`;
        //console.log(code);
        // if (blocklyTypeName.indexOf("MathDivideRest") > 0) {
        //   console.log(code);
        //   // debugger;
        // }

        return [code,
        /*javaScript.*/
        ORDER_NONE];
      };
    };
  }

  GenerateBlock(schema, key) {
    var self = this;
    var blocklyTypeName = key;
    var props = "";
    var objPropString = self.findProperties(schema);
    return function (blocks, javaScript) {
      //   console.log(blocklyTypeName);
      blocks[blocklyTypeName] = {
        init: function () {
          //this.setInputsInline(true);
          var isEnum = false;
          var arrValue = [];

          if (schema.enum) {
            isEnum = true;
            var keys = Object.keys(schema.enum);

            if (schema['x-enumNames']) {
              arrValue = keys.map(it => {
                return [schema['x-enumNames'][it], it];
              });
            } else arrValue = keys.map(it => {
              return [schema.enum[it], it];
            });
          }

          var b = this.appendDummyInput().appendField(key);

          if (isEnum) {
            arrValue = arrValue.map(it => [it[0].toString(), it[1].toString()]);
            b.appendField(new Blockly.FieldDropdown(arrValue), `val_${key}`);
          } else {
            //{tooltipAndpropsDef.propsDef}
            //console.log('init', objPropString);
            objPropString.forEach(item => {
              //var t = self.TranslateToBlocklyType(key.type);
              var name = item.key;

              if (item.value.nullable && item.value.nullable == false) {
                name += "*";
              }

              if (item.value?.type) {
                var val = item.value.type || '';

                if (val == "object") {
                  // console.log(item);
                  var val1 = item.value["$$ref"] || '';

                  if (val1.length > 0) {
                    val = val1.substring(val1.lastIndexOf("/") + 1);
                  }
                }

                name += ":" + val;
              }

              if (item.value['$ref']) {
                var nameRef = item.value['$ref'].replaceAll("#/components/schemas/", "");
                name += "->" + nameRef;
              }

              this.appendValueInput(`val_${item.key}`) //   .setCheck('{property.PropertyType.TranslateToNewTypeName()}')
              .appendField(`${name}`);
            });
          } //this.setTooltip(`${this.swaggerUrl}`);


          this.setOutput(true, blocklyTypeName);
        }
      };

      javaScript[blocklyTypeName] = function (block) {
        {
          //console.log(blocklyTypeName, self.openApiDocument);
          // var actualSchema = self.openApiDocument.components.schemas[blocklyTypeName];
          // console.log(blocklyTypeName, actualSchema);
          var isEnum = false;

          if (schema.enum) {
            isEnum = true;
          }

          var objPropStringFound = self.findProperties(schema); //console.log(blocklyTypeName, objPropStringFound);

          const ORDER_NONE = 99;
          const ORDER_ATOMIC = 0;
          var code = "";
          var objPropString = [];
          objPropStringFound.forEach(it => {
            let val = javaScript.valueToCode(block, `val_${it.key}`,
            /*javaScript.*/
            ORDER_ATOMIC); //console.log('found ' + val, val);

            if (val === "") {
              val = "null";
            }

            if (val == null) {
              val = "null";
            }

            objPropString.push(`"${it.key}\":${val}`);
          });
          var code = "{ " + objPropString.join(",") + " }";

          if (isEnum) {
            var dropdown_name = block.getFieldValue(`val_${key}`);
            code = dropdown_name;
          } //console.log(code);


          return [code,
          /*javaScript.*/
          ORDER_NONE];
        }
      };
    };
  }

  TranslateToBlocklyType(t) {
    if (t == "integer") return "Number";
    if (t == "string") return "String";
    if (t == "bool") return "Boolean";
    if (t == "array") return "Array";
    console.error("not found TranslateToBlocklyType item" + t);
    return "not found type" + t;
  }

}

module.exports = BlocklyReturnSwagger;

/***/ }),

/***/ 46935:
/*!**********************************!*\
  !*** ../BlocklySwagger/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// exports.printMsg = function() {
//     window.alert("This is a message from the demo package");
//   }

// exports.filter1={
//   "asd":"asdasd"
// }

module.exports = {
  
  parseSwagger: __webpack_require__(/*! ./parseSwagger */ 18518),
  parseData: __webpack_require__(/*! ./blocklySwaggerData */ 43453)
  
};

/***/ }),

/***/ 18518:
/*!*****************************************!*\
  !*** ../BlocklySwagger/parseSwagger.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _asyncToGenerator = (__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator.js */ 63752)["default"]);

// import parseSwaggerDocumentation from '@api-platform/api-doc-parser/lib/swagger/parseSwaggerDocumentation';
// import parseOpenApi3Documentation from '@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation';
exports.parseSwagger = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (swaggerUrl) {
    // const SwaggerParser = require("@apidevtools/swagger-parser");
    const BlocklyReturnSwagger = __webpack_require__(/*! ./blocklySwaggerData */ 43453);

    var b = new BlocklyReturnSwagger(swaggerUrl);
    var result = [];

    const SwaggerParser = __webpack_require__(/*! @api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation */ 80746);

    var q = yield SwaggerParser.default(swaggerUrl);
    var r = q.response;

    if (r.components?.schemas) {
      Object.keys(r.components.schemas).forEach(function (key) {
        // console.log(key);   
        var schema = r.components.schemas[key];
        result.push(GenerateBlock(schema, key));
      });
    }

    ;
    return result;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

function GenerateBlock(schema, key) {
  var blocklyTypeName = key;

  if (schema.properties) {
    Object.keys(schema.properties).forEach(key => {
      var t = TranslateToBlocklyType(schema.properties[key].type);
    });
  }

  return function (blocks, javascript) {
    // console.log(blocklyTypeName);
    blocks[blocklyTypeName] = {
      init: function () {
        //this.setInputsInline(true);
        this.appendDummyInput().appendField(key); //{tooltipAndpropsDef.propsDef}
        //this.setTooltip('{tooltipAndpropsDef.tooltip}');

        this.setOutput(true, blocklyTypeName);
      }
    };
    ;
  };
}

function TranslateToBlocklyType(t) {
  if (t == "integer") return "Number";
  if (t == "string") return "String";
  if (t == "bool") return "Boolean";
  if (t == "array") return "Array";
  return "not found type" + t;
}

exports.parseSwagger1 = function (swaggerUrl) {
  // const SwaggerParser = require("@apidevtools/swagger-parser");
  const SwaggerParser = __webpack_require__(/*! @api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation */ 80746);

  return SwaggerParser.default(swaggerUrl);
};

/***/ }),

/***/ 96553:
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map