/**
 * jquery.suntabs
 *
 * jQuery plugin for adding tab functionality to a list of tab panels.
 *
 * @version v1.1
 * @author Sunny Walker, swalker@hawaii.edu
 * @license MIT
 */
(function($) {
    $.fn.suntabs = function(options) { // define the plugin
        var defaults = { // start off with some default settings
                headerSelector:     '.suntab-title',  // selector to find the tab titles
                processedClass:     'suntabbed',      // class applied to the pane(s) after processing
                tabActiveClass:     'active',         // class applied to the active tab
                tabsContainerClass: 'suntabs',        // class applied to the tabs container(s)
                tabTriggerClass:    'suntab-tab'      // class applied to the tab elements
            },

            settings = $.extend({}, defaults, options); // merge the user's settings into the defaults

        // GUID/UUID creator code from http://stackoverflow.com/a/105074
        var guid = function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                }
                return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
            }; // guid()

        // add the tab click functionality to the BODY, if it hasn't already been added
        if (!$('body').hasClass('has-suntabs')) {
            // when a tab has been clicked...
            $('body').on('click.suntabs', '.'+settings.tabTriggerClass, function(e) {
                var t      = $(this), // cache this anchor element
                    tabs   = t.closest('.'+settings.tabsContainerClass), // cache the tabs container for this group
                    panels = tabs.next().find('> div'); // cache all the panels for this group
                if (!tabs.length) {
                    // clicked on a non-tab trigger so find the actual tab and reorient
                    t = $('.'+settings.tabsContainerClass+' a[href="'+t.attr('href')+'"]');
                    if (!t.length) {
                        // still couldn't find the tab, so abort
                        return;
                    }
                    // cache the tabs container for this group
                    tabs = t.closest('.'+settings.tabsContainerClass);
                    // cache all the panels for this group
                    panels = tabs.next().find('> *');
                }
                // prevent the normal anchor action
                e.preventDefault();
                // deactivate each of the tab LIs and the tabs themselves
                tabs.find('li').removeClass('active').find('a').attr({'aria-selected': 'false', 'tabindex': '-1'});
                // activate the active tab's containing LI
                t.closest('li').addClass('active');
                // activate the active tab
                t.attr({'aria-selected': 'true', 'tabindex': '0'});
                // hide all of the panels then show the active one
                panels.hide().attr('aria-hidden', 'true').filter(t.attr('href')).show().attr('aria-hidden', 'false');
            }).addClass('has-suntabs'); // mark the BODY that we have added the tab click functionality
        }

        // for each of the panel groups...
        return this.each(function() {
            var t      = $(this), // cache this group
                tabs   = '<ul class="'+settings.tabsContainerClass+'" role="tablist">', // start building the tabs container
                panels = t.find('> *'); // cache all of the group's panels
            // does this group already have suntabs?
            if (t.hasClass(settings.processedClass)) {
                // don't process the group again
                return;
            }
            // for each of the panels in this group...
            panels.each(function(i, v) {
                var panel   = $(v), // cache this panel
                    heading = panel.find(settings.headerSelector).html(); // find the panel's heading
                // does the panel have an id?
                if (!v.id) {
                    // if not, build one and add it to the panel
                    v.id = guid();
                }
                // does the panel have a heading?
                if (!heading) {
                    // if not, use the id as the heading
                    heading = v.id;
                }
                // build the tab container and tab with the id and heading and add it to the tabs container
                tabs += '<li role="presentation"><a href="#'+v.id+'" class="'+settings.tabTriggerClass+'" role="tab" aria-selected="false" tabindex="-1" aria-controls="'+v.id+'" id="suntab-tab-'+v.id+'">'+heading+'</a></li>';
                // add the necessary a11y parameters to the panel
                panel.attr({
                    'role':            'tabpanel',
                    'aria-expanded':   'false',
                    'aria-hidden':     'true',
                    'aria-labelledby': 'suntab-tab-'+v.id
                });
            });
            // finish off the tabs container
            tabs += '</ul>';
            // mark the panel group as processed and add the tabs container just before the panel group
            t.addClass(settings.processedClass).before(tabs);
            // is there an existing location hash in the URL?
            if (document.location.hash && panels.filter(document.location.hash)) {
                // make the active tab the location hash, if it matches a panel
                $('a[href="'+document.location.hash+'"]').click();
                // reset the scroll to the top of the page
                window.scroll(0, 0);
            } else if (panels.filter(settings.tabActiveClass).length) {
                // make the active tab the first panel that has the tabActiveClass applied to it
                $('a[href="#'+panels.filter(settings.tabActiveClass).attr('id')+'"]').click();
            } else {
                // there's no location hash or selected panel in the markup so just pick the first panel and activate its tab
                t.prev().find('a:first').click();
            }
        }); // return this.each
    }; // $.fn.suntabs
})(jQuery);
