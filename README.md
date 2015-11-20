# &#x1f31e; jquery.suntabs

jQuery plugin for adding tab functionality to a list of tab panels featuring the following:
- Tabs are built automatically for the panels.
- Panel ids are generated if none are given in the markup.
- Tabs and panels are styled with CSS.
- Aria roles and states are used for enhanced usability with assistive technologies.

Note that while you can specify your own CSS classes for the various elements in the settings, only one set of classes is supported per page. That is, &#x1f31e; jquery.suntabs does not support multiple tab/panel sets each with their own set of classes.

# Usage

```html
<div class="panels" id="panel-group-1">
  <div>
    <h2 class="suntab-title">First Section</h2>
    <p>Panel content.</p>
    <p>More panel content.</p>
  <div>
  <div id="panel2">
    <h2 class="suntab-title">Section Section</h2>
    <p>Some more panel content.</p>
  </div>
</div>
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.suntabs.js"></script>
<script>$('#panel-group-1').suntabs();</script>
```
# Demo

[Demo page](index.html)

# Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `headerSelector` | string | .suntab-title | Selector to find the tab titles |
| `processedClass` | string | suntabbed | Class applied to the panel(s) after processing |
| `tabActiveClass` | string | active | Class applied to the active tab |
| `tabsContainerClass` | string | suntabs | Class applied to the tabs container |
| `tabTriggerClass` | string | suntab-tab | Class applied to the tab elements |

# License

(The MIT License)

Copyright (c) 2015 Sunny Walker swalker@hawaii.edu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
