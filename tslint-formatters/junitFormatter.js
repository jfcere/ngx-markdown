"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
/*
 * TSLint formatter that adheres to the JUnit XML specification.
 * https://github.com/windyroad/JUnit-Schema/blob/master/JUnit.xsd
 */
var Formatter = (function (_super) {
    __extends(Formatter, _super);
    function Formatter() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * Transform characters that cause trouble in attribute values
     */
    Formatter.prototype.escape = function (input) {
        if (!input) {
            return '';
        }
        return input.replace(/"/g, "'").replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    /**
     * Generate a java-style package name for a rule
     */
    Formatter.prototype.generateName = function (ruleName) {
        if (!ruleName) {
            return '';
        }
        return 'org.tslint.' + ruleName.replace(/\s/g, '');
    };
    /**
     * Generate an error <testcase> element
     */
    Formatter.prototype.testcaseXML = function (ruleFailure) {
        var ruleName = this.generateName(ruleFailure.getRuleName());
        var message = this.escape(ruleFailure.getFailure());
        var startPosition = ruleFailure.getStartPosition();
        var _a = startPosition.getLineAndCharacter(), line = _a.line, character = _a.character;
        var fileName = ruleFailure.getFileName();
        return "<testcase time=\"0\" name=\"" + ruleName + "\"><error message=\"" + message + " (" + ruleName + ")\"><![CDATA[" + line + ":" + character + ":" + fileName + "]]></error></testcase>";
    };
    /**
     * Generate a <testsuite> element without a closing tag
     */
    Formatter.prototype.testsuiteStartXML = function (failures) {
        return "<testsuite time=\"0\" tests=\"" + failures.length + "\" skipped=\"0\" errors=\"" + failures.length + "\" failures=\"0\" package=\"org.tslint\" name=\"tslint.xml\">";
    };
    /**
     * Transform lint failure to JUnit XML format
     */
    Formatter.prototype.format = function (failures) {
        var _this = this;
        var xml = [];
        xml.push('<?xml version=\"1.0\" encoding=\"utf-8\"?>');
        xml.push('<testsuites>');
        if (failures.length > 0) {
            xml.push(this.testsuiteStartXML(failures));
            xml = xml.concat(failures.map(function (failure) { return _this.testcaseXML(failure); }));
            xml.push('</testsuite>');
        }
        xml.push('</testsuites>');
        return xml.join('\n');
    };
    return Formatter;
}(Lint.Formatters.AbstractFormatter));
exports.Formatter = Formatter;