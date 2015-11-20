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

        var guid = function() {
                // GUID/UUID creator code from http://stackoverflow.com/a/105074
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                }
                return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
            }; // guid()

        // add the tab click functionality if needed
        if (!$('body').hasClass('has-suntabs')) {
            $('body').on('click.suntabs', '.'+settings.tabTriggerClass, function(e) {
                var t = $(this),
                    tabs = t.closest('.'+settings.tabsContainerClass),
                    panels = tabs.next().find('> div');
                if (!tabs.length) {
                    // clicked on a non-tab trigger so find the actual tab and reorient
                    t = $('.'+settings.tabsContainerClass+' a[href="'+t.attr('href')+'"]');
                    if (!t.length) {
                        return;
                    }
                    tabs = t.closest('.'+settings.tabsContainerClass);
                    // cache all the panels for this group
                    panels = tabs.next().find('> *');
                }
                e.preventDefault();
                tabs.find('li').removeClass('active').find('a').attr({'aria-selected': 'false', 'tabindex': '-1'});
                t.closest('li').addClass('active');
                t.attr({'aria-selected': 'true', 'tabindex': '0'});
                panels.hide().attr('aria-hidden', 'true').filter(t.attr('href')).show().attr('aria-hidden', 'false');
            }).addClass('has-suntabs');
        }

        return this.each(function() {
            var t = $(this),
                panels = t.find('> *'),
                tabs = '<ul class="'+settings.tabsContainerClass+'" role="tablist">';
            if (t.hasClass(settings.processedClass)) {
                // don't process again
                return;
            }
            panels.each(function(i, v) {
                var panel = $(v),
                    heading = panel.find(settings.headerSelector).html();
                if (!v.id) {
                    v.id = guid();
                }
                if (!heading) {
                    heading = v.id;
                }
                tabs += '<li role="presentation"><a href="#'+v.id+'" class="'+settings.tabTriggerClass+'" role="tab" aria-selected="false" tabindex="-1" aria-controls="'+v.id+'" id="suntab-tab-'+v.id+'">'+heading+'</a></li>';
                panel.attr({
                    'role': 'tabpanel',
                    'aria-expanded': 'false',
                    'aria-hidden': 'true',
                    'aria-labelledby': 'suntab-tab-'+v.id
                });
            });
            tabs += '</ul>';
            t.addClass(settings.processedClass).before(tabs);
            if (document.location.hash && panels.filter(document.location.hash)) {
                // make the active tab the location hash, if it matches a panel
                $('a[href="'+document.location.hash+'"]').click();
                window.scroll(0, 0); // reset the scroll to the top of the page
            } else if (panels.filter(settings.tabActiveClass).length) {
                // make the active tab the first panel that has the tabActiveClass applied to it
                $('a[href="#'+panels.filter(settings.tabActiveClass).attr('id')+'"]').click();
            } else {
                // just pick the first tab
                t.prev().find('a:first').click();
            }
        }); // return this.each
    }; // $.fn.suntabs
})(jQuery);
