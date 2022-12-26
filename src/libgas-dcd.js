/**
 * MIT License
 *
 * gas-dcd Copyright (c) 2022 Guilherme T Maeoka
 * <https://github.com/guimspace/gas-dcd>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

window.gasdcd = Object.seal({
  version: 'v0.1.0',

  _failureHandler: null,
  _serverMethod: null,

  set failureHandler (name) {
    this._failureHandler = name;
  },

  set serverMethod (name) {
    this._serverMethod = name;
  },

  request (name, params) {
    $('.gas-dcd-container').remove();
    $('#gas-dcd-html-dl').prevAll().remove();

    this.request_('style', name, params);
    this.request_('html', name, params);
  },

  request_ (type, name, params) {
    google.script.run
      .withUserObject(this)
      .withFailureHandler(this._failureHandler)
      .withSuccessHandler(this.appendContent_)[this._serverMethod](type, name, params);
  },

  appendContent_ (response, dcd) {
    if (response.type === 'html') {
      $('#gas-dcd-html-dl').before(response.content);
      dcd.request_('script', response.name, response.params);
    } else {
      const $container = $(response.content).addClass('gas-dcd-container');
      $('head').append($container);
    }
  }
});
