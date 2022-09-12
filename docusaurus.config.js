const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Alexander\'s Blog',
  tagline: 'Dinosaurs are cool',
  url: 'https://www.alexanderlolis.com',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'alolis', 
  projectName: 'www.alexanderlolis.com',
  themeConfig: {
    navbar: {
      title: 'Alexander\'s Blog',
      logo: {
        alt: 'Alexander\'s Blog Logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/about', label: 'About', position: 'left'},
        {
          href: 'https://www.alexanderlolis.com/rss.xml',
          label: 'RSS',
          position: 'right',
        },
        {
          href: 'https://github.com/alolis',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/alexander-lolis-59aa2ab9',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://twitter.com/alexanderlolis',
          label: 'Twitter',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          items: [
            {
              html: 
                `<!-- Begin Mailchimp Signup Form -->
                <link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css">
                <div id="mc_embed_signup_wrapper">
                  <div id="mc_embed_signup">
                    <form action="https://alexanderlolis.us14.list-manage.com/subscribe/post?u=ee1eaad09b89fe63abed1d780&amp;id=8bddfe32d3&amp;f_id=003a88e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                      <div id="mc_embed_signup_scroll">
                      <h2>Subscribe for latest articles and updates!</h2>
                      <div class="mc-field-group">
                        <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
                      </label>
                        <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
                        <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
                      </div>
                        <div id="mce-responses" class="clear foot">
                          <div class="response" id="mce-error-response" style="display:none"></div>
                          <div class="response" id="mce-success-response" style="display:none"></div>
                        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_ee1eaad09b89fe63abed1d780_8bddfe32d3" tabindex="-1" value=""></div>
                            <div class="optionalParent">
                                <div class="clear foot">
                                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                                  <p class="brandingLogo"><a href="http://eepurl.com/hYZc7D" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
                              </div>
                            </div>
                        </div>
                    </form>
                  </div>
                </div>
                <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
                <!--End mc_embed_signup-->`
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alexander's Blog. Build with Docusaurus.`
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['php']
    },
    googleAnalytics: {
      trackingID: 'UA-162440229-1',
      anonymizeIP: true, // Should IPs be anonymized?
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: false,
        blog: {
          showReadingTime: true,
          path: './blog',
          routeBasePath: '/',
          blogSidebarTitle: 'All Posts',
          blogSidebarCount: 'ALL',
    feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Alexander Lolis.`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        }
      }
    ],
  ]
};
