/**
 * @file Analytics.js
 * @description A centralized and safe helper for tracking Google Analytics events.
 * This module wraps all gtag calls in a function that first checks if gtag
 * is available on the window object. This prevents the entire application
 * from crashing if the Google Analytics script is blocked or fails to load,
 * ensuring the site remains functional.
 */

function safeGtag(...args) {
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  } else {
    console.warn('GA: gtag() not available. Analytics event was not sent.', args);
  }
}

/**
 * @description A centralized helper for tracking Google Analytics events.
 * This provides a single source of truth for all analytics events,
 * making the code cleaner and easier to maintain.
 */

const Analytics = {
  /**
   * Tracks a virtual page view for Single Page Applications.
   * Call this after a new page's content is loaded and visible.
   * @param {string} path - The new page path (e.g., '/about/').
   * @param {string} title - The new page title.
   */
  trackPageView(path = window.location.pathname, title = document.title) {
    const location = window.location.href;
    const params = {
      page_title: title,
      page_path: path,
      page_location: location,
    };

    if (document.referrer) {
      params.page_referrer = document.referrer;
    }

    console.log(`GA: PageView - ${title} (${path})`);
    safeGtag('event', 'page_view', params);
  },

  /**
   * Tracks a click on the main contact link. This is a high-intent action.
   */
  trackContactClick() {
    console.log('GA: Event - contact_click');
    safeGtag('event', 'contact_click', {
      event_category: 'engagement',
      event_label: 'header_contact',
    });
  },

  /**
   * Tracks when a user scrolls from one project page to the next.
   * @param {string} projectName - The name of the project being scrolled to.
   */
  trackProjectScroll(projectName) {
    console.log(`GA: Event - project_scroll_through, to: ${projectName}`);
    safeGtag('event', 'project_scroll_through', {
      event_category: 'engagement',
      project_name: projectName,
    });
  },

  /**
   * Tracks a click on an external link (e.g., LinkedIn, Resume, Live Site).
   * @param {string} url - The URL of the external link being clicked.
   */
  trackExternalLink(url) {
    console.log(`GA: Event - external_link_click, url: ${url}`);
    safeGtag('event', 'external_link_click', {
      event_category: 'engagement',
      link_url: url,
    });
  },

  /**
   * Tracks an interaction with a WebGL component.
   * @param {string} componentName - The name of the component (e.g., 'hero_title').
   * @param {string} interactionType - The type of interaction (e.g., 'hover_long').
   * @param {number} [value=0] - An optional value, like interaction duration in ms.
   */
  trackWebglInteraction(componentName, interactionType, value = 0) {
    console.log(`GA: Event - webgl_interaction, component: ${componentName}, type: ${interactionType}, value: ${Math.round(value)}`);
    safeGtag('event', 'webgl_interaction', {
      component_name: componentName,
      interaction_type: interactionType,
      value: Math.round(value), // Ensure value is an integer
    });
  },

  /**
   * Tracks the completion of the initial loader animation.
   */
  trackLoaderCompletion() {
    console.log('GA: Event - loader_animation_complete');
    safeGtag('event', 'loader_animation_complete', {
      event_category: 'engagement',
    });
  },

  /**
   * Tracks when the custom mouse cursor reveals a tooltip (e.g., 'View', 'Drag').
   * @param {string} tooltipText - The text content of the tooltip.
   */
  trackMouseTooltip(tooltipText) {
    console.log(`GA: Event - mouse_tooltip_reveal, text: ${tooltipText}`);
    safeGtag('event', 'mouse_tooltip_reveal', {
      event_category: 'engagement',
      tooltip_text: tooltipText,
    });
  },

  /**
   * Tracks hover interactions on individual items in the project slider/roll.
   * @param {string} viewMode - The current view ('slider' or 'roll').
   * @param {string} projectName - The name of the project being hovered.
   * @param {number} duration - The duration of the hover in milliseconds.
   */
  trackProjectItemHover(viewMode, projectName, duration) {
    console.log(`GA: Event - project_item_hover, project: ${projectName}, duration: ${duration}`);
    safeGtag('event', 'project_item_hover', {
      event_category: 'engagement',
      view_mode: viewMode,
      project_name: projectName,
      value: Math.round(duration),
    });
  },
};

export default Analytics;