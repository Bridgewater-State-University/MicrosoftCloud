"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endDateTimeAsync = exports.startDateTimeAsync = void 0;
let month = undefined;
let day = undefined;
let hour = undefined;
let minute = undefined;
let second = undefined;
const date = new Date();
const year = date.getFullYear();
let endAsync = undefined;
let startAsync = undefined;
function endDateTimeAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        if (date.getUTCMonth() + 1 < 10) {
            let currentMonth = date.getUTCMonth() + 1;
            month = '0' + currentMonth;
        }
        else {
            month = date.getUTCMonth() + 1;
        }
        if (date.getUTCDate() < 10) {
            day = '0' + date.getUTCDate();
        }
        else {
            day = date.getUTCDate();
        }
        if (date.getUTCHours() + 1 < 10) {
            let hourlater = date.getUTCHours() + 1;
            hour = '0' + hourlater;
        }
        else if (date.getUTCHours() + 1 == 24) {
            hour = '00';
        }
        else {
            hour = date.getUTCHours() + 1;
        }
        if (date.getUTCMinutes() < 10) {
            minute = '0' + date.getUTCMinutes();
        }
        else {
            minute = date.getUTCMinutes();
        }
        if (date.getUTCSeconds() < 10) {
            second = '0' + date.getUTCSeconds();
        }
        else {
            second = date.getUTCSeconds();
        }
        endAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
        return endAsync;
    });
}
exports.endDateTimeAsync = endDateTimeAsync;
function startDateTimeAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        if (date.getUTCMonth() + 1 < 10) {
            let currentMonth = date.getUTCMonth() + 1;
            month = '0' + currentMonth;
        }
        else {
            month = date.getUTCMonth() + 1;
        }
        if (date.getUTCDate() < 10) {
            day = '0' + date.getUTCDate();
        }
        else {
            day = date.getUTCDate();
        }
        if (date.getUTCHours() < 10) {
            hour = '0' + date.getUTCHours();
        }
        else {
            hour = date.getUTCHours();
        }
        if (date.getUTCMinutes() < 10) {
            minute = '0' + date.getUTCMinutes();
        }
        else {
            minute = date.getUTCMinutes();
        }
        if (date.getUTCSeconds() < 10) {
            second = '0' + date.getUTCSeconds();
        }
        else {
            second = date.getUTCSeconds();
        }
        startAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
        return startAsync;
    });
}
exports.startDateTimeAsync = startDateTimeAsync;
//# sourceMappingURL=dateTimeFormat.js.map